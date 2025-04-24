// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axios';
import { API_ENDPOINTS } from '../config/api';
import * as jwt_decode from "jwt-decode";

// Async thunk for signup - Modified to accept role
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ userData, role }, { rejectWithValue }) => { // Accept role along with userData
    try {
      let signupEndpoint;
      // Determine the correct endpoint based on the role
      switch (role) {
        case 'trainer':
          signupEndpoint = API_ENDPOINTS.SIGNUP_TRAINER;
          break;
        case 'nutritionist':
          signupEndpoint = API_ENDPOINTS.SIGNUP_NUTRITIONIST; 
          break;
        // Removed 'end user' and default cases to prevent fallback to /profile/signup
      }

      // If role is not 'trainer' or 'nutritionist', signupEndpoint will be undefined
      if (!signupEndpoint) { 
        return rejectWithValue('Invalid role specified for signup.');
      }

      // --- Enhanced Logging ---
      console.log(`[AuthSlice Signup] Role received: ${role}`);
      console.log(`[AuthSlice Signup] Selected Endpoint Key: ${role === 'trainer' ? 'SIGNUP_TRAINER' : 'SIGNUP_NUTRITIONIST'}`);
      console.log(`[AuthSlice Signup] Endpoint Path from API_ENDPOINTS: ${signupEndpoint}`);
      console.log(`[AuthSlice Signup] Full API_ENDPOINTS object:`, API_ENDPOINTS);
      console.log(`[AuthSlice Signup] Calling axiosInstance.post with path: ${signupEndpoint}`);
      // --- End Enhanced Logging ---

      const response = await axiosInstance.post(signupEndpoint, userData);
      console.log('Signup response:', response.data);
      // Store the token in localStorage upon successful signup
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Logging in with:', credentials);
      const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
      console.log('Login response:', response.data);
      // Store the token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for request password reset
export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Password reset request failed');
    }
  }
);

// Async thunk for reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.RESET_PASSWORD, resetData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Password reset failed');
    }
  }
);

// Async thunk for confirm password reset
export const confirmPasswordReset = createAsyncThunk(
  'auth/confirmPasswordReset',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/auth/confirm-reset-password', {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Password reset confirmation failed');
    }
  }
);

// Async thunk to load user data from token
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const decodedToken = jwt_decode(token);
      const userRole = decodedToken.role;

      let getUserEndpoint;
      if (userRole === 'trainer') {
        getUserEndpoint = '/trainers/profile';
      } else if (userRole === 'nutritionist') {
        getUserEndpoint = '/nutritionists/profile';
      } else {
        getUserEndpoint = '/profile';
      }

      const response = await axiosInstance.get(API_ENDPOINTS.API_BASE_URL + getUserEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('[loadUser] Response data:', response.data); // Add logging
      return response.data;
    } catch (error) {
      localStorage.removeItem('token'); // Clear invalid token
      return rejectWithValue(error.response?.data?.message || 'Failed to load user');
    }
  }
);

const getInitialState = () => {
  const token = localStorage.getItem('token');
  return {
    user: null,
    token: token,
    loading: false,
    error: null,
    isAuthenticated: !!token,
    success: false,
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load user';
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
      })
      // Signup reducers
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
        state.success = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Signup failed';
      })
      // Login reducers
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        // Correctly access nested user payload
        state.user = action.payload?.payload?.user; 
        state.token = action.payload?.token;
        // Ensure isAuthenticated is true only if user and token are present
        state.isAuthenticated = !!(state.user && state.token); 
        state.success = state.isAuthenticated; // Set success flag
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      // Request password reset reducers
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Password reset request failed';
      })
      // Reset password reducers
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Password reset failed';
      })
      // Confirm password reset reducers
      .addCase(confirmPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(confirmPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Password reset confirmation failed';
      });
  },
});

export const { clearError, logout, clearSuccess } = authSlice.actions;
export default authSlice.reducer;
