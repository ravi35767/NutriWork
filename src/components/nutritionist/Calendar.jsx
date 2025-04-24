import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  Grid,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const CalendarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const DayCell = styled(Box)(({ theme, isToday, isSelected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 32,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
  color: isSelected ? 'white' : isToday ? theme.palette.primary.main : 'inherit',
  fontWeight: isToday || isSelected ? 'bold' : 'normal',
  '&:hover': {
    backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.action.hover,
  },
}));

const Calendar = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Generate days for the current month
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();
  
  const calendarDays = [];
  let dayCounter = 1;

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <StyledPaper elevation={0}>
      <CalendarHeader>
        <Typography variant="h6">
          {currentMonth} {currentYear}
        </Typography>
        <Box>
          <IconButton size="small">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton size="small">
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </CalendarHeader>

      <Grid container spacing={1}>
        {days.map((day) => (
          <Grid item xs key={day}>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              align="center"
              sx={{ display: 'block', mb: 1 }}
            >
              {day}
            </Typography>
          </Grid>
        ))}

        {calendarDays.map((day, index) => (
          <Grid item xs key={index}>
            {day ? (
              <DayCell 
                isToday={day === currentDay}
                isSelected={day === currentDay}
              >
                {day}
              </DayCell>
            ) : (
              <Box sx={{ height: 32 }} />
            )}
          </Grid>
        ))}
      </Grid>
    </StyledPaper>
  );
};

export default Calendar; 