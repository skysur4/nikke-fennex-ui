import React from 'react';
import { Link } from "react-router-dom";
import { useTheme} from '@mui/material/styles';
import { Box, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Divider, Tooltip } from "@mui/material";
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

// custom
import {useTranslation} from "react-i18next";
import NoDataGrid from '@components/common/NoDataGrid';
import { useUser } from '@components/common/UserContext';
import * as gateway from '@components/common/Gateway';
import Alert from '@components/ui/Alert';

const Home = () => {
	const currentTheme = useTheme();
	const { userInfo, isLogin } = useUser();
	const { t } = useTranslation();

	const [rowData, setRowData] = React.useState([]);
	const [rows, setRows] = React.useState([]);
	const [highlightRowIndex, setHighlightRowIndex] = React.useState([]);
	const [collapse, setCollapse] = React.useState(true);
  	const [alertText, setAlertText] = React.useState('');
	const [isAlertVisible, setIsAlertVisible] = React.useState(false);

	const [simulation, setSimulation] = React.useState({
		userId: null,
		nickname: null,
		boss1: null,
		boss2: null,
		boss3: null,
		boss4: null,
		boss5: null,
		total: null,
		deck1: null,
		deck2: null,
		deck3: null,
		deck4: null,
		deck5: null,
	});

	const [simulationDialogOpen, setSimulationDialogOpen] = React.useState(false);

	const handleSimulationChange = (e) => {
		setSimulation({
			...simulation,
			[e.target.name]: e.target.value,
		});
	};

  	const handleSimulationDialogClose = () => {
 		setSimulationDialogOpen(false);
	};

	const handleSimulationGet = () => {
		gateway.get(`/api/v1/score/${userInfo.userId}`)
			.then((response) =>  {
				if( response && response.data) {
					setSimulation(response.data);
				}
				setSimulationDialogOpen(true);
			}
		);
	};

	const handleSimulationSave = async () => {
		gateway.post('/api/v1/score', simulation)
			.then((response) =>  {
				getScores();
				setSimulationDialogOpen(false);
				showAlert(t('alert__saved'));
			}
		);
	};

	const handleSimulationDelete = () => {
		gateway.del('/api/v1/score')
			.then((response) =>  {
				getScores();
				setSimulationDialogOpen(false);
				showAlert(t('alert__deleted'));
			}
		);
	};
	
    const getScores = async () => {
        const response = await gateway.get('/api/v1/score');
        if (response.data && response.data.length > 0){
			
			setRowData(response.data.map((row,index) => ({
	          id: index+1,
	          userId: row.userId,
			  nickname: row.nickname,
	          boss1: row.boss1,
			  boss2: row.boss2,
	          boss3: row.boss3,
			  boss4: row.boss4,
	          boss5: row.boss5,
			  total: parseInt(row.boss1 || 0) + parseInt(row.boss2 || 0) + parseInt(row.boss3 || 0) + parseInt(row.boss4 || 0) + parseInt(row.boss5 || 0),
			  deck1: row.deck1,
	          deck2: row.deck2,
			  deck3: row.deck3,
	          deck4: row.deck4,
			  deck5: row.deck5,
	          updatedAt: row.updatedAt || '-',
			  isNew: false,
			})));

		} else {
			setRowData([]);
		}
    };

	const [boss, setBoss] = React.useState({
		level: '1',
		name1: null,
		name2: null,
		name3: null,
		name4: null,
		name5: null,
		hp1: 0,
		hp2: 0,
		hp3: 0,
		hp4: 0,
		hp5: 0,
	});
	
	const [bossDialogOpen, setBossDialogOpen] = React.useState(false);

	const handleBossChange = (e) => {
		setBoss({
			...boss,
			[e.target.name]: e.target.value,
		});
	};

  	const handleBossDialogClose = () => {
 		setBossDialogOpen(false);
	};

	const handleBossGet = () => {
		getBossInfo();
		setBossDialogOpen(true);
	};

	const handleBossSave = async () => {
		gateway.post('/api/v1/boss', boss)
			.then((response) =>  {
				setBoss(response.data);
				showAlert(t('alert__saved'));
			}
		);
	};

	const handleBossDelete = () => {
		gateway.del('/api/v1/boss')
			.then((response) =>  {
				setBoss(response.data);
				showAlert(t('alert__deleted'));
			}
		);
	};
	
    const getBossInfo = async () => {
        const response = await gateway.get(`/api/v1/boss/${boss.level}`);
        if (response.data){
			setBoss(response.data);
		}
    };

	const formatNumber = (number) => {
		if(currentTheme.isMobile) {
			return (number / 100000000).toFixed(2) + t('damage__hundred_million_unit');
		}
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	const handleCollapse = () => {
		setCollapse(!collapse);
	};

	const [rowfilters, setRowfilters] = React.useState({
		union: 'senior',
	});
	
	const handleFilterChange = (event) => {
	    setRowfilters({
	      ...rowfilters,
		  [event.target.name]: event.target.value,
		});
	};

	const handleRowFilter = () => {
		var filteredRows = [];
		if(rowfilters.union === 'expert'){
			filteredRows = (rowData || []).filter(data => {
				return !data.nickname.includes("◆") && !data.nickname.includes("♧");
			});
			
		} else if(rowfilters.union === 'senior'){
			filteredRows = (rowData || []).filter(data => {
				return data.nickname.includes("◆");
			});
			
		} else if(rowfilters.union === 'junior'){
			filteredRows = (rowData || []).filter(data => {
				return data.nickname.includes("♧");
			});
			
		} else {
			filteredRows = rowData;
		}

		setRows(filteredRows);

		suggestPlayer();
	};

	
	React.useEffect(() => {
		handleRowFilter();
  	}, [rowData, rowfilters]);

	const selectedBossRef = React.useRef(null);
	const suggestPlayer = (event) => {
		let clickedElement;

		if(event){
			clickedElement = event.currentTarget;

		} else if(selectedBossRef.current) {
			clickedElement = selectedBossRef.current;

		} else {
			return;
		}
		
		if(clickedElement.classList.contains('suggested-row')){
			clickedElement.classList.remove('suggested-row');
			setHighlightRowIndex([]);
			selectedBossRef.current = null;

		} else {
			let parentElement = clickedElement.parentNode;
			let siblings = Array.from(parentElement.children).filter(child => child !== clickedElement);

			siblings.forEach(sibling => {
				sibling.classList.remove('suggested-row');
			});

			clickedElement.classList.add('suggested-row');

			const bossId = clickedElement.dataset.boss;

			var bossHP = boss[`hp${bossId}`];

			const sortedRows = [...rows].sort((a, b) => {
				const aDamage = parseInt(a[`boss${bossId}`]) || 0;
				const bDamage = parseInt(b[`boss${bossId}`]) || 0;
				return bDamage - aDamage; // 내림차순 정렬
			});

			const suggestedPlayer = sortedRows.filter(row => {
				const playerDamage = parseInt(row[`boss${bossId}`]) || 0;
				
				if(playerDamage < bossHP){
					bossHP = bossHP - playerDamage;
					return true; // 해당 플레이어가 보스의 남은 체력보다 적은 피해를 입혔을 경우
				}

				return false
			});

			setHighlightRowIndex(suggestedPlayer.map(player => player.id));
			selectedBossRef.current = clickedElement;

		}
	}

	const getRowClassName = (params) => {
		if (highlightRowIndex.includes(params.row.id)) {
			return 'suggested-row';
		}
		return '';
	};

	const showAlert = (message) => {
		setAlertText(message);
		setIsAlertVisible(true);
	};

	const handleAlertClose = () => {
    	setIsAlertVisible(false);
  	};

	React.useEffect(() => {
		if (isLogin) {
			getBossInfo();
			getScores();
		}
  	}, [isLogin]);

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
            minWidth: 50,
			headerAlign: 'center',
		  },
		  {
		    field: 'boss1',
		    headerName: t('damage__header__boss_1'),
		    flex: 1,
            minWidth: 50,
			headerAlign: 'center',
		    align: 'right',
		    // editable: (value, row) => row.userId === userInfo.userId ? true : false,
			valueGetter: (value, row) => value ? formatNumber(value) : 0,
			renderCell: (params) => <Tooltip title={params.row.deck1}><span>{params.formattedValue}</span></Tooltip>,
		  },
		  {
		    field: 'boss2',
		    headerName: t('damage__header__boss_2'),
		    flex: 1,
            minWidth: 50,
			headerAlign: 'center',
		    align: 'right',
		    // editable: (value, row) => row.userId === userInfo.userId ? true : false,
			valueGetter: (value, row) => value ? formatNumber(value) : 0,
			renderCell: (params) => <Tooltip title={params.row.deck2}><span>{params.formattedValue}</span></Tooltip>,
		  },
		  {
		    field: 'boss3',
		    headerName: t('damage__header__boss_3'),
		    flex: 1,
            minWidth: 50,
			headerAlign: 'center',
		    align: 'right',
		    // editable: (value, row) => row.userId === userInfo.userId ? true : false,
			valueGetter: (value, row) => value ? formatNumber(value) : 0,
			renderCell: (params) => <Tooltip title={params.row.deck3}><span>{params.formattedValue}</span></Tooltip>,
		  },
		  {
		    field: 'boss4',
		    headerName: t('damage__header__boss_4'),
		    flex: 1,
            minWidth: 50,
			headerAlign: 'center',
		    align: 'right',
		    // editable: (value, row) => row.userId === userInfo.userId ? true : false,
			valueGetter: (value, row) => value ? formatNumber(value) : 0,
			renderCell: (params) => <Tooltip title={params.row.deck4}><span>{params.formattedValue}</span></Tooltip>,
		  },
		  {
		    field: 'boss5',
		    headerName: t('damage__header__boss_5'),
		    flex: 1,
            minWidth: 50,
			headerAlign: 'center',
		    align: 'right',
		    // editable: (value, row) => row.userId === userInfo.userId ? true : false,
			valueGetter: (value, row) => value ? formatNumber(value) : 0,
			renderCell: (params) => <Tooltip title={params.row.deck5}><span>{params.formattedValue}</span></Tooltip>,
		  },
		  {
		    field: 'total',
		    headerName: t('damage__header__total'),
		    flex: 1,
            minWidth: 50,
		    headerAlign: 'center',
		    align: 'right',
		    // editable: (value, row) => row.userId === userInfo.userId ? true : false,
			valueGetter: (value, row) => formatNumber(parseInt(row.boss5) + parseInt(row.boss4) + parseInt(row.boss3) + parseInt(row.boss2) + parseInt(row.boss1)),
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
			return initialColumns.filter(column => ![ 'userId'
													,'deck1', 'deck2', 'deck3', 'deck4', 'deck5', 'updatedAt', 'total' ].includes(column.field)
			)
    	} else {
			return initialColumns.filter(column => ![ 'userId'
													,'deck1', 'deck2', 'deck3', 'deck4', 'deck5', 'updatedAt' ].includes(column.field)
			)
		}
	},[rows, t, currentTheme.isMobile])

	return(
		<section id="homeSection">
			<Alert text={alertText} visible={isAlertVisible} onClose={handleAlertClose} type="error"/>

			<div className="section-header">
				<Grid container backgroundColor={currentTheme.palette.background.default + '50'} padding={2} borderRadius={2} boxShadow={currentTheme.shadows[1]}>
					<Grid container item md={8} sm={12} flexDirection={'column'} justifyContent={'flex-start'}>
						<Typography variant="h4" pb={1}>{t("home__title")}</Typography>
						<Typography variant="caption" sx={{ pl: 1 }}>{t("home__description")}</Typography>
					</Grid>

					<Grid container item md={4} sm={12} flexDirection={'column'} justifyContent="flex-end">
						<Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
							<Box display="flex" alignItems="center">
								{ isLogin &&
								<Button component={Link} color='warning' onClick={handleBossGet} startIcon={<RestartAltIcon />}>{t('damage__title__boss_information')} {t('btn__reset')}</Button>
								}
							</Box>
							{ isLogin &&
							<Button component={Link} color='primary' onClick={handleBossGet} startIcon={<UpgradeIcon />}>{t('damage__title__boss_information')} {t('btn__update')}</Button>
							}
						</Box>
						<List component="div" disablePadding sx={{ width: '100%' }}>
							<ListItemButton onClick={handleCollapse}>
								<ListItemText primary={t("damage__title__boss_information")} secondary={t("damage__header__hard") + " " + t("damage__header__level") + ": " + boss.level} />
								{collapse ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>
							<Collapse in={collapse} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									{ boss.hp1 > 0 &&
									<ListItemButton sx={{ pl: 4 }} onClick={suggestPlayer} data-boss="1">
										<ListItemIcon>
										<Filter1Icon />
										</ListItemIcon>
										<ListItemText primary={boss.name1} secondary={formatNumber(boss.hp1)} />
									</ListItemButton>
									} { boss.hp2 > 0 &&
									<ListItemButton sx={{ pl: 4 }} onClick={suggestPlayer} data-boss="2">
										<ListItemIcon>
										<Filter2Icon />
										</ListItemIcon>
										<ListItemText primary={boss.name2} secondary={formatNumber(boss.hp2)} />
									</ListItemButton>
									} { boss.hp3 > 0 &&
									<ListItemButton sx={{ pl: 4 }} onClick={suggestPlayer} data-boss="3">
										<ListItemIcon>
										<Filter3Icon />
										</ListItemIcon>
										<ListItemText primary={boss.name3} secondary={formatNumber(boss.hp3)} />
									</ListItemButton>
									} { boss.hp4 > 0 &&
									<ListItemButton sx={{ pl: 4 }} onClick={suggestPlayer} data-boss="4">
										<ListItemIcon>
										<Filter4Icon />
										</ListItemIcon>
										<ListItemText primary={boss.name4} secondary={formatNumber(boss.hp4)} />
									</ListItemButton>
									} { boss.hp5 > 0 &&
									<ListItemButton sx={{ pl: 4 }} onClick={suggestPlayer} data-boss="5">
										<ListItemIcon>
										<Filter5Icon />
										</ListItemIcon>
										<ListItemText primary={boss.name5} secondary={formatNumber(boss.hp5)} />
									</ListItemButton>
									}
								</List>
							</Collapse>
						</List>
					</Grid>
				</Grid>
			</div>

			<div className="section-body">
				<Grid container backgroundColor={currentTheme.palette.background.default + '50'} padding={2} borderRadius={2} boxShadow={currentTheme.shadows[1]} justifyContent="space-between">
					<Grid item md={12} sm={12} xs={12}>
						<Box className="item">
							<Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
								<Box display="flex" alignItems="center">
									{ isLogin &&
									<Button component={Link} color='warning' onClick={handleBossGet} startIcon={<RestartAltIcon />}>{t('damage__simulation_result')} {t('btn__reset')}</Button>
									}
      							</Box>
      							{ isLogin &&
								<Button component={Link} color='primary' onClick={handleSimulationGet} startIcon={<ScoreIcon />}>{t('damage__simulation_result')} {t('btn__update')}</Button>
								}
							</Box>

							<Box sx={{ height: '100%', width:'100%'}}>
								<FilterSection
									onFilterChange={handleFilterChange}
									rowfilters={rowfilters}
								/>

								<DataGrid
									rows={rows}
									columns={columns}
									getRowClassName={getRowClassName}
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
								<style>{`
								.suggested-row {
									background-color: rgba(25, 118, 210, 0.66); /* Light blue */
								}
								`}</style>
								</Box>
						</Box>
					</Grid>
				</Grid>
			</div>
			<div className="section-footer">
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
					{t('damage__simulation_result')}
				</DialogTitle>
				<DialogContent>
					<DialogContentText item xs={8} md={12} sm={12} className="edit-form">
						<Divider textAlign="right">{boss.name1 || 'boss 1'}</Divider>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField name="deck1" label={t('damage__header__deck_1')} type="text" value={simulation.deck1} onChange={handleSimulationChange}/>
						</FormControl>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField name="boss1" label={t('damage__header__boss_1')} type="text" value={simulation.boss1} onChange={handleSimulationChange}/>
						</FormControl>

						<Divider textAlign="right">{boss.name2 || 'boss 2'}</Divider>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField name="deck2" label={t('damage__header__deck_2')} type="text" value={simulation.deck2} onChange={handleSimulationChange}/>
						</FormControl>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField name="boss2" label={t('damage__header__boss_2')} type="text" value={simulation.boss2} onChange={handleSimulationChange}/>
						</FormControl>

						<Divider textAlign="right">{boss.name3 || 'boss 3'}</Divider>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField name="deck3" label={t('damage__header__deck_3')} type="text" value={simulation.deck3} onChange={handleSimulationChange}/>
						</FormControl>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField name="boss3" label={t('damage__header__boss_3')} type="text" value={simulation.boss3} onChange={handleSimulationChange}/>
						</FormControl>

						<Divider textAlign="right">{boss.name4 || 'boss 4'}</Divider>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField name="deck4" label={t('damage__header__deck_4')} type="text" value={simulation.deck4} onChange={handleSimulationChange}/>
						</FormControl>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField name="boss4" label={t('damage__header__boss_4')} type="text" value={simulation.boss4} onChange={handleSimulationChange}/>
						</FormControl>

						<Divider textAlign="right">{boss.name5 || 'boss 5'}</Divider>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField name="deck5" label={t('damage__header__deck_5')} type="text" value={simulation.deck5} onChange={handleSimulationChange}/>
						</FormControl>
						<FormControl fullWidth sx={{ m: 1 }}>
							<TextField name="boss5" label={t('damage__header__boss_5')} type="text" value={simulation.boss5} onChange={handleSimulationChange}/>
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
					{t("damage__title__boss_information")}
					<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
						<InputLabel>Hard Level</InputLabel>
							<NativeSelect
							value={boss.level}
							onChange={handleBossChange}
							>
							<option value={'1'}>1</option>
						</NativeSelect>
					</FormControl>
					</Box>
				</DialogTitle>
				<DialogContent>
					<Divider textAlign="right">boss 1</Divider>
					<FormControl fullWidth sx={{ m: 1 }}>
						<TextField name="name1" label={t('damage__header__boss_name')} type="text" value={boss.name1} onChange={handleBossChange}/>
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }}>
						<TextField name="hp1" label={t('damage__header__boss_hp')} type="text" value={boss.hp1} onChange={handleBossChange}/>
					</FormControl>

					<Divider textAlign="right">boss 2</Divider>
					<FormControl fullWidth sx={{ m: 1 }}>
						<TextField name="name2" label={t('damage__header__boss_name')} type="text" value={boss.name2} onChange={handleBossChange}/>
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }}>
						<TextField name="hp2" label={t('damage__header__boss_hp')} type="text" value={boss.hp2} onChange={handleBossChange}/>
					</FormControl>

					<Divider textAlign="right">boss 3</Divider>
					<FormControl fullWidth sx={{ m: 1 }}>
						<TextField name="name3" label={t('damage__header__boss_name')} type="text" value={boss.name3} onChange={handleBossChange}/>
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }}>
						<TextField name="hp3" label={t('damage__header__boss_hp')} type="text" value={boss.hp3} onChange={handleBossChange}/>
					</FormControl>

					<Divider textAlign="right">boss 4</Divider>
					<FormControl fullWidth sx={{ m: 1 }}>
						<TextField name="name4" label={t('damage__header__boss_name')} type="text" value={boss.name4} onChange={handleBossChange}/>
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }}>
						<TextField name="hp4" label={t('damage__header__boss_hp')} type="text" value={boss.hp4} onChange={handleBossChange}/>
					</FormControl>

					<Divider textAlign="right">boss 5</Divider>
					<FormControl fullWidth sx={{ m: 1 }}>
						<TextField name="name5" label={t('damage__header__boss_name')} type="text" value={boss.name5} onChange={handleBossChange}/>
					</FormControl>
					<FormControl fullWidth sx={{ m: 1 }}>
						<TextField name="hp5" label={t('damage__header__boss_hp')} type="text" value={boss.hp5} onChange={handleBossChange}/>
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