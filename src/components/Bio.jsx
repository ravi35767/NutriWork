import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  IconButton,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Container
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import profile from '../assets/profile.jpeg';
import gymExercise from '../assets/gym-exercises.jpeg';
import certification from '../assets/certification.jpeg';

const Bio = () => {
  const navigate = useNavigate();
  const certificates = useSelector(state => state.certificates?.certificates || []);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Shaheen',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '',
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text...',
    yearsOfExperience: '4'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditDialogOpen = () => {
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Updated profile data:', formData);
    handleEditDialogClose();
  };

  const handleAddCertificate = () => {
    navigate('/trainer/upload-certificate');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: 800, mx: 'auto' }}>
        {/* Profile Header with Background */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 120, sm: 140 },
            backgroundImage: `url(${gymExercise})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          {/* Profile Image */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: 0,
              transform: 'translate(-50%, 50%)',
              width: { xs: 56, sm: 64 },
              height: { xs: 56, sm: 64 },
              borderRadius: '50%',
              border: '3px solid white',
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}
          >
            <img
              src={profile}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>

        {/* Profile Content */}
        <Box sx={{ pt: { xs: 3, sm: 3.5 }, pb: { xs: 1.25, sm: 1.5 }, px: { xs: 1.5, sm: 2 } }}>
          <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '1rem', sm: '1.125rem' } }}>
            {formData.firstName}
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: { xs: 0.75, sm: 1 }, display: 'block' }}>
            {formData.yearsOfExperience} Years Experience
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 0.5, color: '#004D40', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Bio
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 0.75, sm: 1 }, display: 'block', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            {formData.bio}
          </Typography>

          {/* Certifications */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 0.5, sm: 0.75 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 0.75 } }}>
              <img src={certification} alt="" style={{ width: 16, height: 16 }} />
              <Typography variant="subtitle1" sx={{ color: '#004D40', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Certifications
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={handleAddCertificate}
              sx={{
                backgroundColor: '#004D40',
                color: 'white',
                '&:hover': { backgroundColor: '#00695C' },
                width: { xs: 18, sm: 20 },
                height: { xs: 18, sm: 20 },
                padding: 0
              }}
            >
              <AddIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
            </IconButton>
          </Box>

          {/* Certificate Items */}
          {certificates.map((cert) => (
            <Box 
              key={cert.id}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 0.75, sm: 1 }, 
                mb: { xs: 0.75, sm: 1 } 
              }}
            >
              <img
                src={certification}
                alt={cert.name}
                style={{
                  width: 45,
                  height: 35,
                  objectFit: 'cover',
                  borderRadius: 4,
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                  {cert.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                  {cert.organization} • {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </Typography>
              </Box>
              <IconButton size="small" sx={{ color: '#004D40', padding: 0.5 }}>
                <EditIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
              </IconButton>
            </Box>
          ))}

          {/* Edit Profile Button */}
          <Button
            fullWidth
            variant="contained"
            startIcon={<EditIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
            size="small"
            onClick={handleEditDialogOpen}
            sx={{
              backgroundColor: '#004D40',
              color: 'white',
              '&:hover': { backgroundColor: '#00695C' },
              textTransform: 'none',
              mt: { xs: 0.5, sm: 0.75 },
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              py: { xs: 0.5, sm: 0.75 },
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={handleEditDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxWidth: 600,
            mx: 'auto'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            fontWeight: 700, 
            color: '#004D40',
            borderBottom: '1px solid #e0e0e0',
            px: 3,
            py: 2
          }}
        >
          Update Profile
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                name="firstName"
                label="First Name"
                variant="outlined"
                value={formData.firstName}
                onChange={handleChange}
                required
                sx={{ bgcolor: '#F8FAFC' }}
              />
              <TextField
                fullWidth
                name="lastName"
                label="Last Name"
                variant="outlined"
                value={formData.lastName}
                onChange={handleChange}
                required
                sx={{ bgcolor: '#F8FAFC' }}
              />
            </Box>

            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mb: 2, bgcolor: '#F8FAFC' }}
            />

            <TextField
              fullWidth
              name="phone"
              label="Phone No"
              variant="outlined"
              value={formData.phone}
              onChange={handleChange}
              required
              sx={{ mb: 2, bgcolor: '#F8FAFC' }}
            />

            <TextField
              fullWidth
              name="gender"
              select
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
              required
              sx={{ mb: 2, bgcolor: '#F8FAFC' }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              fullWidth
              name="dob"
              label="Date of Birth"
              type="month"
              variant="outlined"
              value={formData.dob}
              onChange={handleChange}
              required
              sx={{ mb: 2, bgcolor: '#F8FAFC' }}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              name="yearsOfExperience"
              label="Years of Experience"
              variant="outlined"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              required
              sx={{ mb: 2, bgcolor: '#F8FAFC' }}
            />

            <TextField
              fullWidth
              name="bio"
              label="Bio"
              multiline
              rows={4}
              variant="outlined"
              value={formData.bio}
              onChange={handleChange}
              required
              sx={{ mb: 2, bgcolor: '#F8FAFC' }}
            />
          </Box>
        </DialogContent>
        <DialogActions 
          sx={{ 
            px: 3, 
            py: 2,
            borderTop: '1px solid #e0e0e0',
            gap: 1
          }}
        >
          <Button 
            onClick={handleEditDialogClose}
            variant="outlined"
            sx={{ 
              color: '#004D40', 
              borderColor: '#004D40',
              px: 3,
              '&:hover': {
                borderColor: '#00695C',
                backgroundColor: 'rgba(0, 77, 64, 0.04)'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: '#004D40',
              color: 'white',
              px: 3,
              '&:hover': { backgroundColor: '#00695C' }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Bio; 