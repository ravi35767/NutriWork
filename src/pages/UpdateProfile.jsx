import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  TextField,
  MenuItem,
  Avatar,
  Container,
  Grid,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import profile from '../assets/profile.jpeg';

// You can replace this with your actual placeholder or default profile image
// const placeholderImage = "https://via.placeholder.com/150";

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
  margin: '0 auto',
  marginBottom: theme.spacing(2),
}));

const UploadButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: '#004D40',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: '#00695C',
  },
  padding: theme.spacing(0.75),
}));

const UpdateProfile = () => {
  const [profileImage, setProfileImage] = useState(profile);
  const [formData, setFormData] = useState({
    firstName: 'Shaheen',
    lastName: '',
    email: '',
    phone: '+92 343 845 333',
    gender: 'Male',
    dateOfBirth: '2000-06',
    bio: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has remained the industry\'s standard dummy text. The industry\'s standard dummy text is an index of type and scrambled it.',
    yearsOfExperience: '3'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    // API call would go here
    // You can add success notification or redirect after successful update
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: 2 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
          <Typography 
            variant="h5" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              color: '#004D40',
              fontWeight: 600,
              mb: 3
            }}
          >
            Update Profile
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            {/* Profile Image Upload */}
            <Box sx={{ position: 'relative', width: 'fit-content', margin: '0 auto', mb: 4 }}>
              <ProfileAvatar src={profileImage} alt="Profile Picture" />
              <input
                accept="image/*"
                id="profile-image-upload"
                type="file"
                onChange={handleImageChange}
                hidden
              />
              <label htmlFor="profile-image-upload">
                <UploadButton component="span" size="small">
                  <PhotoCameraIcon fontSize="small" />
                </UploadButton>
              </label>
            </Box>
            
            <Grid container spacing={3}>
              {/* First & Last Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              
              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              
              {/* Phone Number */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              
              {/* Gender */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="gender"
                  select
                  label="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              
              {/* Date of Birth */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="month"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <CalendarTodayIcon color="action" fontSize="small" sx={{ ml: 1 }} />
                    )
                  }}
                />
              </Grid>
              
              {/* Years of Experience */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="yearsOfExperience"
                  label="Years of Experience"
                  variant="outlined"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>
              
              {/* Bio */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="bio"
                  label="Bio"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </Grid>
              
              {/* Password fields - optional */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  placeholder="Leave blank to keep current password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  placeholder="Leave blank to keep current password"
                />
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                sx={{ 
                  borderColor: '#004D40',
                  color: '#004D40',
                  '&:hover': {
                    borderColor: '#00695C',
                    backgroundColor: 'rgba(0, 77, 64, 0.04)'
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{ 
                  bgcolor: '#004D40',
                  '&:hover': {
                    bgcolor: '#00695C'
                  }
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UpdateProfile;