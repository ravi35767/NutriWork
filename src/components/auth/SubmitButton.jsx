import React from "react";
import { Button } from "@mui/material";
import styles from './SubmitButton.module.css'; // Import CSS Module

/**
 * SubmitButton - A reusable submit button component with consistent styling
 * @param {Object} props - Component props
 * @param {string} props.text - Button text
 * @param {boolean} props.loading - Whether the button is in loading state
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {Function} props.onClick - Click handler (optional, for non-form buttons)
 * @param {Object} props.sx - Additional styles (keep for overrides)
 * @returns {JSX.Element} Submit button component
 */
const SubmitButton = ({
  text,
  loading = false,
  disabled = false,
  onClick,
  sx = {}, // Keep sx prop for overrides
}) => {
  return (
    <Button
      type={onClick ? "button" : "submit"}
      fullWidth
      variant="contained"
      disabled={loading || disabled}
      onClick={onClick}
      className={styles.submitButton} // Apply base class
      sx={sx} // Apply overrides
      // Remove inline styles handled by CSS module
      // sx={{
      //   py: 1.25,
      //   bgcolor: "#084043",
      //   "&:hover": { bgcolor: "#048d93" },
      //   fontSize: "1rem",
      //   fontWeight: 600,
      //   ...sx,
      // }}
    >
      {loading ? "Processing..." : text}
    </Button>
  );
};

export default SubmitButton;
