import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks
import { uploadCertificate } from '../../redux/trainerSlice'; // Import upload thunk
import { Modal, Box, Typography, TextField, Button, IconButton, LinearProgress, Alert } from '@mui/material'; // Added LinearProgress, Alert
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450, // Adjust width as needed
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddCertificateModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  // Get uploading state and error from Redux (using trainer slice)
  const { uploadingCertificate, certificateUploadError } = useSelector((state) => state.trainer); 
  const [certificateName, setCertificateName] = useState('');
  const [issuingOrg, setIssuingOrg] = useState('');
  const [issueDate, setIssueDate] = useState(''); 
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // Local state for progress

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simple preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null); // Clear preview for non-images
      }
    }
  };

   // Progress handler callback for the thunk
  const handleUploadProgress = (progress) => {
    setUploadProgress(progress);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !certificateName || uploadingCertificate) return; 

    setUploadProgress(0); // Reset progress

    const formData = new FormData();
    // Backend expects 'documentName' and 'verificationDoc'
    formData.append('documentName', certificateName); 
    formData.append('verificationDoc', file); 
    // Note: issuingOrg and issueDate are not standard fields for this backend endpoint based on controller
    // If needed, they would have to be added to the backend logic and TrainerProfile model

    try {
      // Dispatch the thunk with formData and the progress callback
      await dispatch(uploadCertificate({ formData, onUploadProgress: handleUploadProgress })).unwrap();
      // If successful, close modal and reset state
      handleClose(); 
      setCertificateName('');
      setIssuingOrg('');
      setIssueDate('');
      setFile(null);
      setFilePreview(null);
      setUploadProgress(0);
    } catch (err) {
      // Error is handled by the certificateUploadError state in Redux
      console.error("Certificate Upload failed:", err); 
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-certificate-modal-title"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="add-certificate-modal-title" variant="h6" component="h2">
            Upload Certification
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <TextField
          margin="normal"
          required
          fullWidth
          id="certificateName"
          label="Certificate Name"
          name="certificateName"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          id="issuingOrg"
          label="Issuing Organization"
          name="issuingOrg"
          value={issuingOrg}
          onChange={(e) => setIssuingOrg(e.target.value)}
        />
         <TextField
          margin="normal"
          fullWidth
          id="issueDate"
          label="Issue Date"
          name="issueDate"
          type="date" // Use date input type
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          InputLabelProps={{ shrink: true }} // Keep label floated
        />

        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ mt: 2, mb: 1 }}
        >
          Upload Document File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png" // Specify accepted file types
          />
        </Button>
        {file && <Typography variant="caption" display="block" gutterBottom>Selected: {file.name}</Typography>}
        {filePreview && (
          <Box sx={{ mt: 1, mb: 2, textAlign: 'center', maxHeight: 100, overflow: 'hidden' }}>
            <img src={filePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100px' }} />
          </Box>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={!file || !certificateName} // Basic validation
        >
          Upload
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCertificateModal;
