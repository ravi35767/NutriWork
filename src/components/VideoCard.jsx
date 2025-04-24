import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const VideoCard = ({ video }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <CardMedia
        component="img"
        height="200"
        image={video.thumbnail}
        alt={video.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography 
          gutterBottom 
          variant="subtitle1" 
          component="div"
          sx={{ 
            fontWeight: 600,
            color: '#213547',
            fontSize: '1rem',
            lineHeight: 1.2,
            mb: 1
          }}
        >
          {video.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontSize: '0.875rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {video.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default VideoCard; 