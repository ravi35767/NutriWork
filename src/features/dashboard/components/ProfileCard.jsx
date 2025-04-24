import React from 'react';
import { Paper, Box, Typography, Avatar } from '@mui/material';
import profile from '../../../assets/profile.jpeg';
import gymExercise from '../../../assets/gym-exercises.jpeg';

const ProfileCard = () => {
  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* Profile Header with Background */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 120, sm: 140 },
          backgroundImage: `url(${gymExercise})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        {/* Profile Image */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translate(-50%, 50%)',
            width: { xs: 56, sm: 64 },
            height: { xs: 56, sm: 64 },
            borderRadius: '50%',
            border: '3px solid white',
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
        >
          <img
            src={profile}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>

      {/* Profile Content */}
      <Box sx={{ pt: { xs: 3, sm: 3.5 }, pb: { xs: 1.25, sm: 1.5 }, px: { xs: 1.5, sm: 2 } }}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '1rem', sm: '1.125rem' } }}>
          Shaheen
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: { xs: 0.75, sm: 1 }, display: 'block' }}>
          4 Years Experience
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 0.5, color: '#004D40', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Bio
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 0.75, sm: 1 }, display: 'block', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProfileCard; 