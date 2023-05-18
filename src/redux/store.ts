import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { persistReducer, persistStore } from 'redux-persist';
import Config from 'react-native-config';

import { createLogger } from 'redux-logger';
import reducers, { auth } from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

const storage = createSensitiveStorage({
  keychainService: Config.KEYCHAIN_IOS || 'secureKey',
  sharedPreferencesName: Config.SHARED_PERFERENCE_ANDROID || 'SecurePrefs',
});

const mainPersistConfig = {
  key: 'main',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['appearance'],
};

const tokenPersistConfig = {
  key: 'sensitive',
  storage: storage,
};

const rootReducers = combineReducers({
  main: persistReducer(mainPersistConfig, reducers),
  token: persistReducer(tokenPersistConfig, auth),
});

// middleware
const middleware: any[] = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

if (__DEV__) {
  middleware.push(createLogger());
}

export const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
// Infer the `IState` and `AppDispatch` types from the store itself
export type IState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
