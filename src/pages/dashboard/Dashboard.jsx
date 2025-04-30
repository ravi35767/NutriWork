import React from 'react';
import { useSelector } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material'; // Assuming Material UI
import DashboardLayout from '../../layouts/DashboardLayout';

// Import role-specific dashboards
import TrainerDashboard from './TrainerDashboard';
import NutritionistDashboard from './NutritionistDashboard';
import AdminDashboard from './AdminDashboard';
import SupportDashboard from './SupportDashboard';
// Import a potential EndUserDashboard if needed, or handle default case
// import EndUserDashboard from './EndUserDashboard';

const Dashboard = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    // This case might indicate an issue, as ProtectedRoute should prevent unauthorized access
    // However, it's good practice to handle it.
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          Error: User data not available. Please try logging in again.
        </Typography>
      </Box>
    );
  }

  // Render the appropriate dashboard based on user role
  switch (user.role) {
    case 'trainer':
      return (
        
          <TrainerDashboard />
        
      );
    case 'nutritionist':
      return <NutritionistDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'support':
      return <SupportDashboard />;
    // case 'end user': // Example if end users also have a dashboard view
    //   return <EndUserDashboard />;
    default:
      // Fallback for unknown roles or roles without a specific dashboard
      return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5">Welcome, {user.firstName || 'User'}!</Typography>
          <Typography variant="body1">
            Your role ({user.role}) does not have a specific dashboard view configured yet.
          </Typography>
        </Box>
      );
  }
};

export default Dashboard;
