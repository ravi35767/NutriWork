import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Rating,
  LinearProgress,
  Divider,
  Avatar,
  Button
} from "@mui/material";

// Mock data for reviews
const reviewsData = [
  {
    id: 1,
    name: "Hikaru Nakamura",
    image: "/path/to/hikaru.jpg",
    rating: 4,
    date: "10-08-2024",
    totalReviews: 5,
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into."
  },
  {
    id: 2,
    name: "Magnus Carlson",
    image: "/path/to/magnus.jpg",
    rating: 3,
    date: "15-04-2024",
    totalReviews: 8,
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."
  },
  {
    id: 3,
    name: "Hikaru Nakamura",
    image: "/path/to/hikaru.jpg",
    rating: 4,
    date: "10-08-2024",
    totalReviews: 5,
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into."
  }
];

// Rating distribution data
const ratingDistribution = [
  { rating: 5, count: 95, percentage: 95 },
  { rating: 4, count: 10, percentage: 10 },
  { rating: 3, count: 100, percentage: 100 },
  { rating: 2, count: 35, percentage: 35 },
  { rating: 1, count: 0, percentage: 0 }
];

const ReviewsPage = () => {
  const [dateFilter, setDateFilter] = useState("Aug 20024 - Sep 2024");

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px' }}>
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
          p: 4,
          mb: 4
        }}
      >
        {/* Header with date filter */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Reviews</Typography>
          <Button 
            variant="outlined" 
            sx={{ 
              borderColor: '#e0e0e0',
              color: '#333',
              '&:hover': {
                borderColor: '#ccc',
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            {dateFilter}
          </Button>
        </Box>

        {/* Statistics Row */}
        <Box sx={{ display: 'flex', mb: 4 }}>
          {/* Total Reviews */}
          <Box sx={{ flex: 1, mr: 4 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              Total Reviews
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              11.2k
            </Typography>
          </Box>

          {/* Average Rating */}
          <Box sx={{ flex: 1, mr: 4 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              Average Rating
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 1 }}>
                4.0
              </Typography>
              <Rating value={4} readOnly sx={{ color: '#FFD700' }} />
            </Box>
          </Box>

          {/* Rating Breakdown */}
          <Box sx={{ flex: 2 }}>
            {ratingDistribution.map((item) => (
              <Box key={item.rating} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography sx={{ width: 10, mr: 1 }}>{item.rating}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={item.percentage} 
                  sx={{ 
                    flex: 1, 
                    mr: 1, 
                    height: 10, 
                    borderRadius: 5,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: item.rating >= 4 ? '#4caf50' : 
                                      item.rating === 3 ? '#ff9800' : 
                                      '#f44336'
                    }
                  }} 
                />
                <Typography sx={{ width: 30, fontSize: '0.875rem' }}>
                  {item.count}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Reviews List */}
        <Box sx={{ mt: 4 }}>
          {reviewsData.map((review, index) => (
            <React.Fragment key={review.id}>
              <Box sx={{ display: 'flex', mb: 3 }}>
                {/* Avatar */}
                <Avatar 
                  src={review.image} 
                  alt={review.name}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                
                {/* Review content */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {review.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Review: {review.totalReviews}
                      </Typography>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Rating value={review.rating} readOnly size="small" sx={{ color: '#FFD700', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {review.date}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    {review.comment}
                  </Typography>
                </Box>
              </Box>
              
              {index < reviewsData.length - 1 && (
                <Divider sx={{ my: 3 }} />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default ReviewsPage;