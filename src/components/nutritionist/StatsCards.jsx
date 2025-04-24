import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  Grid,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  height: '100%',
}));

const StatCard = ({ title, value, icon, progress }) => {
  return (
    <StyledPaper elevation={0}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ 
          backgroundColor: 'primary.light', 
          borderRadius: '50%', 
          p: 1,
          mr: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" component="div">
            {value}
          </Typography>
        </Box>
      </Box>
      {progress !== undefined && (
        <Box sx={{ mt: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              backgroundColor: 'rgba(0, 77, 64, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'primary.main'
              }
            }} 
          />
        </Box>
      )}
    </StyledPaper>
  );
};

const StatsCards = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StatCard
          title="Total Clients"
          value="24"
          icon={<PeopleIcon sx={{ color: 'white' }} />}
        />
      </Grid>
      <Grid item xs={12}>
        <StatCard
          title="Meal Plans Created"
          value="156"
          icon={<RestaurantIcon sx={{ color: 'white' }} />}
          progress={75}
        />
      </Grid>
      <Grid item xs={12}>
        <StatCard
          title="Success Rate"
          value="92%"
          icon={<TrendingUpIcon sx={{ color: 'white' }} />}
          progress={92}
        />
      </Grid>
    </Grid>
  );
};

export default StatsCards; 