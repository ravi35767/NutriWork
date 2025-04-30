import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../redux/authSlice'; // Import generalized update thunk from authSlice
import { Modal, Box, Typography, TextField, Button, IconButton, CircularProgress, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500, // Adjust width
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// Expects profileData object containing fields like bio, yearsOfExperience, phoneNumber etc.
const EditProfileModal = ({ open, handleClose, profileData }) => {
  const dispatch = useDispatch();
  // Get state from authSlice now
  const { updatingProfile, profileUpdateError } = useSelector((state) => state.auth); 
  const { user: authUser } = useSelector((state) => state.auth); // Get authUser for role check
  
  // Determine user role from profileData (if trainer) or authUser
  const userRole = profileData?.role || authUser?.role; 

  // Initialize form state with existing profile data or empty strings
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    location: '',
    gender: '',
    dob: '', // Format MM/YYYY
    // Trainer specific fields
    bio: '',
    yearsOfExperience: '',
  });

  // Populate form when modal opens or profileData changes
  useEffect(() => {
    if (profileData) {
      setFormData({
        // Common fields (from user object nested in profileData or directly from profileData if it's authUser)
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        phoneNumber: profileData.phoneNumber || '',
        location: profileData.location || '',
        gender: profileData.gender || '',
        dob: profileData.dob || '',
        // Trainer specific fields (only if role is trainer and fields exist)
        bio: userRole === 'trainer' ? (profileData.bio || '') : '',
        yearsOfExperience: userRole === 'trainer' ? (profileData.yearsOfExperience || '') : '',
      });
    }
  }, [profileData, open, userRole]); // Re-populate if profileData changes or role identified

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Construct payload based on user role
    let payload = {
      // Common fields editable by all users
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      location: formData.location,
      gender: formData.gender,
      dob: formData.dob, // Ensure backend handles MM/YYYY format
      // TODO: Handle profilePicture update separately if needed
    };

    // Add trainer-specific fields if the user is a trainer
    if (userRole === 'trainer') {
      payload = {
        ...payload,
        bio: formData.bio,
        yearsOfExperience: formData.yearsOfExperience ? Number(formData.yearsOfExperience) : undefined, // Ensure number type
        // Add other trainer-specific fields if they exist in the form
      };
    }
    
    // Filter out empty strings or undefined values before sending? Or let backend handle?
    // Let's filter undefined for now, backend should ignore empty strings if needed.
    const filteredPayload = Object.fromEntries(Object.entries(payload).filter(([_, v]) => v !== undefined && v !== null));

    console.log("Submitting Profile Update:", filteredPayload);

    try {
      // Use the generalized updateUserProfile action
      await dispatch(updateUserProfile(filteredPayload)).unwrap(); 
      handleClose(); // Close modal on success
    } catch (err) {
      console.error("Profile update failed:", err);
      // Error is handled by profileUpdateError state
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-profile-modal-title"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="edit-profile-modal-title" variant="h6" component="h2">
            Edit Profile
          </Typography>
          <IconButton onClick={handleClose} disabled={updatingProfile}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Common Fields */}
        <TextField
          margin="normal"
          fullWidth
          required
          id="firstName"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={updatingProfile}
        />
        <TextField
          margin="normal"
          fullWidth
          required
          id="lastName"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={updatingProfile}
        />
        <TextField
          margin="normal"
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          disabled={updatingProfile}
        />
         <TextField
          margin="normal"
          fullWidth
          id="location"
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          disabled={updatingProfile}
        />
         <TextField
          margin="normal"
          fullWidth
          id="gender"
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          disabled={updatingProfile}
          // Consider using Select for predefined options
        />
         <TextField
          margin="normal"
          fullWidth
          id="dob"
          label="Date of Birth (MM/YYYY)"
          name="dob"
          placeholder="MM/YYYY"
          value={formData.dob}
          onChange={handleChange}
          disabled={updatingProfile}
          // Add input mask or validation for format MM/YYYY
        />

        {/* Trainer Specific Fields */}
        {userRole === 'trainer' && (
          <>
            <TextField
              margin="normal"
              fullWidth
              id="yearsOfExperience"
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              disabled={updatingProfile}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="bio"
              label="Bio"
              name="bio"
              multiline
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              disabled={updatingProfile}
            />
            {/* Add other trainer-specific fields here if needed */}
          </>
        )}

        {profileUpdateError && <Alert severity="error" sx={{ mt: 1, mb: 1 }}>{profileUpdateError}</Alert>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={updatingProfile}
        >
          {updatingProfile ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
