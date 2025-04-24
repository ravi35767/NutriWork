import React, { useState } from "react"; // Added useState
import {
  Outlet,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Avatar,
  Typography,
  AppBar,
  IconButton,
  Tooltip, // Added Tooltip
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"; // Added for transitions/styling
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupIcon from "@mui/icons-material/Group";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import MenuIcon from "@mui/icons-material/Menu"; // Icon for toggle button
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; // Icon for toggle button
// Removed CSS Module import as we'll use styled components or sx prop more heavily for dynamic styles
// import styles from './MainLayout.module.css';
import Nutrilogo from "../assets/Nutriwork-logo.png"
const drawerWidth = 240;
const collapsedDrawerWidth = 60; // Width when collapsed

// Styled components for transitions (optional but recommended)
const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.primary.main, // Use theme color
  color: "white",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.primary.main, // Use theme color
  color: "white",
  width: collapsedDrawerWidth, // Use collapsed width
});

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.paper, // White background
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary, // Ensure icons/text are visible
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    marginLeft: collapsedDrawerWidth,
    width: `calc(100% - ${collapsedDrawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen, // Adjust if needed
    }),
  }),
}));

// --- Sidebar Component ---
// Modified to accept 'open' prop
const AppSidebar = ({ open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Define different menu items based on role
  let currentMenuItems = [];
  if (user?.role === "admin") {
    currentMenuItems = [
      { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
      {
        text: "Verification Queue",
        icon: <AdminPanelSettingsIcon />,
        path: "/admin/verify",
      },
      { text: "User Management", icon: <GroupIcon />, path: "/admin/users" },
      {
        text: "Moderation",
        icon: <ReportProblemIcon />,
        path: "/admin/moderation",
      },
      {
        text: "Review Management",
        icon: <RateReviewIcon />,
        path: "/admin/reviews",
      }, // Added Admin Review Link
      { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
    ];
  } else if (user?.role === "trainer" || user?.role === "nutritionist") {
    currentMenuItems = [
      { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
      { text: "Trainees", icon: <PeopleIcon />, path: "/trainees" },
      { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
      { text: "Reviews", icon: <RateReviewIcon />, path: "/reviews" },
      { text: "My videos", icon: <VideoLibraryIcon />, path: "/videos" },
    ];
  } else {
    currentMenuItems = [
      { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
      { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
    ];
  }

  return (
    // Use the StyledDrawer component
    <StyledDrawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          justifyContent: open ? "center" : "flex-start",
          px: open ? 2 : 1.5,
        }}
      >
        {/* Added logo before title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "center" : "flex-start",
          }}
        >
          <img
            src={Nutrilogo}
            alt="NutriWork Logo"
            style={{
              height: open ? "32px" : "24px",
              marginRight: open ? "10px" : "0",
              transition: "height 0.3s",
            }}
          />
          {/* Conditionally show title */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              opacity: open ? 1 : 0,
              transition: "opacity 0.3s",
              ml: 1,
            }}
          >
            NutriWork
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)" }} />

      <List sx={{ flexGrow: 1 }}>
        {currentMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <Tooltip title={!open ? item.text : ""} placement="right">
              <ListItemButton
                component={RouterLink}
                to={item.path}
                selected={location.pathname.startsWith(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: "white",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.15)" },
                  },
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)" }} />

      {/* Moved profile section just before logout section */}
      {/* Conditionally render user profile details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          mt: 2,
          mb: 1,
          opacity: open ? 1 : 0,
          transition: "opacity 0.3s",
          height: open ? "auto" : 0,
          // overflow: "hidden",
        }}
      >
        <Avatar
          alt={user?.firstName || "User"}
          src={user?.profilePicture || "/static/images/avatar/default.jpg"}
          sx={{ width: 60, height: 60, mb: 1 }}
        />
        <Typography variant="subtitle1" noWrap>{`${user?.firstName || ""} ${
          user?.lastName || ""
        }`}</Typography>
      </Box>
      {/* Show smaller avatar when closed */}
      <Box
        sx={{
          display: open ? "none" : "flex",
          justifyContent: "center",
          p: 1,
          mt: 2,
          mb: 1,
        }}
      >
        <Avatar
          alt={user?.firstName || "User"}
          src={user?.profilePicture || "/static/images/avatar/default.jpg"}
          sx={{ width: 32, height: 32 }}
        />
      </Box>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.12)", mb: 1 }} />

      <List>
        <ListItem disablePadding sx={{ display: "block" }}>
          <Tooltip title={!open ? "Log out" : ""} placement="right">
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                color: "white",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "inherit",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

// --- Topbar Component ---
// Modified to accept open state and toggle handler
const AppTopbar = ({ open, handleDrawerOpen }) => (
  // Use StyledAppBar
  <StyledAppBar position="fixed" open={open}>
    <Toolbar sx={{ justifyContent: "space-between" }}>
      {" "}
      {/* Changed justify */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: 5,
          color: "text.primary", // Make icon visible on white bg
          ...(open && { display: "none" }), // Hide when drawer is open
        }}
      >
        <MenuIcon />
      </IconButton>
      {/* Empty Box to push notifications to the right */}
      <Box sx={{ flexGrow: 1 }} />
      <IconButton color="inherit">
        <NotificationsIcon sx={{ color: "text.primary" }} />
      </IconButton>
    </Toolbar>
  </StyledAppBar>
);

// --- Main Layout ---
const MainLayout = () => {
  const [open, setOpen] = useState(true); // State for drawer open/close

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    // Need this for potential future use (e.g., closing on mobile)
    setOpen(false);
  };

  // Toggle function for the button
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Pass open state to AppBar */}
      <AppTopbar open={open} handleDrawerOpen={handleDrawerToggle} />
      {/* Pass open state to Sidebar */}
      <AppSidebar open={open} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }} // Padding for content
      >
        {/* Toolbar spacer needed because AppBar is fixed */}
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
