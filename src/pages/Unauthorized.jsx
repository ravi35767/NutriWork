import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Container } from '@mui/material';
import backgroundImage from "../assets/unauthorized-illustration.png";

const Unauthorized = () => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left Side - Image Only, No Text or Button */}
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* Right Side - Unauthorized Message */}
      {/* <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          backgroundColor: '#fff',
        }}
      >
        <Container maxWidth="sm">
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Unauthorized Access
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              You do not have permission to view this page. Please login or return to the homepage.
            </Typography>

            <Button
              component={Link}
              to="/"
              variant="contained"
              sx={{ 
                mr: 2, 
                backgroundColor: '#0097A7', 
                '&:hover': { backgroundColor: '#007c91' } 
              }}
            >
              Go to Homepage
            </Button>

            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                borderColor: '#0097A7',
                color: '#0097A7',
                '&:hover': {
                  backgroundColor: '#e0f7fa',
                  borderColor: '#007c91',
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Grid> */}
    </Grid>
  );
};

export default Unauthorized;
