import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Button, Avatar, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import RateReviewIcon from '@mui/icons-material/RateReview';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LogoutIcon from '@mui/icons-material/Logout';
import nutriworkLogo from '../../assets/Nutriwork-logo.png';
import profile from '../../assets/profile.jpeg';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/trainer' },
    { text: 'Trainees', icon: <PeopleIcon />, path: '/trainer/trainees' },
    { text: 'Profile', icon: <PersonIcon />, path: '/trainer/profile' },
    { text: 'Reviews', icon: <RateReviewIcon />, path: '/trainer/reviews' },
    { text: 'My videos', icon: <VideoLibraryIcon />, path: '/trainer/videos' },
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        backgroundColor: '#004D40', // Dark teal color
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: isOpen ? 0 : -250,
        top: 0,
        transition: 'left 0.3s',
        zIndex: 1100,
        boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
      }}
    >
      {/* Logo and Project Name */}
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
          <img
            src={nutriworkLogo}
            alt="NutriwWrk"
            style={{
              height: '40px',
              marginRight: '10px'
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: '1.2rem',
            }}
          >
            NutriWork
          </Typography>
        </Box>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
              },
              borderRadius: '4px',
              mx: 1,
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      {/* User Profile and Logout Section */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          
          <Avatar
            sx={{ width: 60, height: 60, mb: 1, border: '2px solid white' }}
            alt="Shaheen"
            src={profile}
          />
          <Typography variant="subtitle1">Ravi</Typography>
        </Box>
        
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          Log out12
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;