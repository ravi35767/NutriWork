import React, { useState, useEffect } from 'react'; // Added useEffect
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Added Link
import { login, clearError, clearSuccess } from '../../redux/authSlice'; // Corrected import path and thunk name, added clearError/clearSuccess
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  Divider, 
  Grid,
  Avatar // Added Avatar for consistency, though not strictly in login design
} from '@mui/material';
// Placeholder for logo and background image - replace with actual paths/components
// import Logo from '../../assets/Nutriwork-logo.png'; 
// import AuthBgImage from '../../assets/auth-bg.jpg'; 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Added success and isAuthenticated to handle redirection
  const { loading, error, success, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Redirect if login is successful and user is authenticated
    if (success && isAuthenticated) {
      dispatch(clearSuccess()); // Clear success flag
      navigate('/dashboard'); // Navigate to the unified dashboard
    }
     // Redirect if already logged in
     if (isAuthenticated && !success) {
        navigate('/dashboard');
     }
  }, [success, isAuthenticated, navigate, dispatch]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
     dispatch(clearError()); // Clear API errors on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError()); // Clear previous API errors
    dispatch(login(formData)); // Dispatch the correct login thunk
    // Redirection is handled by useEffect
  };

  // Placeholder handlers for SSO
  const handleGoogleLogin = () => {
    console.log("Google Login clicked - Placeholder");
    // Implement Google Login logic here
  };

  const handleFacebookLogin = () => {
    console.log("Facebook Login clicked - Placeholder");
    // Implement Facebook Login logic here
  };


  return (
    // Use Grid container for two-column layout
    <Grid container component="main" sx={{ height: '100vh' }}>
       {/* Left Branding Column (Same as Signup) */}
       <Grid
        item
        xs={false} // Hidden on small screens
        sm={4}
        md={6} // Takes up more space on medium+ screens
        sx={{
          // Replace with actual background image and styling
          backgroundImage: 'url(https://via.placeholder.com/800x1000.png/00695C/FFFFFF?text=Nutriwork+Branding)', 
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center content vertically
          alignItems: 'center', // Center content horizontally
          color: 'white',
          p: 4, // Add padding
        }}
      >
         {/* Placeholder Logo */}
         {/* <img src={Logo} alt="Nutriwork Logo" style={{ width: '100px', marginBottom: '20px' }} /> */}
         <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
           Nutriwork
         </Typography>
         <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
           Your Gateway to Personalized Training and Nutrition
         </Typography>
      </Grid>

       {/* Right Form Column */}
       <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
         <Box
          sx={{
            my: 8, // Margin top and bottom
            mx: 4, // Margin left and right
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
           {/* Optional: Add Avatar for visual consistency */}
           {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> L </Avatar> */}
           
           <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
            LOGIN
          </Typography>
           <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
             How to I get started lorem ipsum dolor at? {/* Placeholder text from design */}
           </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal" // Keep margin for spacing
              required
              fullWidth
              id="email"
              label="Email" // Label from design
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal" // Keep margin for spacing
              required
              fullWidth
              name="password"
              label="Password" // Label from design
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* Add Forgot Password Link if needed */}
             {/* <Typography variant="body2" align="right" sx={{ mt: 1 }}>
               <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                 Forgot password?
               </Link>
             </Typography> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#00695C', '&:hover': { bgcolor: '#004D40' } }} // Match button color from design
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login Now'}
            </Button>

            {/* SSO Login Options */}
            <Divider sx={{ my: 2 }}>Login with Others</Divider>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="G"/>} // Basic Google Icon
                  onClick={handleGoogleLogin}
                  sx={{ justifyContent: 'center', textTransform: 'none', color: 'text.primary', borderColor: 'grey.400' }}
                >
                  Login with Google
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<img src="https://img.icons8.com/color/16/000000/facebook-new.png" alt="F"/>} // Basic Facebook Icon
                  onClick={handleFacebookLogin}
                  sx={{ justifyContent: 'center', textTransform: 'none', color: 'text.primary', borderColor: 'grey.400' }}
                >
                  Login with Facebook
                </Button>
              </Grid>
            </Grid>

            {/* Signup Link */}
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ textDecoration: 'none', color: '#00695C', fontWeight: 'bold' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
