import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTraineeStatus } from '../../redux/trainerSlice'; // Import update thunk
import { Modal, Box, Typography, Select, MenuItem, Button, IconButton, FormControl, InputLabel, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400, // Adjust width
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// Expects trainee object with _id and current traineeStatus
const ChangeStatusModal = ({ open, handleClose, trainee }) => {
  const dispatch = useDispatch();
  // Use general loading/error state for now, could add specific state later
  const { loading, error } = useSelector((state) => state.trainer); 
  const [newStatus, setNewStatus] = useState('');

  // Set initial status when modal opens
  useEffect(() => {
    if (trainee) {
      setNewStatus(trainee.traineeStatus || ''); // Default to current status or empty
    }
  }, [trainee, open]);

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!trainee || !newStatus) return;

    try {
      await dispatch(updateTraineeStatus({ traineeId: trainee._id, status: newStatus })).unwrap();
      handleClose(); // Close modal on success
    } catch (err) {
      console.error("Status update failed:", err);
      // Error is handled by the general error state in Redux for now
    }
  };

  const allowedStatuses = ['active', 'paused', 'completed'];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="change-status-modal-title"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="change-status-modal-title" variant="h6" component="h2">
            Change Status for {trainee?.firstName} {trainee?.lastName}
          </Typography>
          <IconButton onClick={handleClose} disabled={loading}>
            <CloseIcon />
          </IconButton>
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel id="status-select-label">New Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={newStatus}
            label="New Status"
            onChange={handleStatusChange}
            disabled={loading}
            required
          >
            {allowedStatuses.map((status) => (
              <MenuItem key={status} value={status} sx={{ textTransform: 'capitalize' }}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error && <Alert severity="error" sx={{ mt: 1, mb: 1 }}>{error}</Alert>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading || !newStatus || newStatus === trainee?.traineeStatus} // Disable if status hasn't changed
        >
          {loading ? 'Saving...' : 'Update Status'}
        </Button>
      </Box>
    </Modal>
  );
};

export default ChangeStatusModal;
