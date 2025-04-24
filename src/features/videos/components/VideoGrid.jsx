import React from 'react';
import { Grid } from '@mui/material';
import VideoCard from './VideoCard';

const VideoGrid = ({ videos }) => {
  return (
    <Grid container spacing={3}>
      {videos.map((video) => (
        <Grid item xs={12} sm={6} md={4} key={video.id}>
          <VideoCard video={video} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoGrid; 