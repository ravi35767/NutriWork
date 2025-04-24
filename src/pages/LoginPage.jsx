import React from "react";
import { Box, Typography, Link } from "@mui/material";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/auth/FormField";
import SubmitButton from "../components/auth/SubmitButton";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import { useLoginForm } from "../hooks/useAuthForms";

/**
 * LoginPage - User login page
 * @returns {JSX.Element} Login page component
 */
function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
    navigateToSignup,
    navigateToForgotPassword,
  } = useLoginForm();

  return (
    <AuthLayout title="LOGIN" error={error}>
      <Box component="form" onSubmit={handleSubmit}>
        <FormField
          name="email"
          placeholder="Email" // Use placeholder instead of label
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormField
          name="password"
          placeholder="Password" // Use placeholder instead of label
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <SubmitButton
          text="Login Now"
          loading={loading}
          sx={{ mt: 3, mb: 2 }}
        />
        
        <Typography variant="body2" sx={{ textAlign: "right" }}>
          <Link 
            component="button" 
            type="button"
            onClick={navigateToForgotPassword} 
            sx={{ color: "#059AA1", textDecoration: "none" }}
          >
            Forgot Password?
          </Link>
        </Typography>
      </Box>

      <SocialLoginButtons />

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography
          variant="body2"
          sx={{ textAlign: "right", color: "rgba(51, 51, 51, 0.7)" }}
        >
          Don't have an account?{" "}
          <Link
            component="button"
            type="button"
            onClick={navigateToSignup}
            sx={{
              color: "#059AA1",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}

export default LoginPage;
