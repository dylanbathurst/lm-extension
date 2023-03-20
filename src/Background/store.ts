import { configureStore } from '@reduxjs/toolkit';
import browser from 'webextension-polyfill';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  reducer as walletConnectionReducer,
  WalletConnection,
} from './walletConnectionSlice';
import { reducer as userProfileReducer, ProfileType } from './userProfileSlice';

// @ts-ignore
const customPersistor = (storeAPI) => (next) => (action) => {
  let result = next(action);
  browser.storage.sync.set({ LM_STORE: storeAPI.getState() });
  return result;
};

export const configureLMStore = (preloadedState: RootState) => {
  const store = configureStore({
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(customPersistor);
    },
    reducer: {
      walletConnections: walletConnectionReducer,
      userProfile: userProfileReducer,
    },
    preloadedState,
  });

  return store;
};

export type RootState = {
  walletConnections: WalletConnection;
  userProfile: ProfileType;
};
export type AppDispatch = typeof store.dispatch;
