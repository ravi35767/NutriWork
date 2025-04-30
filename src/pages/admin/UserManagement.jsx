import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
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
  Menu,
  Button,
  Dialog, // Added Dialog components
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AddUserModal from '../../components/modals/AddUserModal';
import ChangeRoleModal from '../../components/modals/ChangeRoleModal';
import ChangeAccountStatusModal from '../../components/modals/ChangeAccountStatusModal';
import { deleteUserAdmin } from '../../redux/adminSlice'; // Import delete action

const UserManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get location object
  const navigate = useNavigate();
  // Correctly select specific loading/error states
  const { userList, loadingUsers, errorUsers, actionLoading, actionError } = useSelector((state) => state.admin);
  // Destructure properties safely, providing default values in case userList is still undefined
  const users = userList?.users || [];
  const currentPage = userList?.currentPage || 1;
  const totalPages = userList?.totalPages || 0;
  const totalUsers = userList?.totalUsers || 0;

  console.log('UserManagement: userList from redux:', userList);
  console.log('UserManagement: users from userList:', users);
  console.log('UserManagement: totalUsers from userList:', totalUsers);

  // State for filters and pagination
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [status, setStatus] = useState('');
  const debouncedSearchTerm = useState(searchTerm);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleFromQuery = params.get('role');
    if (roleFromQuery) {
      const validRoles = ['end user', 'trainer', 'nutritionist', 'admin', 'support'];
      if (validRoles.includes(roleFromQuery.toLowerCase())) {
        setRoleFilter(roleFromQuery.toLowerCase());
      } else {
        console.warn(`Invalid role '${roleFromQuery}' provided in query parameter.`);
      }
    }
    setIsInitialized(true);

    dispatch(fetchUsers({ page: page, limit: 10, role: roleFilter, status: status, search: searchTerm }));
  }, [dispatch, page, roleFilter, searchTerm, status]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleRoleChange = (event) => {
    setRoleFilter(event.target.value);
    setPage(1);
  };
  
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
     setPage(1);
  };

  // Add User Modal Handlers
  const handleOpenAddUserModal = () => setAddUserModalOpen(true);
  const handleCloseAddUserModal = () => setAddUserModalOpen(false);


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
          <Select value={status} label="Account Status" onChange={handleStatusChange}>
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
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
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
                  users.map((user, index) => (
                    <TableRow key={user._id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                      <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{user.role}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>{user.accountStatus}</TableCell>
                      <TableCell>{user.isVerified ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell align="center">
                        <Button component="a" href={`/admin/users/${user._id}`} variant="outlined" size="small">
                          View Details
                        </Button>
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
      {/* Render Modals */}
      <AddUserModal open={addUserModalOpen} handleClose={handleCloseAddUserModal} />
    </>
      )}
    </Box>
  );
};

export default UserManagement;
