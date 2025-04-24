import React from "react";
import { Typography } from "@mui/material";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";
import SubmitButton from "../components/auth/SubmitButton";
import { useResetPasswordForm } from "../hooks/useAuthForms";

/**
 * ResetPassword - Reset password page
 * @returns {JSX.Element} Reset password page component
 */
function ResetPassword() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleResetPassword,
    passwordMatch,
  } = useResetPasswordForm();

  return (
    <AuthLayout title="Reset Password" maxWidth="xs">
      <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
        Enter your new password below.
      </Typography>

      <FormField
        name="password"
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 3 }} // Add margin between form fields
      />

      <FormField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!passwordMatch}
        helperText={!passwordMatch ? "Passwords do not match" : ""}
        sx={{ mb: 3 }} // Add margin between form fields
      />

      <SubmitButton text="Reset Password" onClick={handleResetPassword} />
    </AuthLayout>
  );
}

export default ResetPassword;
