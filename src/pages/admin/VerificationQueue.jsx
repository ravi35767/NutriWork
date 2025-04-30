import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingVerifications, updateVerificationStatus } from '../../redux/adminSlice';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  CircularProgress, 
  Alert, 
  Pagination,
  Dialog, // For confirmation/rejection reason
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';

const VerificationQueue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pendingVerifications, loading, error, actionLoading, actionError } = useSelector((state) => state.admin);
  const { profiles, currentPage, totalPages, totalPending } = pendingVerifications;

  const [page, setPage] = React.useState(1);
  const [confirmAction, setConfirmAction] = React.useState(null); // { type: 'approve'/'reject', user }
  const [rejectionReason, setRejectionReason] = React.useState('');

  useEffect(() => {
    dispatch(fetchPendingVerifications({ page }));
  }, [dispatch, page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenConfirm = (type, user) => {
    setConfirmAction({ type, user });
    setRejectionReason('');
  };

  const handleCloseConfirm = () => {
    setConfirmAction(null);
  };

  const handleConfirmAction = () => {
    if (!confirmAction) return;
    
    const { type, user } = confirmAction;
    let status = '';
    if (type === 'approve') {
      status = 'verified';
    } else if (type === 'reject') {
      status = 'rejected';
    }
    
    dispatch(updateVerificationStatus({ userId: user._id, status, reason: rejectionReason }))
      .unwrap()
      .then(() => {
        handleCloseConfirm();
      })
      .catch(() => {
      });
  };

  const handleRowClick = (profile) => {
    navigate(`/admin/verification/${profile._id}`);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Pending Verifications ({totalPending})</Typography>

      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && !error && (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Documents</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profiles && profiles.length > 0 ? (
                  profiles.map((profile) => (
                    <TableRow 
                      key={profile._id}
                      onClick={() => handleRowClick(profile)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell>{`${profile.firstName || ''} ${profile.lastName || ''}`}</TableCell>
                      <TableCell>{profile.email || 'N/A'}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{profile.role || 'N/A'}</TableCell>
                      <TableCell>
                        None
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="contained" 
                          color="success" 
                          size="small" 
                          sx={{ mr: 1 }}
                          onClick={() => handleOpenConfirm('approve', profile)}
                          disabled={actionLoading}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="contained" 
                          color="error" 
                          size="small"
                          onClick={() => handleOpenConfirm('reject', profile)}
                          disabled={actionLoading}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No pending verifications found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary" 
              />
            </Box>
          )}
        </>
      )}

      {/* Confirmation/Rejection Dialog */}
      <Dialog open={!!confirmAction} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {confirmAction?.type} the verification for {confirmAction?.user?.firstName || confirmAction?.profile?.firstName} {confirmAction?.user?.lastName || confirmAction?.profile?.lastName}?
          </DialogContentText>
          {confirmAction?.type === 'reject' && (
            <TextField
              autoFocus
              margin="dense"
              id="reason"
              label="Rejection Reason (Optional)"
              type="text"
              fullWidth
              variant="standard"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          )}
           {actionError && <Alert severity="error" sx={{ mt: 2 }}>{actionError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} disabled={actionLoading}>Cancel</Button>
          <Button onClick={handleConfirmAction} disabled={actionLoading} color={confirmAction?.type === 'approve' ? 'success' : 'error'}>
            {actionLoading ? <CircularProgress size={24} /> : `Confirm ${confirmAction?.type === 'approve' ? 'Approval' : 'Rejection'}`}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VerificationQueue;
