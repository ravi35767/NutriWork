// src/hooks/useSignupForm.js
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, clearError } from "../redux/authSlice"; // Adjust path as needed

/**
 * Custom hook for signup form handling, including user role.
 * Assumes the component using this hook will display the 'error' and 'passwordMatch' states.
 * @returns {Object} Form state and handlers.
 */
export const useSignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
    // Role is not part of the form state itself, it's passed during submission
  });

  // State specifically for password mismatch feedback
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Clear redux errors when the component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]); // Only run on mount/dispatch change

  // Separate effect for resetting match status when passwords change
  useEffect(() => {
      setPasswordMatch(true);
  }, [formData.password, formData.confirmPassword]);


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Modified handleSubmit to accept and include the role
  const handleSubmit = (e, role) => { // Added role parameter
    e.preventDefault();
    if (!role) {
        console.error("Role is missing during signup submission!");
        // Optionally set an error state here if needed
        return; // Prevent submission without a role
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true); // Ensure it's true if passwords match now
    dispatch(clearError()); // Clear previous errors

    // Include the role in the data sent to the signup action
    // Ensure your signup thunk/action in authSlice expects this structure
    dispatch(signup({ ...formData, role }));
  };

  const navigateToLogin = useCallback(() => navigate("/login"), [navigate]);

  return {
    formData,
    loading,
    error, // Directly expose redux error
    passwordMatch,
    handleChange,
    handleSubmit, // Return the modified handler
    navigateToLogin,
  };
};

// Export the hook as default or named, depending on your preference
// export default useSignupForm; // If you prefer default export
export default useSignupForm