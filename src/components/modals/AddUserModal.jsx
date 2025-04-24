import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { createUserAdmin } from '../../redux/adminSlice'; // Import the thunk
import { Modal, Box, Typography, TextField, Button, IconButton, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450, 
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddUserModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  // Select relevant loading/error state from adminSlice
  const { actionLoading, actionError } = useSelector((state) => state.admin); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'support', // Default to support
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMatch(formData.password === value || value === formData.password);
    }
  };

   useEffect(() => {
      setPasswordMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!passwordMatch) return;

    const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
    };
    
    console.log("Submitting New User:", payload);
    try {
      await dispatch(createUserAdmin(payload)).unwrap();
      handleClose(); // Close modal on success
      // Reset form state after successful submission
      setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', role: 'support' });
      setPasswordMatch(true);
    } catch (err) {
      console.error("Create user failed:", err);
      // Error is handled by actionError state
    }
  };

  // Only allow creating Admin or Support roles from UI
  const allowedRoles = ['admin', 'support'];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-user-modal-title"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="add-user-modal-title" variant="h6" component="h2">
            Add New Admin/Support User
          </Typography>
          <IconButton onClick={handleClose} disabled={actionLoading}> {/* Use actionLoading */}
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField margin="normal" required fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} disabled={actionLoading} autoFocus />
        <TextField margin="normal" required fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} disabled={actionLoading} />
        <TextField margin="normal" required fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} disabled={actionLoading} />
        <TextField margin="normal" required fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} disabled={actionLoading} />
        <TextField 
            margin="normal" 
            required 
            fullWidth 
            label="Confirm Password" 
            name="confirmPassword" 
            type="password" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            disabled={actionLoading} 
            error={!passwordMatch}
            helperText={!passwordMatch ? "Passwords do not match" : ""}
        />
        
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            name="role"
            value={formData.role}
            label="Role"
            onChange={handleChange}
            disabled={actionLoading}
          >
            {allowedRoles.map((role) => (
              <MenuItem key={role} value={role} sx={{ textTransform: 'capitalize' }}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {actionError && <Alert severity="error" sx={{ mt: 1, mb: 1 }}>{actionError}</Alert>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={actionLoading || !passwordMatch}
        >
          {actionLoading ? 'Creating...' : 'Create User'}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
