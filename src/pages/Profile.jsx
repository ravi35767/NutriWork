import React, { useEffect, useState } from 'react'; // Added useState
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainerProfile } from '../redux/trainerSlice'; // Import fetch action
import { Box, Typography, Button, Paper, IconButton, CircularProgress, Alert, Avatar, Modal } from '@mui/material'; // Added Modal
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
// Default/placeholder images
import defaultProfilePic from '../assets/profile.jpeg'; // Assuming a default exists
import defaultBgImage from '../assets/gym-exercises.jpeg'; // Assuming a default exists
import defaultCertIcon from '../assets/certification.jpeg'; // Assuming a default exists
import AddCertificateModal from '../components/modals/AddCertificateModal'; 
import EditProfileModal from '../components/modals/EditProfileModal'; // Import modal

const Profile = () => {
  const dispatch = useDispatch();
  const { profileData, loading, error } = useSelector((state) => state.trainer);
  const [editModalOpen, setEditModalOpen] = useState(false); // State for edit modal
  const [addCertModalOpen, setAddCertModalOpen] = useState(false); // State for add cert modal

  // Get basic user info from auth state as fallback or for consistency
  const { user: authUser } = useSelector((state) => state.auth); 

  useEffect(() => {
    dispatch(fetchTrainerProfile());
  }, [dispatch]);

  // Use profileData if available, otherwise use authUser or defaults
  const user = profileData?.user || authUser;
  const profile = profileData; // profileData contains fields like bio, yearsOfExperience etc.

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  }

  if (!profile || !user) {
     // Handle case where profile/user data isn't loaded yet after loading finishes
     // This might happen if the API call succeeds but returns empty/unexpected data
     return <Typography sx={{ mt: 2 }}>Profile data not available.</Typography>;
  }

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleOpenAddCertModal = () => setAddCertModalOpen(true);
  const handleCloseAddCertModal = () => setAddCertModalOpen(false);

  return (
    // TODO: This component structure might need adjustment based on actual API response fields
    <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* Profile Header with Background */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 120, sm: 140 },
          // TODO: Use a background image from profile data if available
          backgroundImage: `url(${defaultBgImage})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        {/* Profile Image */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translate(-50%, 50%)',
            width: { xs: 56, sm: 64 },
            height: { xs: 56, sm: 64 },
            borderRadius: '50%',
            border: '3px solid white',
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
        >
          <Avatar 
            src={user.profilePicture || defaultProfilePic} 
            alt={`${user.firstName} ${user.lastName}`}
            sx={{ width: '100%', height: '100%' }} 
          />
        </Box>
      </Box>

      {/* Profile Content */}
      <Box sx={{ pt: { xs: 4, sm: 4.5 }, pb: { xs: 1.25, sm: 1.5 }, px: { xs: 1.5, sm: 2 } }}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '1rem', sm: '1.125rem' } }}>
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: { xs: 0.75, sm: 1 }, display: 'block' }}>
          {profile.yearsOfExperience ? `${profile.yearsOfExperience} Years Experience` : 'Experience not set'}
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 0.5, color: '#004D40', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Bio
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 0.75, sm: 1 }, display: 'block', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          {profile.bio || 'No bio provided.'}
        </Typography>

        {/* Certifications */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 0.5, sm: 0.75 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 0.75 } }}>
            <img src={defaultCertIcon} alt="" style={{ width: 16, height: 16 }} />
            <Typography variant="subtitle1" sx={{ color: '#004D40', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Certifications
            </Typography>
          </Box>
          <IconButton
            onClick={handleOpenAddCertModal} // Add onClick handler
            size="small"
            sx={{
              backgroundColor: '#004D40',
              color: 'white',
              '&:hover': { backgroundColor: '#00695C' },
              width: { xs: 18, sm: 20 },
              height: { xs: 18, sm: 20 },
              padding: 0
            }}
          >
            <AddIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
          </IconButton>
        </Box>

        {/* Verification Document List - Map over profile.verificationDocuments */}
        {profile.verificationDocuments && profile.verificationDocuments.length > 0 ? (
          profile.verificationDocuments.map((doc, index) => (
            <Box key={doc._id || index} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.75, sm: 1 }, mb: { xs: 0.75, sm: 1 } }}>
              {/* Basic icon, could try rendering image/pdf preview later */}
              <img 
                src={defaultCertIcon} 
                alt={'Document'} 
                style={{
                  width: 45,
                  height: 35,
                  objectFit: 'cover',
                  borderRadius: 4,
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                {/* Display documentName and link to fileUrl */}
                <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                   <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                     {doc.documentName || 'Verification Document'}
                   </a>
                 </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                  {/* Display upload date and status */}
                  Uploaded: {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : 'N/A'} 
                  {/* Status might not be in profileData initially, depends on API response */}
                  {/* • Status: {doc.status || profile.verificationStatus || 'N/A'}  */}
                </Typography>
              </Box>
              {/* TODO: Link this button to edit functionality */}
              <IconButton size="small" sx={{ color: '#004D40', padding: 0.5 }}>
                <EditIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
              </IconButton>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 0.75, sm: 1 } }}>No certifications added.</Typography>
        )}

        {/* Edit Profile Button */}
        <Button
          onClick={handleOpenEditModal} // Add onClick handler
          fullWidth
          variant="contained"
          startIcon={<EditIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
          size="small"
          sx={{
            backgroundColor: '#004D40',
            color: 'white',
            '&:hover': { backgroundColor: '#00695C' },
            textTransform: 'none',
            mt: { xs: 0.5, sm: 0.75 },
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            py: { xs: 0.5, sm: 0.75 },
          }}
        >
          Edit Profile
        </Button>
      </Box>

      {/* TODO: Add EditProfileModal component here */}
      {/* <EditProfileModal 
          open={editModalOpen} 
          handleClose={handleCloseEditModal} 
          profileData={profile} 
       /> */}
       {/* Basic Modal Placeholder */}
       {/* Use the imported EditProfileModal */}
       <EditProfileModal 
          open={editModalOpen} 
          handleClose={handleCloseEditModal} 
          profileData={profile} // Pass current profile data
       />

       {/* Remove basic placeholder */}
       {/* <Modal open={editModalOpen} onClose={handleCloseEditModal}>
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
            <Typography variant="h6" component="h2">Edit Profile Modal</Typography>
            <Typography sx={{ mt: 2 }}>Edit form fields will go here.</Typography>
            <Button onClick={handleCloseEditModal} sx={{ mt: 2 }}>Close</Button>
          </Box>
       </Modal> */}

       {/* TODO: Add AddCertificateModal component here */}
       {/* Basic Modal Placeholder */}
       {/* Use the imported AddCertificateModal */}
       <AddCertificateModal open={addCertModalOpen} handleClose={handleCloseAddCertModal} />
       
       {/* Remove basic placeholder */}
       {/* <Modal open={addCertModalOpen} onClose={handleCloseAddCertModal}>
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
            <Typography variant="h6" component="h2">Add Certification Modal</Typography>
            <Typography sx={{ mt: 2 }}>Upload form fields will go here.</Typography>
            <Button onClick={handleCloseAddCertModal} sx={{ mt: 2 }}>Close</Button>
          </Box>
       </Modal> */}
    </Paper>
  );
};

export default Profile;
