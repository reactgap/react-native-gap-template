// @flow

import * as RNLocalize from 'react-native-localize';

const supportedLanguages = ['vi', 'en'];

const getDeviceLanguage = () => {
  const languageCodes = RNLocalize.getLocales().map(l => l.languageCode);

  for (let i = 0; i < languageCodes.length; i++) {
    const language = supportedLanguages.find(langCode => langCode === languageCodes[i]);

    if (language) {
      return language;
    }
  }

  return supportedLanguages[0];
};

export default getDeviceLanguage;
