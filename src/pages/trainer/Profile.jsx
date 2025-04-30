import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainerProfile } from '../../redux/trainerSlice';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Stack,
  Divider,
  Chip,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ProfileContainer = styled(Box)({
  padding: '24px',
});

const ProfileCard = styled(Card)({
  height: '100%',
});

const InfoItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
});

const Profile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.trainer.profileData);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Shaheen',
    title: 'Professional Trainer',
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    location: 'New York, USA',
    email: 'shaheen@example.com',
    phone: '+1 (555) 123-4567',
    specializations: ['Strength Training', 'HIIT', 'Yoga', 'Nutrition'],
    education: [
      { degree: 'Certified Personal Trainer', institution: 'ACE Fitness', year: '2020' },
      { degree: 'Sports Nutrition Certification', institution: 'NASM', year: '2019' },
    ],
    experience: [
      { position: 'Senior Trainer', company: 'Elite Fitness Club', duration: '2020 - Present' },
      { position: 'Personal Trainer', company: 'City Gym', duration: '2018 - 2020' },
    ],
  });

  useEffect(() => {
    dispatch(fetchTrainerProfile());
  }, [dispatch]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to your backend
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <ProfileContainer>
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <ProfileCard>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src="/path-to-profile-image.jpg"
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h5">{profileData?.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {profileData?.title}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                <InfoItem>
                  <LocationIcon color="action" />
                  <Typography>{profileData?.location}</Typography>
                </InfoItem>
                <InfoItem>
                  <EmailIcon color="action" />
                  <Typography>{profileData?.email}</Typography>
                </InfoItem>
                <InfoItem>
                  <PhoneIcon color="action" />
                  <Typography>{profileData?.phone}</Typography>
                </InfoItem>
              </Stack>

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Specializations
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {profileData?.specializations?.map((spec, index) => (
                    <Chip key={index} label={spec} color="primary" />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </ProfileCard>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Bio Section */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  About Me
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                ) : (
                  <Typography>{profileData?.bio}</Typography>
                )}
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Education</Typography>
                </Box>
                {profileData?.education?.map((edu, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">{edu.degree}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {edu.institution} • {edu.year}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Experience</Typography>
                </Box>
                {profileData?.experience?.map((exp, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">{exp.position}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.company} • {exp.duration}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              {isEditing ? (
                <>
                  <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#004D40' }}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={handleEdit} sx={{ bgcolor: '#004D40' }}>
                  Edit Profile
                </Button>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default Profile; 