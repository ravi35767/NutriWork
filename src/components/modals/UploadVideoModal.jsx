import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks
import { uploadVideo } from '../../features/videos/videoSlice'; // Import the upload thunk
import { Modal, Box, Typography, TextField, Button, IconButton, LinearProgress, Alert } from '@mui/material'; // Added Alert
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500, // Adjust width as needed
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const UploadVideoModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  // Get uploading state and error from Redux
  const { uploading, uploadError } = useSelector((state) => state.videos); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); 
  // Use uploading state from Redux instead of local state
  // const [isUploading, setIsUploading] = useState(false); 

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // TODO: Add video preview if needed/possible
    }
  };

  // Progress handler callback for the thunk
  const handleUploadProgress = (progress) => {
    setUploadProgress(progress);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || uploading) return; 

    setUploadProgress(0); // Reset progress

    const formData = new FormData();
    formData.append('title', title); 
    formData.append('description', description); 
    formData.append('videoFile', file); 

    try {
      // Dispatch the thunk with formData and the progress callback
      await dispatch(uploadVideo({ formData, onUploadProgress: handleUploadProgress })).unwrap();
      // If successful (no error thrown by unwrap), close modal
      handleClose(); 
      // Reset form state if needed
      setTitle('');
      setDescription('');
      setFile(null);
      setUploadProgress(0);
    } catch (err) {
      // Error is handled by the uploadError state in Redux
      console.error("Upload failed:", err); 
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="upload-video-modal-title"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="upload-video-modal-title" variant="h6" component="h2">
            Upload New Video
          </Typography>
          <IconButton onClick={handleClose} disabled={uploading}> {/* Use Redux state */}
            <CloseIcon />
          </IconButton>
        </Box>
        
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Video Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          disabled={uploading} // Use Redux state
        />
        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={uploading} // Use Redux state
        />
       
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ mt: 2, mb: 1 }}
          disabled={uploading} // Use Redux state
        >
          {file ? `Selected: ${file.name}` : 'Select Video File'}
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept="video/*" // Specify accepted file types
            disabled={uploading} // Use Redux state
          />
        </Button>
        
        {uploading && ( // Use Redux state
          <Box sx={{ width: '100%', mt: 1, mb: 1 }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Typography variant="caption" display="block" textAlign="center">{`${uploadProgress}%`}</Typography>
          </Box>
        )}

        {/* Display upload error */}
        {uploadError && <Alert severity="error" sx={{ mt: 1, mb: 1 }}>{uploadError}</Alert>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={!file || !title || uploading} // Use Redux state
        >
          {uploading ? 'Uploading...' : 'Upload'} {/* Use Redux state */}
        </Button>
      </Box>
    </Modal>
  );
};

export default UploadVideoModal;
