import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVerificationNotes,
  addVerificationNote,
  clearAdminError,
} from '../../redux/adminSlice';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Paper,
  Stack,
  Divider,
} from '@mui/material';

const UserNotesSection = ({ userId }) => {
  const dispatch = useDispatch();
  const {
    verificationNotes,
    loadingVerifications, // Use loading state for notes fetch
    errorVerifications,   // Use error state for notes fetch
    actionLoading,        // Use action loading for adding note
    actionError,          // Use action error for adding note
  } = useSelector((state) => state.admin);

  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (userId) {
      // Clear previous errors before fetching
      dispatch(clearAdminError('verifications'));
      dispatch(fetchVerificationNotes(userId));
    }
    // Clear errors when component unmounts or userId changes
    return () => {
      dispatch(clearAdminError('verifications'));
      dispatch(clearAdminError()); // Clear general action error
    };
  }, [dispatch, userId]);

  const handleAddNote = () => {
    if (!newNote.trim() || !userId) return;
    dispatch(addVerificationNote({ userId, note: newNote }))
      .unwrap()
      .then(() => {
        setNewNote(''); // Clear input on success
        // Optionally clear action error on success if needed, handled by useEffect cleanup too
        // dispatch(clearAdminError());
      })
      .catch((err) => {
        // Error is already set in actionError by the rejected thunk
        console.error('Failed to add note:', err);
      });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Stack spacing={2} sx={{ height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Admin Notes
        </Typography>
        <Divider />

        {/* Display Notes */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '300px' /* Adjust as needed */ }}>
          {loadingVerifications && <CircularProgress size={24} />}
          {errorVerifications && <Alert severity="error">{errorVerifications}</Alert>}
          {!loadingVerifications && !errorVerifications && (
            <List dense>
              {verificationNotes && verificationNotes.length > 0 ? (
                verificationNotes.map((note) => (
                  <ListItem key={note._id} divider>
                    <ListItemText
                      primary={note.note}
                      secondary={`By: ${note.addedBy?.firstName || 'Admin'} on ${new Date(note.createdAt).toLocaleString()}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                  No notes added yet.
                </Typography>
              )}
            </List>
          )}
        </Box>

        <Divider />

        {/* Add Note Form */}
        <Box sx={{ mt: 'auto' }}> {/* Pushes form to the bottom */}
          <Typography variant="subtitle1" gutterBottom>Add New Note</Typography>
          <TextField
            label="New Note"
            multiline
            rows={3}
            fullWidth
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
          />
          {actionError && <Alert severity="error" sx={{ mb: 1 }}>{actionError}</Alert>}
          <Button
            variant="contained"
            onClick={handleAddNote}
            disabled={actionLoading || !newNote.trim()}
            fullWidth
          >
            {actionLoading ? <CircularProgress size={24} /> : 'Add Note'}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default UserNotesSection;
