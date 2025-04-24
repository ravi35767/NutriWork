import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Restaurant as RecipeIcon,
  Article as ArticleIcon,
  MenuBook as MealPlanIcon,
} from "@mui/icons-material";

const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 16px',
  backgroundColor: '#fff',
  borderBottom: '1px solid #f0f0f0',
  minHeight: '64px',
  width: '100%',
});

const LeftSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

const ActionButtons = styled(Box)({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
});

const NutritionistHeader = ({ onToggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <IconButton
          onClick={onToggleSidebar}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ color: '#004D40' }}
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '20px',
            fontWeight: 500,
          }}
        >
          Dashboard
        </Typography>
      </LeftSection>
      <ActionButtons>
        <IconButton
          onClick={handleClick}
          sx={{
            backgroundColor: "#004D40",
            color: "white",
            "&:hover": {
              backgroundColor: "#003D32",
            },
          }}
        >
          <AddIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <CalendarIcon fontSize="small" />
            </ListItemIcon>
            Create Appointment
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <RecipeIcon fontSize="small" />
            </ListItemIcon>
            Upload Recipe
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ArticleIcon fontSize="small" />
            </ListItemIcon>
            Upload Article
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <MealPlanIcon fontSize="small" />
            </ListItemIcon>
            Create Meal Plan
          </MenuItem>
        </Menu>
        <IconButton sx={{ color: '#004D40' }}>
          <NotificationsIcon />
        </IconButton>
      </ActionButtons>
    </HeaderContainer>
  );
};

export default NutritionistHeader; 