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
import VideoFileIcon from '@mui/icons-material/VideoFile';
import { addVideo } from '../../features/videos/videosSlice';

const UploadVideo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
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
    if (!selectedFile || !formData.title) {
      alert('Please select a video and enter a title');
      return;
    }

    // Create a dummy video URL for demo purposes
    const dummyVideoUrl = `dummy-video-url-${Date.now()}`;

    dispatch(addVideo({
      title: formData.title,
      description: formData.description,
      videoUrl: dummyVideoUrl,
    }));

    navigate('/trainer/videos');
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
          onClick={() => document.getElementById('video-upload').click()}
        >
          <input
            type="file"
            id="video-upload"
            hidden
            accept="video/*"
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
            <VideoFileIcon sx={{ fontSize: 30, color: '#084043' }} />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
            Upload Your Video
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Just tap here to <span style={{ color: '#084043' }}>browse</span> your gallery to upload video
          </Typography>
          {selectedFile && (
            <Typography variant="body2" sx={{ mt: 1, color: '#084043' }}>
              Selected: {selectedFile.name}
            </Typography>
          )}
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
            Video should not be more than 100mb
          </Typography>
        </Box>

        {/* Form Fields */}
        <TextField
          fullWidth
          label="Title"
          name="title"
          variant="outlined"
          placeholder="Enter your video title"
          value={formData.title}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          variant="outlined"
          placeholder="Tell us about your video"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
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

export default UploadVideo; 