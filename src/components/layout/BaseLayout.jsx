import { useState } from "react";
// component
import Header from './Header';
import Footer from "./Footer";

import { CommonRoutes } from '@nav/CommonRouter';

// ui
import { Box } from "@mui/material";

import i18next from '@locale/i18n';
import {useTranslation} from "react-i18next";

import { UserProvider } from '@components/common/UserContext';
//import { NotificationProvider } from '@components/common/NotificationContext';
import ServerAlerts from "@components/layout/ServerAlerts";

// icon
import FlagKR from '@assets/imgs/header/flag/ko.svg';
import FlagEn from '@assets/imgs/header/flag/en.svg';

export default function BaseLayout() {
	const { t } = useTranslation();

	// 사이드 메뉴 오픈 - 현재 사용 안함
	const [open, setOpen] = useState(false);

	const [currentImg, setCurrentImg] = useState(FlagKR);
	const [current, setCurrent] = useState(t("trans__choose__ko"));

	const handleChange = (lang) => {
		i18next.changeLanguage(lang.value);
		setCurrentImg(lang.src)
		setCurrent(t("trans__choose__" + lang.value));
		localStorage.setItem('lang', lang.value);
	};

	return (
		<UserProvider>
			{/* <NotificationProvider>*/}
				<Box
					//footer 하단 고정
					sx={{ display: 'flex',
					    height: '100vh',
						justifyContent: 'space-between',
						flexDirection: 'column',
						backgroundImage: `url("https://sg-cdn.blablalink.com/standalonesite/ugc/public/image/133c34b9-7f21-4aae-87ae-9e5903399489.jpeg")`,
						backgroundSize: 'cover', // Optional: Adjust to your needs
						backgroundColor: `rgb(41, 75, 91)`,
					}}

				>
					{/* ----------------------------- Header -----------------------------*/}
					<Header
						handleChange={handleChange}
						current={current}
						currentImg={currentImg}
					/>
					{/* --------------------------- Component ---------------------------*/}
					<Box
						component="main"
						sx={{
							overflow: 'auto',
		  					display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column'
						}}
					>
						<CommonRoutes />
					</Box>
					{/* ----------------------------- SideBar ---------------------------- */}
					<Footer />
				</Box>
			{/*
				<ServerAlerts />
			</NotificationProvider>
			*/}
		</UserProvider>
	);
}