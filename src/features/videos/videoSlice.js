import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Added createAsyncThunk
import axiosInstance from '../../config/axios'; // Import axios instance

// Removed mock data import
// import { videos } from './data/mockVideos'; 

// Async Thunk for fetching videos
export const fetchMyVideos = createAsyncThunk(
  'videos/fetchMyVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/videos/my-videos'); // Use correct endpoint
      console.log('Fetch My Videos Response:', response.data);
      return response.data.videos; // Assuming API returns { videos: [...] }
    } catch (error) {
      console.error('Fetch My Videos error:', error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch videos');
    }
  }
);

// Async Thunk for uploading a video
export const uploadVideo = createAsyncThunk(
  'videos/uploadVideo',
  async ({ formData, onUploadProgress }, { rejectWithValue, dispatch }) => { // Added dispatch
    try {
      const response = await axiosInstance.post('/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
        onUploadProgress: (progressEvent) => {
          // Calculate percentage and pass to callback
          const percentCompleted = progressEvent.total 
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0; // Handle case where total is not available
          if (onUploadProgress) {
            onUploadProgress(percentCompleted);
          }
        },
      });
      console.log('Upload Video Response:', response.data);
      // Optionally dispatch fetchMyVideos again to refresh the list after upload
      dispatch(fetchMyVideos()); 
      return response.data; // Contains the newly created video record
    } catch (error) {
      console.error('Upload Video error:', error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || 'Failed to upload video');
    }
  }
);


const initialState = {
  videos: [], // Initialize as empty array
  loading: false, 
  uploading: false, // Add specific uploading state
  error: null,
  uploadError: null, // Specific error for upload
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    // Keep existing reducers if needed elsewhere, or remove if thunk handles all state changes
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
  extraReducers: (builder) => { // Add extraReducers for the thunk
    builder
      .addCase(fetchMyVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload; // Set videos from API response
      })
      .addCase(fetchMyVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch videos';
      })
      // Upload Video reducers
      .addCase(uploadVideo.pending, (state) => {
        state.uploading = true;
        state.uploadError = null;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.uploading = false;
        // Optionally add the new video to the state directly
        // state.videos.push(action.payload.video); // Assuming response structure { video: ... }
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.uploading = false;
        state.uploadError = action.payload || 'Failed to upload video';
      });
  }
});

// Export existing actions if still needed, otherwise remove
export const { setVideos, setLoading, setError } = videoSlice.actions; 
export default videoSlice.reducer;
