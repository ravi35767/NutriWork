import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#059AA1",
      dark: "#084043",
      light: "#048d93",
    },
    background: {
      default: "#ffffff",
      paper: "#F8FAFC",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          padding: "8px 0",
          "&.MuiButton-contained": {
            backgroundColor: "#084043",
            "&:hover": {
              backgroundColor: "#048d93",
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#F8FAFC",
            borderRadius: "6px",
          },
        },
      },
    },
  },
}); 