import React from "react";
import { TextField, Typography, MenuItem } from "@mui/material";
import styles from './FormField.module.css'; // Import CSS Module

/**
 * FormField - A reusable form field component with consistent styling
 * @param {Object} props - Component props
 * @param {string} props.name - Field name
 * @param {string} props.label - Field label (optional, used for separate Typography label)
 * @param {string} props.placeholder - Placeholder text (used if label prop is not provided)
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.value - Field value
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.required - Whether the field is required
 * @param {boolean} props.error - Whether the field has an error
 * @param {string} props.helperText - Helper text to display (often for errors)
 * @param {Array} props.options - Options for select fields
 * @param {Object} props.inputProps - Additional props for the input
 * @param {Object} props.sx - Additional styles (keep for overrides if needed)
 * @returns {JSX.Element} Form field component
 */
const FormField = ({
  name,
  label, // Use this for the Typography label
  placeholder, // Use this for the input placeholder if label is not used
  type = "text",
  value,
  onChange,
  required = false,
  error = false,
  helperText = "",
  options = [],
  inputProps = {},
  sx = {}, // Keep sx prop for potential overrides
}) => {
  const baseProps = {
    fullWidth: true,
    name,
    variant: "outlined",
    value,
    onChange,
    required,
    error,
    helperText,
    className: styles.textField, // Apply margin class
    sx: sx, // Pass sx prop for overrides
    InputProps: {
      className: styles.inputBase, // Apply background/border radius class
      ...inputProps,
    },
    // Use placeholder if label prop is not provided, otherwise use label prop for TextField's label
    label: !label ? placeholder : undefined, 
    placeholder: label ? placeholder : undefined, // Use placeholder prop if label is provided
  };

  // For select fields
  if (type === "select" && options.length > 0) {
    return (
      <>
        {label && (
          <Typography variant="body1" className={styles.label}>
            {label}:
          </Typography>
        )}
        <TextField
          {...baseProps}
          select
          // Select uses label prop differently, ensure it's set correctly
          label={label ? label : placeholder} 
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </>
    );
  }

  // For date fields
  if (type === "date" || type === "month") {
    return (
      <>
        {label && (
          <Typography variant="body1" className={styles.label}>
            {label}:
          </Typography>
        )}
        <TextField
          {...baseProps}
          type={type}
          label={label ? label : placeholder} // Use label prop for TextField label
          InputLabelProps={{ shrink: true }}
        />
      </>
    );
  }

  // For regular text fields
  return (
    <>
      {label && (
        <Typography variant="body1" className={styles.label}>
          {label}:
        </Typography>
      )}
      <TextField
        {...baseProps}
        type={type}
        label={label ? label : placeholder} // Use label prop for TextField label
        // Placeholder is now handled by baseProps logic
      />
    </>
  );
};

export default FormField;
