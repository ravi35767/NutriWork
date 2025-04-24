import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup, clearError, clearSuccess } from '../../redux/authSlice';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar // For profile picture placeholder
} from '@mui/material';
// Placeholder for logo and background image - replace with actual paths/components
// import Logo from '../../assets/Nutriwork-logo.png'; 
// import AuthBgImage from '../../assets/auth-bg.jpg'; 

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'trainer', // Default role to Trainer now
    // Add profilePicture state if implementing upload later
    // profilePicture: null, 
  });
  const [formError, setFormError] = useState('');

  // Destructure form data
  const { firstName, lastName, email, password, confirmPassword, role } = formData;

  useEffect(() => {
    // Redirect if signup is successful and user is authenticated
    if (success && isAuthenticated) {
      dispatch(clearSuccess()); // Clear success flag
      // Consider redirecting to a profile completion page if needed, otherwise dashboard
      navigate('/dashboard'); 
    }
    // Redirect if already logged in
    if (isAuthenticated && !success) {
       navigate('/dashboard'); 
    }
  }, [success, isAuthenticated, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setFormError(''); // Clear password mismatch error on change
    }
     dispatch(clearError()); // Clear API errors on change
  };

  // Handle profile picture upload placeholder
  const handlePictureUpload = (event) => {
    // Basic placeholder - replace with actual upload logic
    if (event.target.files && event.target.files[0]) {
      console.log("Picture selected:", event.target.files[0].name);
      // setFormData({ ...formData, profilePicture: event.target.files[0] }); 
    }
  };


  const onSubmit = (e) => {
    e.preventDefault();
    setFormError(''); // Clear previous form errors
    dispatch(clearError()); // Clear previous API errors

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    if (!firstName || !lastName || !email || !password) {
       setFormError('Please fill in all required fields');
       return;
    }

    // Prepare data, excluding confirmPassword from userData sent to API
    // The role is passed separately to the thunk
    const userData = { firstName, lastName, email, password }; 
    dispatch(signup({ userData, role }));
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Left Branding Column */}
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
         {/* Add the image of people if desired */}
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
          {/* Placeholder for Profile Picture */}
           <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 80, height: 80 }}>
             {/* Placeholder Icon or Image */}
           </Avatar>
           <Button variant="text" component="label" size="small">
             Upload Picture
             <input type="file" hidden onChange={handlePictureUpload} accept="image/*" />
           </Button>

          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            Sign Up
          </Typography>
          
          {formError && <Alert severity="warning" sx={{ width: '100%', mt: 2 }}>{formError}</Alert>}
          {error && <Alert severity="error" sx={{ width: '100%', mt: 1 }}>{error}</Alert>}

          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1, width: '100%' }}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                 <FormControl fullWidth margin="normal">
                   <InputLabel id="role-select-label">I am a...</InputLabel>
                   <Select
                     labelId="role-select-label"
                     id="role-select"
                     name="role"
                     value={role}
                     label="I am a..."
                     onChange={onChange}
                   >
                     {/* Removed End User option */}
                     <MenuItem value="trainer">Trainer</MenuItem>
                     <MenuItem value="nutritionist">Nutritionist</MenuItem> 
                   </Select>
                 </FormControl>
               </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={onChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={onChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={onChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                 <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={onChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2" style={{ textDecoration: 'none' }}>
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
