import { configureStore } from '@reduxjs/toolkit';
import videosReducer from '../features/videos/videosSlice';
import certificatesReducer from '../features/certificates/certificatesSlice';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    certificates: certificatesReducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 