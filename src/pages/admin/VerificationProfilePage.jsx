import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useSelector, useDispatch } from 'react-redux';
import { fetchPendingVerifications, updateVerificationStatus, fetchVerificationNotes, addVerificationNote, clearAdminError } from '../../redux/adminSlice'; // Added clearAdminError
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  Avatar,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Grid,
  Paper, // Added Paper for notes background
  IconButton, // Added IconButton
  Tooltip, // Added Tooltip for icons
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Approve Icon
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'; // Reject Icon
import { format, parseISO, isValid } from 'date-fns'; // Import from date-fns

const VerificationProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For redirecting after status update
  const {
    pendingVerifications,
    loadingVerifications,
    errorVerifications,
    actionLoading,
    actionError, // Added actionError
    verificationNotes,
  } = useSelector((state) => state.admin);

  const [profile, setProfile] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [confirmAction, setConfirmAction] = useState(null); // { type: 'approve'/'reject' }

  // Fetch profile data (if not already loaded) and notes
  useEffect(() => {
    // Attempt to find profile in existing pendingVerifications
    if (pendingVerifications?.profiles) {
      const foundProfile = pendingVerifications.profiles.find((p) => p._id === userId);
      if (foundProfile) {
        setProfile(foundProfile);
      } else {
        // If not found (e.g., direct navigation), fetch might be needed,
        // but for now, rely on the queue being loaded first.
        // Consider adding a fetch for a single profile if needed later.
        console.warn("Profile not found in preloaded pending verifications.");
      }
    } else {
       // If pendingVerifications isn't loaded, fetch it (or handle appropriately)
       // This might happen on direct page load. For simplicity, we assume
       // navigation from the queue, but a robust solution might fetch here.
       dispatch(fetchPendingVerifications()); // Fetch if not loaded
    }

    // Fetch notes regardless
    dispatch(fetchVerificationNotes(userId));
    // Clear previous action errors when component loads
    dispatch(clearAdminError('verifications'));
  }, [userId, dispatch, pendingVerifications]); // Rerun if pendingVerifications changes

  // --- Dialog Handlers ---
  const handleOpenConfirm = (type) => {
    setConfirmAction({ type });
    setRejectionReason(''); // Reset reason when opening dialog
    dispatch(clearAdminError()); // Clear previous errors
  };

  const handleCloseConfirm = () => {
    setConfirmAction(null);
  };

  const handleConfirmAction = () => {
    if (!confirmAction || !profile) return;

    const { type } = confirmAction;
    let status = '';
    if (type === 'approve') {
      status = 'verified';
    } else if (type === 'reject') {
      status = 'rejected';
    }

    dispatch(updateVerificationStatus({ userId: profile._id, status, reason: rejectionReason }))
      .unwrap()
      .then(() => {
        handleCloseConfirm();
        // Optionally navigate back to queue or show success message
        navigate('/admin/verification-queue'); // Navigate back after action
      })
      .catch(() => {
        // Error is handled by displaying actionError in the dialog
      });
  };

  // --- Note Handler ---
  const handleAddNote = () => {
    if (!newNote.trim() || !profile) return; // Prevent adding empty notes
    dispatch(addVerificationNote({ userId: profile._id, note: newNote }))
      .unwrap()
      .then(() => {
        setNewNote(''); // Clear input on success
      })
      .catch(() => {
        // Handle potential error adding note (e.g., show temporary alert)
        console.error("Failed to add note");
      });
  };

  // --- Helper Functions ---
  const filterKeys = (key) => !key.startsWith('_') && key !== 'user' && key !== '__v' && key !== '_id' && key !== 'verificationStatus' && key !== 'rejectionReason'; // Exclude status/reason

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = parseISO(dateString);
    return isValid(date) ? format(date, 'MMM d, yyyy, h:mm a') : 'Invalid Date';
  };

  const displayValue = (value) => {
    if (value === null || value === undefined) return 'N/A';
    if (Array.isArray(value) && value.length === 0) return 'None';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  };

  const formatKey = (key) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
  };

  // --- Render Logic ---
  if (loadingVerifications && !profile) { // Show loading only if profile isn't set yet
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  }

  if (errorVerifications) {
    return <Alert severity="error" sx={{ m: 3 }}>{errorVerifications}</Alert>;
  }

  if (!profile) {
    // If still loading, the above handles it. If done loading and no profile, show not found.
    return <Typography sx={{ m: 3 }}>Profile not found or not pending verification.</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        {/* Left Column: Profile Details */}
        <Grid item xs={12} md={7}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>Verification Details</Typography>
          <Card sx={{ mb: 3, padding: 2, boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt={`${profile.firstName} ${profile.lastName}`}
                  src={profile.profilePicture || ''}
                  sx={{ width: 80, height: 80, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">{`${profile.firstName || ''} ${profile.lastName || ''}`}</Typography>
                  <Typography variant="body2" color="text.secondary">{profile.email || 'N/A'}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>Role: {profile.role || 'N/A'}</Typography>
                  <Typography variant="body2" color="text.secondary">Phone: {profile.phone || 'N/A'}</Typography>
                  <Typography variant="body2" color="text.secondary">Joined: {formatDate(profile.createdAt)}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {profile.profile && (
            <Card sx={{ mb: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>Professional Profile</Typography>
                <Grid container spacing={1}>
                  {Object.entries(profile.profile)
                    .filter(([key]) => filterKeys(key))
                    .map(([key, value]) => (
                      <Grid item xs={12} sm={6} key={key}>
                        <Typography variant="body2">
                          <strong>{formatKey(key)}:</strong> {displayValue(value)}
                        </Typography>
                      </Grid>
                    ))}
                </Grid>
              </CardContent>
            </Card>
          )}

          {profile.verificationDocuments && profile.verificationDocuments.length > 0 && (
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>Verification Documents</Typography>
                <List dense>
                  {profile.verificationDocuments.map((doc, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemText
                        primary={doc.documentName || `Document ${index + 1}`}
                        secondary={
                          <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
                            View Document
                          </a>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Right Column: Actions and Notes */}
        <Grid item xs={12} md={5}>
           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
             <Tooltip title="Approve Verification">
               <IconButton color="success" onClick={() => handleOpenConfirm('approve')} disabled={actionLoading}>
                 <CheckCircleOutlineIcon />
               </IconButton>
             </Tooltip>
             <Tooltip title="Reject Verification">
               <IconButton color="error" onClick={() => handleOpenConfirm('reject')} disabled={actionLoading}>
                 <CancelOutlinedIcon />
               </IconButton>
             </Tooltip>
           </Box>

          <Typography variant="h6" component="h2" gutterBottom>Admin Notes</Typography>
          <Paper elevation={1} sx={{ p: 2, mb: 2, maxHeight: '300px', overflowY: 'auto' }}>
            {verificationNotes && verificationNotes.length > 0 ? (
              <List dense>
                {verificationNotes.slice().reverse().map((note) => ( // Show newest first
                  <ListItem key={note._id} alignItems="flex-start" disableGutters>
                    <ListItemText
                      primary={<Typography variant="body1">{note.note}</Typography>}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {note.admin?.firstName || 'Admin'} -{' '}
                          </Typography>
                          {formatDate(note.createdAt)}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">No notes added yet.</Typography>
            )}
          </Paper>

          <TextField
            label="Add New Note"
            multiline
            rows={3}
            fullWidth
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            sx={{ mb: 1 }}
            disabled={actionLoading}
          />
          <Button
            variant="contained"
            onClick={handleAddNote}
            disabled={actionLoading || !newNote.trim()}
            fullWidth
          >
            Add Note
          </Button>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={!!confirmAction} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm {confirmAction?.type === 'approve' ? 'Approval' : 'Rejection'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {confirmAction?.type} the verification for {profile?.firstName} {profile?.lastName}?
          </DialogContentText>
          {confirmAction?.type === 'reject' && (
            <TextField
              autoFocus
              margin="dense"
              id="reason"
              label="Rejection Reason (Required for rejection)"
              type="text"
              fullWidth
              variant="standard"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
           {actionError && <Alert severity="error" sx={{ mt: 2 }}>{actionError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} disabled={actionLoading}>Cancel</Button>
          <Button
             onClick={handleConfirmAction}
             disabled={actionLoading || (confirmAction?.type === 'reject' && !rejectionReason.trim())} // Disable confirm if rejecting without reason
             color={confirmAction?.type === 'approve' ? 'success' : 'error'}
           >
            {actionLoading ? <CircularProgress size={24} /> : `Confirm ${confirmAction?.type === 'approve' ? 'Approval' : 'Rejection'}`}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VerificationProfilePage;
