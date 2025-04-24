import React from "react";
import { Box, Typography, ThemeProvider, Container } from "@mui/material";
import logoImage from "../../assets/Nutriwork-logo.png";
import backgroundImage from "../../assets/LoginBackgroundImage.png";
import authTheme from "../../theme/authTheme";
import styles from './AuthLayout.module.css'; // Import CSS Module

/**
 * AuthLayout - A reusable layout component for authentication pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render in the right side form area
 * @param {string} props.title - Title to display at the top of the form area
 * @param {string} props.error - Optional error message to display
 * @param {string} props.maxWidth - Optional max width for the form container (default: "sm")
 * @param {boolean} props.centerContent - A boolean to conditionally center the content (used for ResetPassword page)
 */
const AuthLayout = ({ children, title, error, maxWidth = "sm", centerContent = false }) => {
  return (
    <ThemeProvider theme={authTheme}>
      {/* Use className for root Box */}
      <Box className={styles.rootBox}> 
        {/* Left Side - Background and Logo */}
        <Box
          className={styles.leftSide} // Use class
          // Keep responsive display logic in sx
          sx={{
            width: { xs: 0, md: "50%" },
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            component="img"
            src={backgroundImage}
            alt="Background"
            className={styles.leftSideBackground} // Use class
          />
          {/* Logo and Text Container */}
          <Box className={styles.leftSideContent}> {/* Use class */}
            <Box className={styles.logoContainer}> {/* Use class */}
              <Box
                className={styles.logoWrapper} // Use class
                // Keep responsive size in sx
                sx={{
                  width: { md: 40, lg: 48 },
                  height: { md: 40, lg: 48 },
                }}
              >
                <img
                  src={logoImage}
                  alt="Nutriwork"
                  className={styles.logoImage} // Use class
                />
              </Box>
              <Typography
                variant="h6"
                className={styles.brandName} // Use class
                // Keep responsive font size in sx
                sx={{
                  fontSize: { md: "1.1rem", lg: "1.25rem" },
                }}
              >
                NutriWork
              </Typography>
            </Box>

            {/* Heading */}
            <Typography
              variant="h3"
              className={styles.heading} // Use class
              // Keep responsive font size in sx
              sx={{
                fontSize: { md: "1.75rem", lg: "2.25rem" },
              }}
            >
              Your Gateway to Personalized Training and Nutrition
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Scrollable Form Content */}
        <Box
          className={styles.rightSide} // Use class
          // Keep responsive width and conditional justify content in sx
          sx={{
            width: { xs: "100%", md: "50%" },
            justifyContent: centerContent ? "center" : "flex-start", 
            p: { xs: 2, sm: 3, md: 4 }, // Keep responsive padding
          }}
        >
          <Container
            maxWidth={maxWidth}
            className={styles.formContainer} // Use class
          >
            <Box className={styles.titleContainer}> {/* Use class */}
              <Typography
                variant="h4"
                className={styles.title} // Use class
                // Keep responsive font size in sx
                sx={{
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                }}
              >
                {title}
              </Typography>
              {error && (
                <Typography
                  color="error"
                  className={styles.errorText} // Use class
                  // Keep responsive font size in sx
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                >
                  {error}
                </Typography>
              )}
            </Box>
            {/* Scrollable children (form) */}
            <Box className={styles.childrenWrapper}>{children}</Box> {/* Use class */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AuthLayout;
