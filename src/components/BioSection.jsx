import React from "react";
import { Box, Typography, Avatar, Button, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TrainingCertificate from "../assets/certification.jpeg"; // Import the training certificate image

function BioSection() {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar
          alt="Shaheen"
          src="/static/images/avatar/1.jpg" // Replace with actual avatar URL
          sx={{ width: 80, height: 80, mb: 1 }}
        />
        <Typography variant="h6">Shaheen</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          4 Years Experience
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen boo...
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="subtitle2">Certification</Typography>
          <Box
            component="img"
            src={TrainingCertificate}
            alt="Training Certificate"
            sx={{ width: "100%", maxWidth: 200, mt: 1 }}
          />
        </Box>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{ mt: 2 }}
        >
          Edit Profile
        </Button>
      </Box>
    </Paper>
  );
}

export default BioSection;