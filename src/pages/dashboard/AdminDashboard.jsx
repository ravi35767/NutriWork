import React, { useEffect, useState } from 'react'; // Added useState
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAdminStats } from '../../redux/adminSlice';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  CircularProgress, 
  Alert, 
  Link as MuiLink,
  Select, 
  MenuItem, 
  FormControl 
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; 
import SpaIcon from '@mui/icons-material/Spa'; 
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 

// Reusable Stat Card component for Admin Dashboard
const AdminStatCard = ({ 
  title, 
  value, 
  icon, 
  linkTo, 
  timeframeOptions, 
  selectedTimeframe, 
  onTimeframeChange 
}) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    // Prevent navigation if clicking on the select dropdown or its children
    if (e.target.closest('.timeframe-select-wrapper')) { 
        return;
    }
    if (linkTo) {
      navigate(linkTo);
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', // Align items start
        borderRadius: 2, 
        position: 'relative', 
        cursor: linkTo ? 'pointer' : 'default',
        minHeight: 120, 
        '&:hover': { boxShadow: linkTo ? 6 : 3 }
      }}
      onClick={handleClick}
    >
      {/* Main Content */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 2, color: 'primary.main' }}>{icon}</Box>
        <Box>
          <Typography variant="h5" fontWeight="bold">{value ?? 'N/A'}</Typography>
          <Typography variant="body2" color="text.secondary">{title}</Typography>
        </Box>
      </Box>

      {/* Timeframe Selector (Top Right) */}
      {timeframeOptions && onTimeframeChange && (
         // Added wrapper div with class for click prevention
        <Box className="timeframe-select-wrapper" sx={{ position: 'absolute', top: 8, right: 8 }}>
          <FormControl size="small" variant="standard" >
            <Select
              value={selectedTimeframe}
              onChange={onTimeframeChange}
              disableUnderline
              sx={{ fontSize: '0.75rem', '.MuiSelect-select': { paddingRight: '18px !important', paddingTop: '2px', paddingBottom: '2px' } }} 
            >
              {timeframeOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '0.75rem' }}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Paper> // Correct closing tag placement
  );
};


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { adminStats, loadingStats, errorStats } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth); 
  const [newUserTimeframe, setNewUserTimeframe] = useState('24h'); // State for timeframe

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  const handleTimeframeChange = (event) => {
    setNewUserTimeframe(event.target.value);
  };

  // Determine which signup count to display based on state
  const getSignupCount = () => {
    if (!adminStats?.signupCounts) return 'N/A';
    switch (newUserTimeframe) {
      case '7d': return adminStats.signupCounts.last7Days ?? 'N/A';
      case '30d': return adminStats.signupCounts.last30Days ?? 'N/A';
      case '24h':
      default: return adminStats.signupCounts.last24Hours ?? 'N/A';
    }
  };

  const timeframeOptions = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.firstName || ''}!
      </Typography>

      {loadingStats && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      {errorStats && <Alert severity="error" sx={{ mb: 2 }}>{errorStats}</Alert>}
      
      {!loadingStats && adminStats && (
        <Grid container spacing={3}>
          {/* Make cards take up half the width on medium screens */}
          <Grid item xs={12} sm={6} md={6}> 
            <AdminStatCard 
              title="Total Users" 
              value={adminStats.totalUserCount ?? 'N/A'} 
              icon={<GroupIcon fontSize="large" />}
              linkTo="/admin/users" 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}> 
             <AdminStatCard 
              title="Pending Verifications" 
              value={adminStats.totalPendingVerificationCount ?? 'N/A'} 
              icon={<PendingActionsIcon fontSize="large" />}
              linkTo="/admin/verify" 
            />
          </Grid>
           <Grid item xs={12} sm={6} md={6}> 
             <AdminStatCard 
              title="Open Reports" 
              value={adminStats.totalReportsCount ?? 'N/A'} 
              icon={<ReportProblemIcon fontSize="large" />}
              linkTo="/admin/moderation" 
            />
          </Grid>
           <Grid item xs={12} sm={6} md={6}> 
             <AdminStatCard 
              title="Total Trainers" 
              value={adminStats.totalTrainers ?? 'N/A'} 
              icon={<FitnessCenterIcon fontSize="large" />}
              linkTo="/admin/users?role=trainer" 
            />
          </Grid>
           <Grid item xs={12} sm={6} md={6}> 
             <AdminStatCard 
              title="Total Nutritionists" 
              value={adminStats.totalNutritionists ?? 'N/A'} 
              icon={<SpaIcon fontSize="large" />}
              linkTo="/admin/users?role=nutritionist" 
            />
          </Grid>
           <Grid item xs={12} sm={6} md={6}> 
             <AdminStatCard 
              title="New Users" // Title updated
              value={getSignupCount()} // Get value based on selected timeframe
              icon={<AccessTimeIcon fontSize="large" />}
              timeframeOptions={timeframeOptions} // Pass options
              selectedTimeframe={newUserTimeframe} // Pass selected value
              onTimeframeChange={handleTimeframeChange} // Pass change handler
            />
          </Grid>
        </Grid>
      )}
      
    </Box>
  );
};

export default AdminDashboard;
