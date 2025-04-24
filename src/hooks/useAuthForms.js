// src/hooks/useAuthForms.js
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  login,
  requestPasswordReset,
  confirmPasswordReset,
  clearError,
  signup,
  resetPassword,
} from "../redux/authSlice"; // Import necessary actions from authSlice

// --- Login Hook ---
/**
 * Custom hook for login form handling.
 * Assumes the component using this hook will display the 'error' state.
 * @returns {Object} Form state and handlers.
 */
export const useLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: reduxError, loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Clear error state when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError()); // Clear previous errors before attempting login
    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        const userPayload = resultAction.payload?.payload?.user;
        if (userPayload) {
          navigate("/dashboard"); // Navigate to dashboard after successful login
        } else {
          console.error("User data is missing or in unexpected structure in the API response payload:", resultAction.payload);
        }
      }
    } catch (err) {
      console.error("Login dispatch failed (error should be in Redux state):", err);
    }
  };

  const navigateToSignup = useCallback(() => navigate("/signup"), [navigate]);
  const navigateToForgotPassword = useCallback(() => navigate("/forgot-password"), [navigate]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    error: reduxError, // Expose the error from Redux state
    loading,
    handleSubmit,
    navigateToSignup,
    navigateToForgotPassword,
  };
};

// --- Forgot Password Request Hook ---
/**
 * Custom hook for handling the initial "forgot password" email request.
 * Assumes the component handles displaying 'error' and success messages.
 * @returns {Object} Form state and handlers.
 */
export const useForgotPasswordRequestForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false); // Track submission state

  useEffect(() => {
    dispatch(clearError());
    setSubmitted(false); // Reset submitted state on mount
  }, [dispatch]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    setSubmitted(false); // Reset before trying
    try {
      const resultAction = await dispatch(requestPasswordReset(email));
      if (requestPasswordReset.fulfilled.match(resultAction)) {
        setSubmitted(true); // Indicate success for UI feedback
      }
    } catch (err) {
      console.error("Password reset request dispatch failed:", err);
    }
  };

  return {
    email,
    setEmail,
    loading,
    error,
    submitted, // Expose submitted state for UI feedback
    handleEmailSubmit,
  };
};

// --- Confirm Password Reset Hook ---
/**
 * Custom hook for handling the final password reset step (after email/code verification).
 * Requires a reset token (e.g., from URL parameters).
 * Assumes the component handles displaying 'error' and 'passwordMatch' states.
 * @returns {Object} Form state and handlers.
 */
export const useConfirmPasswordResetForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetToken } = useParams(); // Get token from URL, e.g., /reset-password/:resetToken
  const { loading, error } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [tokenError, setTokenError] = useState(null); // Specific error for missing token

  useEffect(() => {
    dispatch(clearError());
    setPasswordMatch(true); // Reset match status on mount
    setTokenError(null); // Clear token error on mount
    if (!resetToken) {
      console.error("Reset token is missing from URL!");
      setTokenError("Invalid or missing reset link.");
    }
  }, [dispatch, resetToken]);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!resetToken) {
      setTokenError("Cannot reset password without a valid link.");
      return; // Stop if token was missing initially
    }
    setTokenError(null); // Clear token error if we proceed

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);
    dispatch(clearError()); // Clear any previous API errors

    try {
      const resultAction = await dispatch(confirmPasswordReset({ token: resetToken, newPassword: password }));
      if (confirmPasswordReset.fulfilled.match(resultAction)) {
        navigate("/login", { state: { passwordResetSuccess: true } });
      }
    } catch (err) {
      console.error("Password reset confirmation dispatch failed:", err);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordMatch,
    loading,
    error: tokenError || error, // Prioritize token error, then show Redux error
    handlePasswordReset,
  };
};

// --- Signup Hook ---
export const useSignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading = false, error = null } = useSelector((state) => state?.auth || {});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const passwordMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (e, role) => {
    e.preventDefault();
    if (!passwordMatch) return;

    dispatch(clearError());
    const apiPayload = { 
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      ...(formData.phone && { phone: formData.phone }), 
      ...(formData.gender && { gender: formData.gender }),
      ...(formData.dob && { dob: formData.dob }),
    };

    try {
      await dispatch(signup({ userData: apiPayload, role: role })).unwrap(); 
      navigate('/login');
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const navigateToLogin = () => navigate('/login');

  return {
    formData,
    loading,
    error,
    passwordMatch,
    handleChange,
    handleSubmit,
    navigateToLogin,
  };
};

// --- Forgot Password Form Hook ---
export const useForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    await dispatch(requestPasswordReset(email));
  };

  const navigateToLogin = () => navigate('/login');

  return {
    email,
    setEmail,
    loading,
    error,
    success,
    handleSubmit,
    navigateToLogin,
  };
};

// --- Reset Password Form Hook ---
export const useResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = async (e, token) => {
    e.preventDefault();
    if (!passwordMatch) return;

    dispatch(clearError());
    const result = await dispatch(resetPassword({ token, password }));
    if (!result.error) {
      navigate('/login');
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    success,
    handleSubmit,
    passwordMatch,
    
  };
};
