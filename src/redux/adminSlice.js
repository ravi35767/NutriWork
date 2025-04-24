import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axios';

// --- Verification Thunks ---
export const fetchPendingVerifications = createAsyncThunk(
  'admin/fetchPendingVerifications',
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/verifications/pending', { params: { page, limit } });
      return {
        profiles: response.data.pendingProfiles || [],
        currentPage: response.data.currentPage || 1,
        totalPages: response.data.totalPages || 1,
        totalPending: response.data.totalPending || 0
      };
    } catch (error) { 
      console.error('Error fetching pending verifications:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch pending verifications'); 
    }
  }
);
export const updateVerificationStatus = createAsyncThunk(
  'admin/updateVerificationStatus',
  async ({ userId, status, reason = '' }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.put(`/admin/verifications/${userId}`, { status, rejectionReason: reason });
      dispatch(fetchPendingVerifications()); 
      return response.data;
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to update verification status'); }
  }
);

// --- User Management Thunks ---
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async ({ page = 1, limit = 10, role = '', status = '', search = '' } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/users', { params: { page, limit, role, status, search } });
      return response.data;
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch users'); }
  }
);
export const updateUserAccountStatusAdmin = createAsyncThunk(
  'admin/updateUserAccountStatus',
  async ({ userId, status }, { rejectWithValue, dispatch }) => { 
    try {
      const response = await axiosInstance.put(`/admin/users/${userId}/status`, { 
        status,
        isVerified: status === 'verified' ? true : undefined 
      });
      dispatch(fetchUsers()); 
      dispatch(fetchReportedUsers()); 
      return response.data;
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to update user status'); }
  }
);
export const assignUserRole = createAsyncThunk(
  'admin/assignUserRole',
  async ({ userId, role }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.put(`/admin/users/${userId}/role`, { role });
      dispatch(fetchUsers()); 
      return response.data; 
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to assign role'); }
  }
);
export const createUserAdmin = createAsyncThunk(
  'admin/createUserAdmin',
  async (userData, { rejectWithValue, dispatch }) => { 
    try {
      const response = await axiosInstance.post('/admin/users', userData);
      console.log('Create User Admin Response:', response.data);
      dispatch(fetchUsers()); 
      return response.data; 
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to create user'); }
  }
);
export const deleteUserAdmin = createAsyncThunk(
  'admin/deleteUserAdmin',
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(`/admin/users/${userId}`);
      console.log('Delete User Admin Response:', response.data);
      dispatch(fetchUsers()); 
      return userId; 
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to delete user'); }
  }
);

// --- Moderation Thunks ---
export const fetchReportedUsers = createAsyncThunk('admin/fetchReportedUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/admin/reports/users');
    return response.data.reports || []; 
  } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch reported users'); }
});
export const fetchReportedPosts = createAsyncThunk('admin/fetchReportedPosts', async (_, { rejectWithValue }) => {
   try {
    const response = await axiosInstance.get('/admin/reports/posts');
    return response.data.reports || []; 
  } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch reported posts'); }
});
export const fetchReportedComments = createAsyncThunk('admin/fetchReportedComments', async (_, { rejectWithValue }) => {
   try {
    const response = await axiosInstance.get('/admin/reports/comments');
    return response.data.reports || []; 
  } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch reported comments'); }
});
export const fetchReportedCommunities = createAsyncThunk('admin/fetchReportedCommunities', async (_, { rejectWithValue }) => {
   try {
    const response = await axiosInstance.get('/admin/reports/communities');
    return response.data.reports || []; 
  } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch reported communities'); }
});
export const dismissReport = createAsyncThunk(
  'admin/dismissReport',
  async ({ reportType, reportId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.put(`/admin/reports/${reportType}/${reportId}/status`, { status: 'dismissed' });
      console.log(`Dismiss Report Response for ${reportType}/${reportId}:`, response.data);
      if (reportType === 'users') dispatch(fetchReportedUsers());
      else if (reportType === 'posts') dispatch(fetchReportedPosts());
      else if (reportType === 'comments') dispatch(fetchReportedComments());
      else if (reportType === 'communities') dispatch(fetchReportedCommunities());
      return { reportType, reportId }; 
    } catch (error) { 
      console.error(`Dismiss Report error for ${reportType}/${reportId}:`, error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || `Failed to dismiss ${reportType} report`); 
    }
  }
);
// Thunks for deleting reported content
export const deleteReportedPost = createAsyncThunk(
  'admin/deleteReportedPost',
  async (postId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(`/admin/posts/${postId}`);
      console.log('Delete Post Admin Response:', response.data);
      dispatch(fetchReportedPosts()); // Refetch reported posts
      return postId;
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to delete post'); }
  }
);
export const deleteReportedComment = createAsyncThunk(
  'admin/deleteReportedComment',
  async (commentId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(`/admin/comments/${commentId}`);
      console.log('Delete Comment Admin Response:', response.data);
      dispatch(fetchReportedComments()); // Refetch reported comments
      return commentId;
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to delete comment'); }
  }
);
export const deleteReportedCommunity = createAsyncThunk(
  'admin/deleteReportedCommunity',
  async (communityId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(`/admin/communities/${communityId}`);
      console.log('Delete Community Admin Response:', response.data);
      dispatch(fetchReportedCommunities()); // Refetch reported communities
      return communityId;
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to delete community'); }
  }
);

// --- Review Management Thunks (Admin) ---
export const fetchAdminReviews = createAsyncThunk(
  'admin/fetchAdminReviews',
  async ({ page = 1, limit = 10, professionalId = '', clientId = '', rating = '' } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/reviews', { 
        params: { page, limit, professionalId, clientId, rating } 
      });
      console.log('Fetch Admin Reviews Response:', response.data);
      return response.data;
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews'); }
  }
);
export const deleteAdminReview = createAsyncThunk(
  'admin/deleteAdminReview',
  async (reviewId, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.delete(`/admin/reviews/${reviewId}`);
      console.log('Delete Admin Review Response:', response.data);
      dispatch(fetchAdminReviews()); 
      return reviewId; 
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to delete review'); }
  }
);

// --- Admin Dashboard Stats Thunk ---
export const fetchAdminStats = createAsyncThunk(
  'admin/fetchAdminStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/stats');
      console.log('Fetch Admin Stats Response:', response.data);
      return response.data;
    } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin stats'); }
  }
);


const initialState = {
  pendingVerifications: { profiles: [], currentPage: 1, totalPages: 1, totalPending: 0 },
  userList: { users: [], currentPage: 1, totalPages: 1, totalUsers: 0 },
  reports: { users: [], posts: [], comments: [], communities: [] },
  reviewList: { 
    reviews: [],
    currentPage: 1,
    totalPages: 1,
    totalReviews: 0,
  },
  adminStats: null, 
  // Separate Loading States
  loadingVerifications: false,
  loadingUsers: false,
  loadingReports: { 
    users: false,
    posts: false,
    comments: false,
    communities: false,
  },
  loadingReviews: false, 
  loadingStats: false, 
  // Separate Error States
  errorVerifications: null,
  errorUsers: null,
  errorReports: {
     users: null,
     posts: null,
     comments: null,
     communities: null,
  },
  errorReviews: null, 
  errorStats: null, 
  // Action States
  actionLoading: false, 
  actionError: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state, action) => { 
      if (action.payload) {
        if (state.errorReports[action.payload]) state.errorReports[action.payload] = null;
        if (action.payload === 'users') state.errorUsers = null;
        if (action.payload === 'verifications') state.errorVerifications = null;
        if (action.payload === 'stats') state.errorStats = null;
        if (action.payload === 'reviews') state.errorReviews = null;
      } else { 
        state.errorVerifications = null;
        state.errorUsers = null;
        state.errorReports = { users: null, posts: null, comments: null, communities: null };
        state.errorStats = null;
        state.errorReviews = null;
      }
      state.actionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Verification
      .addCase(fetchPendingVerifications.pending, (state) => { state.loadingVerifications = true; state.errorVerifications = null; })
      .addCase(fetchPendingVerifications.fulfilled, (state, action) => { state.loadingVerifications = false; state.pendingVerifications = action.payload; })
      .addCase(fetchPendingVerifications.rejected, (state, action) => { state.loadingVerifications = false; state.errorVerifications = action.payload; })
      .addCase(updateVerificationStatus.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(updateVerificationStatus.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updateVerificationStatus.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      // User Management
      .addCase(fetchUsers.pending, (state) => { state.loadingUsers = true; state.errorUsers = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loadingUsers = false; state.userList = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loadingUsers = false; state.errorUsers = action.payload; })
      .addCase(updateUserAccountStatusAdmin.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(updateUserAccountStatusAdmin.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updateUserAccountStatusAdmin.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(assignUserRole.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(assignUserRole.fulfilled, (state) => { state.actionLoading = false; }) 
      .addCase(assignUserRole.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(createUserAdmin.pending, (state) => { state.actionLoading = true; state.actionError = null; }) 
      .addCase(createUserAdmin.fulfilled, (state) => { state.actionLoading = false; }) 
      .addCase(createUserAdmin.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(deleteUserAdmin.pending, (state) => { state.actionLoading = true; state.actionError = null; }) 
      .addCase(deleteUserAdmin.fulfilled, (state) => { state.actionLoading = false; }) 
      .addCase(deleteUserAdmin.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      // Moderation - Fetching Reports
      .addCase(fetchReportedUsers.pending, (state) => { state.loadingReports.users = true; state.errorReports.users = null; })
      .addCase(fetchReportedUsers.fulfilled, (state, action) => { state.loadingReports.users = false; state.reports.users = action.payload; }) 
      .addCase(fetchReportedUsers.rejected, (state, action) => { state.loadingReports.users = false; state.errorReports.users = action.payload; })
      .addCase(fetchReportedPosts.pending, (state) => { state.loadingReports.posts = true; state.errorReports.posts = null; })
      .addCase(fetchReportedPosts.fulfilled, (state, action) => { state.loadingReports.posts = false; state.reports.posts = action.payload; }) 
      .addCase(fetchReportedPosts.rejected, (state, action) => { state.loadingReports.posts = false; state.errorReports.posts = action.payload; })
      .addCase(fetchReportedComments.pending, (state) => { state.loadingReports.comments = true; state.errorReports.comments = null; })
      .addCase(fetchReportedComments.fulfilled, (state, action) => { state.loadingReports.comments = false; state.reports.comments = action.payload; }) 
      .addCase(fetchReportedComments.rejected, (state, action) => { state.loadingReports.comments = false; state.errorReports.comments = action.payload; })
      .addCase(fetchReportedCommunities.pending, (state) => { state.loadingReports.communities = true; state.errorReports.communities = null; })
      .addCase(fetchReportedCommunities.fulfilled, (state, action) => { state.loadingReports.communities = false; state.reports.communities = action.payload; }) 
      .addCase(fetchReportedCommunities.rejected, (state, action) => { state.loadingReports.communities = false; state.errorReports.communities = action.payload; })
      // Moderation - Acting on Reports
      .addCase(dismissReport.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(dismissReport.fulfilled, (state) => { state.actionLoading = false; }) 
      .addCase(dismissReport.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(deleteReportedPost.pending, (state) => { state.actionLoading = true; state.actionError = null; }) // Add cases for delete actions
      .addCase(deleteReportedPost.fulfilled, (state) => { state.actionLoading = false; }) 
      .addCase(deleteReportedPost.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(deleteReportedComment.pending, (state) => { state.actionLoading = true; state.actionError = null; }) 
      .addCase(deleteReportedComment.fulfilled, (state) => { state.actionLoading = false; }) 
      .addCase(deleteReportedComment.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(deleteReportedCommunity.pending, (state) => { state.actionLoading = true; state.actionError = null; }) 
      .addCase(deleteReportedCommunity.fulfilled, (state) => { state.actionLoading = false; }) 
      .addCase(deleteReportedCommunity.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      // Admin Stats
      .addCase(fetchAdminStats.pending, (state) => { state.loadingStats = true; state.errorStats = null; })
      .addCase(fetchAdminStats.fulfilled, (state, action) => { state.loadingStats = false; state.adminStats = action.payload; })
      .addCase(fetchAdminStats.rejected, (state, action) => { state.loadingStats = false; state.errorStats = action.payload; })
      // Review Management
      .addCase(fetchAdminReviews.pending, (state) => { state.loadingReviews = true; state.errorReviews = null; })
      .addCase(fetchAdminReviews.fulfilled, (state, action) => { state.loadingReviews = false; state.reviewList = action.payload; })
      .addCase(fetchAdminReviews.rejected, (state, action) => { state.loadingReviews = false; state.errorReviews = action.payload; })
      .addCase(deleteAdminReview.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(deleteAdminReview.fulfilled, (state) => { state.actionLoading = false; }) 
      .addCase(deleteAdminReview.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
