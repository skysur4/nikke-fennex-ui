import React from 'react';
import {useTheme} from '@mui/material/styles';
import {
	Box,
	Button, Checkbox,
	Grid,
	Typography,
} from "@mui/material";

import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';

import FilterSection from '@components/pages/FilterSection';

// icon
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import Looks1Icon from '@mui/icons-material/LooksOne';
import Looks1OIcon from '@mui/icons-material/LooksOneOutlined';
import Looks2Icon from '@mui/icons-material/LooksTwo';
import Looks2OIcon from '@mui/icons-material/LooksTwoOutlined';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks3OIcon from '@mui/icons-material/Looks3Outlined';

import Wifi1BarIcon from '@mui/icons-material/Wifi1Bar';
import Wifi2BarIcon from '@mui/icons-material/Wifi2Bar';
import Wifi3BarIcon from '@mui/icons-material/Wifi';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import TuneIcon from '@mui/icons-material/Tune';
import DeleteIcon from "@mui/icons-material/Delete";
import RegistrIcon from '@mui/icons-material/AppRegistration';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SyncIcon from '@mui/icons-material/Sync';

import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDownOffAlt';

// custom
import {useTranslation} from "react-i18next";
import NoDataGrid from '@components/common/NoDataGrid';
import {useUser} from '@components/common/UserContext';
import * as gateway from '@components/common/Gateway';
import Alert from '@components/ui/Alert';

const Members = () => {
	const currentTheme = useTheme();
	const { userInfo, isLogin, isAdmin } = useUser();
	const { t } = useTranslation();

	const [rows, setRows] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	const columns = React.useMemo(() => {
		const initialColumns = [
			{
				field: 'unionName',
				headerName: t('search__condition__union'),
			},
			{
				field: 'nickname',
				headerName: t('damage__header__nickname'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				editable: (value, row) => row.isNew,
			},
			{
				field: 'simulatedLevel1',
				headerName: <Typography >{t('member__simulation_done')} <Typography variant={"caption"}>LV1</Typography></Typography>,
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params) => <Checkbox icon={<ThumbDownIcon />} checkedIcon={<ThumbUpIcon />} checked={params.row.simulatedLevel1} />,
			},
			{
				field: 'simulatedLevel2',
				headerName: <Typography >{t('member__simulation_done')} <Typography variant={"caption"}>LV2</Typography></Typography>,
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params) => <Checkbox icon={<ThumbDownIcon />} checkedIcon={<ThumbUpIcon />} checked={params.row.simulatedLevel2} />,
			},
			{
				field: 'simulatedLevel3',
				headerName: <Typography >{t('member__simulation_done')} <Typography variant={"caption"}>LV3</Typography></Typography>,
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params) => <Checkbox icon={<ThumbDownIcon />} checkedIcon={<ThumbUpIcon />} checked={params.row.simulatedLevel3} />,
			},
			{
				field: 'simulated',
				headerName: <Typography >{t('member__simulation_done')} <DirectionsRunIcon /></Typography>,
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				renderCell: (params) => <Checkbox icon={<ThumbDownIcon />} checkedIcon={<ThumbUpIcon />} checked={params.row.simulated} />,
			},
			{
				field: 'teamUsed1',
				headerName: <Typography >{t('member__raid_run')} <Wifi1BarIcon /></Typography>,
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				sortable: false,
				renderCell: (params) => <Checkbox icon={<Looks1OIcon />}
												  checkedIcon={<Looks1Icon />}
												  checked={params.row.teamUsed1}
												  data-name="teamUsed1"
												  data-id={params.row.id}
												  data-checked={params.row.teamUsed1}
												  onClick={params.row.isNew ? null : handleTeamUsed} />,
			},
			{
				field: 'teamUsed2',
				headerName: <Typography >{t('member__raid_run')} <Wifi2BarIcon /></Typography>,
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				sortable: false,
				renderCell: (params) => <Checkbox icon={<Looks2OIcon />}
												  checkedIcon={<Looks2Icon />}
												  checked={params.row.teamUsed2}
												  data-name="teamUsed2"
												  data-id={params.row.id}
												  data-checked={params.row.teamUsed2}
												  onClick={params.row.isNew ? null : handleTeamUsed} />,
			},
			{
				field: 'teamUsed3',
				headerName: <Typography >{t('member__raid_run')} <Wifi3BarIcon /></Typography>,
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				sortable: false,
				renderCell: (params) => <Checkbox icon={<Looks3OIcon />}
												  checkedIcon={<Looks3Icon />}
												  checked={params.row.teamUsed3}
												  data-name="teamUsed3"
												  data-id={params.row.id}
												  data-checked={params.row.teamUsed3}
												  onClick={params.row.isNew ? null : handleTeamUsed} />,
			},
			{
				field: 'updatedAt',
				headerName: t('damage__header__updated_at'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				// editable: (value, row) => row.userId === userInfo.userId ? true : false,
			},
			{
				field: 'actions',
				type: 'actions',
				headerName: <TuneIcon />,
				minWidth: 80,
				getActions: (params) => [
					<>
						{params.row.isNew &&
							<GridActionsCellItem
								icon={<SaveAsIcon/>}
								color={"primary"}
								label="Save"
								data-id={params.row.id}
								data-nickname={params.row.nickname}
								onClick={handleMembersInsert}
							/>}
					</>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						color={"warning"}
						label="Delete"
						data-id={params.row.id}
						data-created={params.row.isNew}
						onClick={handleMembersDelete}
					/>,
				],
			},
		];

		if (currentTheme.isMobile) {
			return initialColumns.filter(column => ![ 'unionName'
				,'simulatedLevel1', 'simulatedLevel2', 'simulatedLevel3', 'updatedAt' ].includes(column.field)
			)
		} else {
			return initialColumns.filter(column => ![ 'unionName'
				,'simulated', 'updatedAt' ].includes(column.field)
			)
		}
	},[rows, t, currentTheme.isMobile])

	/**
	 * Alert 기능 정의
	 */
	const [alertText, setAlertText] = React.useState({msg: '', type: 'info'});
	const [isAlertVisible, setIsAlertVisible] = React.useState(false);

	const showAlert = (message, type) => {
		setAlertText({'msg': message, 'type': type ? type : 'info'});
		setIsAlertVisible(true);
	};

	const handleAlertClose = () => {
		setIsAlertVisible(false);
	};

	/**
	 * 검색 조건 기능
	 */
	const [rawData, setRawData] = React.useState([]);
	const [rowfilters, setRowfilters] = React.useState({
		unionName: 'senior',
	});

	const handleFilterChange = (event) => {
		setRowfilters({
			...rowfilters,
			[event.target.name]: event.target.value,
		});
	};

	const handleRowFilter = () => {
		const filteredRows = (rawData || []).filter(data => {
			return data.unionName === rowfilters.unionName;
		});

		setRows(filteredRows);
	};

	React.useEffect(() => {
		handleRowFilter();
	}, [rawData, rowfilters]);

	/**
	 * 멤버 API
	 */
	const handleMembersInsert = async (e) => {
		const data = e.currentTarget.dataset;
		const rowId = parseInt(data.id);
		const nickname = (data.nickname || "").trim();


		if(!nickname) {
			alert(t('user__nickname') + t('alert__required'));
		} else {
			const targetRow = rows.find(row => rowId === row.id);
			targetRow.nickname = nickname;

			gateway.post(`/api/v1/members`, targetRow)
				.then((response) =>  {
						getMembers();
						showAlert(t('alert__saved'));
					}
				);
		}
	};

	const handleMembersSave = async (params) => {
		gateway.post(`/api/v1/members`, params)
			.then((response) =>  {
					getMembers();
					showAlert(t('alert__saved'));
				}
			);
	};

	const handleMembersDelete = (e) => {
		const data = e.currentTarget.dataset;
		const isNew = data.created === 'true';
		const rowId = parseInt(data.id);

		if(isNew){
			setRows(prevRows => prevRows.filter(row => rowId !== row.id));
		} else {
			const targetRow = rows.find(row => rowId === row.id);
			if(window.confirm('[' + targetRow.nickname + '] ' + t('confirm__deleted'))) {
				gateway.del(`/api/v1/members/${targetRow.nickname}`)
					.then((response) => {
							getMembers();
							showAlert(t('alert__deleted'), 'warn');
						}
					);
			}
		}
	};

	const handleMembersReset = () => {
		const msg = t("search__condition__union") + t("search__condition__member") + ' [' + t('search__condition__union_' + userInfo.union) + '] \n' + t('confirm__proceed_reset');
		if(window.confirm(msg)) {
			gateway.del('/api/v1/members/reset')
				.then((response) =>  {
						getMembers();
						showAlert(t('alert__deleted', 'warn'));
					}
				);
		}
	};

	const getMembers = async () => {
		setLoading(true);
		const response = await gateway.get('/api/v1/members');

		if (response && response.data && response.data.length > 0){

			setRawData(response.data.map((row,index) => ({
				id: index,
				nickname: row.nickname,
				unionName: row.unionName,
				teamUsed1: row.teamUsed1,
				teamUsed2: row.teamUsed2,
				teamUsed3: row.teamUsed3,
				simulatedLevel1: row.simulatedLevel1,
				simulatedLevel2: row.simulatedLevel2,
				simulatedLevel3: row.simulatedLevel3,
				simulated: row.simulated,
				updatedAt: row.updatedAt || '-',
				isNew: false,
			})));

		} else {
			setRawData([]);
		}

		handleRowFilter();

		setLoading(false);
	};

	const handleTeamUsed = (e) => {
		const data = e.currentTarget.dataset;
		const targetRow = rawData[data.id];

		let teamUsed1 = targetRow.teamUsed1;
		let teamUsed2 = targetRow.teamUsed2;
		let teamUsed3 = targetRow.teamUsed3;

		if(data.name === "teamUsed1"){
			if(data.checked === "false"){
				//체크 시
				teamUsed1 = true;

			} else {
				//체크 해제 시
				teamUsed1 = false;
				teamUsed2 = false;
				teamUsed3 = false;
			}
		}

		if(data.name === "teamUsed2"){
			if(data.checked === "false"){
				//체크 시
				teamUsed1 = true;
				teamUsed2 = true;

			} else {
				//체크 해제 시
				teamUsed2 = false;
				teamUsed3 = false;
			}
		}

		if(data.name === "teamUsed3"){
			if(data.checked === "false"){
				//체크 시
				teamUsed1 = true;
				teamUsed2 = true;
				teamUsed3 = true;

			} else {
				//체크 해제 시
				teamUsed3 = false;
			}
		}

		const param = {
			...targetRow
			, 'teamUsed1': teamUsed1
			, 'teamUsed2': teamUsed2
			, 'teamUsed3': teamUsed3
		};

		handleMembersSave(param);
	}

	const handleSyncronize = async () => {
		const msg = t("confirm__sync_simulation_proceed");
		if(window.confirm(msg)) {
			gateway.post(`/api/v1/members/auto`)
				.then((response) => {
						getMembers();
						showAlert(t('alert__process__done'));
					}
				);
		}
	};

	const handleAddRow = () => {
		const newId = Math.max(...rows.map(row => row.id)) + 1; // Simple ID generation
		const newRow = {
			id: newId,
			nickname: null,
			unionName: null,
			teamUsed1: false,
			teamUsed2: false,
			teamUsed3: false,
			simulatedLevel1: false,
			simulatedLevel2: false,
			simulatedLevel3: false,
			simulated: false,
			updatedAt: null,
			isNew: true,
		};

		setRows(prevRows => [newRow, ...prevRows ]); // Add at the end
	};

	/**
	 * Default hook
	 */
	React.useEffect(() => {
		if (isLogin && isAdmin) {
			getMembers().then((response) =>  {});
		} else {
			window.location.replace('/');
		}
	}, [isAdmin, isLogin]);


	return(
		<section id="homeSection">
			<Alert text={alertText.msg} visible={isAlertVisible} onClose={handleAlertClose} type={alertText.type} />

			<div className="section-header">
				<Grid container backgroundColor={currentTheme.palette.background.default + '50'} padding={1} borderRadius={2} boxShadow={currentTheme.shadows[1]}>
					<Grid container item md={8} sm={12} flexDirection={'column'} justifyContent={'flex-start'}>
						<Typography variant="h4" pb={1}>【{t("search__condition__union")} {t("search__condition__member")} {t("search__condition__manager")}】</Typography>
						<Typography variant="caption" sx={{ pl: 1 }}>{t("member__description")}</Typography>
					</Grid>
				</Grid>
			</div>

			<div className="section-body">
				<Grid container backgroundColor={currentTheme.palette.background.default + '50'} padding={1} borderRadius={2} boxShadow={currentTheme.shadows[1]} justifyContent="space-between">
					<Grid item md={12} sm={12} xs={12}>
						<Box className="item">
							<Box display="flex" alignItems="center" justifyContent="space-between" pb={1}>
								<Button variant="contained" color='warning' onClick={handleMembersReset} startIcon={<RestartAltIcon />}>{t('search__condition__union')} {t('search__condition__member')} {t('btn__reset')}</Button>
								<Button color='success' variant="contained" onClick={handleSyncronize} startIcon={<SyncIcon />}>{t('search__condition__union')} {t('search__condition__member')} {t('member__synchronize')}</Button>
								<Button color='primary' variant="contained" onClick={handleAddRow} startIcon={<RegistrIcon />}>{t('search__condition__union')} {t('search__condition__member')} {t('btn__add')}</Button>
							</Box>

							<Box sx={{ height: '100%', width:'100%'}}>
								<FilterSection
									onFilterChange={handleFilterChange}
									onClickReload={getMembers}
									rowfilters={rowfilters}
								/>

								<DataGrid
									rows={rows}
									columns={columns}
									getRowClassName={(params) => {
										return params.row.isNew ? 'active-row' : '';
									}}
									slots={{
										noRowsOverlay: NoDataGrid,
									}}
									loading={loading}
									disableRowSelectionOnClick={true}
									hideFooter={true}
								/>
								<style>{`
								.active-row {
									background-color: rgba(118, 118, 210, 0.66); /* Light blue */
								}
								`}</style>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</div>
			<div className="section-footer">
			</div>
		</section>
	)
}

export default Members;