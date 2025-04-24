const dotenv = require('dotenv');
dotenv.config();

const API_BASE_URL = process.env.VITE_API_BASE_URL;

const API_ENDPOINTS = {
  // --- Auth ---
  LOGIN: process.env.VITE_LOGIN_URL, // Universal Login
  FORGOT_PASSWORD: process.env.VITE_FORGOT_PASSWORD_URL,
  RESET_PASSWORD: process.env.VITE_RESET_PASSWORD_URL,

  // --- Signup ---
  SIGNUP_TRAINER: process.env.VITE_TRAINER_SIGNUP_URL,
  SIGNUP_NUTRITIONIST: process.env.VITE_NUTRITIONIST_SIGNUP_URL, // Assuming variable exists
  SIGNUP_USER: process.env.VITE_USER_SIGNUP_URL, // Default/End User

  // --- Profile Update ---
  UPDATE_PROFILE_TRAINER: process.env.VITE_TRAINER_PROFILE_UPDATE_URL,
  UPDATE_PROFILE_NUTRITIONIST: process.env.VITE_NUTRITIONIST_PROFILE_UPDATE_URL, // Assuming variable exists
  UPDATE_PROFILE_USER: process.env.VITE_USER_PROFILE_UPDATE_URL, // Default/End User

  // --- Other specific endpoints can be added as needed ---
  // Example:
  // GET_TRAINER_DASHBOARD: '/trainers/dashboard',
  // GET_TRAINER_TRAINEES: '/trainers/trainees',
};

// Validate API configuration
if (!API_BASE_URL) {
  console.error('API_BASE_URL is not defined in environment variables');
}

// Log API configuration in development
if (process.env.NODE_ENV === 'development') {
  console.log('API Configuration:', {
    BASE_URL: API_BASE_URL,
    ENDPOINTS: API_ENDPOINTS
  });
}

module.exports = { API_BASE_URL, API_ENDPOINTS };
