import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  color: '#004D40',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'fixed',
  width: '100%',
  zIndex: theme.zIndex.drawer + 1,
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(0.5, 2),
  marginRight: theme.spacing(2),
  flex: 1,
  maxWidth: 400,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const Header = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledAppBar>
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>

        <SearchBox>
          <SearchIcon sx={{ color: 'gray', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Search...
          </Typography>
        </SearchBox>

        <IconButton color="inherit" sx={{ mr: 2 }}>
          <NotificationsIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header; 