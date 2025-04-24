import React, { useEffect, useState } from 'react'; // Added useState
import { Box, Container, Typography, CircularProgress, Alert, Button, Modal } from '@mui/material'; // Added Button, Modal
import AddIcon from '@mui/icons-material/Add'; // Added AddIcon
import { useDispatch, useSelector } from 'react-redux';
import VideoGrid from './components/VideoGrid'; // Assuming this exists
import { fetchMyVideos } from './videoSlice'; // Import the fetch thunk
import UploadVideoModal from '../../components/modals/UploadVideoModal'; // Import modal

const MyVideos = () => {
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state) => state.videos); 
  const [uploadModalOpen, setUploadModalOpen] = useState(false); // State for modal

  useEffect(() => {
    // Dispatch the thunk to fetch videos
    dispatch(fetchMyVideos()); 
  }, [dispatch]);

  const handleOpenUploadModal = () => setUploadModalOpen(true);
  const handleCloseUploadModal = () => setUploadModalOpen(false);

  if (loading) {
    // Use CircularProgress for loading state
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    // Use Alert for error state
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ pt: 2 }}> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: '#004D40', fontWeight: 600 }}>
          My Videos
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleOpenUploadModal} // Add onClick handler
          sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          Upload Video
        </Button>
      </Box>
      
      {videos && videos.length > 0 ? (
         <VideoGrid videos={videos} />
      ) : (
         <Typography sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
           You haven't uploaded any videos yet.
         </Typography>
      )}

      {/* TODO: Add UploadVideoModal component here */}
      {/* Basic Modal Placeholder */}
       {/* Use the imported UploadVideoModal */}
       <UploadVideoModal open={uploadModalOpen} handleClose={handleCloseUploadModal} />

       {/* Remove basic placeholder */}
       {/* <Modal open={uploadModalOpen} onClose={handleCloseUploadModal}>
          <Box sx={{ 
             position: 'absolute', 
             top: '50%', 
             left: '50%', 
             transform: 'translate(-50%, -50%)', 
             width: 400, 
             bgcolor: 'background.paper', 
             border: '2px solid #000', 
             boxShadow: 24, 
             p: 4 
          }}>
            <Typography variant="h6" component="h2">Upload Video Modal</Typography>
            <Typography sx={{ mt: 2 }}>Video upload form fields will go here.</Typography>
            <Button onClick={handleCloseUploadModal} sx={{ mt: 2 }}>Close</Button>
          </Box>
       </Modal> */}
    </Container> 
  );
};

export default MyVideos;
