import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Add a request interceptor to handle JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle JWT token and errors
API.interceptors.response.use(
  (response) => {
    // If the response contains a token, store it
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized errors
      if (error.response.status === 400) {
        localStorage.removeItem('token');
        // You might want to redirect to login page here
        window.location.href = '/login';
      }
      console.error('Error response:', error.response);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

export const signup = (formData) => API.post(import.meta.env.VITE_SIGNUP_ENDPOINT, formData);
export const login = (formData) => API.post(import.meta.env.VITE_LOGIN_ENDPOINT, formData);

// Add a function to check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Add a function to logout
export const logout = () => {
  localStorage.removeItem('token');
  // You might want to redirect to login page here
  window.location.href = '/login';
};
