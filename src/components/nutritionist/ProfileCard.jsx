import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  Avatar, 
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ProfileInfo = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const ExperienceChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: 'white',
  marginTop: theme.spacing(1),
}));

const BioText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const CertificateItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const ProfileCard = ({ profileData }) => {
  return (
    <StyledPaper elevation={0}>
      <ProfileHeader>
        <Avatar 
          src="/api/placeholder/80/80" 
          alt={profileData.name}
          sx={{ width: 80, height: 80 }}
        />
        <ProfileInfo>
          <Typography variant="h6" component="div">
            {profileData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nutritionist
          </Typography>
          <ExperienceChip 
            label={`${profileData.yearsExperience} years experience`}
            size="small"
          />
        </ProfileInfo>
      </ProfileHeader>

      <BioText variant="body2">
        {profileData.bio}
      </BioText>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
        Certificates
      </Typography>
      
      <List>
        {profileData.certificates.map((cert, index) => (
          <CertificateItem key={index}>
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={cert.title}
              secondary={
                <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarMonthIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  {cert.date}
                </Box>
              }
            />
          </CertificateItem>
        ))}
      </List>
    </StyledPaper>
  );
};

export default ProfileCard; 