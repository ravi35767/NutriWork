import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const VideoCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const CardActions = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px 16px',
  backgroundColor: 'background.default',
});

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: 'Full Body Workout',
    description: 'A comprehensive full body workout routine for beginners',
    thumbnail: 'https://placehold.co/600x400',
    views: 1234,
    uploadDate: '2024-02-15',
    duration: '45:30',
  },
  {
    id: 2,
    title: 'HIIT Training',
    description: 'High-intensity interval training for advanced fitness levels',
    thumbnail: 'https://placehold.co/600x400',
    views: 856,
    uploadDate: '2024-02-10',
    duration: '30:15',
  },
  // Add more mock videos as needed
];

// Stats data
const statsData = [
  { label: 'Total Videos', value: 25 },
  { label: 'Total Views', value: '12.5K' },
  { label: 'Average Duration', value: '35 min' },
];

const MyVideos = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (videoId) => {
    // Implement edit functionality
    console.log('Edit video:', videoId);
  };

  const handleDelete = (videoId) => {
    // Implement delete functionality
    console.log('Delete video:', videoId);
  };

  const handleView = (videoId) => {
    // Implement view functionality
    console.log('View video:', videoId);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Videos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: '#004D40' }}
        >
          Upload Video
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h4">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Search videos..."
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'action.active' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Videos Grid */}
      <Grid container spacing={3}>
        {mockVideos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <VideoCard>
              <CardMedia
                component="img"
                height="200"
                image={video.thumbnail}
                alt={video.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {video.description}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <VisibilityIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {video.views} views
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • {video.uploadDate}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" onClick={() => handleView(video.id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleEdit(video.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(video.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {video.duration}
                </Typography>
              </CardActions>
            </VideoCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyVideos; 