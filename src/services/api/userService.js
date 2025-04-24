import API from './index';

export const userService = {
  getProfile: () => API.get('/user/profile'),
  updateProfile: (profileData) => API.put('/user/profile', profileData),
  changePassword: (currentPassword, newPassword) => 
    API.put('/user/change-password', { currentPassword, newPassword }),
  updatePreferences: (preferences) => API.put('/user/preferences', preferences),
  deleteAccount: () => API.delete('/user/account'),
}; 