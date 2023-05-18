import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';

import { persistor, store } from 'redux/store';
import Root from './navigation/Root';
import vi from 'localization/vi.json';
import en from 'localization/en.json';
import i18next, { i18nInit } from 'localization/i18n';
import { ThemeProvider } from 'components';

const languages = {
  vi,
  en,
};

const isHermes = () => !!global.HermesInternal;

function Entrypoint() {
  const onBeforeLift = async () => {
    await i18nInit(languages);
  };
  console.log('isHermes', isHermes);
  return (
    <Provider store={store}>
      <PersistGate loading={null} onBeforeLift={onBeforeLift} persistor={persistor}>
        <I18nextProvider i18n={i18next}>
          <ThemeProvider>
            <SafeAreaProvider>
              <Root />
            </SafeAreaProvider>
          </ThemeProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}

export default Entrypoint;
