// src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducers
import authReducer from './authSlice';
import videoReducer from '../features/videos/videoSlice';
import trainerReducer from './trainerSlice';
import adminReducer from './adminSlice';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  videos: videoReducer,
  trainer: trainerReducer,
  admin: adminReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Persist only the auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
