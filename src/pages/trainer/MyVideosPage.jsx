import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const VideoCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const VideoActions = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 16px',
  backgroundColor: '#f5f5f5',
});

const MyVideosPage = () => {
  // Mock data for videos
  const videos = [
    {
      id: 1,
      title: 'Full Body Workout',
      thumbnail: 'https://placehold.co/600x400',
      duration: '45:00',
      views: 1234,
      uploadDate: '2024-02-15',
    },
    {
      id: 2,
      title: 'HIIT Training Session',
      thumbnail: 'https://placehold.co/600x400',
      duration: '30:00',
      views: 856,
      uploadDate: '2024-02-10',
    },
    {
      id: 3,
      title: 'Yoga for Beginners',
      thumbnail: 'https://placehold.co/600x400',
      duration: '60:00',
      views: 2345,
      uploadDate: '2024-02-05',
    },
    // Add more videos as needed
  ];

  const handlePlay = (videoId) => {
    console.log('Play video:', videoId);
  };

  const handleEdit = (videoId) => {
    console.log('Edit video:', videoId);
  };

  const handleDelete = (videoId) => {
    console.log('Delete video:', videoId);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Videos
      </Typography>

      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <VideoCard>
              <CardMedia
                component="img"
                height="200"
                image={video.thumbnail}
                alt={video.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {video.title}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Duration: {video.duration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Views: {video.views}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" display="block">
                  Uploaded on {video.uploadDate}
                </Typography>
              </CardContent>
              <VideoActions>
                <IconButton onClick={() => handlePlay(video.id)} color="primary">
                  <PlayIcon />
                </IconButton>
                <Box>
                  <IconButton onClick={() => handleEdit(video.id)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(video.id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </VideoActions>
            </VideoCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyVideosPage; 