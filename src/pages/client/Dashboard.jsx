import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StatsCard = styled(Card)({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#fff',
});

const SessionCard = styled(Card)({
  backgroundColor: '#004D40',
  color: '#fff',
  padding: '20px',
});

const ChatPreview = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
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

const ClientDashboard = () => {
  // Mock data
  const client = {
    name: 'Client Name',
    experience: '4 Years Experience',
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    avatar: '/path-to-avatar.jpg',
  };

  const stats = {
    totalTrainers: 120,
    activeTrainers: 10,
    growth: '8.5% Up from yesterday'
  };

  const upcomingSession = {
    day: 14,
    month: 'Jan',
    title: 'Training Session with John',
    duration: '30 minutes session'
  };

  const recentChats = [
    { name: 'Hina', message: 'I hope you are well.', time: '2s ago', avatar: '/path-to-hina.jpg' },
    { name: 'Hira Absar', message: 'This afternoon at 5:30PM', time: '1 min', avatar: '/path-to-hira.jpg' },
    { name: 'Amna mohsin', message: 'Are you ready for this after...', time: '2 mins', avatar: '/path-to-amna.jpg' },
    { name: 'Magnus Carlson', message: 'Hi guys, How is going?', time: '5 mins', avatar: '/path-to-magnus.jpg' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, gap: 2 }}>
        <HeaderButton variant="contained">
          Upload Video
        </HeaderButton>
        <HeaderButton variant="contained">
          Create session
        </HeaderButton>
      </Box>
      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={client.avatar}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h6">{client.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {client.experience}
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom>Bio</Typography>
              <Typography variant="body2" color="text.secondary">
                {client.bio}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>Certifications</Typography>
                <Card variant="outlined" sx={{ p: 2, mb: 1 }}>
                  <Typography variant="body2">Client Certificate</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Client System
                  </Typography>
                  <Typography variant="caption" display="block" color="text.secondary">
                    May 2024
                  </Typography>
                </Card>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats and Activities Section */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Stats Cards */}
            <Grid item xs={12} md={6}>
              <StatsCard>
                <Box>
                  <Typography variant="h6">Total Trainers</Typography>
                  <Typography variant="h3">{stats.totalTrainers}</Typography>
                  <Typography variant="body2" color="success.main">
                    {stats.growth}
                  </Typography>
                </Box>
              </StatsCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <StatsCard>
                <Box>
                  <Typography variant="h6">Active Trainers</Typography>
                  <Typography variant="h3">{stats.activeTrainers}</Typography>
                </Box>
              </StatsCard>
            </Grid>

            {/* Upcoming Session */}
            <Grid item xs={12} md={6}>
              <SessionCard>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Upcoming Session</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">{upcomingSession.day}</Typography>
                    <Typography>{upcomingSession.month}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6">{upcomingSession.title}</Typography>
                    <Typography variant="body2">{upcomingSession.duration}</Typography>
                  </Box>
                </Box>
              </SessionCard>
            </Grid>

            {/* Chats Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Chats</Typography>
                    <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                      View All
                    </Typography>
                  </Box>
                  <Stack spacing={2}>
                    {recentChats.map((chat, index) => (
                      <ChatPreview key={index}>
                        <Avatar src={chat.avatar} sx={{ mr: 2 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2">{chat.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {chat.message}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {chat.time}
                        </Typography>
                      </ChatPreview>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientDashboard; 