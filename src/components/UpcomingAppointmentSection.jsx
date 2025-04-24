import React from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";

function UpcomingAppointmentSection() {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt="Husnia Karim"
          src="/static/images/avatar/3.jpg" // Replace with actual avatar URL
          sx={{ width: 56, height: 56, mr: 2 }}
        />
        <Box>
          <Typography variant="subtitle1">Upcoming Appointment</Typography>
          <Typography variant="body2" color="textSecondary">
            Husnia Karim
          </Typography>
        </Box>
        <Box
          sx={{
            ml: "auto",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "4px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">14</Typography>
          <Typography variant="caption" color="textSecondary">
            Jan
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default UpcomingAppointmentSection;