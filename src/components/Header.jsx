import React from 'react';
import { Box, IconButton, AppBar, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

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

  // Check if current page is Dashboard and user is a trainer
  const isTrainerDashboard = location.pathname === '/dashboard' && user?.role === 'trainer';

  return (
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
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          minWidth: 'fit-content',
          zIndex: 1
        }}>
          {isTrainerDashboard && (
            <>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#004D40',
                  '&:hover': {
                    backgroundColor: '#00695C',
                  },
                  textTransform: 'none',
                  minWidth: '120px',
                  height: '36px'
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
                  minWidth: '120px',
                  height: '36px'
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
  );
};

export default Header;