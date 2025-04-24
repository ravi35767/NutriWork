import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAccountStatusAdmin, fetchUsers } from '../../redux/adminSlice';
import { 
  Modal, 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  Button, 
  IconButton, 
  FormControl, 
  InputLabel, 
  Alert,
  CircularProgress 
} from '@mui/material';
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

// Expects user object with _id and current accountStatus
const ChangeAccountStatusModal = ({ open, handleClose, user }) => {
  const dispatch = useDispatch();
  const { actionLoading, actionError } = useSelector((state) => state.admin);
  const [newStatus, setNewStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (open && user) {
      setNewStatus(user.accountStatus || 'active');
      setSuccessMessage('');
    }
  }, [user, open]);

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
    setSuccessMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user?._id || !newStatus) return;

    try {
      const updateData = {
        userId: user._id,
        status: newStatus
      };

      await dispatch(updateUserAccountStatusAdmin(updateData)).unwrap();
      
      setSuccessMessage('Account status updated successfully');
      dispatch(fetchUsers());
      
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      console.error("Account status update failed:", err);
    }
  };

  // Define statuses admin can assign
  const assignableStatuses = ['active', 'suspended'];

  const isButtonDisabled = !user?._id || !newStatus || actionLoading;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="change-account-status-modal-title"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="change-account-status-modal-title" variant="h6" component="h2">
            Change Account Status for {user?.firstName} {user?.lastName}
          </Typography>
          <IconButton onClick={handleClose} disabled={actionLoading}>
            <CloseIcon />
          </IconButton>
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel id="status-select-label">New Account Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={newStatus}
            label="New Account Status"
            onChange={handleStatusChange}
            disabled={actionLoading}
            required
          >
            {assignableStatuses.map((status) => (
              <MenuItem 
                key={status} 
                value={status} 
                sx={{ 
                  textTransform: 'capitalize',
                  color: status === 'suspended' ? 'error.main' : status === 'verified' ? 'info.main' : 'success.main'
                }}
              >
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {actionError && (
          <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
            {actionError}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mt: 1, mb: 1 }}>
            {successMessage}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={isButtonDisabled}
        >
          {actionLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              <span>Updating...</span>
            </Box>
          ) : (
            'Update Status'
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default ChangeAccountStatusModal;
