import React from 'react';

import { Box, Divider, Grid, Typography, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';

import ListIcon from '@mui/icons-material/List';
import PageviewIcon from '@mui/icons-material/Pageview';

import { useTheme } from '@mui/material/styles';
import {useTranslation} from "react-i18next";

import * as gateway from '@components/common/Gateway';
import { useUser } from '@components/common/UserContext';

import History from '@components/pages/History';
import Alert from '@components/ui/Alert';
import NoDataGrid from '@components/common/NoDataGrid';


const Histories = () => {
	const weekAgo = dayjs().subtract(7, 'day');
	const today = dayjs();

	const currentTheme = useTheme();
	const { isLogin } = useUser();
	const { t, i18n } = useTranslation();
	const [rows, setRows] = React.useState([]);
  	const [historyDetail, setHistoryDetail] = React.useState({});
  	const [filterParams, setFilterParams] = React.useState({
		projectName: '',
		idx: '',
		startDate: weekAgo,
		endDate: today
	});
  	const [showDetail, setShowDetail] = React.useState(false);
  	const [alertText, setAlertText] = React.useState('');
	const [isAlertVisible, setIsAlertVisible] = React.useState(false);

	const columns = React.useMemo(() => {
		//Grid
		// 프로젝트 , 파일수 , 성공, 실패 , 성공률, 마지막 분석일
		const initialColumns = [
		  { field: 'id',
		  	headerName: 'No',
		  	width: 100,
		  },
		  {
		    field: 'projectId',
		    headerName: t('analytic__header__project_id'),
		    hide: true,
		  },
		  {
		    field: 'projectName',
		    headerName: t('analytic__header__project'),
		    width: 300,
		    flex: 1,
		    headerAlign: 'center',
		    align: 'center',
		    editable: false,
		  },
		  {
		    field: 'idx',
		    headerName: t('analytic__header__anaysis_index'),
		    width: 120,
		    headerAlign: 'center',
		    align: 'center',
		    editable: false,

		  },
		  {
		    field: 'updatedAt',
		    headerName: t('analytic__header__anaysis_date'),
		    width: 180,
		    headerAlign: 'center',
		    align: 'center',
		    editable: false,
		  },
		  {
		    field: 'vulnerabilityTotalCnt',
		    headerName: 'vulnerabilityTotalCnt',
		    hide: true,
		  },
		  {
		    field: 'vulnerabilityPassCnt',
		    headerName: 'vulnerabilityPassCnt',
		    hide: true,
		  },
		  {
		    field: 'vulnerabilityFailCnt',
		    headerName: 'vulnerabilityFailCnt',
		    hide: true,
		  },
		  {
		    field: 'vulnerabilityRate',
		    headerName: 'vulnerabilityRate',
		    hide: true,
		  },
		  {
		    field: 'vulnerabilityResult',
		    renderHeader: () => (
				<span>{t('analytic__header__vulnerability_result')}<br/>{t('analytic__header__anaysis_result')}</span>
	    	),
		    width: 150,
		    headerAlign: 'center',
		    align: 'center',
		    editable: false,
		    valueGetter: (value, row) => `${row.vulnerabilityPassCnt || 0} / ${row.vulnerabilityTotalCnt || 0} (${row.vulnerabilityRate || 0}%)`,
		  },
		  {
		    field: 'obfuscationTotalCnt',
		    headerName: 'obfuscationTotalCnt',
		    hide: true,
		  },
		  {
		    field: 'obfuscationPassCnt',
		    headerName: 'obfuscationPassCnt',
		    hide: true,
		  },
		  {
		    field: 'obfuscationFailCnt',
		    headerName: 'obfuscationFailCnt',
		    hide: true,
		  },
		  {
		    field: 'obfuscationRate',
		    headerName: 'obfuscationRate',
		    hide: true,
		  },
		  {
		    field: 'obfuscationResult',
		    renderHeader: () => (
				<span>{t('analytic__header__obfuscation_result')}<br/>{t('analytic__header__anaysis_result')}</span>
	    	),
		    width: 150,
		    headerAlign: 'center',
		    align: 'center',
		    editable: false,
		    valueGetter: (value, row) => `${row.obfuscationPassCnt || 0} / ${row.obfuscationTotalCnt || 0} (${row.obfuscationRate || 0}%)`,
		  },
		  {
		    field: 'logFileAbsolutePath',
		    headerName: 'logFileAbsolutePath',
		    hide: true,
		  },
		  {
		    field: 'zipFileAbsolutePath',
		    headerName: 'zipFileAbsolutePath',
		    hide: true,
		  },
		];

    	if (currentTheme.isMobile) {
			return initialColumns.filter(column => ![ 'projectId', 'vulnerabilityTotalCnt', 'vulnerabilityPassCnt', 'vulnerabilityFailCnt', 'vulnerabilityRate'
													, 'obfuscationTotalCnt', 'obfuscationPassCnt', 'obfuscationFailCnt', 'obfuscationRate'
													, 'logFileAbsolutePath', 'zipFileAbsolutePath'
													,'id','updatedAt','vulnerabilityResult','obfuscationResult'
													].includes(column.field)
			)
    	} else {
			return initialColumns.filter(column => ![ 'projectId', 'vulnerabilityTotalCnt', 'vulnerabilityPassCnt', 'vulnerabilityFailCnt', 'vulnerabilityRate'
													, 'obfuscationTotalCnt', 'obfuscationPassCnt', 'obfuscationFailCnt', 'obfuscationRate'
													, 'logFileAbsolutePath', 'zipFileAbsolutePath'
													].includes(column.field)
			)
		}
	},[t, currentTheme.isMobile])

	//회차 기본 세팅 1 ~ 100
	const roundOptions = [];
	for (let i = 1; i <= 100; i++) {
		roundOptions.push(<MenuItem key={i} value={i}>{t("analytic__value__analysis_index", { idx: i })}</MenuItem>);
	}

	// =================== 필터 이벤트 ============================
	const handleGeneralForm = (event) => {	//text, check, radio, select
	    const target = event.target;
	    const name = target.name;
	    const value = target.type === 'checkbox' ? target.checked : target.value;

	    setFilterParams({
			...filterParams,
			[name]: value
	    });
  	};

	const handleStartDate = (date) => {
	    setFilterParams({
			...filterParams,
			startDate: date
	    });
  	};

	const handleEndDate = (date) => {
	    setFilterParams({
			...filterParams,
			endDate: date
	    });
  	};

	// ======================== 조회 =========================
	//의존성에 의해 조회조건 변경 시마다 조회 됨을 막기 위해 참조 사용
	const filterParamsRef = React.useRef(filterParams);
	filterParamsRef.current = filterParams;	// 바인딩

	const handleSearch = React.useCallback(async () => {
		if (dayjs(filterParamsRef.current.endDate).isBefore(dayjs(filterParamsRef.current.startDate))) {
			showAlert(t('alert__date__validation'));
			return;
		}

	    const params = {
	        projectName: filterParamsRef.current.projectName,
	        idx: filterParamsRef.current.idx === '' ? 0 : filterParamsRef.current.idx,
	        startDate: dayjs(filterParamsRef.current.startDate).format('YYYY-MM-DD'),
	        endDate: dayjs(filterParamsRef.current.endDate).format('YYYY-MM-DD')
	    }
	    const result = await gateway.get('/api/v1/history/list', params);

	    if(result.status && result.data.totalCnt > 0){
	        setRows(result.data.list.map((row,index) => ({
	            id: index+1,
	            projectId: row.projectId,
	            projectName: row.projectName,
	            idx: row.idx,
	            updatedAt: row.updatedAt,
	            vulnerabilityPassCnt: row.vulnerabilityPassCnt,
	            vulnerabilityTotalCnt: row.vulnerabilityTotalCnt,
	            vulnerabilityRate: row.vulnerabilityRate,
	            obfuscationPassCnt: row.obfuscationPassCnt,
	            obfuscationTotalCnt: row.obfuscationTotalCnt,
	            obfuscationRate: row.obfuscationRate,
	            logFileAbsolutePath: row.logFileAbsolutePath,
	            zipFileAbsolutePath: row.zipFileAbsolutePath
	        })));
	    }else{
			setRows({});
		}
	}, [t]);

	React.useEffect(() => {
		if(isLogin){
      		handleSearch();
		}
  	}, [handleSearch, isLogin]);

  	const showAlert = (message) => {
		setAlertText(message);
		setIsAlertVisible(true);
	};

	const handleAlertClose = () => {
    	setIsAlertVisible(false);
  	};

  	const handleHistoryDetail = (rowId) => {
    	const selectedRow = rows.find(row => row.id === rowId);
    	setHistoryDetail(selectedRow || {});
    	setShowDetail(true);
  	};

  	const handleCloseDetail = () => {
    	setShowDetail(false);
  	};

	return(
		<section id="historiesSection">
			<Alert text={alertText} visible={isAlertVisible} type="warn" onClose={handleAlertClose}/>
			<div className="section-header">
				<Typography variant="h4">{t('menu__histories')}</Typography>
			</div>

			<div className="section-filter">
				<Grid container justifyContent="space-between" spacing={1}>
					<Grid item md={12} sm={12} xs={12}>
						<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" mt={2}>
							<Box display="flex" alignItems="center">
								<ListIcon/>
								<span>{t('search__condition')}</span>
  							</Box>
							<IconButton color='primary' onClick={handleSearch}>
								<PageviewIcon/>
								<Typography sx={{display: { xs: 'none', sm: 'flex' }}}>{t("btn__search")}</Typography>
							</IconButton>
						</Box>

						<Divider sx={{ my: 1 }} />

						<Box sx={{ mb:6, padding: '15px', border: '1px solid', borderColor: currentTheme.palette.border, borderRadius: 1, boxSizing: 'border-box' }}>
							<Grid container spacing={2} alignItems="center">
								<Grid item xs={12} md={3}>
				                  <TextField
				                    name='projectName'
				                    label={t('analytic__header__project')}
				                    value={filterParams.projectName}
				                    onChange={handleGeneralForm}
				                    fullWidth
				                  />
				                </Grid>
								<Grid item xs={12} md={3}>
			                  		<FormControl sx={{ width:'70%'}}>
				                    	<InputLabel>{t('analytic__header__anaysis_index')}</InputLabel>
					                    <Select
					                    	name='idx'
					                    	value={filterParams.idx}
					                    	MenuProps={{ sx: { maxHeight: 300, } }}
					                    	onChange={handleGeneralForm}
					                    	label={t('analytic__header__anaysis_index')}
					                    >
											<MenuItem value=""><em>{t('analytic__placeholder__choose')}</em></MenuItem>
					                      	{roundOptions}
					                    </Select>
			                  		</FormControl>
			                	</Grid>
				                <Grid item xs={12} md={3}>
									<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language}>
				                    <DatePicker
					                    label={t('analytic__placeholder__startdate')}
					                    format="YYYY-MM-DD"
					                    value={filterParams.startDate}
					                    maxDate={filterParams.endDate}
					                    onChange={handleStartDate}
					                    slotProps={{ calendarHeader: { format: 'YYYY MMMM' }}}
				                    />
				                  	</LocalizationProvider>
								</Grid>
				                <Grid item xs={12} md={3}>
									<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language}>
				                    <DatePicker
					                    label={t('analytic__placeholder__enddate')}
					                    format="YYYY-MM-DD"
					                    value={filterParams.endDate}
					                    minDate={filterParams.startDate}
					                    onChange={handleEndDate}
					                    slotProps={{ calendarHeader: { format: 'YYYY MMMM' }}}
				                    />
				                  </LocalizationProvider>
				                </Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</div>
			<div className="section-body">
				<Grid container justifyContent="space-between" spacing={1}>
					<Grid item md={12} sm={12} xs={12}>
						<Box className="item" >
							<Box className="item-header" display="flex" alignItems="center" justifyContent="space-between" mt={2}>
								<Box display="flex" alignItems="center">
									<ListIcon/>
									<span>{t('menu__histories')}</span>
      							</Box>
							</Box>

							<Divider sx={{ my: 1 }} />

							<Box sx={{ height: '100%', width:'100%'}}>
								<DataGrid
									rows={rows}
									columns={columns}
									autoHeight={true}
									onRowClick={(params) => handleHistoryDetail(params.id)}
									initialState={{
										pagination: {
											paginationModel: {
												pageSize: 10,
											},
										},
									}}
									pageSizeOptions={[10]}
									slots={{
							          noRowsOverlay: NoDataGrid,
							        }}
								/>
							</Box>
						</Box>
					</Grid>
				</Grid>
				<History
			        open={showDetail}
			        handleClose={handleCloseDetail}
			        projectDetail={historyDetail}
			    />
			</div>
			<div className="section-footer"></div>
		</section>
	)
}

export default Histories;