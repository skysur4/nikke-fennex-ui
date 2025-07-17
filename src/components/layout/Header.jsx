import React from 'react';

import * as gateway from "../common/Gateway";
import { useUser } from '../common/UserContext';

import { useTheme, styled } from '@mui/material/styles';

// component
import LanguageSwitch from '@components/pages/LanguageSwitch'
import {useTranslation} from "react-i18next";
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import 'dayjs/locale/ko';
import 'dayjs/locale/en';

// ui
import {Link} from "react-router-dom";
import {Paper, Box, AppBar, Toolbar, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Divider, Button} from "@mui/material";

// icon
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TuneIcon from '@mui/icons-material/Tune';
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LoginIcon from '@mui/icons-material/Login';	
import LogoutIcon from '@mui/icons-material/Logout';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
// import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// imgs
import logoWhite from "@assets/imgs/nikke_logo_white.png";
import logo from "@assets/imgs/nikke_logo.png";
import rapi from "@assets/imgs/rapi.png";
import kakaotalk from "@assets/imgs/kakaotalk.png";
import pocketid from "@assets/imgs/pocketid.png";

const Header = ({handleChange, current, currentImg}) => {
	const currentTheme = useTheme();
	const { userInfo, isLogin } = useUser();
	const { t, i18n  } = useTranslation();

	const Calendar = styled(Paper)(() => ({
		border: '1px solid',
		...currentTheme.typography.body2,
		padding: currentTheme.spacing(1),
		margin: '20px 0',
	}));

	const mainMenu = [
		{ index:1, link:"/privacy", icon:<PrivacyTipIcon />, name:t("menu__privacy") },
	]

	// user popup
	const [anchorElMore, setAnchorElMore] = React.useState(null);
	const [anchorElSetting, setAnchorElSetting] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [anchorElCalendar, setAnchorElCalendar] = React.useState(null);

	const handleOpenMoreMenu = (e) => {
		setAnchorElMore(e.currentTarget);
	};
	const handleOpenSettingMenu = (e) => {
		setAnchorElSetting(e.currentTarget);
	};
	const handleOpenUserMenu = (e) => {
		setAnchorElUser(e.currentTarget);
	};
	const handleOpenCalendarMenu = (e) => {
		setAnchorElCalendar(e.currentTarget);
	};

	const handleCloseMoreMenu = () => {
		setAnchorElMore(null);
	};
	const handleCloseSettingMenu = () => {
		setAnchorElSetting(null);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleCloseCalendarMenu = () => {
		setAnchorElCalendar(null);
	};

	const openProfile = () => {
		handleCloseUserMenu();
		window.location.href = "https://kc.fennex.pro/realms/nikke/account/";
	}

	const kakaoLogin = () => {
		window.location.href = gateway.kakaoLogin;
	}

	const pocketLogin = () => {
		window.location.href = gateway.pocketLogin;
	}

	const logout = () => {
		window.location.href = gateway.logout;
	}

	const playGame = () => {
		window.open('https://www.nikke-global.com/', '_blank');
	}

	const gotoGit = () => {
		window.open('https://github.com/skysur4/nikke-fennex-ui', '_blank');
	}

	const gotoReact = () => {
		window.open('https://legacy.reactjs.org', '_blank');
	}

	const gotoMui = () => {
		window.open('https://mui.com', '_blank');
	}

	return (
		<header>
			<AppBar position="static" component="nav">
				<Toolbar>
					{/* 모바일 */}
					{/* 메뉴 버튼 */}
			        <IconButton
			          size="large"
			          edge="start"
			          color="inherit"
			          aria-label="menu"
			          sx={{ mr: 1, display: { xs: 'flex', sm: 'none' }}}
			          onClick={handleOpenMoreMenu}
			        >
			          <MenuIcon />
			        </IconButton>
					{/* 메뉴 목록 */}
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }}}>
					</Box>

					{/* 데스크탑 */}
					{/* 로고 */}
					<Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}>
						<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
							<img style={{ height: '3em' }} src={currentTheme.isDarkMode ? logoWhite : logo} alt="logo"/>
						</Link>
					</Box>

					{/* 메뉴 목록 */}
					<Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', lm: 'flex' }, justifyContent: 'center' }}>
					{mainMenu.map((menu, index) => (
						<Button key={index} color='inherit' component={Link} to={menu.link} startIcon={menu.icon}>{menu.name}</Button>
					))}
					</Box>

					{/* 모바일 & 데스크탑 */}
					{/* 사용자 메뉴 */}
					{isLogin ? (
						<Button color='inherit' startIcon={<AccountCircleIcon />} onClick={handleOpenUserMenu}><Typography sx={{display: { xs: 'none', sm: 'flex' }}}>{userInfo.name}</Typography></Button>
					) : (
						<>
							<Button color='inherit' startIcon={<img src={kakaotalk} alt="KakaoTalk" style={{ width: '1em', height: '1em' }} />} onClick={kakaoLogin}><Typography sx={{display: { xs: 'none', sm: 'flex' }}}>{t("kakao")} {t("login")}</Typography></Button>
							<Button color='inherit' startIcon={<img src={pocketid} alt="PocketId" style={{ width: '1em', height: '1em' }} />} onClick={pocketLogin}><Typography sx={{display: { xs: 'none', sm: 'flex' }}}>{t("pocket")} {t("login")}</Typography></Button>
						</>
					)}

					{/* 설정 메뉴 */}
					<Button color='inherit' startIcon={<TuneIcon />} onClick={handleOpenSettingMenu}><Typography sx={{display: { xs: 'none', sm: 'flex' }}}>{t("menu__setting")}</Typography></Button>

					{/* 달력 메뉴 */}
					<Button color='inherit' startIcon={<CalendarMonthIcon />} onClick={handleOpenCalendarMenu}><Typography sx={{display: { xs: 'none', sm: 'flex' }}}>{t("menu__calendar")}</Typography></Button>
				</Toolbar>
				{/* 메뉴 팝업 */}
				<Menu
				  sx={{ mt: '45px' }}
				  id="menu-appbar"
				  anchorEl={anchorElMore}
				  anchorOrigin={{
				    vertical: 'top',
				    horizontal: 'left',
				  }}
				  keepMounted
				  transformOrigin={{
				    vertical: 'top',
				    horizontal: 'left',
				  }}
				  open={Boolean(anchorElMore)}
				  onClose={handleCloseMoreMenu}
				>
					<ListItem disablePadding>
				      <ListItemButton to={'/'}>
				        <ListItemIcon>
							<img src={currentTheme.isDarkMode ? logoWhite : logo} alt="logo" style={{ height: '1em' }} />
				        </ListItemIcon>
				        <ListItemText primary={t("menu__home")} />
				      </ListItemButton>
				    </ListItem>
					{mainMenu.map((menu, index) => (
						<ListItem disablePadding key={index}>
					      <ListItemButton to={menu.link}>
					        <ListItemIcon>
					          {menu.icon}
					        </ListItemIcon>
					        <ListItemText primary={menu.name} />
					      </ListItemButton>
					    </ListItem>
					))}
					<Divider/>
					<ListItem disablePadding>
				      <ListItemButton onClick={playGame}>
				        <ListItemIcon>
							{rapi && <img src={rapi} alt="rapi" style={{ width: '1em', height: '1em' }} />}
				        </ListItemIcon>
				        <ListItemText primary={'Play Nikke'} />
				      </ListItemButton>
					</ListItem>

					<ListItem disablePadding>
				      <ListItemButton onClick={gotoGit}>
				        <ListItemIcon>
							<svg aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24" version="1.1" data-view-component="true" className="octicon octicon-mark-github">
								<path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
							</svg>
				        </ListItemIcon>
				        <ListItemText primary={'Github'} />
				      </ListItemButton>
					</ListItem>
					
					<ListItem disablePadding>
				      <ListItemButton onClick={gotoReact}>
				        <ListItemIcon>
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="-10.5 -9.45 21 18.9" fill="none">
								<circle cx="0" cy="0" r="2" fill="#61dafb"></circle>
								<g stroke="#61dafb" fill="none">
								<ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
								<ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g>
							</svg>
				        </ListItemIcon>
				        <ListItemText primary={'React'} />
				      </ListItemButton>
				    </ListItem>

					<ListItem disablePadding>
				      <ListItemButton onClick={gotoMui}>
				        <ListItemIcon>
							<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 32" fill="none" >
								<path d="M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7.234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z" fill="#007FFF"/>
							</svg>
				        </ListItemIcon>
				        <ListItemText primary={'Material UI'} />
				      </ListItemButton>
				    </ListItem>
				</Menu>

				{/* 사용자 팝업 */}
				<Menu
				  sx={{ mt: '45px' }}
				  id="user-appbar"
				  anchorEl={anchorElUser}
				  anchorOrigin={{
				    vertical: 'top',
				    horizontal: 'center',
				  }}
				  keepMounted
				  transformOrigin={{
				    vertical: 'top',
				    horizontal: 'center',
				  }}
				  open={Boolean(anchorElUser)}
				  onClose={handleCloseUserMenu}
				>
					<ListItem disablePadding>
				      <ListItemButton onClick={openProfile}>
				        <ListItemIcon>
				          <AssignmentIndIcon/>
				        </ListItemIcon>
				        <ListItemText primary={t("menu__profile")} />
				      </ListItemButton>
				    </ListItem>
					<ListItem disablePadding>
				      <ListItemButton onClick={logout}>
				        <ListItemIcon>
				          <LogoutIcon />
				        </ListItemIcon>
				        <ListItemText primary={t("logout")} />
				      </ListItemButton>
				    </ListItem>
				</Menu>

				{/* 설정 팝업 */}
				<Menu
				  sx={{ mt: '45px' }}
				  id="setting-appbar"
				  anchorEl={anchorElSetting}
				  anchorOrigin={{
				    vertical: 'top',
				    horizontal: 'right',
				  }}
				  keepMounted
				  transformOrigin={{
				    vertical: 'top',
				    horizontal: 'right',
				  }}
				  open={Boolean(anchorElSetting)}
				  onClose={handleCloseSettingMenu}
				>
				  <ListItem disablePadding>
				    <ListItemButton>
				      <ListItemIcon>
				        <Typography>{t("menu__languages")}</Typography>
				      </ListItemIcon>
				      <ListItemText>
							<LanguageSwitch
								handleChange={handleChange}
								current={current}
								currentImg={currentImg}
							/>
				      </ListItemText>
				    </ListItemButton>
				  </ListItem>
				</Menu>

				{/* 달력 팝업 */}
				<Menu
				  sx={{ mt: '45px' }}
				  id="setting-appbar"
				  anchorEl={anchorElCalendar}
				  anchorOrigin={{
				    vertical: 'top',
				    horizontal: 'right',
				  }}
				  keepMounted
				  transformOrigin={{
				    vertical: 'top',
				    horizontal: 'right',
				  }}
				  open={Boolean(anchorElCalendar)}
				  onClose={handleCloseCalendarMenu}
				>
					<Calendar className="date item">
						<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language}>
							<DateCalendar
								showDaysOutsideCurrentMonth
								className={"main-calendar"}
								slotProps={{ calendarHeader: { format: 'YYYY MMMM' }}}
							/>
						</LocalizationProvider>
					</Calendar>
				</Menu>
			</AppBar>
		</header>
	)
}

export default Header;