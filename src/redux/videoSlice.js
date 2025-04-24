import { createSlice } from '@reduxjs/toolkit';
import { videos } from '../features/videos/data/mockVideos';

const initialState = {
  videos: videos,
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setVideos, setLoading, setError } = videoSlice.actions;
export default videoSlice.reducer; 