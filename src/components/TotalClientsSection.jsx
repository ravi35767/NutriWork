import React from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

function TotalClientsSection() {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar sx={{ bgcolor: "primary.main", color: "white", mb: 1 }}>
          <PeopleIcon />
        </Avatar>
        <Typography variant="h5">120</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          8.5% Up from yesterday
        </Typography>
      </Box>
    </Paper>
  );
}

export default TotalClientsSection;