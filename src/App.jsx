import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseLayout from "@components/layout/BaseLayout";
import '@styles/index.scss';

import { CssBaseline, useMediaQuery } from '@mui/material';
import {createTheme, ThemeProvider, useTheme} from '@mui/material/styles';

import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

function App() {
	const currentTheme = useTheme();
	const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // 사용자 시스템 환경에 따른 모드
	const isMobile = useMediaQuery(currentTheme.breakpoints.down('sm'));

	const theme = React.useMemo(
	  () =>
	    createTheme({
			isDarkMode: isDarkMode,
			isMobile: isMobile,
			palette: {
				border: isDarkMode ? '#515151' : '#e4e4e4',
				mode: isDarkMode ? 'dark' : 'light',
			},
	    }),
	  [isDarkMode, isMobile],
	);

	i18next.init({
	    fallbackLng: 'ko',
	    lng: 'ko', // default language
	    interpolation: {
	        escapeValue: false
	    }
	});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nextProvider i18n={i18next}>
        <Router>
          <BaseLayout />
        </Router>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;