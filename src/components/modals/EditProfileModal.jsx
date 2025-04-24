import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTrainerProfile } from '../../redux/trainerSlice'; // Import update thunk
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
  const { updatingProfile, profileUpdateError } = useSelector((state) => state.trainer);
  
  // Initialize form state with existing profile data or empty strings
  const [formData, setFormData] = useState({
    bio: '',
    yearsOfExperience: '',
    phoneNumber: '',
    // Add other editable fields here based on API (e.g., specialties, sessionPrice)
  });

  // Populate form when modal opens or profileData changes
  useEffect(() => {
    if (profileData) {
      setFormData({
        bio: profileData.bio || '',
        yearsOfExperience: profileData.yearsOfExperience || '',
        phoneNumber: profileData.phoneNumber || '',
        // Initialize other fields
      });
    }
  }, [profileData, open]); // Re-populate if profileData changes while modal might be open

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Construct payload with only the fields that are defined in the API endpoint
    const payload = {
      bio: formData.bio,
      yearsOfExperience: formData.yearsOfExperience ? Number(formData.yearsOfExperience) : undefined, // Ensure number type
      phoneNumber: formData.phoneNumber,
      // Add other fields like specialties, sessionPrice, availability if implemented
    };
    
    // Filter out undefined fields before sending
    const filteredPayload = Object.fromEntries(Object.entries(payload).filter(([_, v]) => v !== undefined));

    console.log("Submitting Profile Update:", filteredPayload);

    try {
      await dispatch(updateTrainerProfile(filteredPayload)).unwrap();
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
          id="yearsOfExperience"
          label="Years of Experience"
          name="yearsOfExperience"
          type="number" // Use number type
          value={formData.yearsOfExperience}
          onChange={handleChange}
          disabled={updatingProfile}
          InputProps={{ inputProps: { min: 0 } }} // Basic validation
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
        {/* Add fields for specialties, sessionPrice, availability etc. here */}

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
