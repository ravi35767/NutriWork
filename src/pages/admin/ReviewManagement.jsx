import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminReviews, deleteAdminReview } from '../../redux/adminSlice';
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
  CircularProgress, 
  Alert, 
  Pagination,
  IconButton,
  Tooltip,
  Rating, 
  Dialog, 
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField, // For filters
  Select,    // For rating filter
  MenuItem,  // For rating filter
  FormControl, // For rating filter
  InputLabel // For rating filter
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList'; // Optional icon

const ReviewManagement = () => {
  const dispatch = useDispatch();
  const { reviewList, loadingReviews, errorReviews, actionLoading, actionError } = useSelector((state) => state.admin);
  const { reviews, currentPage, totalPages, totalReviews } = reviewList;

  const [page, setPage] = useState(1);
  // State for filters
  const [professionalIdFilter, setProfessionalIdFilter] = useState('');
  const [clientIdFilter, setClientIdFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(''); // '' for all ratings
  const [confirmDelete, setConfirmDelete] = useState(null); 

  useEffect(() => {
    // Pass filters to fetchAdminReviews
    dispatch(fetchAdminReviews({ 
      page, 
      professionalId: professionalIdFilter, 
      clientId: clientIdFilter, 
      rating: ratingFilter 
    }));
  }, [dispatch, page, professionalIdFilter, clientIdFilter, ratingFilter]); // Refetch on filter change

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Filter Handlers
  const handleProfessionalIdChange = (event) => {
    setProfessionalIdFilter(event.target.value);
    setPage(1); // Reset page on filter change
  };
  const handleClientIdChange = (event) => {
    setClientIdFilter(event.target.value);
    setPage(1); 
  };
  const handleRatingChange = (event) => {
    setRatingFilter(event.target.value);
    setPage(1); 
  };

  const handleOpenConfirmDelete = (reviewId) => {
    setConfirmDelete(reviewId);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(null);
  };

  const handleDeleteReview = () => {
    if (!confirmDelete) return;
    dispatch(deleteAdminReview(confirmDelete))
      .unwrap()
      .then(() => handleCloseConfirmDelete())
      .catch(() => {}); // Error handled by actionError state
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Review Management ({totalReviews})</Typography>

      {/* Filter Inputs */}
       <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
         <TextField
           label="Filter by Professional ID"
           variant="outlined"
           size="small"
           value={professionalIdFilter}
           onChange={handleProfessionalIdChange}
           sx={{ minWidth: '200px' }}
         />
          <TextField
           label="Filter by Client ID"
           variant="outlined"
           size="small"
           value={clientIdFilter}
           onChange={handleClientIdChange}
           sx={{ minWidth: '200px' }}
         />
         <FormControl size="small" sx={{ minWidth: 120 }}>
           <InputLabel>Rating</InputLabel>
           <Select value={ratingFilter} label="Rating" onChange={handleRatingChange}>
             <MenuItem value=""><em>All</em></MenuItem>
             <MenuItem value={1}>1 Star</MenuItem>
             <MenuItem value={2}>2 Stars</MenuItem>
             <MenuItem value={3}>3 Stars</MenuItem>
             <MenuItem value={4}>4 Stars</MenuItem>
             <MenuItem value={5}>5 Stars</MenuItem>
           </Select>
         </FormControl>
       </Box>

      {loadingReviews && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      {errorReviews && <Alert severity="error" sx={{ mb: 2 }}>{errorReviews}</Alert>}
      
      {!loadingReviews && !errorReviews && (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Professional</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <TableRow key={review._id}>
                      <TableCell>{`${review.client?.firstName || ''} ${review.client?.lastName || ''}`}</TableCell>
                      <TableCell>{`${review.professional?.firstName || ''} ${review.professional?.lastName || ''}`}</TableCell>
                      <TableCell>
                        <Rating value={review.rating || 0} readOnly size="small" />
                      </TableCell>
                      <TableCell>{review.comment}</TableCell>
                      <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Delete Review">
                          <IconButton 
                            onClick={() => handleOpenConfirmDelete(review._id)} 
                            disabled={actionLoading} 
                            size="small"
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No reviews found.</TableCell>
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

       {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDelete} onClose={handleCloseConfirmDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete this review? This action cannot be undone.
          </DialogContentText>
           {actionError && <Alert severity="error" sx={{ mt: 2 }}>{actionError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete} disabled={actionLoading}>Cancel</Button>
          <Button onClick={handleDeleteReview} disabled={actionLoading} color="error">
            {actionLoading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default ReviewManagement;
