import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [
    {
      id: 1,
      title: 'Basic Workout Routine',
      description: 'A beginner-friendly workout routine for everyone',
      videoUrl: 'dummy-url-1',
      uploadDate: '2024-03-15',
    }
  ]
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    addVideo: (state, action) => {
      const newVideo = {
        id: state.videos.length + 1,
        ...action.payload,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      state.videos.push(newVideo);
    },
    deleteVideo: (state, action) => {
      state.videos = state.videos.filter(video => video.id !== action.payload);
    }
  }
});

export const { addVideo, deleteVideo } = videosSlice.actions;
export default videosSlice.reducer; 