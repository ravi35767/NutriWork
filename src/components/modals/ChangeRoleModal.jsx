import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignUserRole } from '../../redux/adminSlice'; // Import assign role thunk
import { Modal, Box, Typography, Select, MenuItem, Button, IconButton, FormControl, InputLabel, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400, 
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// Expects user object with _id and current role
const ChangeRoleModal = ({ open, handleClose, user }) => {
  const dispatch = useDispatch();
  // Use actionLoading/actionError for specific action feedback
  const { actionLoading, actionError } = useSelector((state) => state.admin); 
  const [newRole, setNewRole] = useState('');

  // Set initial role when modal opens
  useEffect(() => {
    if (user) {
      setNewRole(user.role || ''); // Default to current role or empty
    }
  }, [user, open]);

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user || !newRole) return;

    try {
      await dispatch(assignUserRole({ userId: user._id, role: newRole })).unwrap();
      handleClose(); // Close modal on success
    } catch (err) {
      console.error("Assign role failed:", err);
      // Error is handled by the actionError state in Redux
    }
  };

  // Define roles admin can assign
  const assignableRoles = ['admin', 'support', 'trainer', 'nutritionist', 'end user'];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="change-role-modal-title"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="change-role-modal-title" variant="h6" component="h2">
            Change Role for {user?.firstName} {user?.lastName}
          </Typography>
          <IconButton onClick={handleClose} disabled={actionLoading}>
            <CloseIcon />
          </IconButton>
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel id="role-select-label">New Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={newRole}
            label="New Role"
            onChange={handleRoleChange}
            disabled={actionLoading}
            required
          >
            {assignableRoles.map((role) => (
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
          disabled={actionLoading || !newRole || newRole === user?.role} // Disable if role hasn't changed
        >
          {actionLoading ? 'Saving...' : 'Update Role'}
        </Button>
      </Box>
    </Modal>
  );
};

export default ChangeRoleModal;
