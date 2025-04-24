import API from './index';

export const dashboardService = {
  getDashboardData: () => API.get('/dashboard'),
  getStatistics: () => API.get('/dashboard/statistics'),
  getRecentActivities: () => API.get('/dashboard/activities'),
  getUpcomingEvents: () => API.get('/dashboard/events'),
  getNotifications: () => API.get('/dashboard/notifications'),
  markNotificationAsRead: (notificationId) => 
    API.put(`/dashboard/notifications/${notificationId}/read`),
}; 