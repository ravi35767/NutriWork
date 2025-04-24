import API from './index';

// Static user data for testing
const STATIC_USERS = {
  'ravishankar.malhi1@gmail.com': {
    password: 'Hello123!@#',
    role: 'trainer',
    name: 'Trainer User'
  },
  'ravishankar.malhi12@gmail.com': {
    password: 'Hello123!@#',
    role: 'nutritionist',
    name: 'Nutritionist User'
  }
};

export const authService = {
  login: async (credentials) => {
    return API.post('/profile/signin', credentials);
  },
  
  signup: (userData) => API.post('/profile/signup', userData),
  forgotPassword: (email) => API.post('/profile/forgot-password', { email }),
  resetPassword: (token, newPassword) => API.post('/profile/reset-password', { token, newPassword }),
  verifyEmail: (token) => API.post('/profile/verify-email', { token }),
  resendVerification: (email) => API.post('/profile/resend-verification', { email }),
  
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
  
  isAuthenticated: () => {
    const accessToken = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return !!accessToken && !!user;
  },
  
  getUserRole: () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.role;
  },
  
  getUser: () => {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}; 