import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

const MyArticles = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              No articles yet
            </Typography>
            <Typography color="text.secondary">
              Start sharing your knowledge by creating your first article.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyArticles; 