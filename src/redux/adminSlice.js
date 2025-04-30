import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../config/axios';

// --- Verification Thunks ---
export const fetchPendingVerifications = createAsyncThunk(
  'admin/fetchPendingVerifications',
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/verifications/pending', { params: { page, limit } });
      return response.data;
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
      const response = await axiosInstance.put(`/admin/verifications/${userId}`, { status, reason });
      dispatch(fetchPendingVerifications());
      return response.data;
    } catch (error) {
      console.error('Error updating verification status:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to update verification status');
    }
  }
);

export const addVerificationNote = createAsyncThunk(
  'admin/addVerificationNote',
  async ({ userId, note }, { rejectWithValue, dispatch }) => { // Added dispatch
    try {
      const response = await axiosInstance.post(`/admin/verifications/${userId}/notes`, { note });
      dispatch(fetchVerificationNotes(userId)); // Refetch notes on success
      return response.data;
    } catch (error) {
      console.error('Error adding verification note:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to add verification note');
    }
  }
);

export const fetchVerificationNotes = createAsyncThunk(
  'admin/fetchVerificationNotes',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/verifications/${userId}/notes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching verification notes:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch verification notes');
    }
  }
);

// --- User Management Thunks ---
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async ({ page = 1, limit = 10, role = '', status = '', search = '', userId = '' } = {}, { rejectWithValue }) => {
    try {
      let url = '/admin/users';
      const params = { page, limit, role, status, search };
      if (userId) {
        // Fetching a single user
        url = `/admin/users/${userId}`;
        console.log('fetchUsers: API Request (Single User):', url);
        const response = await axiosInstance.get(url); // No params needed for single user fetch by ID in URL
        console.log('fetchUsers: API Response (Single User):', response.data);
        // Return a specific structure for the reducer to identify single user fetch
        return { user: response.data.user, isSingleUser: true };
      } else {
        // Fetching a list of users
        console.log('fetchUsers: API Request (List):', url, 'with params:', params);
        const response = await axiosInstance.get(url, { params }); // Pass params correctly
        console.log('fetchUsers: API Response (List):', response.data);
        // Return the list data directly (assuming API returns { users: [], currentPage: ..., totalPages: ..., totalUsers: ... })
        return response.data;
      }
    } catch (error) {
      console.error('fetchUsers: Error fetching users:', error.response || error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'admin/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/users/${userId}`);
      console.log('fetchUserById: API Response:', response.data);
      return response.data.user;
    } catch (error) {
      console.error('fetchUserById: Error fetching user:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
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
       // Refetch the specific user's data after update
       dispatch(fetchUserById(userId));
       dispatch(fetchReportedUsers()); // Keep this if needed for other parts of the admin panel
       return response.data;
     } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to update user status'); }
  }
);
export const assignUserRole = createAsyncThunk(
  'admin/assignUserRole',
   async ({ userId, role }, { rejectWithValue, dispatch }) => {
     try {
       const response = await axiosInstance.put(`/admin/users/${userId}/role`, { role });
       // Refetch the specific user's data after update
       dispatch(fetchUserById(userId));
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
    // TODO: Implement the deleteUserAdmin thunk
    return rejectWithValue('deleteUserAdmin not implemented');
  }
);

// --- Moderation Thunks ---
export const fetchReportedUsers = createAsyncThunk('admin/fetchReportedUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/admin/reports/users');
    const reportedUsers = response.data;
    const transformedReports = reportedUsers.flatMap(user =>
      user.reports.map(report => ({
        ...report,
        reportedUser: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture
        }
      }))
    );
    return transformedReports || [];
  } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch reported users'); }
});
export const fetchReportedPosts = createAsyncThunk('admin/fetchReportedPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/admin/reports/posts');
    const reportedPosts = response.data;
    console.log('API Response:', reportedPosts);
    const transformedReports = Array.isArray(reportedPosts) ? reportedPosts.map(item => ({
      _id: item._id,
      communityId: item.communityId,
      content: Array.isArray(item.content) ? item.content[0] : '',
      image: Array.isArray(item.image) ? item.image[0] : '',
      createdAt: Array.isArray(item.createdAt) ? item.createdAt[0] : '',
      reason: item.reason,
      status: item.status,
      postCreator: item.postCreator,
      reporter: item.reporter
    })) : [];
    console.log('Transformed Reports:', transformedReports);
    return transformedReports || [];
  } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch reported posts'); }
  }
);
export const fetchReportedComments = createAsyncThunk('admin/fetchReportedComments', async (_, { rejectWithValue }) => {
   try {
    const response = await axiosInstance.get('/admin/reports/comments');
    return response.data.reports || []; 
  } catch (error) { return rejectWithValue(error.response?.data?.message || 'Failed to fetch reported comments'); }
  }
);
export const fetchReportedCommunities = createAsyncThunk('admin/fetchReportedCommunities', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/admin/reports/communities');
    const reportedCommunities = response.data && Array.isArray(response.data.data) ? response.data.data : [];

    const transformedReports = reportedCommunities.flatMap(community =>
      community.communityReport.map(report => ({
        ...report,
        communityName: community.name || 'Unnamed Community',
        reportedBy: community.reportedBy ? {
          firstName: community.reportedBy.firstName,
          lastName: community.reportedBy.lastName,
          profilePicture: community.reportedBy.profilePicture
        } : { firstName: 'N/A', lastName: '' }
      }))
    );
    return transformedReports || [];
  } catch (error) {
    console.error('Error fetching reported communities:', error);
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch reported communities');
  }
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
      console.error(`Dismiss Report error for ${reportType}/${reportId}:`, response.data || error);
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
  pendingVerifications: [],
  verificationNotes: [],
  loadingVerifications: false,
  errorVerifications: null,
  actionLoading: false,
  actionError: null,
  selectedUser: null,
  // Initialize userList with a default structure
  userList: {
    users: [],
    currentPage: 1,
    totalPages: 0,
    totalUsers: 0,
  },
  loadingUsers: false,
  errorUsers: null,
  reportedUsers: [],
  reportedPosts: [],
  reportedComments: [],
  reportedCommunities: [],
  loadingReports: false,
  errorReports: {
    users: null,
    posts: null,
    comments: null,
    communities: null
  },
  adminStats: null,
  loadingStats: false,
  errorStats: null,
  adminReviews: [],
  loadingReviews: false,
  errorReviews: null
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
    addVerificationNoteReducer: (state, action) => {
      state.verificationNotes = [...state.verificationNotes, action.payload];
    },
    setVerificationNotes: (state, action) => {
      state.verificationNotes = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Verification
      .addCase(fetchPendingVerifications.pending, (state) => { state.loadingVerifications = true; state.errorVerifications = null; })
      .addCase(fetchPendingVerifications.fulfilled, (state, action) => {
        state.loadingVerifications = false;
        state.pendingVerifications = action.payload;
      })
      .addCase(fetchPendingVerifications.rejected, (state, action) => { state.loadingVerifications = false; state.errorVerifications = action.payload; })
      .addCase(updateVerificationStatus.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(updateVerificationStatus.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updateVerificationStatus.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(addVerificationNote.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(addVerificationNote.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(addVerificationNote.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(fetchVerificationNotes.pending, (state) => { state.loadingVerifications = true; state.errorVerifications = null; })
      .addCase(fetchVerificationNotes.fulfilled, (state, action) => { 
        state.loadingVerifications = false; 
        state.verificationNotes = action.payload; 
      })
      .addCase(fetchVerificationNotes.rejected, (state, action) => { state.loadingVerifications = false; state.errorVerifications = action.payload; })
      // Users
      .addCase(fetchUsers.pending, (state) => { state.loadingUsers = true; state.errorUsers = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.errorUsers = null; // Clear previous errors on success
        // Check the payload structure to determine if it was a single user or list fetch
        if (action.payload.isSingleUser) {
          state.selectedUser = action.payload.user;
          // Construct userList for the single user case to display in the table if needed
          state.userList = {
            users: [action.payload.user],
            currentPage: 1,
            totalPages: 1,
            totalUsers: 1,
          };
        } else {
          // Handle the list of users case (assuming API returns the correct structure)
          state.userList = action.payload;
          // Ensure payload has the expected structure for a list
          if (action.payload && Array.isArray(action.payload.users) && typeof action.payload.totalUsers === 'number') {
            state.userList = action.payload;
          } else {
            // Handle unexpected structure from list API
            console.error('Unexpected payload structure for user list:', action.payload);
            state.errorUsers = 'Failed to process user list data.';
            // Reset userList to default empty state
            state.userList = { users: [], currentPage: 1, totalPages: 0, totalUsers: 0 };
          }
          state.selectedUser = null; // Clear selected user when fetching list
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingUsers = false;
        state.errorUsers = action.payload || 'Failed to fetch users'; // Set the error message
        // Reset userList to default empty state on failure
        state.userList = { users: [], currentPage: 1, totalPages: 0, totalUsers: 0 };
        state.selectedUser = null;
      })
      .addCase(fetchUserById.pending, (state) => { state.loadingUsers = true; state.errorUsers = null; })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.selectedUser = action.payload; // Correctly assign the payload (user data)
       state.errorUsers = null; // Clear error on success
       })
       .addCase(fetchUserById.rejected, (state, action) => {
         state.loadingUsers = false;
         // Set error, but keep existing selectedUser data so the page doesn't blank out immediately
         state.errorUsers = action.payload || 'Failed to refresh user details.';
         // state.selectedUser = null; // Don't clear selected user on refetch error
       })
       .addCase(updateUserAccountStatusAdmin.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(updateUserAccountStatusAdmin.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(updateUserAccountStatusAdmin.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(assignUserRole.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(assignUserRole.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(assignUserRole.rejected, (state) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(createUserAdmin.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(createUserAdmin.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(createUserAdmin.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      // Reports
      .addCase(fetchReportedUsers.pending, (state) => { state.loadingReports = true; state.errorReports.users = null; })
      .addCase(fetchReportedUsers.fulfilled, (state, action) => {
        state.loadingReports = false;
        state.reportedUsers = action.payload;
      })
      .addCase(fetchReportedUsers.rejected, (state, action) => { state.loadingReports = false; state.errorReports.users = action.payload; })
      .addCase(fetchReportedPosts.pending, (state) => { state.loadingReports = true; state.errorReports.posts = null; })
      .addCase(fetchReportedPosts.fulfilled, (state, action) => {
        state.loadingReports = false;
        state.reportedPosts = action.payload;
      })
      .addCase(fetchReportedPosts.rejected, (state, action) => { state.loadingReports = false; state.errorReports.posts = action?.payload; })
      .addCase(fetchReportedComments.pending, (state) => { state.loadingReports = true; state.errorReports.comments = null; })
      .addCase(fetchReportedComments.fulfilled, (state, action) => {
        state.loadingReports = false;
        state.reportedComments = action.payload;
      })
      .addCase(fetchReportedComments.rejected, (state, action) => { state.loadingReports = false; state.errorReports.comments = action?.payload; })
      .addCase(fetchReportedCommunities.pending, (state) => { state.loadingReports = true; state.errorReports.communities = null; })
      .addCase(fetchReportedCommunities.fulfilled, (state, action) => {
        state.loadingReports = false;
        state.reportedCommunities = action.payload;
      })
      .addCase(fetchReportedCommunities.rejected, (state, action) => { state.loadingReports = false; state.errorReports.communities = action?.payload; })
      .addCase(dismissReport.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(dismissReport.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(dismissReport.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(deleteReportedPost.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(deleteReportedPost.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(deleteReportedPost.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(deleteReportedComment.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(deleteReportedComment.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(deleteReportedComment.rejected, (state, action) => { state.actionLoading = false; state.actionError = action.payload; })
      .addCase(deleteReportedCommunity.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(deleteReportedCommunity.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(deleteReportedCommunity.rejected, (state, action) => { state.actionLoading = false; state.actionError = action?.payload; })
      // Reviews
      .addCase(fetchAdminReviews.pending, (state) => { state.loadingReviews = true; state.errorReviews = null; })
      .addCase(fetchAdminReviews.fulfilled, (state) => {
        state.loadingReviews = false;
        state.adminReviews = action.payload;
      })
      .addCase(fetchAdminReviews.rejected, (state, action) => { state.loadingReviews = false; state.errorReviews = action.payload; })
      .addCase(deleteAdminReview.pending, (state) => { state.actionLoading = true; state.actionError = null; })
      .addCase(deleteAdminReview.fulfilled, (state) => { state.actionLoading = false; })
      .addCase(deleteAdminReview.rejected, (state, action) => { state.actionLoading = false; state.actionError = action?.payload; })
      // Stats
      .addCase(fetchAdminStats.pending, (state) => { state.loadingStats = true; state.errorStats = null; })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loadingStats = false;
        state.adminStats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => { 
        state.loadingStats = false; 
        state.errorStats = action ? action?.payload : null; 
      });
  }
});

export const { clearAdminError, addVerificationNoteReducer, setVerificationNotes } = adminSlice.actions;
export default adminSlice.reducer;
