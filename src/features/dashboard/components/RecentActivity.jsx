import React from 'react';
import { Paper, Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import { FitnessCenter, VideoLibrary, People, Star } from '@mui/icons-material';

const RecentActivity = () => {
  const activities = [
    {
      icon: <FitnessCenter />,
      primary: 'New Workout Program Created',
      secondary: 'Full Body Strength Training',
      time: '2 hours ago',
    },
    {
      icon: <VideoLibrary />,
      primary: 'New Video Uploaded',
      secondary: 'HIIT Workout for Beginners',
      time: '5 hours ago',
    },
    {
      icon: <People />,
      primary: 'New Trainee Joined',
      secondary: 'John Doe started your program',
      time: '1 day ago',
    },
    {
      icon: <Star />,
      primary: 'New Review Received',
      secondary: '5 stars - "Amazing workout program!"',
      time: '2 days ago',
    },
  ];

  return (
    <Paper sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Recent Activity
      </Typography>
      <List>
        {activities.map((activity, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  {activity.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={activity.primary}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {activity.secondary}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', mt: 0.5 }}
                    >
                      {activity.time}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < activities.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default RecentActivity; 