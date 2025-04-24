import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Rating,
  Avatar,
  Stack,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const ReviewCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const ReviewHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    traineeName: 'John Doe',
    traineeImage: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    date: '2024-02-15',
    comment: 'Amazing trainer! Helped me achieve my fitness goals in just 3 months. Very professional and knowledgeable.',
    program: 'Weight Loss',
    status: 'Completed',
  },
  {
    id: 2,
    traineeName: 'Jane Smith',
    traineeImage: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    date: '2024-02-10',
    comment: 'Great experience overall. The trainer was very supportive and provided excellent guidance throughout my journey.',
    program: 'Muscle Gain',
    status: 'Ongoing',
  },
  // Add more mock reviews as needed
];

// Stats data
const statsData = [
  { label: 'Total Reviews', value: 45 },
  { label: 'Average Rating', value: '4.8' },
  { label: '5 Star Reviews', value: 38 },
];

const ReviewsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Reviews
      </Typography>

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

      {/* Reviews List */}
      <Stack spacing={2}>
        {mockReviews.map((review) => (
          <ReviewCard key={review.id}>
            <CardContent>
              <ReviewHeader>
                <Avatar
                  src={review.traineeImage}
                  alt={review.traineeName}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">{review.traineeName}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Rating value={review.rating} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      {review.date}
                    </Typography>
                    <Chip
                      label={review.status}
                      color={review.status === 'Completed' ? 'success' : 'primary'}
                      size="small"
                    />
                  </Stack>
                </Box>
              </ReviewHeader>
              <Typography variant="body1" paragraph>
                {review.comment}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Program: {review.program}
              </Typography>
            </CardContent>
          </ReviewCard>
        ))}
      </Stack>
    </Box>
  );
};

export default ReviewsPage; 