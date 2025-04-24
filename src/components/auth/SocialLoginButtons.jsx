import React from "react";
import { Box, Button, Typography } from "@mui/material";
import GoogleIconImg from "../../assets/GoogleIcon.png";
import FacebookIconImg from "../../assets/FacebookIcon.png";
import styles from './SocialLoginButtons.module.css'; // Import CSS Module

/**
 * SocialLoginButtons - Component for social login options
 * @returns {JSX.Element} Social login buttons
 */
const SocialLoginButtons = () => {
  // TODO: Implement actual onClick handlers for social login
  const handleGoogleLogin = () => console.log("Google Login Clicked");
  const handleFacebookLogin = () => console.log("Facebook Login Clicked");

  return (
    <Box className={styles.rootBox}> {/* Use class */}
      <Typography variant="body1" className={styles.title}> {/* Use class */}
        Login with Others
      </Typography>

      {/* Apply container class */}
      <Box className={styles.buttonContainer}> 
        <Button
          fullWidth
          startIcon={
            <img
              src={GoogleIconImg}
              alt="Google"
              className={styles.icon} // Use class
            />
          }
          className={styles.socialButton} // Use class
          onClick={handleGoogleLogin}
          // Remove sx styles handled by CSS module
        >
          Login with{" "}
          <span className={styles.providerName}>google</span> {/* Use class */}
        </Button>
      </Box>

      {/* Apply container class (remove mb here if gap is sufficient) */}
      <Box className={styles.buttonContainer} sx={{ mb: 0 }}> 
        <Button
          fullWidth
          startIcon={
            <img
              src={FacebookIconImg}
              alt="Facebook"
              className={styles.icon} // Use class
            />
          }
          className={styles.socialButton} // Use class
          onClick={handleFacebookLogin}
           // Remove sx styles handled by CSS module
        >
          Login with{" "}
          <span className={styles.providerName}>Facebook</span> {/* Use class */}
        </Button>
      </Box>
    </Box>
  );
};

export default SocialLoginButtons;
