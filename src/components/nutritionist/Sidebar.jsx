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
  Restaurant as RecipeIcon,
  MenuBook as MealPlanIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LogoImage from '../../assets/Nutriwork-logo.png'
const SidebarContainer = styled(Box)({
  minWidth: '300px',
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
  width: 'auto'
});

const MenuItem = styled(ListItem)({
  padding: '8px 16px',
  margin: '4px 24px',
  borderRadius: '12px',
  height: '40px',
  width: 'auto',
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
  margin: '0 24px 20px',
  height: '40px',
  width: '100%',
  backgroundColor: '#fff',
  color: '#004D40',
  borderRadius: '12px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/nutritionist' },
      { text: 'My Recipes', icon: <RecipeIcon />, path: '/nutritionist/my-recipes' },
      { text: 'Meal Plans', icon: <MealPlanIcon />, path: '/nutritionist/meal-plans' },
    { text: 'Clients', icon: <GroupIcon />, path: '/nutritionist/clients' },
    { text: 'My Articles', icon: <ArticleIcon />, path: '/nutritionist/my-articles' },
    { text: 'Profile', icon: <PersonIcon />, path: '/nutritionist/profile' },
  ];

  return (
    <SidebarContainer>
      <Logo>
        <Box sx={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={LogoImage}
            alt="Nutriwork Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Box>
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
            <ListItemIcon sx={{ color: '#fff', minWidth: '40px' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </MenuList>

      <ProfileSection>
        <Avatar
          src="/path-to-nutritionist-image.jpg"
          sx={{ width: 64, height: 64 }}
        />
        <Typography variant="subtitle1">Shaheen</Typography>
        <LogoutButton variant="contained" fullWidth>
          Log out
        </LogoutButton>
      </ProfileSection>
    </SidebarContainer>
  );
};

export default Sidebar; 