import React from "react";
import { Box, Typography } from "@mui/material";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";
import SubmitButton from "../components/auth/SubmitButton";
import { useForgotPasswordForm } from "../hooks/useAuthForms";

/**
 * ForgotPassword - Password recovery page
 * @returns {JSX.Element} Forgot password page component
 */
function ForgotPassword() {
  const {
    email,
    setEmail,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isEmailVerified,
    loading,
    error,
    handleEmailSubmit,
    handlePasswordReset,
  } = useForgotPasswordForm();

  return (
    <AuthLayout 
      title={isEmailVerified ? "Reset Password" : "Forgot Password"} 
      error={error}
      maxWidth="xs"
    >
      {!isEmailVerified ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
            Enter your email to receive a verification code.
          </Typography>
          
          <FormField
            name="Email"
            // label="Email"
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <SubmitButton
            text="Send Verification Code"
            loading={loading}
            onClick={handleEmailSubmit}
          />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
            Please enter your new password.
          </Typography>
          
          <FormField
            name="newPassword"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          
          <FormField
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          <SubmitButton
            text="Reset Password"
            loading={loading}
            onClick={handlePasswordReset}
          />
        </Box>
      )}
    </AuthLayout>
  );
}

export default ForgotPassword;
