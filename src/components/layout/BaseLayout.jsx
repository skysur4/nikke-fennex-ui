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

// icon
import FlagKR from '@assets/imgs/header/flag/ko.svg';

export default function BaseLayout() {
	const { t } = useTranslation();

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
			<Box
				//footer 하단 고정
				sx={{ display: 'flex',
					height: '100vh',
					justifyContent: 'space-between',
					flexDirection: 'column',
					backgroundImage: `url("https://sg-cdn.blablalink.com/standalonesite/ugc/public/image/a2248344-7b9d-4d21-92af-981b694395c5.jpeg?height=1080&width=1920")`,
					backgroundSize: 'cover', // Optional: Adjust to your needs
					backgroundColor: `rgb(20, 21, 78)`,
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
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
		</UserProvider>
	);
}