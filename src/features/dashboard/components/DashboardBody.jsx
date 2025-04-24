import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  Card, 
  CardContent, 
  IconButton, 
  Button,
  Divider,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';

// Mock data
const certificationData = {
  title: 'Training Certificate',
  organization: 'Tropsch Systems',
  date: 'May 2024'
};

const upcomingAppointment = {
  name: 'Husnia Karim',
  location: 'Appointment studio',
  date: '14',
  month: 'Jan'
};

const chats = [
  { id: 1, name: 'Hina', message: 'I hope you are well.', time: '2s ago', avatar: '/api/placeholder/40/40' },
  { id: 2, name: 'Hira Akbar', message: 'This afternoon at 5:30PM', time: '1 min', avatar: '/api/placeholder/40/40' },
  { id: 3, name: 'Amna mohsin', message: 'Are you ready for this after...', time: '2 mins', avatar: '/api/placeholder/40/40' },
  { id: 4, name: 'Magnus Carlson', message: 'Hi guys, How is going?', time: '5 mins', avatar: '/api/placeholder/40/40' }
];

// Generate calendar data
const generateCalendarDays = () => {
  const days = [];
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  for (let i = 29; i <= 31; i++) {
    days.push({ day: i, isCurrentMonth: false });
  }
  
  for (let i = 1; i <= 31; i++) {
    days.push({ day: i, isCurrentMonth: true, isToday: i === 14 });
  }
  
  return { daysOfWeek, days };
};

const calendar = generateCalendarDays();

// Styled components
const StatsCard = styled(Paper)({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: 8,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
});

const ProfileSection = styled(Paper)({
  padding: 0,
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
});

const ProfileHeader = styled(Box)({
  position: 'relative',
  backgroundImage: `url(/api/placeholder/400/160)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: 70,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  backgroundColor: '#004D40',
});

const ProfileAvatar = styled(Avatar)({
  width: 80,
  height: 80,
  border: '4px solid white',
  position: 'absolute',
  bottom: -40,
  left: '50%',
  transform: 'translateX(-50%)',
});

const CertificationBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    backgroundColor: '#004D40',
    color: 'white',
  }
});

const CalendarGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: 4,
  margin: '8px 0',
});

const CalendarDay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isToday' && prop !== 'isCurrentMonth'
})(({ isToday, isCurrentMonth }) => ({
  width: 28,
  height: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  fontWeight: isToday ? 'bold' : 'normal',
  color: !isCurrentMonth ? 'rgba(0, 0, 0, 0.38)' : 
          isToday ? 'white' : 'rgba(0, 0, 0, 0.87)',
  backgroundColor: isToday ? '#004D40' : 'transparent',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: isToday ? '#004D40' : 'rgba(0, 0, 0, 0.04)',
  }
}));

const DashboardBody = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <ProfileSection>
            <ProfileHeader>
              <ProfileAvatar alt={user?.firstName} src={user?.profileImage} />
            </ProfileHeader>
            
            <Box sx={{ pt: 5, px: 2, pb: 2 }}>
              <Typography variant="h6" align="center" gutterBottom color="#004D40">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {user?.yearsOfExperience || 0} Years Experience
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" fontWeight="500" gutterBottom color="#004D40">
                  Bio
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: '0.875rem' }}>
                  {user?.bio || 'No bio available'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ArticleIcon fontSize="small" sx={{ color: '#004D40' }} />
                  <Typography variant="subtitle2" fontWeight="500" color="#004D40">
                    Certificates
                  </Typography>
                </Box>
                <CertificationBadge badgeContent={1}>
                  <Box sx={{ width: 16, height: 16 }} />
                </CertificationBadge>
              </Box>
              
              <Card variant="outlined" sx={{ mb: 2, borderRadius: 1, border: '1px solid rgba(0, 77, 64, 0.12)' }}>
                <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ArticleIcon fontSize="small" sx={{ color: '#004D40' }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="caption" fontWeight="500" display="block" color="#004D40">
                        {certificationData.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {certificationData.organization} • {certificationData.date}
                      </Typography>
                    </Box>
                    <IconButton size="small" sx={{ color: '#004D40' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
              
              <Button
                fullWidth
                variant="contained"
                sx={{ 
                  bgcolor: '#004D40',
                  '&:hover': { bgcolor: '#00695C' },
                  borderRadius: 1,
                  textTransform: 'none'
                }}
                startIcon={<EditIcon />}
                size="small"
              >
                Edit Profile
              </Button>
            </Box>
          </ProfileSection>
        </Grid>
        
        {/* Stats Section */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Total Clients */}
            <Grid item xs={12} sm={6}>
              <StatsCard>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Total Clients
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="500" color="#004D40">
                      120
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(0, 77, 64, 0.1)', color: '#004D40' }}>
                    <PersonIcon />
                  </Avatar>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUpIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="success.main">
                    8.5% Up from yesterday
                  </Typography>
                </Box>
              </StatsCard>
            </Grid>
            
            {/* Active Clients */}
            <Grid item xs={12} sm={6}>
              <StatsCard>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Active Clients
                    </Typography>
                    <Typography variant="h4" component="div" fontWeight="500" color="#004D40">
                      105
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(0, 77, 64, 0.1)', color: '#004D40' }}>
                    <PersonIcon />
                  </Avatar>
                </Box>
              </StatsCard>
            </Grid>
            
            {/* Upcoming Appointment */}
            <Grid item xs={12}>
              <StatsCard>
                <Typography variant="body1" fontWeight="500" gutterBottom color="#004D40">
                  Upcoming Appointment
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                  <Avatar alt={upcomingAppointment.name} src="/api/placeholder/50/50" sx={{ width: 50, height: 50 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="500" color="#004D40">
                      {upcomingAppointment.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {upcomingAppointment.location}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    bgcolor: '#004D40', 
                    color: 'white', 
                    borderRadius: 1,
                    p: 1,
                    textAlign: 'center',
                    minWidth: 54
                  }}>
                    <Typography variant="h5" fontWeight="bold">
                      {upcomingAppointment.date}
                    </Typography>
                    <Typography variant="caption" component="div">
                      {upcomingAppointment.month}
                    </Typography>
                  </Box>
                </Box>
              </StatsCard>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Calendar Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" fontWeight="500" color="#004D40">
                Appointment Schedule
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="small" sx={{ color: '#004D40' }}>
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
                <Typography variant="body2" sx={{ mx: 1, color: '#004D40' }}>
                  January 2024
                </Typography>
                <IconButton size="small" sx={{ color: '#004D40' }}>
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            
            <CalendarGrid>
              {calendar.daysOfWeek.map((day) => (
                <Typography
                  key={day}
                  variant="caption"
                  align="center"
                  sx={{ fontWeight: 500, color: '#004D40' }}
                >
                  {day}
                </Typography>
              ))}
              
              {calendar.days.map((day, index) => (
                <CalendarDay
                  key={index}
                  isToday={day.isToday}
                  isCurrentMonth={day.isCurrentMonth}
                >
                  {day.day}
                </CalendarDay>
              ))}
            </CalendarGrid>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <Button 
                size="small"
                sx={{ 
                  fontSize: '0.8rem',
                  color: '#004D40',
                  textTransform: 'none'
                }}
                endIcon={<MoreVertIcon fontSize="small" />}
              >
                Session
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Chats Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" fontWeight="500" color="#004D40">
                Chats
              </Typography>
              <Button
                size="small"
                sx={{ 
                  fontSize: '0.8rem',
                  color: '#004D40',
                  textTransform: 'none'
                }}
              >
                View All
              </Button>
            </Box>
            
            <List sx={{ p: 0 }}>
              {chats.map((chat, index) => (
                <React.Fragment key={chat.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar alt={chat.name} src={chat.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" component="span" fontWeight="500" color="#004D40">
                          {chat.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary" component="span">
                          {chat.message}
                        </Typography>
                      }
                      sx={{ m: 0 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {chat.time}
                    </Typography>
                  </ListItem>
                  {index < chats.length - 1 && (
                    <Divider variant="inset" component="li" sx={{ my: 1 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardBody; 