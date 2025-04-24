import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { fetchTrainees, deleteTrainee, updateTraineeStatus } from "../redux/trainerSlice"; // Import actions
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  CircularProgress, 
  Alert,
  Pagination, // Import Pagination
  TextField, // Import TextField for search
  InputAdornment, // For search icon
  Select, 
  FormControl, 
  InputLabel 
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; 
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChangeStatusModal from "../components/modals/ChangeStatusModal"; // Import the modal

const TraineesPage = () => {
  const dispatch = useDispatch();
  // Select state from Redux
  const { traineesList, loading, error } = useSelector((state) => state.trainer);
  // Destructure trainees and pagination info safely
  const trainees = traineesList?.trainees ?? [];
  const currentPage = traineesList?.currentPage ?? 1;
  const totalPages = traineesList?.totalPages ?? 1;
  const totalTrainees = traineesList?.totalTrainees ?? 0;

  // State for menu actions
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const open = Boolean(anchorEl);
  const [statusModalOpen, setStatusModalOpen] = useState(false); // State for status modal
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // Default to 'all' or ''

  // Fetch trainees when component mounts or filters change
  // Debounce search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);


  useEffect(() => {
    // Fetch page 1 whenever debounced search term or status filter changes
    dispatch(fetchTrainees({ page: 1, search: debouncedSearchTerm, status: statusFilter })); 
  }, [dispatch, debouncedSearchTerm, statusFilter]);

  // Handle menu open
  const handleClick = (event, trainee) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrainee(trainee);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle action selection
  const handleAction = (action) => {
    if (!selectedTrainee) return;

    const traineeId = selectedTrainee._id; // Use MongoDB _id

    if (action === 'delete') {
      // Optional: Add confirmation dialog here
      console.log(`Dispatching deleteTrainee for ID: ${traineeId}`);
      dispatch(deleteTrainee(traineeId));
    } else if (action === 'change-status') {
      // Open the status change modal instead of dispatching directly
      setStatusModalOpen(true); 
    }
    // Keep menu open until modal is interacted with or closed
    // handleClose(); // Close menu after dispatching
  };

  const handleCloseStatusModal = () => {
    setStatusModalOpen(false);
    handleClose(); // Also close the action menu when modal closes
  };

  // Handler for pagination change
  const handlePageChange = (event, newPage) => {
    // Reset page to 1 when filters change
    dispatch(fetchTrainees({ page: newPage, search: debouncedSearchTerm, status: statusFilter })); 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };


  return (
    <Box sx={{ width: '100%', alignSelf: 'stretch' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Trainees ({totalTrainees}) 
      </Typography>

      {/* Search and Filter Inputs */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search Trainees"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={handleStatusChange}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value={'active'}>Active</MenuItem>
            <MenuItem value={'paused'}>Paused</MenuItem>
            <MenuItem value={'completed'}>Completed</MenuItem>
          </Select>
        </FormControl>
      </Box>


      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {!loading && !error && (
        <TableContainer component={Paper} sx={{ 
          boxShadow: 'none', 
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          width: '100%',
          maxWidth: '100%'
        }}>
          <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>Trainee Name</TableCell>
                <TableCell>Trainee Ph No</TableCell>
                <TableCell>Session Timing</TableCell> {/* TODO: Update header if needed */}
                <TableCell>Session Day</TableCell> {/* TODO: Update header if needed */}
                <TableCell>Status</TableCell>
                <TableCell>Goal</TableCell> {/* TODO: Update header if needed */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Map over trainees from Redux state */}
              {trainees && trainees.length > 0 ? (
                trainees.map((trainee) => (
                <TableRow
                  key={trainee._id} // Use _id from MongoDB
                  sx={{ 
                    borderBottom: '1px solid #e0e0e0',
                    '&:last-child td, &:last-child th': { border: 0 } 
                  }}
                >
                  {/* Use actual data fields */}
                  <TableCell>{`${trainee.firstName} ${trainee.lastName}`}</TableCell> 
                  <TableCell>{trainee.phoneNumber || 'N/A'}</TableCell>
                  <TableCell>{trainee.timing || 'N/A'}</TableCell> {/* TODO: Get timing/day from session data */}
                  <TableCell>{trainee.day || 'N/A'}</TableCell> {/* TODO: Get timing/day from session data */}
                  <TableCell>
                    <Typography
                      sx={{
                        // Use traineeStatus field
                        color: trainee.traineeStatus === 'active' ? '#4caf50' : 
                               trainee.traineeStatus === 'paused' ? '#ff9800' : 
                               trainee.traineeStatus === 'completed' ? '#f44336' : 
                               'text.secondary', 
                        fontWeight: 400,
                        textTransform: 'capitalize' // Nicer display
                      }}
                    >
                      {trainee.traineeStatus || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell>{trainee.goal || 'N/A'}</TableCell> {/* TODO: Get goal data */}
                  <TableCell align="center">
                    <IconButton
                      aria-label="more"
                      // Pass the actual trainee object from API
                      onClick={(e) => handleClick(e, trainee)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
             ) : (
               <TableRow>
                 <TableCell colSpan={7} align="center">
                   No trainees found.
                 </TableCell>
               </TableRow>
             )}
            </TableBody>
          </Table>
          
          {/* Action Menu - No changes needed here */}
          <Menu
            id="trainee-action-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => handleAction('delete')}>Delete</MenuItem>
            <MenuItem onClick={() => handleAction('change-status')}>Change Status</MenuItem> 
          </Menu>
        </TableContainer>
      )} {/* Close the conditional rendering block */}

      {/* Pagination Controls */}
      {!loading && !error && totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination 
            count={totalPages} 
            page={currentPage} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      )}

      {/* Render the Change Status Modal */}
      <ChangeStatusModal 
        open={statusModalOpen} 
        handleClose={handleCloseStatusModal} 
        trainee={selectedTrainee} 
      />
    </Box>
  );
};

export default TraineesPage;
