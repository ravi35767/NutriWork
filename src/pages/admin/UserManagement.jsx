import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { fetchUsers } from '../../redux/adminSlice'; // Import fetch action
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
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton, 
  Menu,
  Button,
  Dialog, // Added Dialog components
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import AddIcon from '@mui/icons-material/Add'; 
import AddUserModal from '../../components/modals/AddUserModal'; 
import ChangeRoleModal from '../../components/modals/ChangeRoleModal'; 
import ChangeAccountStatusModal from '../../components/modals/ChangeAccountStatusModal'; 
import { deleteUserAdmin } from '../../redux/adminSlice'; // Import delete action

const UserManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get location object
  // Correctly select specific loading/error states
  const { userList, loadingUsers, errorUsers, actionLoading, actionError } = useSelector((state) => state.admin); 
  const { users, currentPage, totalPages, totalUsers } = userList;

  // State for filters and pagination
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [isInitialized, setIsInitialized] = useState(false); // Flag to track if URL params have been checked

  // Initialize roleFilter from URL query parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleFromQuery = params.get('role');
    if (roleFromQuery) {
      // Basic validation to ensure it's one of the expected roles
      const validRoles = ['end user', 'trainer', 'nutritionist', 'admin', 'support'];
      if (validRoles.includes(roleFromQuery.toLowerCase())) {
         setRoleFilter(roleFromQuery.toLowerCase());
      } else {
         console.warn(`Invalid role '${roleFromQuery}' provided in query parameter.`);
      }
    }
    setIsInitialized(true); // Mark initialization complete
    // Only run once on mount to set initial filter based on URL
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures it runs only once on mount

   // State for action menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const actionMenuOpen = Boolean(anchorEl);

  // State for Add User Modal
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  // State for other action modals
  const [changeRoleModalOpen, setChangeRoleModalOpen] = useState(false);
  const [changeStatusModalOpen, setChangeStatusModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State for delete confirmation


  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); 
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch users when page, debounced search, or filters change, AND after initialization
  useEffect(() => {
    if (isInitialized) { // Only fetch after URL check is done
       dispatch(fetchUsers({ page, search: debouncedSearchTerm, role: roleFilter, status: statusFilter }));
    }
  }, [dispatch, page, debouncedSearchTerm, roleFilter, statusFilter, isInitialized]); // Add isInitialized dependency

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset page when search changes
  };

  const handleRoleChange = (event) => {
    setRoleFilter(event.target.value);
    setPage(1); // Reset page when filter changes
  };
  
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
     setPage(1); // Reset page when filter changes
  };

   // Action Menu Handlers
  const handleActionClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
  };

  const handleUserAction = (action) => {
    console.log(`Action: ${action} for user: ${selectedUser?._id}`);
    if (action === 'change_role') {
      setChangeRoleModalOpen(true);
    } else if (action === 'change_status') {
      setChangeStatusModalOpen(true);
    } else if (action === 'delete_user') {
      setConfirmDeleteOpen(true); // Open confirmation dialog
      // Keep action menu open until confirmation
    } else if (action === 'view_details') {
       // TODO: Implement view details (maybe navigate to a user detail page or open modal)
       console.log("Placeholder: View details action");
       handleActionClose();
    } else {
       handleActionClose(); 
    }
    // Don't close main action menu automatically for modals
  };

  const handleConfirmDelete = () => {
    if (!selectedUser) return;
    dispatch(deleteUserAdmin(selectedUser._id))
      .unwrap()
      .then(() => {
         console.log("User deleted successfully");
         setConfirmDeleteOpen(false); // Close confirmation on success
         handleActionClose(); // Close action menu
      })
      .catch((err) => {
         console.error("Delete user failed:", err);
         // Error state is handled in adminSlice, maybe show alert here too
         // Keep confirmation dialog open on error? Or close? Closing for now.
         setConfirmDeleteOpen(false); 
         handleActionClose(); 
      });
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteOpen(false);
    handleActionClose(); // Close action menu if confirmation is cancelled
  };

  // Add User Modal Handlers
  const handleOpenAddUserModal = () => setAddUserModalOpen(true);
  const handleCloseAddUserModal = () => setAddUserModalOpen(false);

  // Change Role Modal Handlers
  const handleCloseChangeRoleModal = () => {
    setChangeRoleModalOpen(false);
    handleActionClose(); // Close action menu as well
  }

   // Change Status Modal Handlers
  const handleCloseChangeStatusModal = () => {
    setChangeStatusModalOpen(false);
    handleActionClose(); // Close action menu as well
  }

  // Add User Modal Handlers
  // const handleOpenAddUserModal = () => setAddUserModalOpen(true); // Duplicate removed
  // const handleCloseAddUserModal = () => setAddUserModalOpen(false); // Duplicate removed


  return (
    <Box>
      <Typography variant="h5" gutterBottom>User Management ({totalUsers})</Typography>

      {/* Filter and Action Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="Search Users (Name/Email)"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
          }}
          sx={{ flexGrow: 1, minWidth: '200px' }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Role</InputLabel>
          <Select value={roleFilter} label="Role" onChange={handleRoleChange}>
            <MenuItem value=""><em>All Roles</em></MenuItem>
            <MenuItem value="end user">End User</MenuItem>
            <MenuItem value="trainer">Trainer</MenuItem>
            <MenuItem value="nutritionist">Nutritionist</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="support">Support</MenuItem>
          </Select>
        </FormControl>
         <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Account Status</InputLabel>
          <Select value={statusFilter} label="Account Status" onChange={handleStatusChange}>
            <MenuItem value=""><em>All Statuses</em></MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
            <MenuItem value="pending_verification">Pending Verification</MenuItem>
          </Select>
        </FormControl>
         <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleOpenAddUserModal}
            size="medium" // Match height of filter inputs
         >
           Add User
         </Button> 
      </Box>

      {/* Use specific loading/error states */}
      {loadingUsers && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />} 
      {errorUsers && <Alert severity="error" sx={{ mb: 2 }}>{errorUsers}</Alert>} 
      
      {!loadingUsers && !errorUsers && (
        <>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Account Status</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{user.accountStatus}</TableCell>
                      <TableCell>{user.isVerified ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={(e) => handleActionClick(e, user)}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No users found matching criteria.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

           {/* Action Menu */}
          <Menu
            anchorEl={anchorEl}
            open={actionMenuOpen}
            onClose={handleActionClose}
          >
            {/* TODO: Add specific actions */}
            <MenuItem onClick={() => handleUserAction('view_details')}>View Details</MenuItem>
            <MenuItem onClick={() => handleUserAction('change_role')}>Change Role</MenuItem>
            <MenuItem onClick={() => handleUserAction('change_status')}>Change Account Status</MenuItem>
            <MenuItem onClick={() => handleUserAction('delete_user')} sx={{ color: 'error.main' }}>Delete User</MenuItem>
          </Menu>

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
      {/* Render Modals */}
      <AddUserModal open={addUserModalOpen} handleClose={handleCloseAddUserModal} />
      {selectedUser && (
        <>
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
        </>
      )}

       {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteOpen} onClose={handleCloseConfirmDelete}>
        <DialogTitle>Confirm User Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete user {selectedUser?.firstName} {selectedUser?.lastName} ({selectedUser?.email})? This action cannot be undone.
          </DialogContentText>
           {/* Display action error */}
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

export default UserManagement;
