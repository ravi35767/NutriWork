import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  Avatar,
  Button,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const DateBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.primary.light,
  color: 'white',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginRight: theme.spacing(2),
}));

const AppointmentCard = ({ appointment }) => {
  return (
    <StyledPaper elevation={0}>
      <Typography variant="h6" gutterBottom>
        Next Appointment
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <DateBox>
          <Typography variant="h4" component="div">
            {appointment.date}
          </Typography>
          <Typography variant="body2">
            {appointment.month}
          </Typography>
        </DateBox>
        
        <Box>
          <Typography variant="subtitle1" fontWeight="medium">
            {appointment.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {appointment.location}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CalendarMonthIcon />}
          sx={{ textTransform: 'none' }}
        >
          View Calendar
        </Button>
        
        <Avatar 
          src="/api/placeholder/40/40" 
          alt={appointment.name}
          sx={{ width: 40, height: 40 }}
        />
      </Box>
    </StyledPaper>
  );
};

export default AppointmentCard; 