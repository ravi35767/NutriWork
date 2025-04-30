import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById, updateUserAccountStatusAdmin, assignUserRole, deleteUserAdmin, clearAdminError } from '../../redux/adminSlice'; // Removed unused fetchUsers
import { Box, Typography, CircularProgress, Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Stack, Avatar, Divider } from '@mui/material'; // Added Avatar, Divider
import PersonIcon from '@mui/icons-material/Person'; // Default icon
import ChangeRoleModal from '../../components/modals/ChangeRoleModal';
import ChangeAccountStatusModal from '../../components/modals/ChangeAccountStatusModal';
import UserNotesSection from '../../components/admin/UserNotesSection';

const UserDetailsPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser, loadingUsers, errorUsers, actionLoading, actionError } = useSelector((state) => state.admin);

  const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
  const [changeStatusModalOpen, setChangeStatusModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State for delete confirmation

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  const handleCloseChangeRoleModal = () => {
    setChangeRoleModalOpen(false);
  }

   // Change Status Modal Handlers
  const handleCloseChangeStatusModal = () => {
    setChangeStatusModalOpen(false);
  }

  const handleConfirmDelete = () => {
    if (!selectedUser) return;
    dispatch(deleteUserAdmin(selectedUser._id))
      .unwrap()
      .then(() => {
         console.log("User deleted successfully");
         setConfirmDeleteOpen(false); // Close confirmation on success
         navigate('/admin/users');
      })
      .catch((err) => {
         console.error("Delete user failed:", err);
         setConfirmDeleteOpen(false);
      });
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteOpen(false);
  };

  const handleUserAction = (action) => {
    if (action === 'change_role') {
      setChangeRoleModalOpen(true);
    } else if (action === 'change_status') {
      setChangeStatusModalOpen(true);
    } else if (action === 'delete_user') {
      setConfirmDeleteOpen(true); // Open confirmation dialog
    }
  };

  if (loadingUsers) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  }

  if (errorUsers) {
    return <Alert severity="error" sx={{ m: 3 }}>{errorUsers}</Alert>;
  }

  if (!selectedUser) {
    return <Typography sx={{ m: 3 }}>User not found.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>User Details</Typography>
      <Grid container spacing={3}>
         {/* Left Column: User Info & Actions */}
         <Grid item xs={12} md={7}> {/* Adjusted grid size */}
           <Paper elevation={3} sx={{ p: 3 }}>
             <Stack spacing={2}>
               {/* Top section with Avatar and basic info */}
               <Stack direction="row" spacing={2} alignItems="center">
                 <Avatar
                   src={selectedUser.profilePicture || undefined} // Use profile picture if available
                   sx={{ width: 80, height: 80 }} // Larger avatar
                 >
                   {/* Fallback Icon */}
                   {!selectedUser.profilePicture && <PersonIcon sx={{ fontSize: 40 }} />}
                 </Avatar>
                 <Stack>
                   <Typography variant="h5">{selectedUser.firstName} {selectedUser.lastName}</Typography>
                   <Typography variant="body1" color="text.secondary">{selectedUser.email}</Typography>
                   <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>Role: {selectedUser.role}</Typography>
                   {selectedUser.phone && <Typography variant="body2" color="text.secondary">Phone: {selectedUser.phone}</Typography>}
                   <Typography variant="body2" color="text.secondary">Joined: {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}</Typography>
                 </Stack>
               </Stack>

               <Divider sx={{ my: 2 }} />

               {/* Additional Details */}
               <Typography variant="h6">Account Details</Typography>
               <Typography><strong>Account Status:</strong> <span style={{ textTransform: 'capitalize' }}>{selectedUser.accountStatus}</span></Typography>
               <Typography><strong>Verified Account:</strong> {selectedUser.isVerified ? 'Yes' : 'No'}</Typography>
               {/* Add other relevant details if needed */}

               <Divider sx={{ my: 2 }} />

               {/* Actions */}
               <Typography variant="h6" gutterBottom>Actions</Typography>
               <Stack direction="row" spacing={1.5} flexWrap="wrap"> {/* Increased spacing */}
                 <Button size="small" variant="outlined" onClick={() => handleUserAction('change_role')} disabled={actionLoading}>Change Role</Button>
                 <Button size="small" variant="outlined" onClick={() => handleUserAction('change_status')} disabled={actionLoading}>Change Status</Button>
                 <Button size="small" variant="contained" color="error" onClick={() => handleUserAction('delete_user')} disabled={actionLoading}>Delete User</Button>
               </Stack>
             </Stack>
           </Paper>
         </Grid>

         {/* Right Column: Notes Section */}
          <Grid item xs={12} md={5}> {/* Adjusted grid size */}
             <UserNotesSection userId={userId} />
          </Grid>
        </Grid>

      {/* Modals */}
      <ChangeRoleModal
        open={changeRoleModalOpen} 
        handleClose={handleCloseChangeRoleModal} 
        user={selectedUser}
      />
      <ChangeAccountStatusModal 
        open={changeStatusModalOpen} 
        handleClose={handleCloseChangeStatusModal} 
        user={selectedUser}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteOpen} onClose={handleCloseConfirmDelete}>
        <DialogTitle>Confirm User Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete user {selectedUser?.firstName} {selectedUser?.lastName} ({selectedUser?.email})? This action cannot be undone.
          </DialogContentText>
           {actionError && <Alert severity="error" sx={{ mt: 2 }}>{actionError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete} disabled={actionLoading}>Cancel</Button>
          <Button onClick={handleConfirmDelete} disabled={actionLoading} color="error">
            {actionLoading ? <CircularProgress size={24} /> : 'Delete User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetailsPage;
