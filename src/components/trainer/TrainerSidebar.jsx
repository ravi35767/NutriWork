import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Star as StarIcon,
  VideoLibrary as VideoIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled(Box)({
  width: '300px',
  height: '100vh',
  backgroundColor: '#004D40',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
});

const Logo = styled(Box)({
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const MenuList = styled(List)({
  padding: '20px 0',
  flex: 1,
});

const MenuItem = styled(ListItem)({
  padding: '8px 16px',
  margin: '4px 24px',
  borderRadius: '12px',
  height: '40px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&.active': {
    backgroundColor: '#fff',
    color: '#004D40',
    '& .MuiListItemIcon-root': {
      color: '#004D40',
      minWidth: '36px',
    },
  },
  '& .MuiListItemIcon-root': {
    minWidth: '36px',
    color: '#fff',
  },
  '& .MuiListItemText-root': {
    margin: 0,
  },
});

const ProfileSection = styled(Box)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
});

const LogoutButton = styled(Button)({
  width: '100%',
  color: '#004D40',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const TrainerSidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/trainer' },
    { text: 'Trainees', icon: <GroupIcon />, path: '/trainer/trainees' },
    { text: 'Profile', icon: <PersonIcon />, path: '/trainer/profile' },
    { text: 'Reviews', icon: <StarIcon />, path: '/trainer/reviews' },
    { text: 'My videos', icon: <VideoIcon />, path: '/trainer/videos' },
  ];

  return (
    <SidebarContainer>
      <Logo>
        <Typography variant="h6" component="div">
          Nutriwork
        </Typography>
      </Logo>

      <MenuList>
        {menuItems.map((item) => (
          <MenuItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            className={window.location.pathname === item.path ? 'active' : ''}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </MenuList>

      <ProfileSection>
        <Avatar
          src="/path-to-trainer-image.jpg"
          sx={{ width: 64, height: 64 }}
        />
        <Typography variant="subtitle1">Shaheen</Typography>
        <LogoutButton variant="contained" fullWidth>
          Log out12
        </LogoutButton>
      </ProfileSection>
    </SidebarContainer>
  );
};

export default TrainerSidebar; 