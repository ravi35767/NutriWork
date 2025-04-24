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

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    plan: 'Weight Loss',
    startDate: '2024-01-15',
    progress: '75%',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Inactive',
    plan: 'Muscle Gain',
    startDate: '2024-02-01',
    progress: '30%',
  },
  // Add more mock clients as needed
];

// Stats data
const statsData = [
  { label: 'Total Clients', value: 45 },
  { label: 'Active Clients', value: 32 },
  { label: 'Completed Plans', value: 28 },
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState(mockClients);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setClients(mockClients);
    } else {
      const filtered = mockClients.filter(client =>
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.plan.toLowerCase().includes(term)
      );
      setClients(filtered);
    }
  };

  const handleEdit = (clientId) => {
    // Implement edit functionality
    console.log('Edit client:', clientId);
  };

  const handleDelete = (clientId) => {
    // Implement delete functionality
    console.log('Delete client:', clientId);
  };

  const handleMessage = (clientId) => {
    // Implement message functionality
    console.log('Message client:', clientId);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Clients
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
          placeholder="Search clients..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
        />
      </Box>

      {/* Clients Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Plan</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>Progress</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  <Chip
                    label={client.status}
                    color={client.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{client.plan}</TableCell>
                <TableCell>{client.startDate}</TableCell>
                <TableCell>{client.progress}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={() => handleEdit(client.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleMessage(client.id)}>
                      <MessageIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(client.id)}>
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

export default Clients; 