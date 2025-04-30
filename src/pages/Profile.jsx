import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainerProfile } from '../redux/trainerSlice';
import { updateUserProfile } from '../redux/authSlice';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  IconButton, 
  CircularProgress, 
  Alert, 
  Avatar, 
  Chip,
  Divider,
  Container,
  Grid,
  Badge
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Default/placeholder images
import defaultProfilePic from '../assets/profile.jpeg';
import defaultBgImage from '../assets/gym-exercises.jpeg';
import defaultCertIcon from '../assets/certification.jpeg';
import AddCertificateModal from '../components/modals/AddCertificateModal';
import EditProfileModal from '../components/modals/EditProfileModal';

const Profile = () => {
  const dispatch = useDispatch();
  
  // Get data from both slices
  const { profileData, loading: trainerLoading, error: trainerError } = useSelector((state) => state.trainer);
  const { user: authUser, loading: authLoading, error: authError } = useSelector((state) => state.auth);
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addCertModalOpen, setAddCertModalOpen] = useState(false);
  const [editCoverPhotoOpen, setEditCoverPhotoOpen] = useState(false);
  const [editProfilePhotoOpen, setEditProfilePhotoOpen] = useState(false);

  const userRole = authUser?.role;
  
  // Mock online status for demo (would come from your backend in real app)
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Only fetch trainer profile if the user is a trainer
    if (userRole === 'trainer') {
      dispatch(fetchTrainerProfile());
    }
  }, [dispatch, userRole]);

  // Determine loading state based on role
  const isLoading = userRole === 'trainer' ? trainerLoading : authLoading;
  // Determine error state based on role
  const error = userRole === 'trainer' ? trainerError : authError;

  // Determine user and profile data based on role
  const user = userRole === 'trainer' ? profileData?.user : authUser;
  const profile = userRole === 'trainer' ? profileData : null;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} thickness={4} sx={{ color: '#004D40' }} />
      </Box>
    );
  }

  if (error) {
    const errorMessage = typeof error === 'string' ? error : 'An error occurred loading profile data.';
    return (
      <Alert severity="error" sx={{ mt: 4, mx: 'auto', maxWidth: 600 }}>
        {errorMessage}
      </Alert>
    );
  }
  
  if (!user) {
    return <Typography sx={{ mt: 4, textAlign: 'center' }}>User data not available.</Typography>;
  }
  
  if (userRole === 'trainer' && !profile) {
    return <Typography sx={{ mt: 4, textAlign: 'center' }}>Trainer profile data not available.</Typography>;
  }

  const handleOpenEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleOpenAddCertModal = () => setAddCertModalOpen(true);
  const handleCloseAddCertModal = () => setAddCertModalOpen(false);

  const handleEditCoverPhoto = () => setEditCoverPhotoOpen(true);
  const handleEditProfilePhoto = () => setEditProfilePhotoOpen(true);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Paper sx={{ 
        borderRadius: 3, 
        overflow: 'hidden', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        {/* Cover Photo Area */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 180, sm: 250, md: 300 },
            backgroundImage: `url(${user.coverPhoto || defaultBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'all 0.3s ease',
            '&:hover .cover-edit': {
              opacity: 1
            }
          }}
        >
          {/* Cover Photo Edit Button */}
          <IconButton 
            className="cover-edit" 
            onClick={handleEditCoverPhoto}
            sx={{ 
              position: 'absolute', 
              right: 16, 
              top: 16, 
              bgcolor: 'rgba(255,255,255,0.8)',
              opacity: 0,
              transition: 'opacity 0.2s ease',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
            }}
          >
            <CameraAltIcon sx={{ color: '#004D40' }} />
          </IconButton>
          
          {/* Profile Name Overlay */}
          <Box sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            p: { xs: 2, sm: 3 }, 
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', sm: 'flex-start' }
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white', 
                fontWeight: 700, 
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {`${user.firstName} ${user.lastName}`}
              {user.isVerified && (
                <VerifiedIcon sx={{ color: '#2196F3', ml: 1, fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2rem' }}} />
              )}
            </Typography>
            
            {userRole === 'trainer' && profile?.specialty && (
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white', 
                  opacity: 0.9,
                  mt: 0.5,
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', sm: '1.1rem' },
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {profile.specialty}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Profile Content Section */}
        <Grid container spacing={0}>
          {/* Left Sidebar - Profile Picture & Info */}
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ 
              p: { xs: 2, sm: 3 }, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              position: 'relative',
              mt: { xs: 0, sm: -8 }
            }}>
              {/* Profile Picture with Online Status */}
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  isOnline && (
                    <Box sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      backgroundColor: '#4CAF50', 
                      border: '2px solid white' 
                    }} />
                  )
                }
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 120, sm: 140, md: 160 },
                    height: { xs: 120, sm: 140, md: 160 },
                    borderRadius: '50%',
                    border: '4px solid white',
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    mb: { xs: 2, sm: 3 },
                    transition: 'all 0.3s ease',
                    '&:hover .profile-edit': {
                      opacity: 1
                    }
                  }}
                >
                  <Avatar 
                    src={user.profilePicture || defaultProfilePic} 
                    alt={`${user.firstName} ${user.lastName}`}
                    sx={{ width: '100%', height: '100%' }} 
                  />
                  <IconButton 
                    className="profile-edit"
                    onClick={handleEditProfilePhoto}
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      bottom: 0, 
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <CameraAltIcon sx={{ color: 'white', fontSize: '2rem' }} />
                  </IconButton>
                </Box>
              </Badge>

              {/* Status Chip */}
              <Chip
                label={isOnline ? "Online" : "Offline"}
                color={isOnline ? "success" : "default"}
                size="small"
                sx={{ 
                  fontWeight: 500, 
                  mb: 3,
                  px: 1
                }}
              />

              {/* User Details List */}
              <Box sx={{ width: '100%' }}>
                {user.email && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <EmailIcon sx={{ color: '#757575', mr: 1, fontSize: '1.1rem' }} />
                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                  </Box>
                )}
                
                {user.phone && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <PhoneIcon sx={{ color: '#757575', mr: 1, fontSize: '1.1rem' }} />
                    <Typography variant="body2" color="text.secondary">{user.phone}</Typography>
                  </Box>
                )}
                
                {user.address && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <LocationOnIcon sx={{ color: '#757575', mr: 1, fontSize: '1.1rem' }} />
                    <Typography variant="body2" color="text.secondary">{user.address}</Typography>
                  </Box>
                )}
                
                {user.dob && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <CalendarMonthIcon sx={{ color: '#757575', mr: 1, fontSize: '1.1rem' }} />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(user.dob).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}
                
                {user.lastLoggedIn && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <AccessTimeIcon sx={{ color: '#757575', mr: 1, fontSize: '1.1rem' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                      Last active: {new Date(user.lastLoggedIn).toLocaleString()}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Edit Profile Button */}
              <Button
                onClick={handleOpenEditModal}
                fullWidth
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                  backgroundColor: '#004D40',
                  color: 'white',
                  '&:hover': { backgroundColor: '#00695C' },
                  textTransform: 'none',
                  mt: 2,
                  borderRadius: 2,
                  py: 1
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={12} sm={8} md={9}>
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
              {/* Admin specific content */}
              {userRole === 'admin' && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: '#004D40', fontWeight: 600 }}>
                    Admin Dashboard
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Welcome to your admin profile. You have access to manage the platform settings and user accounts.
                  </Typography>
                  <Chip label="Admin" color="primary" sx={{ mb: 3 }} />
                </Box>
              )}

              {/* Trainer specific content */}
              {userRole === 'trainer' && profile && (
                <>
                  {/* Experience Section */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <WorkIcon sx={{ color: '#004D40', mr: 1 }} />
                    <Typography variant="h6" sx={{ color: '#004D40', fontWeight: 600 }}>
                      Experience
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, ml: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {profile.yearsOfExperience ? `${profile.yearsOfExperience} Years of Professional Training` : 'Experience not set'}
                    </Typography>
                  </Box>

                  {/* Bio Section */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1.5, color: '#004D40', fontWeight: 600 }}>
                      About Me
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.7, ml: 1 }}>
                      {profile.bio || 'No bio provided. Add your bio to tell clients about your training style and expertise.'}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {/* Certifications Section */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SchoolIcon sx={{ color: '#004D40', mr: 1 }} />
                      <Typography variant="h6" sx={{ color: '#004D40', fontWeight: 600 }}>
                        Certifications & Credentials
                      </Typography>
                    </Box>
                    <Button
                      onClick={handleOpenAddCertModal}
                      variant="contained"
                      startIcon={<AddIcon />}
                      size="small"
                      sx={{
                        backgroundColor: '#004D40',
                        color: 'white',
                        '&:hover': { backgroundColor: '#00695C' },
                        textTransform: 'none',
                        borderRadius: 2
                      }}
                    >
                      Add New
                    </Button>
                  </Box>

                  {/* Certifications List */}
                  {profile.verificationDocuments && profile.verificationDocuments.length > 0 ? (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      {profile.verificationDocuments.map((doc, index) => (
                        <Grid item xs={12} sm={6} key={doc._id || index}>
                          <Paper
                            elevation={1}
                            sx={{
                              p: 2,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transform: 'translateY(-2px)'
                              }
                            }}
                          >
                            <img
                              src={defaultCertIcon}
                              alt={'Document'}
                              style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                  {doc.documentName || 'Certification'}
                                </a>
                              </Typography>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Uploaded: {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : 'N/A'}
                              </Typography>
                            </Box>
                            <IconButton size="small" sx={{ color: '#004D40' }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        backgroundColor: '#f5f5f5',
                        borderRadius: 2,
                        mt: 2
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        No certifications added yet. Add your professional certifications to enhance your profile.
                      </Typography>
                      <Button
                        onClick={handleOpenAddCertModal}
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{
                          mt: 2,
                          color: '#004D40',
                          borderColor: '#004D40',
                          '&:hover': {
                            borderColor: '#00695C',
                            backgroundColor: 'rgba(0, 77, 64, 0.04)'
                          },
                          textTransform: 'none'
                        }}
                      >
                        Add Certification
                      </Button>
                    </Paper>
                  )}
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Modals */}
      <EditProfileModal 
        open={editModalOpen} 
        handleClose={handleCloseEditModal} 
        profileData={userRole === 'trainer' ? profile : authUser} 
      />

      {userRole === 'trainer' && (
        <AddCertificateModal open={addCertModalOpen} handleClose={handleCloseAddCertModal} />
      )}
    </Container>
  );
};

export default Profile;