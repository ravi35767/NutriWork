import React from "react";
import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const NutritionistArticles = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Articles
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: "none" }}
        >
          Create New Article
        </Button>
      </Box>

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

export default NutritionistArticles; 