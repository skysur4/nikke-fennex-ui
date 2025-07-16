import React, {useState, useMemo} from 'react';
import {Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu} from "@mui/material";
import FlagKR from '@assets/imgs/header/flag/ko.svg';
import FlagEN from '@assets/imgs/header/flag/en.svg';
import {useTranslation} from "react-i18next";

export default function LanguageSwitch({handleChange, current, currentImg}) {
	const { t } = useTranslation();

	const flagStyle = {
		width:"20px",
		height:"20px",
		objectFit: "cover",
		borderRadius:"100%",
		boxShadow:"0px 0px 10px #888888",
		marginRight:"10px"
	}

	const languageList = useMemo (() => [
		{ index : 1, value : 'ko', src : FlagKR, name : t("trans__choose__ko")},
		{ index : 2, value : 'en', src : FlagEN, name : t("trans__choose__en")},
	], [t])

	// list Open
	const [anchor, setAnchor] = useState(null);

	const showLanguages = (e) => {
		setAnchor(e.currentTarget);
	}

	const lanChange = (lang) => {
		handleChange(lang);
	}

	const hideLanguages = () => {
		setAnchor(null);
	};

	return(
		<>
          <Box sx={{ flexGrow: 0 }}>
			<Button onClick={showLanguages}>
				<img src={currentImg} alt="currentLanguage" style={flagStyle}/> {current}
			</Button>
          </Box>
          <Menu
            sx={{ mt: '45px' }}
            id="language-menu"
            anchorEl={anchor}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchor)}
            onClose={hideLanguages}
          >
			{languageList.map((lang, index) => (
				<ListItem disablePadding value={lang.value} key={index}>
		          <ListItemButton onClick={() => lanChange(lang)}>
		            <ListItemIcon>
		              <img src={lang.src} style={flagStyle} alt={lang.value} />
		            </ListItemIcon>
		            <ListItemText>
		              {lang.name}
		            </ListItemText>
		          </ListItemButton>
			    </ListItem>
			))}
          </Menu>
		</>
	)
}

