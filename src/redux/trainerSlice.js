import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axios';
// Assuming API_ENDPOINTS will be expanded or we define the path directly
// import { API_ENDPOINTS } from '../config/api'; 

// Async thunk to fetch trainer dashboard data
export const fetchTrainerDashboard = createAsyncThunk(
  'trainer/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const [dashboardResponse, totalTraineesResponse, activeTraineesResponse] = await Promise.all([
        axiosInstance.get('/trainers/dashboard'),
        axiosInstance.get('/Trainers/trainees'),
        axiosInstance.get('/Trainers/available')
      ]);

      const dashboardData = dashboardResponse.data;
      dashboardData.totalTrainees = totalTraineesResponse.data.length;
      dashboardData.activeTrainees = activeTraineesResponse.data.length;

      console.log('Trainer Dashboard Data Response:', dashboardData);
      return dashboardData; // Expecting data like { totalTrainees, activeTrainees, upcomingSessions, etc. }
    } catch (error) {
      console.error('Fetch Trainer Dashboard error:', error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  }
);

// Async thunk to fetch trainer's connected trainees
export const fetchTrainees = createAsyncThunk(
  'trainer/fetchTrainees',
  async ({ page = 1, limit = 10, status = '', search = '' } = {}, { rejectWithValue }) => { // Added pagination/filter params
    try {
      const response = await axiosInstance.get('/trainers/trainees', {
        params: { page, limit, status, search } // Pass params to API
      }); 
      console.log('Fetch Trainees Response:', response.data);
      // Expecting { trainees: [], currentPage, totalPages, totalTrainees }
      return response.data; 
    } catch (error) {
      console.error('Fetch Trainees error:', error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch trainees');
    }
  }
);

// Async thunk to fetch trainer's profile data
export const fetchTrainerProfile = createAsyncThunk(
  'trainer/fetchProfile',
  // Accept optional trainerId, get access to state
  async (trainerId = null, { getState, rejectWithValue }) => { 
    try {
      const state = getState();
      // Ensure auth state and user object exist before accessing role
      const userRole = state.auth?.user?.role; 
      let response;

      // If admin is viewing a specific trainer profile
      if (userRole === 'admin' && trainerId) {
        console.log(`Admin fetching profile for trainer ID: ${trainerId}`);
        // Use the admin endpoint to fetch user data by ID (using search)
        // Note: This fetches User data, potentially not the full TrainerProfile
        response = await axiosInstance.get('/admin/users', { 
          // Use /api/admin/users endpoint
          params: { search: trainerId, limit: 1 } // Search by ID/email, limit to 1 result
        });
        console.log('Admin Fetch User Response:', response.data);
        // The response is an object { users: [], ... }. We need the first user.
        if (response.data?.users?.length > 0) {
           // Return the user object. Component might need adjustment for data structure.
           // TODO: Consider fetching TrainerProfile separately if needed for admin view
           return response.data.users[0]; 
        } else {
          console.error(`Trainer with ID ${trainerId} not found via admin search.`);
          return rejectWithValue('Trainer not found');
        }
      } else if (userRole === 'trainer' && !trainerId) {
        // Original behavior: Trainer fetching their own profile
        console.log('Trainer fetching own profile');
        response = await axiosInstance.get('/trainers/profile');
        console.log('Fetch Trainer Profile Response:', response.data);
        return response.data; // Expecting full profile data
      } else {
         // Handle other cases or unauthorized access if necessary
         console.warn(`fetchTrainerProfile called with unexpected state: role=${userRole}, trainerId=${trainerId}`);
         return rejectWithValue('Unauthorized or invalid parameters for fetching profile');
      }
      
    } catch (error) {
      console.error('Fetch Trainer Profile error:', error.response?.data || error.message);
      // Extract specific message if available from backend response
      const message = error.response?.data?.msg || error.response?.data?.message || 'Failed to fetch profile data';
      return rejectWithValue(message);
    }
  }
);

// Async Thunk for deleting a trainee connection
export const deleteTrainee = createAsyncThunk(
  'trainer/deleteTrainee',
  async (traineeId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(`/trainers/trainees/${traineeId}`);
      console.log('Delete Trainee Response:', response.data);
      dispatch(fetchTrainees()); // Refresh list after delete
      return traineeId; // Return ID for potential UI updates
    } catch (error) {
      console.error('Delete Trainee error:', error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || 'Failed to delete trainee');
    }
  }
);

// Async Thunk for updating trainee status
export const updateTraineeStatus = createAsyncThunk(
  'trainer/updateTraineeStatus',
  async ({ traineeId, status }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.put(`/trainers/trainees/${traineeId}/status`, { status });
      console.log('Update Trainee Status Response:', response.data);
      dispatch(fetchTrainees()); // Refresh list after update
      return response.data; // Return updated trainee data
    } catch (error) {
      console.error('Update Trainee Status error:', error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || 'Failed to update status');
    }
  }
);

// Async Thunk for uploading a verification document
export const uploadCertificate = createAsyncThunk(
  'trainer/uploadCertificate',
  async ({ formData, onUploadProgress }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post('/trainers/verification/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = progressEvent.total 
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          if (onUploadProgress) {
            onUploadProgress(percentCompleted);
          }
        },
      });
      console.log('Upload Certificate Response:', response.data);
      // Refetch profile data to get updated verification status and documents list
      dispatch(fetchTrainerProfile()); 
      return response.data; // Contains the updated profile
    } catch (error) {
      console.error('Upload Certificate error:', error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || 'Failed to upload certificate');
    }
  }
);


const initialState = {
  dashboardData: {
    totalTrainees: 0,
    activeTrainees: 0,
    // Add other relevant fields based on API response
    upcomingSessions: [], 
    recentChats: [],
    recentReviews: [],
  },
  traineesList: { // Renamed for clarity and to store pagination info
    trainees: [],
    currentPage: 1,
    totalPages: 1,
    totalTrainees: 0,
  },
  profileData: null, 
  loading: false, 
  uploadingCertificate: false, 
  // updatingProfile: false, // Removed
  error: null,
  certificateUploadError: null, 
  // profileUpdateError: null, // Removed
};

const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    clearTrainerError: (state) => {
      state.error = null;
    },
    addSession: (state, action) => {
      state.dashboardData.upcomingSessions = [...state.dashboardData.upcomingSessions, action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Trainer Dashboard reducers
      .addCase(fetchTrainerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure we update the state correctly based on the actual API response structure
        state.dashboardData = { ...state.dashboardData, ...action.payload }; 
      })
      .addCase(fetchTrainerDashboard.rejected, (state, action) => {
        state.loading = false;
        // Store the specific error message from rejectWithValue, or a default
        state.error = action.payload || 'Unknown error fetching dashboard data'; 
        console.error("fetchTrainerDashboard rejected:", action.payload); // Log the specific error payload
      })
      // Fetch Trainees reducers
      .addCase(fetchTrainees.pending, (state) => {
        state.loading = true; // Use a specific loading state like state.loadingTrainees = true later
        state.error = null;
      })
      .addCase(fetchTrainees.fulfilled, (state, action) => {
        state.loading = false;
        state.traineesList = action.payload; // Store the whole payload including pagination
      })
      .addCase(fetchTrainees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch trainees';
      })
      // Fetch Trainer Profile reducers
      .addCase(fetchTrainerProfile.pending, (state) => {
        state.loading = true; // Use state.loadingProfile = true later
        state.error = null;
      })
      .addCase(fetchTrainerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload; // Store fetched profile data
      })
      .addCase(fetchTrainerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      })
      // Delete Trainee reducers
      .addCase(deleteTrainee.pending, (state) => {
        state.loading = true; // Consider specific loading state
        state.error = null;
      })
      .addCase(deleteTrainee.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally remove trainee from state immediately, or rely on refetch
        // state.traineesList.trainees = state.traineesList.trainees.filter(t => t._id !== action.payload);
        // state.traineesList.totalTrainees -= 1; 
      })
      .addCase(deleteTrainee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete trainee'; // Set specific error?
      })
       // Update Trainee Status reducers
      .addCase(updateTraineeStatus.pending, (state) => {
        state.loading = true; // Consider specific loading state
        state.error = null;
      })
      .addCase(updateTraineeStatus.fulfilled, (state, action) => {
        state.loading = false;
         // Optionally update trainee in state immediately, or rely on refetch
        // const index = state.traineesList.trainees.findIndex(t => t._id === action.payload.user._id);
        // if (index !== -1) {
        //   state.traineesList.trainees[index] = { ...state.traineesList.trainees[index], ...action.payload.user };
        // }
      })
      .addCase(updateTraineeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update status'; 
      })
      // Upload Certificate reducers
      .addCase(uploadCertificate.pending, (state) => {
        state.uploadingCertificate = true;
        state.certificateUploadError = null;
      })
      .addCase(uploadCertificate.fulfilled, (state, action) => {
        state.uploadingCertificate = false;
        // Profile data will be updated by the refetch in the thunk
      })
      .addCase(uploadCertificate.rejected, (state, action) => {
        state.uploadingCertificate = false;
        state.certificateUploadError = action.payload || 'Failed to upload certificate';
      });
      // Removed Update Trainer Profile reducers
  },
});

export const { clearTrainerError, addSession } = trainerSlice.actions;
export default trainerSlice.reducer;
