import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputAdornment,
  TextareaAutosize,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Styled components for custom styling
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 8,
  maxWidth: 420,
  margin: '0 auto',
  boxShadow: 'none',
  backgroundColor: 'white',
}));

const StyledFormLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: '#333333',
  fontWeight: 500,
  fontSize: '0.875rem',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F8F9FC',
    borderRadius: 4,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#084043',
      borderWidth: 1,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E0E0E0',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px 14px',
    fontSize: '0.875rem',
    '&::placeholder': {
      color: '#9E9E9E',
      opacity: 1,
    },
  },
}));

const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  padding: '12px 14px',
  borderRadius: 4,
  backgroundColor: '#F8F9FC',
  border: '1px solid #E0E0E0',
  fontFamily: theme.typography.fontFamily,
  fontSize: '0.875rem',
  resize: 'none',
  minHeight: '80px',
  '&:focus': {
    borderColor: '#084043',
    outline: 'none',
  },
  '&::placeholder': {
    color: '#9E9E9E',
    opacity: 1,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: '10px 16px',
  borderRadius: 4,
  textTransform: 'none',
  fontWeight: 500,
  boxShadow: 'none',
  width: '100%',
  fontSize: '0.875rem',
}));

const CancelButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: 'white',
  border: '1px solid #E0E0E0',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: '#F5F5F5',
    boxShadow: 'none',
  },
}));

const AddButton = styled(ActionButton)(({ theme }) => ({
  backgroundColor: '#084043',
  color: 'white',
  '&:hover': {
    backgroundColor: '#052b2d',
    boxShadow: 'none',
  },
}));

// Simple calendar dialog
const SimpleCalendarDialog = ({ open, onClose, onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const handleDateSelect = () => {
    onSelect(selectedDate);
    onClose();
  };
  
  // Generate days for the calendar
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Date</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: 280, gap: 0.5 }}>
          {days.map((day) => (
            <Button 
              key={day}
              variant={selectedDate.getDate() === day ? "contained" : "outlined"}
              color={selectedDate.getDate() === day ? "primary" : "inherit"}
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(day);
                setSelectedDate(newDate);
              }}
              sx={{ 
                minWidth: 36, 
                height: 36,
                margin: 0.2
              }}
            >
              {day}
            </Button>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDateSelect} variant="contained">Select</Button>
      </DialogActions>
    </Dialog>
  );
};

// Simple time picker dialog
const SimpleTimeDialog = ({ open, onClose, onSelect }) => {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState('PM');
  
  const handleTimeSelect = () => {
    // Convert to 24-hour format for internal use
    let hour24 = hours;
    if (period === 'PM' && hours < 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    const timeStr = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    onSelect(timeStr);
    onClose();
  };
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Time</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, py: 2 }}>
          <Select
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            sx={{ width: 70 }}
          >
            {Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i)).map((hour) => (
              <MenuItem key={hour} value={hour}>{hour}</MenuItem>
            ))}
          </Select>
          <Typography variant="h5">:</Typography>
          <Select
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            sx={{ width: 70 }}
          >
            {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
              <MenuItem key={minute} value={minute}>{minute.toString().padStart(2, '0')}</MenuItem>
            ))}
          </Select>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            sx={{ width: 70 }}
          >
            <MenuItem value="AM">AM</MenuItem>
            <MenuItem value="PM">PM</MenuItem>
          </Select>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleTimeSelect} variant="contained">Select</Button>
      </DialogActions>
    </Dialog>
  );
};

// Function to create a custom select with right styling
const CustomSelect = ({ label, value, onChange, options, placeholder }) => {
  return (
    <Box mb={3}>
      <StyledFormLabel>{label}</StyledFormLabel>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F8F9FC',
            borderRadius: 1,
            border: '1px solid #E0E0E0',
            height: 45,
            width: '100%',
            mb: 2,
            overflow: 'hidden'
          }}
        >
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              padding: '0 14px',
              backgroundColor: 'transparent',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              fontSize: '0.875rem',
              fontFamily: 'inherit',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {placeholder && (
              <option value="" disabled>{placeholder}</option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Box
            sx={{
              backgroundColor: '#084043',
              height: '100%',
              width: 42,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0 4px 4px 0',
              pointerEvents: 'none',
            }}
          >
            <KeyboardArrowDownIcon sx={{ color: 'white' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const CreateNewSession = () => {
  const [traineeName, setTraineeName] = useState('');
  const [sessionDate, setSessionDate] = useState(null);
  const [sessionTime, setSessionTime] = useState('');
  const [notes, setNotes] = useState('');
  const [frequency, setFrequency] = useState('Everyday');
  
  // Dialog states
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      traineeName,
      sessionDate,
      sessionTime,
      notes,
      frequency
    });
    alert('Form submitted successfully!');
  };
  
  // Format date for display
  const formattedDate = sessionDate 
    ? `${sessionDate.getMonth() + 1}/${sessionDate.getDate()}/${sessionDate.getFullYear()}`
    : '';

  // Trainee options
  const traineeOptions = [
    { value: 'John', label: 'John' },
    { value: 'Sarah', label: 'Sarah' },
    { value: 'Michael', label: 'Michael' }
  ];

  // Frequency options
  const frequencyOptions = [
    { value: 'Everyday', label: 'Everyday' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' }
  ];

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <StyledPaper>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          {/* Trainee Dropdown */}
          <CustomSelect
            label="Trainee Name"
            value={traineeName}
            onChange={setTraineeName}
            options={traineeOptions}
            placeholder="Trainee"
          />

          {/* Date Picker */}
          <Box mb={3}>
            <StyledFormLabel>Date</StyledFormLabel>
            <Box sx={{ position: 'relative' }}>
              <StyledTextField
                fullWidth
                placeholder="Enter the date"
                value={formattedDate}
                onClick={() => setDateDialogOpen(true)}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon 
                        style={{ color: '#084043', cursor: 'pointer' }} 
                        onClick={() => setDateDialogOpen(true)}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
            <SimpleCalendarDialog 
              open={dateDialogOpen} 
              onClose={() => setDateDialogOpen(false)} 
              onSelect={(date) => setSessionDate(date)} 
            />
          </Box>

          {/* Time Picker */}
          <Box mb={3}>
            <StyledFormLabel>Time</StyledFormLabel>
            <Box sx={{ position: 'relative' }}>
              <StyledTextField
                fullWidth
                placeholder="Enter your timedate"
                value={sessionTime}
                onClick={() => setTimeDialogOpen(true)}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccessTimeIcon 
                        style={{ color: '#084043', cursor: 'pointer' }} 
                        onClick={() => setTimeDialogOpen(true)}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
            <SimpleTimeDialog
              open={timeDialogOpen}
              onClose={() => setTimeDialogOpen(false)}
              onSelect={(time) => setSessionTime(time)}
            />
          </Box>

          {/* Notes */}
          <Box mb={3}>
            <StyledFormLabel>Notes</StyledFormLabel>
            <StyledTextArea
              minRows={3}
              placeholder="Write any notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Box>

          {/* Frequency Dropdown */}
          <CustomSelect
            label="How often"
            value={frequency}
            onChange={setFrequency}
            options={frequencyOptions}
          />

          {/* Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CancelButton type="button">
                Cancel
              </CancelButton>
            </Grid>
            <Grid item xs={6}>
              <AddButton type="submit">
                Add Now
              </AddButton>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default CreateNewSession;