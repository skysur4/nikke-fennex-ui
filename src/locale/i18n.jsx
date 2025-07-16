import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationKo from './locale.ko.json';
import translationEn from './locale.en.json';

const resources =  {
	ko: {
		translation: translationKo
	},
	en: {
		translation: translationEn
	},

};

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: "ko",
		fallbackLng: 'ko',
		debug: false,
		keySeparator: '.',
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;