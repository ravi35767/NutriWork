import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

const DashboardProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Avatar
        src={user?.profileImage}
        alt={`${user?.firstName} ${user?.lastName}`}
        sx={{
          width: 120,
          height: 120,
          mx: 'auto',
          mb: 2,
          border: '4px solid',
          borderColor: 'primary.main'
        }}
      />
      <Typography variant="h5" gutterBottom>
        {user?.firstName} {user?.lastName}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {user?.role === 'trainer' ? 'Fitness Trainer' : 'Nutritionist'}
      </Typography>
      {user?.bio && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 3 }}>
          {user.bio}
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Experience: {user?.yearsOfExperience || 0} years
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Email: {user?.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Phone: {user?.phone}
        </Typography>
      </Box>
      <Button
        startIcon={<EditIcon />}
        onClick={handleEditProfile}
        variant="outlined"
        sx={{ mt: 3 }}
      >
        Edit Profile
      </Button>
    </Box>
  );
};

export default DashboardProfile; 