import React from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function AppointmentScheduleSection() {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <IconButton>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h6">Month 2000</Typography>
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      {/* Add calendar grid here */}
      <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center" }}>
        [Calendar Grid Placeholder]
      </Typography>
    </Paper>
  );
}

export default AppointmentScheduleSection;