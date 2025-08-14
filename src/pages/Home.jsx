import React, {Fragment} from 'react';
import parse from 'html-react-parser';
import { useTheme } from '@mui/material/styles';
import {
	Box,
	Button,
	Grid,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
	Divider,
	Tooltip,
	Table, TableBody, TableRow, TableCell, TableHead, TableContainer, Paper,
} from "@mui/material";
import { TextField, FormControl, InputLabel, NativeSelect } from "@mui/material";
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";

import { DataGrid } from '@mui/x-data-grid';

import FilterSection from '@components/pages/FilterSection';

// icon
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import ScoreIcon from '@mui/icons-material/Score';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CalculateIcon from '@mui/icons-material/Calculate';

// custom
import {useTranslation} from "react-i18next";
import NoDataGrid from '@components/common/NoDataGrid';
import { useUser } from '@components/common/UserContext';
import * as gateway from '@components/common/Gateway';
import Alert from '@components/ui/Alert';
import {roundToDecimalPlaces} from "@mui/x-data-grid/utils/roundToDecimalPlaces";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";

const Home = () => {
	const currentTheme = useTheme();
	const { userInfo, isLogin, isAdmin } = useUser();
	const { t } = useTranslation();

	const [rawData, setRawData] = React.useState([]);
	const [rows, setRows] = React.useState([]);
	const [collapseBoss, setCollapseBoss] = React.useState(true);
	const [collapseManual, setCollapseManual] = React.useState(true);
	const [loading, setLoading] = React.useState(false);

	const simulationIndexes= [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const simulationIndexRef = React.useRef(1);

	const initSimulation = {
		userId: '',
		nickname: '',
		unionName: '',
		level: '',
		index: '',
		boss1: '',
		boss2: '',
		boss3: '',
		boss4: '',
		boss5: '',
		deck1: '',
		deck2: '',
		deck3: '',
		deck4: '',
		deck5: '',
		memo: '',
	}

	const [simulation, setSimulation] = React.useState(initSimulation);
	const [simulationDialogOpen, setSimulationDialogOpen] = React.useState(false);

	const handleSimulationChange = (e) => {
		setSimulation({
			...simulation,
			[e.target.name]: e.target.value,
		});
	};

	const getScore = () => {
		return gateway.get(`/api/v1/score/${bossLevelRef.current}/${simulationIndexRef.current}`)
			.then((response) =>  {
				if( response && response.data) {
					setSimulation(response.data);
				} else {
					setSimulation(initSimulation);
				}
				return true;
			}).catch((error) => {
				console.log(error);
				return false;
			});
	};

	const handleSimulationIndexChange = (e, newIndex) => {
		simulationIndexRef.current = newIndex ? newIndex : e.currentTarget.value;
		getScore();
	}

  	const handleSimulationDialogClose = () => {
 		setSimulationDialogOpen(false);
	};

	const handleSimulationDialogOpen = () => {
		if(getScore()){
			setSimulationDialogOpen(true);
		}
	};

	const handleSimulationSave = async () => {
		const params = {
			...simulation
			, 'level': bossLevelRef.current
			, 'index': simulationIndexRef.current
		};

		gateway.post(`/api/v1/score`, params)
			.then((response) =>  {
				getScores();
				handleSimulationDialogClose();
				showAlert(t('alert__saved'));
			}
		);
	};

	const handleSimulationDelete = () => {
		gateway.del(`/api/v1/score/${bossLevelRef.current}/${simulationIndexRef.current}`)
			.then((response) =>  {
				getScores();
				handleSimulationDialogClose();
				showAlert(t('alert__deleted'));
			}
		);
	};

	const handleSimulationReset = () => {
		const msg = t('damage__simulation_result') + ' [' + t('search__condition__union_' + userInfo.union) + '] \n' + t('confirm__proceed_reset');
		if(window.confirm(msg)) {
			gateway.del('/api/v1/score/reset')
				.then((response) =>  {
						getScores();
						handleSimulationDialogClose();
						showAlert(t('alert__deleted'));
					}
				);
		}
	};
	
    const getScores = async () => {
		setLoading(true);
        const response = await gateway.get(`/api/v1/score/${bossLevelRef.current}`);

        if (response && response.data && response.data.length > 0){
			
			setRawData(response.data.map((row,index) => ({
	        	id: index+1,
	        	userId: row.userId,
				nickname: row.nickname,
				unionName: row.unionName,
				level: row.level,
				index: row.index,
	        	boss1: row.boss1,
				boss2: row.boss2,
	        	boss3: row.boss3,
				boss4: row.boss4,
	        	boss5: row.boss5,
				deck1: row.deck1,
	        	deck2: row.deck2,
				deck3: row.deck3,
	        	deck4: row.deck4,
				deck5: row.deck5,
				memo: row.memo,
	        	updatedAt: row.updatedAt || '-',
				isNew: false,
			})));

		} else {
			setRawData([]);
		}

		handleRowFilter();

		setLoading(false);
    };

	const initBoss = {
		name1: '',
		name2: '',
		name3: '',
		name4: '',
		name5: '',
		hp1: '',
		hp2: '',
		hp3: '',
		hp4: '',
		hp5: '',
	};

	const [boss, setBoss] = React.useState(initBoss);
	const bossLevels = [ 1, 2, 3 ];
	const [bossLevel, setBossLevel] = React.useState(1);
	const bossLevelRef= React.useRef(1);

	const [scoreSum, setScoreSum] = React.useState({
		hp1: 0,
		hp2: 0,
		hp3: 0,
		hp4: 0,
		hp5: 0,
	});
	
	const [bossDialogOpen, setBossDialogOpen] = React.useState(false);

	const handleBossLevel = (e, newLevel) => {
		setBossLevel(newLevel ? newLevel : e.currentTarget.value); //UI 처리
		bossLevelRef.current = newLevel ? newLevel : e.currentTarget.value; //DATA 처리
	}

	const handleBossChange = (e) => {
		setBoss({
			...boss,
			[e.target.name]: e.target.name.startsWith('hp') ? parseInt(e.target.value) : e.target.value,
		});
	};

  	const handleBossDialogClose = () => {
 		setBossDialogOpen(false);
	};

	const handleBossDialogOpen = () => {
		getBossInfo();
		setBossDialogOpen(true);
	};

	const handleBossSave = async () => {
		const params = {
			...boss
			, 'level': bossLevelRef.current
		};

		gateway.post(`/api/v1/boss`, params)
			.then((response) =>  {
				setBoss(response.data);
				handleBossDialogClose();
				showAlert(t('alert__saved'));
			});
	};

	const handleBossDelete = () => {
		const msg = t('damage__title__boss_information') + ' ' + t('damage__header__level') + ' [' + bossLevelRef.current + '] ' + t('confirm__proceed_reset');
		if(window.confirm(msg)) {
			gateway.del(`/api/v1/boss/${bossLevelRef.current}`)
				.then((response) => {
						setBoss(initBoss);
						handleBossDialogClose();
						showAlert(t('alert__deleted'));
					}
				);
		}
	};
	
    const getBossInfo = async () => {
        const response = await gateway.get(`/api/v1/boss/${bossLevelRef.current}`);
        if (response && response.data){
			setBoss(response.data);
		} else {
			setBoss(initBoss);
		}
    };

	const formatNumber = (number) => {
		if(currentTheme.isMobile) {
			return roundToDecimalPlaces(number / 100000000, 0) + t('damage__hundred_million_unit');
		}
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	const handleCollapseBoss = () => {
		setCollapseBoss(!collapseBoss);
	};

	const handleCollapseManual = () => {
		setCollapseManual(!collapseManual);
	};

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
	 * Row 클릭 이벤트 관리
	 */
	const sumScores = (rowIds) => {
		const selectedRows = rows.filter(row => rowIds.includes(row.id));

		let playerDamage1 = 0;
		let playerDamage2 = 0;
		let playerDamage3 = 0;
		let playerDamage4 = 0;
		let playerDamage5 = 0;

		// 선택된 데미지 누적
		selectedRows.forEach(row => {
			playerDamage1 = playerDamage1 + (parseInt(row[`boss1`]) || 0);
			playerDamage2 = playerDamage2 + (parseInt(row[`boss2`]) || 0);
			playerDamage3 = playerDamage3 + (parseInt(row[`boss3`]) || 0);
			playerDamage4 = playerDamage4 + (parseInt(row[`boss4`]) || 0);
			playerDamage5 = playerDamage5 + (parseInt(row[`boss5`]) || 0);
		});

		// 점수 합산 표시
		setScoreSum({
			'hp1': playerDamage1,
			'hp2': playerDamage2,
			'hp3': playerDamage3,
			'hp4': playerDamage4,
			'hp5': playerDamage5
		});
	}

	/**
	 * 투입 관리
	 */
	const handleRaid = (e) => {
		const data = e.currentTarget.dataset;
		const boss = data.boss;

		console.log(boss, 'level', bossLevelRef.current);
	}

	/**
	 * Default hook
	 */
	React.useEffect(() => {
		if (isLogin) {
			getBossInfo();
			getScores();
		}
	}, [isLogin, bossLevel]);

	const columns = React.useMemo(() => {
		/**
		 * Grid
		 * 사용자 아이디
		 * 닉네임
		 * 1보스
		 * 2보스
		 * 3보스
		 * 4보스
		 * 5보스
		 * 덱
		 * 합계
		 * 수정일시
		 **/
		const initialColumns = [
			{
				field: 'userId',
				headerName: t('damage__header__user_id'),
			},
			{
				field: 'nickname',
				headerName: t('damage__header__nickname'),
				flex: 1,
				headerAlign: 'center',
				align: 'center',
				// valueGetter: (value, row) => value,
				renderCell: (params) => <Tooltip title={
					<div style={{ minWidth: '100px' }}>
						<Typography variant={"h6"} textAlign={"left"}>『</Typography>
						<Typography variant={"body1"}>{parse((params.row.memo || "").replace(/\n/g, "<br/>"))}</Typography>
						<Typography variant={"h6"} textAlign={"right"}>』</Typography>
					</div>
				}>{params.formattedValue}</Tooltip>,
			},
			{
				field: 'level',
				headerName: t('damage__header__level'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'index',
				headerName: t('damage__header__index'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
			},
			{
				field: 'boss1',
				headerName: boss.name1 || t('damage__header__boss_1'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'right',
				// editable: (value, row) => row.userId === userInfo.userId ? true : false,
				valueGetter: (value, row) => value ? formatNumber(value) : 0,
				renderCell: (params) => <Tooltip title={<Typography variant={"body2"}>{params.row.deck1}</Typography>}>{params.formattedValue}</Tooltip>,
			},
			{
				field: 'boss2',
				headerName: boss.name2 || t('damage__header__boss_2'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'right',
				// editable: (value, row) => row.userId === userInfo.userId ? true : false,
				valueGetter: (value, row) => value ? formatNumber(value) : 0,
				renderCell: (params) => <Tooltip title={<Typography variant={"body2"}>{params.row.deck2}</Typography>}>{params.formattedValue}</Tooltip>,
			},
			{
				field: 'boss3',
				headerName: boss.name3 || t('damage__header__boss_3'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'right',
				// editable: (value, row) => row.userId === userInfo.userId ? true : false,
				valueGetter: (value, row) => value ? formatNumber(value) : 0,
				renderCell: (params) => <Tooltip title={<Typography variant={"body2"}>{params.row.deck3}</Typography>}>{params.formattedValue}</Tooltip>,
			},
			{
				field: 'boss4',
				headerName: boss.name4 || t('damage__header__boss_4'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'right',
				// editable: (value, row) => row.userId === userInfo.userId ? true : false,
				valueGetter: (value, row) => value ? formatNumber(value) : 0,
				renderCell: (params) => <Tooltip title={<Typography variant={"body2"}>{params.row.deck4}</Typography>}>{params.formattedValue}</Tooltip>,
			},
			{
				field: 'boss5',
				headerName: boss.name5 || t('damage__header__boss_5'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'right',
				// editable: (value, row) => row.userId === userInfo.userId ? true : false,
				valueGetter: (value, row) => value ? formatNumber(value) : 0,
				renderCell: (params) => <Tooltip title={<Typography variant={"body2"}>{params.row.deck5}</Typography>}>{params.formattedValue}</Tooltip>,
			},
			{
				field: 'deck1',
				headerName: t('damage__header__deck_1'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				// editable: (value, row) => row.userId === userInfo.userId ? true : false,
			},
			{
				field: 'deck2',
				headerName: t('damage__header__deck_2'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				// editable: (value, row) => row.userId === userInfo.userId ? true : false,
			},
			{
				field: 'deck3',
				headerName: t('damage__header__deck_3'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				// editable: (value, row) => row.userId === userInfo.userId ? true : false,
			},
			{
				field: 'deck4',
				headerName: t('damage__header__deck_4'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				// editable: (value, row) => row.userId === userInfo.userId ? true : false,
			},
			{
				field: 'deck5',
				headerName: t('damage__header__deck_5'),
				flex: 1,
				minWidth: 50,
				headerAlign: 'center',
				align: 'center',
				// editable: (value, row) => row.userId === userInfo.userId ? true : false,
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
		];

    	if (currentTheme.isMobile) {
			return initialColumns.filter(column => ![ 'userId', 'level'
													,'deck1', 'deck2', 'deck3', 'deck4', 'deck5', 'updatedAt' ].includes(column.field)
			)
    	} else {
			return initialColumns.filter(column => ![ 'userId', 'level'
													,'deck1', 'deck2', 'deck3', 'deck4', 'deck5', 'updatedAt' ].includes(column.field)
			)
		}
	},[rows, t, currentTheme.isMobile])

	/**
	 * Alert 기능 정의
	 */
	const [alertText, setAlertText] = React.useState('');
	const [isAlertVisible, setIsAlertVisible] = React.useState(false);

	const showAlert = (message) => {
		setAlertText(message);
		setIsAlertVisible(true);
	};

	const handleAlertClose = () => {
		setIsAlertVisible(false);
	};

	return(
		<section id="homeSection">
			<Alert text={alertText} visible={isAlertVisible} onClose={handleAlertClose} type="error"/>

			<div className="section-header">
				<Grid container backgroundColor={currentTheme.palette.background.default + '50'} padding={1} borderRadius={2} boxShadow={currentTheme.shadows[1]}>
					<Grid container item md={8} sm={12} flexDirection={'column'} justifyContent={'flex-start'}>
						<Typography variant="h4" pb={1}>{t("home__title")}</Typography>
						<Typography variant="caption" sx={{ pl: 1 }}>{t("home__description")}</Typography>
						<List component="div" disablePadding sx={{ width: '100%' }}>
							<ListItemButton onClick={handleCollapseManual}>
								{collapseManual ? <ExpandLess /> : <ExpandMore />}
								<ListItemText primary={t("damage__user_manual")} />
							</ListItemButton>
							<Collapse in={collapseManual} timeout="auto" unmountOnExit>
								<Typography variant="body1" sx={{ pl: 1 }}>{t("damage__user_manual1")}</Typography>
								<Typography variant="body1" sx={{ pl: 1 }}>{t("damage__user_manual2")}</Typography>
								<Typography variant="body1" sx={{ pl: 1 }}>{t("damage__user_manual3")}</Typography>
								<Typography variant="body1" sx={{ pl: 1 }}>{t("damage__user_manual4")}</Typography>
								<Typography variant="body1" sx={{ pl: 1 }}>{t("damage__user_manual5")}</Typography>
								{isAdmin && <>
									<Typography variant="body1" sx={{ pl: 1 }} color='warning'>{t("damage__user_manual_manager")}</Typography>
									<Typography variant="body2" sx={{ pl: 1 }} color='warning'>{t("damage__user_manual_warning")}</Typography>
								</>}

							</Collapse>
						</List>
					</Grid>

					<Grid container item md={4} sm={12} flexDirection={'column'} justifyContent="flex-end">
						<Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
							<Box display="flex" alignItems="center">
								{ isLogin && isAdmin &&
								<Button color='warning' variant="contained" onClick={handleBossDelete} startIcon={<RestartAltIcon />}>{t('damage__title__boss_information')} {t('btn__reset')}</Button>
								}
							</Box>
							{ isLogin && isAdmin &&
							<Button color='primary' variant="contained" onClick={handleBossDialogOpen} startIcon={<UpgradeIcon />}>{t('damage__title__boss_information')} {t('btn__update')}</Button>
							}
						</Box>
						<List component="div" disablePadding sx={{ width: '100%' }} mb={1}>
							<ListItemButton onClick={handleCollapseBoss}>
								{collapseBoss ? <ExpandLess /> : <ExpandMore />}
								<ListItemText primary={t("damage__title__boss_information")} />
								<Typography variant={"subtitle1"}>『{t('damage__header__level')} {bossLevelRef.current}』</Typography>
							</ListItemButton>
							<Collapse in={collapseBoss} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									{ boss.hp1 > 0 &&
									<ListItemButton sx={{ pl: 4 }} data-boss='boss1' onClick={handleRaid}>
										<ListItemIcon>
										<Filter1Icon />
										</ListItemIcon>
										<ListItemText primary={boss.name1} secondary={formatNumber(boss.hp1)} />
									</ListItemButton>
									} { boss.hp2 > 0 &&
									<ListItemButton sx={{ pl: 4 }} data-boss='boss2' onClick={handleRaid}>
										<ListItemIcon>
										<Filter2Icon />
										</ListItemIcon>
										<ListItemText primary={boss.name2} secondary={formatNumber(boss.hp2)} />
									</ListItemButton>
									} { boss.hp3 > 0 &&
									<ListItemButton sx={{ pl: 4 }} data-boss='boss3' onClick={handleRaid}>
										<ListItemIcon>
										<Filter3Icon />
										</ListItemIcon>
										<ListItemText primary={boss.name3} secondary={formatNumber(boss.hp3)} />
									</ListItemButton>
									} { boss.hp4 > 0 &&
									<ListItemButton sx={{ pl: 4 }} data-boss='boss4' onClick={handleRaid}>
										<ListItemIcon>
										<Filter4Icon />
										</ListItemIcon>
										<ListItemText primary={boss.name4} secondary={formatNumber(boss.hp4)} />
									</ListItemButton>
									} { boss.hp5 > 0 &&
									<ListItemButton sx={{ pl: 4 }} data-boss='boss5' onClick={handleRaid}>
										<ListItemIcon>
										<Filter5Icon />
										</ListItemIcon>
										<ListItemText primary={boss.name5} secondary={formatNumber(boss.hp5)} />
									</ListItemButton>
									}
								</List>
							</Collapse>
						</List>

						<Box display="flex" alignItems="center" justifyContent="space-between" m={1}>
							<ToggleButtonGroup
								color="primary"
								value={bossLevel}
								exclusive
								onChange={handleBossLevel}
								aria-label="Boss Level"
								fullWidth={true}
							>
								{bossLevels.map((lev, index) => (
									<ToggleButton value={lev} key={lev}>{lev}</ToggleButton>
								))}
							</ToggleButtonGroup>
						</Box>
					</Grid>
				</Grid>
			</div>

			<div className="section-body">
				<Grid container backgroundColor={currentTheme.palette.background.default + '50'} padding={1} borderRadius={2} boxShadow={currentTheme.shadows[1]} justifyContent="space-between">
					<Grid item md={12} sm={12} xs={12}>
						<Box className="item">
							<Box display="flex" alignItems="center" justifyContent="space-between">
								<Box display="flex" alignItems="center" pb={1}>
									{ isLogin && isAdmin &&
									<Button variant="contained" color='warning' onClick={handleSimulationReset} startIcon={<RestartAltIcon />}>{t('search__condition__union')} {t('damage__simulation_result')} {t('btn__reset')}</Button>
									}
      							</Box>
      							{ isLogin &&
								<Button variant="contained" color='primary' onClick={handleSimulationDialogOpen} startIcon={<ScoreIcon />}>{t('damage__my')} {t('damage__simulation_result')} {t('btn__update')}</Button>
								}
							</Box>

							<Box sx={{ minHeight: 350, height: '100%', width:'100%'}}>
								<FilterSection
									onFilterChange={handleFilterChange}
									onClickReload={getScores}
									rowfilters={rowfilters}
								/>

								<DataGrid
									rows={rows}
									columns={columns}
							        slots={{
							          noRowsOverlay: NoDataGrid,
							        }}
									checkboxSelection
									onRowSelectionModelChange={sumScores}
									loading={loading}
									hideFooterPagination={true}
								/>
								</Box>
						</Box>
					</Grid>
				</Grid>
			</div>
			<div className="section-footer">
				<Grid container backgroundColor={currentTheme.palette.background.default + '50'} padding={1} borderRadius={2} boxShadow={currentTheme.shadows[1]} justifyContent="space-between">
					<TableContainer component={Paper} sx={{ borderRadius: '2' }}> {/* Apply border-radius here */}
						<Table border={1}>
							<TableHead sx={{backgroundColor: currentTheme.palette.background.default }}>
								<TableRow>
									<TableCell sx={{textAlign:'center'}}><CalculateIcon /></TableCell>
									<TableCell sx={{textAlign:'right'}}>{boss.name1 || t('damage__header__boss_1')}</TableCell>
									<TableCell sx={{textAlign:'right'}}>{boss.name2 || t('damage__header__boss_2')}</TableCell>
									<TableCell sx={{textAlign:'right'}}>{boss.name3 || t('damage__header__boss_3')}</TableCell>
									<TableCell sx={{textAlign:'right'}}>{boss.name4 || t('damage__header__boss_4')}</TableCell>
									<TableCell sx={{textAlign:'right'}}>{boss.name5 || t('damage__header__boss_5')}</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell sx={{textAlign:'center'}}>{t('damage__header__total')}</TableCell>
									<TableCell sx={{textAlign:'right', color: scoreSum.hp1 < 0 ? 'orangered' : 'lightgray' }}>{formatNumber(scoreSum.hp1)}</TableCell>
									<TableCell sx={{textAlign:'right', color: scoreSum.hp2 < 0 ? 'orangered' : 'lightgray' }}>{formatNumber(scoreSum.hp2)}</TableCell>
									<TableCell sx={{textAlign:'right', color: scoreSum.hp3 < 0 ? 'orangered' : 'lightgray' }}>{formatNumber(scoreSum.hp3)}</TableCell>
									<TableCell sx={{textAlign:'right', color: scoreSum.hp4 < 0 ? 'orangered' : 'lightgray' }}>{formatNumber(scoreSum.hp4)}</TableCell>
									<TableCell sx={{textAlign:'right', color: scoreSum.hp5 < 0 ? 'orangered' : 'lightgray' }}>{formatNumber(scoreSum.hp5)}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</div>

			{/* 모의전 모달 */}
			<Dialog
			  open={simulationDialogOpen}
			  onClose={handleSimulationDialogClose}
			  aria-labelledby="alert-dialog-title"
			  aria-describedby="alert-dialog-description"
			  sx={{ '& .MuiDialog-paper': { width: '70vw', maxHeight: '90vh' } }}
			  maxWidth="xs"
			>
				<DialogTitle id="alert-dialog-title">
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Typography variant={"h6"} color={"primary"}>{t('damage__my')} {t('damage__simulation_result')}
							<Typography variant={"subtitle1"}>『{t('damage__header__level')} {bossLevelRef.current}』</Typography>
						</Typography>
						<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
							<InputLabel>{t('damage__header__index')}</InputLabel>
							<NativeSelect
								name="index"
								value={simulationIndexRef.current}
								onChange={handleSimulationIndexChange}
							>
								{simulationIndexes.map((idx, index) => (
									<option value={idx} key={index}>{idx}</option>
								))}
							</NativeSelect>
						</FormControl>
					</Box>
				</DialogTitle>
				<DialogContent>
					<DialogContentText item xs={8} md={12} sm={12} className="edit-form">
						<Divider textAlign="right">{boss.name1 || 'boss 1'}</Divider>
						<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
							<TextField name="deck1" label={t('damage__simulation_deck')} type="text" value={simulation.deck1} onChange={handleSimulationChange}/>
						</FormControl>
						<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
							<TextField name="boss1" label={t('damage__simulation_result')} type="text" value={simulation.boss1} onChange={handleSimulationChange}/>
						</FormControl>

						<Divider textAlign="right">{boss.name2 || 'boss 2'}</Divider>
						<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
							<TextField name="deck2" label={t('damage__simulation_deck')} type="text" value={simulation.deck2} onChange={handleSimulationChange}/>
						</FormControl>
						<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
							<TextField name="boss2" label={t('damage__simulation_result')} type="text" value={simulation.boss2} onChange={handleSimulationChange}/>
						</FormControl>

						<Divider textAlign="right">{boss.name3 || 'boss 3'}</Divider>
						<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
							<TextField name="deck3" label={t('damage__simulation_deck')} type="text" value={simulation.deck3} onChange={handleSimulationChange}/>
						</FormControl>
						<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
							<TextField name="boss3" label={t('damage__simulation_result')} type="text" value={simulation.boss3} onChange={handleSimulationChange}/>
						</FormControl>

						<Divider textAlign="right">{boss.name4 || 'boss 4'}</Divider>
						<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
							<TextField name="deck4" label={t('damage__simulation_deck')} type="text" value={simulation.deck4} onChange={handleSimulationChange}/>
						</FormControl>
						<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
							<TextField name="boss4" label={t('damage__simulation_result')} type="text" value={simulation.boss4} onChange={handleSimulationChange}/>
						</FormControl>

						<Divider textAlign="right">{boss.name5 || 'boss 5'}</Divider>
						<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
							<TextField name="deck5" label={t('damage__simulation_deck')} type="text" value={simulation.deck5} onChange={handleSimulationChange}/>
						</FormControl>
						<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
							<TextField name="boss5" label={t('damage__simulation_result')} type="text" value={simulation.boss5} onChange={handleSimulationChange}/>
						</FormControl>

						<Divider textAlign="right">Memo</Divider>
						<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
							<TextField
								name="memo"
								multiline
								rows={4}
								value={simulation.memo} onChange={handleSimulationChange}
							/>
						</FormControl>


					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSimulationSave} variant="outlined" startIcon={<SaveIcon />}>{t('btn__save')}</Button>
					<Button onClick={handleSimulationDelete} variant="outlined" color="warning" startIcon={<DeleteIcon />}>{t('btn__delete')}</Button>
					<Button onClick={handleSimulationDialogClose} variant="outlined" startIcon={<CancelIcon />}>{t('btn__cancel')}</Button>
				</DialogActions>
			</Dialog>

			{/* 보스 모달 */}
			<Dialog
			  open={bossDialogOpen}
			  onClose={handleBossDialogClose}
			  aria-labelledby="alert-dialog-title"
			  aria-describedby="alert-dialog-description"
			  sx={{ '& .MuiDialog-paper': { width: '70vw', maxHeight: '90vh' } }}
			  maxWidth="xs"
			>
				<DialogTitle id="alert-dialog-title">
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Typography variant={"h6"} color={"primary"}>{t("damage__title__boss_information")}</Typography>
						<ToggleButtonGroup
							color="primary"
							value={bossLevel}
							exclusive
							onChange={handleBossLevel}
							aria-label="Boss Level"
							// fullWidth={true}
						>
							{bossLevels.map((lev, index) => (
								<ToggleButton value={lev} key={lev} style={{paddingLeft: '20px', paddingRight: '20px', }}>{lev}</ToggleButton>
							))}
						</ToggleButtonGroup>
					</Box>
				</DialogTitle>
				<DialogContent>
					<Divider textAlign="right">boss 1</Divider>
					<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
						<TextField name="name1" label={t('damage__header__boss_name')} type="text" value={boss.name1} onChange={handleBossChange}/>
					</FormControl>
					<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
						<TextField name="hp1" label={t('damage__header__boss_hp')} type="number" value={boss.hp1} onChange={handleBossChange}/>
					</FormControl>

					<Divider textAlign="right">boss 2</Divider>
					<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
						<TextField name="name2" label={t('damage__header__boss_name')} type="text" value={boss.name2} onChange={handleBossChange}/>
					</FormControl>
					<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
						<TextField name="hp2" label={t('damage__header__boss_hp')} type="number" value={boss.hp2} onChange={handleBossChange}/>
					</FormControl>

					<Divider textAlign="right">boss 3</Divider>
					<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
						<TextField name="name3" label={t('damage__header__boss_name')} type="text" value={boss.name3} onChange={handleBossChange}/>
					</FormControl>
					<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
						<TextField name="hp3" label={t('damage__header__boss_hp')} type="number" value={boss.hp3} onChange={handleBossChange}/>
					</FormControl>

					<Divider textAlign="right">boss 4</Divider>
					<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
						<TextField name="name4" label={t('damage__header__boss_name')} type="text" value={boss.name4} onChange={handleBossChange}/>
					</FormControl>
					<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
						<TextField name="hp4" label={t('damage__header__boss_hp')} type="number" value={boss.hp4} onChange={handleBossChange}/>
					</FormControl>

					<Divider textAlign="right">boss 5</Divider>
					<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
						<TextField name="name5" label={t('damage__header__boss_name')} type="text" value={boss.name5} onChange={handleBossChange}/>
					</FormControl>
					<FormControl fullWidth sx={{ mt: 0.5, mb: 0.5 }}>
						<TextField name="hp5" label={t('damage__header__boss_hp')} type="number" value={boss.hp5} onChange={handleBossChange}/>
					</FormControl>

				</DialogContent>
				<DialogActions>
					<Button onClick={handleBossSave} variant="outlined" startIcon={<SaveIcon />}>{t('btn__save')}</Button>
					<Button onClick={handleBossDelete} variant="outlined" color="warning" startIcon={<DeleteIcon />}>{t('btn__delete')}</Button>
					<Button onClick={handleBossDialogClose} variant="outlined" startIcon={<CancelIcon />}>{t('btn__cancel')}</Button>
				</DialogActions>
			</Dialog>
		</section>
	)
}

export default Home;