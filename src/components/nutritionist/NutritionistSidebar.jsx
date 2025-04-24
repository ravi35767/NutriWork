import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Button } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Restaurant as RecipeIcon,
  CalendarToday as CalendarIcon,
  People as ClientsIcon,
  Article as ArticleIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/nutritionist/dashboard' },
  { text: 'Recipes', icon: <RecipeIcon />, path: '/nutritionist/recipes' },
  { text: 'Meal Plans', icon: <CalendarIcon />, path: '/nutritionist/meal-plans' },
  { text: 'Clients', icon: <ClientsIcon />, path: '/nutritionist/clients' },
  { text: 'Articles', icon: <ArticleIcon />, path: '/nutritionist/articles' },
];

const NutritionistSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box className="sidebar-container">
      <Box className="logo-container">
        <Typography variant="h6" className="logo-text">NutriWork</Typography>
      </Box>
      
      <List className="menu-list">
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => navigate(item.path)}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Box className="profile-section">
        <Avatar className="profile-avatar" />
        <Typography variant="subtitle1" className="profile-name">Nutritionist Name</Typography>
        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          className="logout-button"
          onClick={() => navigate('/login')}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default NutritionistSidebar; 