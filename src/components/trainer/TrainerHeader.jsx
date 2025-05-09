import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';

const HeaderContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 32px',
  backgroundColor: '#fff',
  borderBottom: '1px solid #f0f0f0',
});

const ActionButtons = styled(Box)({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
});

const HeaderButton = styled(Button)({
  backgroundColor: '#004D40',
  color: '#fff',
  textTransform: 'none',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: '#00695C',
  },
});

const TrainerHeader = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Typography
        variant="h6"
        sx={{
          fontSize: '20px',
          fontWeight: 500,
        }}
      >
        Dashboard
      </Typography>
      <ActionButtons>
        <HeaderButton variant="contained">
          Upload Video
        </HeaderButton>
        {user?.role === 'trainer' && (
          <HeaderButton variant="contained">
            Create New User
          </HeaderButton>
        )}
        <HeaderButton variant="contained" onClick={() => navigate('/trainer/create-session')}>
          Create session
        </HeaderButton>
        <IconButton sx={{ color: '#004D40' }}>
          <NotificationsIcon />
        </IconButton>
      </ActionButtons>
    </HeaderContainer>
  );
};

export default TrainerHeader;
