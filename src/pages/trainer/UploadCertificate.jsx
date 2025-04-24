import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { addCertificate } from '../../features/certificates/certificatesSlice';

const UploadCertificate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    issueDate: ''
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    navigate('/trainer');
  };

  const handleUpload = () => {
    if (!selectedFile || !formData.name || !formData.organization) {
      alert('Please fill in all required fields and select a certificate');
      return;
    }

    // Create a dummy certificate URL for demo purposes
    const dummyCertificateUrl = `dummy-certificate-url-${Date.now()}`;

    dispatch(addCertificate({
      name: formData.name,
      organization: formData.organization,
      issueDate: formData.issueDate,
      certificateUrl: dummyCertificateUrl,
    }));

    navigate('/trainer');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        p: 3,
        bgcolor: '#f5f5f5',
        minHeight: '100%',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 500,
          bgcolor: 'white',
          borderRadius: 2,
        }}
      >
        {/* Upload Area */}
        <Box
          sx={{
            mb: 3,
            p: 3,
            bgcolor: '#F8F9FE',
            borderRadius: 1,
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('certificate-upload').click()}
        >
          <input
            type="file"
            id="certificate-upload"
            hidden
            accept="image/*,.pdf"
            onChange={handleFileSelect}
          />
          <IconButton
            sx={{
              bgcolor: 'white',
              width: 60,
              height: 60,
              mb: 1,
              '&:hover': { bgcolor: 'white' },
            }}
          >
            <AddPhotoAlternateIcon sx={{ fontSize: 30, color: '#084043' }} />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
            Upload Your Document Here
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Just tap here to <span style={{ color: '#084043' }}>browse</span> your gallery to upload document
          </Typography>
          {selectedFile && (
            <Typography variant="body2" sx={{ mt: 1, color: '#084043' }}>
              Selected: {selectedFile.name}
            </Typography>
          )}
        </Box>

        {/* Form Fields */}
        <TextField
          fullWidth
          label="Name"
          name="name"
          variant="outlined"
          placeholder="Ex: Yoga training course"
          value={formData.name}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Issuing Organization"
          name="organization"
          variant="outlined"
          placeholder="Ex: Triotech"
          value={formData.organization}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Issue Date"
          name="issueDate"
          type="date"
          variant="outlined"
          value={formData.issueDate}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 4 }}
        />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              px: 4,
              borderColor: '#084043',
              color: '#084043',
              '&:hover': {
                borderColor: '#052a2c',
                bgcolor: 'transparent',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            sx={{
              px: 4,
              bgcolor: '#084043',
              '&:hover': {
                bgcolor: '#052a2c',
              },
            }}
          >
            Upload
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UploadCertificate; 