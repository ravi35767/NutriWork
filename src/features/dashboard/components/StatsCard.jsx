import React from 'react';
import { Paper, Box, Typography, Grid } from '@mui/material';
import { People, VideoLibrary, Star, FitnessCenter } from '@mui/icons-material';

const StatsCard = () => {
  const stats = [
    { icon: <People />, label: 'Trainees', value: '150+' },
    { icon: <VideoLibrary />, label: 'Videos', value: '50+' },
    { icon: <Star />, label: 'Reviews', value: '4.8' },
    { icon: <FitnessCenter />, label: 'Programs', value: '10+' },
  ];

  return (
    <Paper sx={{ p: 2, borderRadius: 2 }}>
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                }}
              >
                {stat.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default StatsCard; 