import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import VideoGrid from '../components/VideoGrid';
import { videos } from '../data/mockVideos';

const MyVideos = () => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 2 }}>
      <Container maxWidth="xl">
        <Typography variant="h5" sx={{ mb: 3, color: '#004D40', fontWeight: 600 }}>
          My Videos
        </Typography>
        <VideoGrid videos={videos} />
      </Container>
    </Box>
  );
};

export default MyVideos; 