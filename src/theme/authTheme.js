import { createTheme } from "@mui/material";

// Shared theme for all authentication pages
const authTheme = createTheme({
  palette: {
    primary: {
      main: "#059AA1",
    },
    background: {
      default: "#ffffff",
      paper: "#f8f8f8",
    },
    text: {
      primary: "#333333",
      secondary: "rgba(51, 51, 51, 0.7)",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: "1.75rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          padding: "6px 0",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 12,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#F8FAFC",
          },
        },
      },
    },
  },
});

export default authTheme;
