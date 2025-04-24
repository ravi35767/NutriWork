import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
  Chip,
  Stack,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Message as MessageIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.background.paper,
}));

const SearchBar = styled(TextField)({
  marginBottom: '1rem',
  width: '100%',
  maxWidth: '400px',
});

// Mock data for trainees
const mockTrainees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    program: 'Weight Loss',
    startDate: '2024-01-15',
    progress: '75%',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Inactive',
    program: 'Muscle Gain',
    startDate: '2024-02-01',
    progress: '30%',
  },
  // Add more mock trainees as needed
];

// Stats data
const statsData = [
  { label: 'Total Trainees', value: 45 },
  { label: 'Active Trainees', value: 32 },
  { label: 'Completed Programs', value: 28 },
];

const TraineesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trainees, setTrainees] = useState(mockTrainees);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setTrainees(mockTrainees);
    } else {
      const filtered = mockTrainees.filter(trainee =>
        trainee.name.toLowerCase().includes(term) ||
        trainee.email.toLowerCase().includes(term) ||
        trainee.program.toLowerCase().includes(term)
      );
      setTrainees(filtered);
    }
  };

  const handleEdit = (traineeId) => {
    // Implement edit functionality
    console.log('Edit trainee:', traineeId);
  };

  const handleDelete = (traineeId) => {
    // Implement delete functionality
    console.log('Delete trainee:', traineeId);
  };

  const handleMessage = (traineeId) => {
    // Implement message functionality
    console.log('Message trainee:', traineeId);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Trainees
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FilterListIcon />}
          sx={{ backgroundColor: '#004D40' }}
        >
          Filter
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {stat.label}
                </Typography>
                <Typography variant="h4">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <SearchBar
          placeholder="Search trainees..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
        />
      </Box>

      {/* Trainees Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Program</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>Progress</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainees.map((trainee) => (
              <TableRow key={trainee.id}>
                <TableCell>{trainee.name}</TableCell>
                <TableCell>{trainee.email}</TableCell>
                <TableCell>
                  <Chip
                    label={trainee.status}
                    color={trainee.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{trainee.program}</TableCell>
                <TableCell>{trainee.startDate}</TableCell>
                <TableCell>{trainee.progress}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={() => handleEdit(trainee.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleMessage(trainee.id)}>
                      <MessageIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(trainee.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TraineesPage; 