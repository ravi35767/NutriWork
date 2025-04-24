// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";
import SubmitButton from "../components/auth/SubmitButton";
import { useSignupForm } from "../hooks/useAuthForms";

const USER_ROLES = {
  CLIENT: "trainer", // Changed "Trainer" to "trainer" (lowercase)
  PROFESSIONAL: "nutritionist",
};

function SignupPage() {
  const [selectedRole, setSelectedRole] = useState(null);

  const {
    formData,
    loading,
    error,
    passwordMatch,
    handleChange,
    handleSubmit,
    navigateToLogin,
  } = useSignupForm();

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleFormSubmit = (e) => {
    handleSubmit(e, selectedRole);
  };

  // This function fixes the issue with form field names to ensure they match the formData object
  const getFieldName = (displayName) => {
    // Convert display names to camelCase keys that match formData object
    const nameMap = {
      "First Name": "firstName",
      "LastName": "lastName", // This seems to be inconsistent in the original
      "Email": "email",
      "Phone Number": "phone",
      "Gender": "gender",
      "Date of Birth": "dob",
      "Password": "password",
      "Confirm Password": "confirmPassword"
    };
    
    return nameMap[displayName] || displayName.toLowerCase();
  };

  const renderRoleButtons = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mb: 3,
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={selectedRole === USER_ROLES.CLIENT ? 6 : 3}
        onClick={() => handleRoleSelect(USER_ROLES.CLIENT)}
        sx={{
          p: 2,
          cursor: "pointer",
          border:
            selectedRole === USER_ROLES.CLIENT
              ? "2px solid #1976d2"
              : "1px solid transparent",
          "&:hover": { borderColor: "primary.main", boxShadow: 6 },
          textAlign: "center",
          flex: 1,
        }}
      >
        <FitnessCenterIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography variant="h6" gutterBottom>
          I'm a Trainer
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Looking for nutritional guidance.
        </Typography>
      </Paper>

      <Paper
        elevation={selectedRole === USER_ROLES.PROFESSIONAL ? 6 : 3}
        onClick={() => handleRoleSelect(USER_ROLES.PROFESSIONAL)}
        sx={{
          p: 2,
          cursor: "pointer",
          border:
            selectedRole === USER_ROLES.PROFESSIONAL
              ? "2px solid #1976d2"
              : "1px solid transparent",
          "&:hover": { borderColor: "primary.main", boxShadow: 6 },
          textAlign: "center",
          flex: 1,
        }}
      >
        <MedicalServicesIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography variant="h6" gutterBottom>
          I'm a Nutritionist
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Offering nutritional services.
        </Typography>
      </Paper>
    </Box>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleFormSubmit}>
      {renderRoleButtons()}

      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <FormField
          name="First Name"
          placeholder="First Name"
          value={formData.firstName || ""}
          onChange={(e) => handleChange({
            target: {
              name: "firstName",
              value: e.target.value
            }
          })}
          required
        />
        <FormField
          name="LastName"
          placeholder="Last Name"
          value={formData.lastName || ""}
          onChange={(e) => handleChange({
            target: {
              name: "lastName",
              value: e.target.value
            }
          })}
          required
        />
      </Box>
      <FormField
        name="Email"
        placeholder="Email"
        type="email"
        value={formData.email || ""}
        onChange={(e) => handleChange({
          target: {
            name: "email",
            value: e.target.value
          }
        })}
        required
      />
      <FormField
        name="Phone Number"
        placeholder="Phone Number"
        value={formData.phone || ""}
        onChange={(e) => handleChange({
          target: {
            name: "phone",
            value: e.target.value
          }
        })}
        required
      />
      <FormField
        name="Gender"
        placeholder="Gender"
        type="select"
        value={formData.gender || ""}
        onChange={(e) => handleChange({
          target: {
            name: "gender",
            value: e.target.value
          }
        })}
        options={genderOptions}
        required
      />
      <FormField
        name="Date of Birth"
        placeholder="Date of Birth"
        type="month"
        value={formData.dob || ""}
        onChange={(e) => handleChange({
          target: {
            name: "dob",
            value: e.target.value
          }
        })}
        required
        InputLabelProps={{ shrink: true }}
      />
      <FormField
        name="Password"
        placeholder="Password"
        type="password"
        value={formData.password || ""}
        onChange={(e) => handleChange({
          target: {
            name: "password",
            value: e.target.value
          }
        })}
        required
      />
      <FormField
        name="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        value={formData.confirmPassword || ""}
        onChange={(e) => handleChange({
          target: {
            name: "confirmPassword",
            value: e.target.value
          }
        })}
        required
        error={!passwordMatch}
        helperText={!passwordMatch ? "Passwords do not match" : ""}
      />

      <SubmitButton
        text="Create Account"
        loading={loading}
        disabled={!passwordMatch || loading}
      />
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Already have an account?{" "}
          <Button
            color="primary"
            onClick={navigateToLogin}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </form>
  );

  return (
    <AuthLayout title="Create Account" error={error}>
      {renderSignupForm()}
    </AuthLayout>
  );
}

export default SignupPage;
