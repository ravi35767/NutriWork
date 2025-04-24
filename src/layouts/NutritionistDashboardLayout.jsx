import React, { useState } from 'react';
import { Box, IconButton, AppBar, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/nutritionist/Sidebar';

const NutritionistDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get the current page title
  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/dashboard': 'Dashboard',
      '/trainees': 'Trainees',
      '/profile': 'Profile',
      '/reviews': 'Reviews',
      '/videos': 'My Videos'
    };
    return titles[path] || 'Dashboard';
  };

  // Check if current page is Dashboard to show/hide buttons
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar isOpen={isSidebarOpen} />
      
      {/* Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          width: `calc(100% - ${isSidebarOpen ? 250 : 0}px)`,
          ml: isSidebarOpen ? '250px' : 0,
          transition: 'margin-left 0.3s, width 0.3s',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Page Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="toggle sidebar"
              onClick={toggleSidebar}
              sx={{
                mr: 2,
                color: '#004D40',
                '&:hover': {
                  backgroundColor: 'rgba(0, 77, 64, 0.08)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                color: '#000',
                fontWeight: 500,
              }}
            >
              {getPageTitle()}
            </Typography>
          </Box>

          {/* Right side buttons and notification */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isDashboardPage && (
              <>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#004D40',
                    '&:hover': {
                      backgroundColor: '#00695C',
                    },
                    textTransform: 'none',
                  }}
                >
                  Upload Video
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#004D40',
                    '&:hover': {
                      backgroundColor: '#00695C',
                    },
                    textTransform: 'none',
                  }}
                >
                  Create session
                </Button>
              </>
            )}
            <IconButton
              color="inherit"
              sx={{
                color: '#004D40',
                '&:hover': {
                  backgroundColor: 'rgba(0, 77, 64, 0.08)',
                },
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isSidebarOpen ? '250px' : 0,
          transition: 'margin-left 0.3s',
          p: 3,
          minHeight: '100vh',
          mt: '64px', // Height of AppBar
          width: 'calc(100% - 250px)', // Set fixed width based on sidebar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default NutritionistDashboardLayout;