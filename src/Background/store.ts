import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { syncStorage } from 'redux-persist-webextension-storage';

import { reducer as walletConnectionReducer } from './walletConnectionSlice';
import { reducer as userProfileReducer } from './userProfileSlice';

const rootPersistConfig = {
  key: 'LM_STORE',
  storage: syncStorage,
};

const rootReducer = combineReducers({
  walletConnections: walletConnectionReducer,
  userProfile: userProfileReducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
  devTools: true,
  reducer: persistReducer(rootPersistConfig, rootReducer),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
