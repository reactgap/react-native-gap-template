// @flow

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import getDeviceLanguage from './getDeviceLanguage';
import { I18NKeys } from './I18NKeys';

const languageDetector: any = {
  type: 'languageDetector',
  async: false, // async detection
  detect: () => getCurrentLang(),
  init: () => {},
  cacheUserLanguage: () => {},
};

const getCurrentLang = () => {
  return getDeviceLanguage();
};

export const i18nInit = (languages: any) =>
  i18next
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      resources: {
        en: {
          translation: languages.en,
        },
        vi: {
          translation: languages.vi,
        },
      },
      fallbackLng: 'vi',
      lng: getCurrentLang(),
      load: 'languageOnly',
      debug: process.env.NODE_ENV !== 'production',
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });

export const i18nTranslator = (key: I18NKeys): string => i18next.t(key);
export const currLanguage = () => i18next.language.substr(0, 2);
export default i18next;
