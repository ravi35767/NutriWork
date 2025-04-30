import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Rating,
  Container,
  useMediaQuery,
  useTheme,
  Button,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Icons
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PeopleIcon from "@mui/icons-material/People";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Components
import DashboardProfile from "../../components/Bio";
import ChatList from "../../pages/trainer/ChatList";

// Services
import { dashboardService } from "../../services/api/dashboardService";

// Styled Components
const SidebarContainer = styled(Box)(({ isOpen }) => ({
  width: 250,
  height: "100vh",
  backgroundColor: "#004D40",
  color: "white",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  left: isOpen ? 0 : -250,
  top: 0,
  transition: "left 0.3s",
  zIndex: 1100,
  boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
}));

const MenuItem = styled(ListItem)(({ isActive }) => ({
  marginBottom: "8px",
  backgroundColor: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  borderRadius: "4px",
  margin: "4px 8px",
}));

const HeaderContainer = styled(AppBar)(({ isSidebarOpen }) => ({
  backgroundColor: "white",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  width: `calc(100% - ${isSidebarOpen ? 250 : 0}px)`,
  marginLeft: isSidebarOpen ? "250px" : 0,
  transition: "margin-left 0.3s, width 0.3s",
  zIndex: 1000,
}));

const TrainerDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [totalTrainees, setTotalTrainees] = useState(0);
  const [activeTrainees, setActiveTrainees] = useState(0);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMdScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = new Date().getDate();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const [visibleDates, setVisibleDates] = useState(
    isXsScreen ? 7 : isSmScreen ? 14 : 31
  );

  // Menu items for sidebar
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/trainer" },
    { text: "Trainees", icon: <PeopleIcon />, path: "/trainer/trainees" },
    { text: "Profile", icon: <PersonIcon />, path: "/trainer/profile" },
    { text: "Reviews", icon: <RateReviewIcon />, path: "/trainer/reviews" },
    { text: "My videos", icon: <VideoLibraryIcon />, path: "/trainer/videos" },
  ];

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle logout
  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  // Get page title for header
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/trainer") return "Dashboard";
    const title = path.split("/").pop();
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  // Update visible dates based on screen size
  useEffect(() => {
    setVisibleDates(isXsScreen ? 7 : isSmScreen ? 14 : 31);
  }, [isXsScreen, isSmScreen, isMdScreen, isLgScreen]);

  // Fetch trainee data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalTraineesData = await dashboardService.getTotalTrainees();
        setTotalTrainees(totalTraineesData.data.length);

        const activeTraineesData = await dashboardService.getActiveTrainees();
        setActiveTrainees(activeTraineesData.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch session data
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessionsData = await dashboardService.getUpcomingSessions();
        setUpcomingSessions(sessionsData.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Component */}
      <SidebarContainer isOpen={isSidebarOpen}>
        {/* Logo and Project Name */}
        <Box sx={{ p: 2, textAlign: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.12)" }}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "1.2rem",
            }}
          >
            NutriWork
          </Typography>
        </Box>

        {/* Navigation Items */}
        <List sx={{ flexGrow: 1, pt: 2 }}>
          {menuItems.map((item) => (
            <MenuItem
              button
              key={item.text}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </MenuItem>
          ))}
        </List>

        {/* User Profile and Logout Section */}
        <Box sx={{ p: 2, borderTop: "1px solid rgba(255, 255, 255, 0.12)", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
            <Avatar
              sx={{ width: 60, height: 60, mb: 1, border: "2px solid white" }}
              alt={user?.name || "User"}
              src="/path-to-avatar"
            />
            <Typography variant="subtitle1">{user?.name || "Trainer"}</Typography>
          </Box>
          
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
              },
            }}
          >
            Log out
          </Button>
        </Box>
      </SidebarContainer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isSidebarOpen ? "250px" : 0,
          transition: "margin-left 0.3s",
        }}
      >
        {/* Header Component */}
        <HeaderContainer position="fixed" isSidebarOpen={isSidebarOpen}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Page Title */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="toggle sidebar"
                onClick={toggleSidebar}
                sx={{
                  mr: 2,
                  color: "#004D40",
                  "&:hover": {
                    backgroundColor: "rgba(0, 77, 64, 0.08)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{
                  color: "#000",
                  fontWeight: 500,
                }}
              >
                {getPageTitle()}
              </Typography>
            </Box>

            {/* Right side buttons and notification */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#004D40",
                  "&:hover": {
                    backgroundColor: "#00695C",
                  },
                  textTransform: "none",
                }}
              >
                Upload Video
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#004D40",
                  "&:hover": {
                    backgroundColor: "#00695C",
                  },
                  textTransform: "none",
                }}
                onClick={() => navigate("/trainer/create-session")}
              >
                Create session
              </Button>
              <IconButton
                color="inherit"
                sx={{
                  color: "#004D40",
                  "&:hover": {
                    backgroundColor: "rgba(0, 77, 64, 0.08)",
                  },
                }}
              >
                <NotificationsIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </HeaderContainer>

        {/* Dashboard Content */}
        <Box
          sx={{
            minHeight: "100vh",
            bgcolor: "#f5f5f5",
            pt: { xs: 8, sm: 9 }, // Adjusted for header height
            pb: { xs: 2, sm: 3, md: 4 },
            px: { xs: 1, sm: 2, md: 3 },
            overflow: "hidden",
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }} alignItems="stretch">
              {/* First Column - Removed Profile component based on your latest version */}
              
              {/* Second Column */}
              <Grid item xs={12} md={6} lg={4}>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} height="100%">
                  {/* Total Trainee */}
                  <Grid item xs={12} sm={6} sx={{ height: "auto" }} mb={4}>
                    <Paper
                      sx={{
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        height: "100%",
                        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: 6
                        },
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            variant={isXsScreen ? "body1" : "subtitle1"}
                            sx={{ mb: 0.5 }}
                          >
                            Total Trainee
                          </Typography>
                          <Typography
                            variant={isXsScreen ? "h6" : "h5"}
                            sx={{ fontWeight: 600, mb: 0.5 }}
                          >
                            {totalTrainees}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              color: "#2E7D32",
                            }}
                          >
                            <ArrowForwardIcon
                              sx={{
                                fontSize: { xs: 12, sm: 14, md: 16 },
                                transform: "rotate(-45deg)",
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: {
                                  xs: "0.7rem",
                                  sm: "0.75rem",
                                  md: "0.875rem",
                                },
                              }}
                            >
                              8.5% Up from yesterday
                            </Typography>
                          </Box>
                        </Box>
                        <Avatar
                          sx={{
                            bgcolor: "#E8F5E9",
                            width: { xs: 36, sm: 40, md: 48 },
                            height: { xs: 36, sm: 40, md: 48 },
                          }}
                        >
                          <PeopleIcon
                            sx={{
                              color: "#2E7D32",
                              fontSize: { xs: 18, sm: 20, md: 24 },
                            }}
                          />
                        </Avatar>
                      </Box>
                    </Paper>
                  </Grid>

                  {/* Upcoming Session */}
                  <Grid item xs={12} sm={6} sx={{ height: "auto" }} mb={4}>
                    <Paper
                      sx={{
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        height: "100%",
                        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: 6
                        },
                        borderRadius: 2,
                        bgcolor: "#004D40",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant={isXsScreen ? "body1" : "subtitle1"}
                        sx={{ mb: 1 }}
                      >
                        Upcoming Session
                      </Typography>
                      {upcomingSessions.length > 0 ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 1, sm: 1.5, md: 2 },
                          }}
                        >
                          <Paper
                            sx={{
                              p: { xs: 0.75, sm: 1, md: 1.25 },
                              borderRadius: 1,
                              bgcolor: "rgba(255,255,255,0.1)",
                              color: "white",
                              minWidth: { xs: "40px", sm: "45px", md: "50px" },
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant={isXsScreen ? "subtitle1" : "h6"}
                              align="center"
                              sx={{ lineHeight: 1.2 }}
                            >
                              {new Date(upcomingSessions[0]?.sessionDate || new Date()).getDate() || 14}
                            </Typography>
                            <Typography
                              variant="caption"
                              align="center"
                              display="block"
                              sx={{
                                fontSize: {
                                  xs: "0.6rem",
                                  sm: "0.625rem",
                                  md: "0.75rem",
                                },
                              }}
                            >
                              {new Date(upcomingSessions[0]?.sessionDate || new Date()).toLocaleString("default", { month: "short" }) || "Jan"}
                            </Typography>
                          </Paper>
                          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Typography
                              variant={isXsScreen ? "body1" : "subtitle1"}
                              sx={{
                                fontSize: {
                                  xs: "0.85rem",
                                  sm: "0.875rem",
                                  md: "1rem" },
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Workout with {upcomingSessions[0]?.traineeName || "John"}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                opacity: 0.7,
                                fontSize: {
                                  xs: "0.7rem",
                                  sm: "0.75rem",
                                  md: "0.875rem",
                                },
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {upcomingSessions[0]?.sessionTime || "30 minutes"} session
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Typography variant="body2">No upcoming sessions.</Typography>
                      )}
                    </Paper>
                  </Grid>

                  {/* Calendar */}
                  <Grid item xs={12}>
                    <Paper sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, borderRadius: 2, height: '100%' }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: { xs: 1, sm: 1.5, md: 2 },
                        }}
                      >
                        <Typography
                          variant={isXsScreen ? "body1" : "subtitle1"}
                          sx={{
                            fontSize: { xs: "0.85rem", sm: "0.875rem", md: "1rem" },
                          }}
                        >
                          Session schedule
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 0.5, sm: 1, md: 1.5 },
                          }}
                        >
                          <IconButton size={isXsScreen ? "small" : "medium"}>
                            <ArrowBackIosIcon
                              sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}
                            />
                          </IconButton>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: {
                                xs: "0.7rem",
                                sm: "0.75rem",
                                md: "0.875rem",
                              },
                              whiteSpace: "nowrap",
                            }}
                          >
                            {currentMonth} {currentYear}
                          </Typography>
                          <IconButton size={isXsScreen ? "small" : "medium"}>
                            <ArrowForwardIosIcon
                              sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }}
                            />
                          </IconButton>
                        </Box>
                      </Box>

                      <Grid container spacing={0.5}>
                        {days.slice(0, isXsScreen ? 7 : 7).map((day) => (
                          <Grid item xs={12 / 7} key={day}>
                            <Typography
                              align="center"
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontSize: {
                                  xs: "0.6rem",
                                  sm: "0.625rem",
                                  md: "0.75rem",
                                },
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {day}
                            </Typography>
                          </Grid>
                        ))}
                        {/* Generate dates for the current month */}
                        {[...Array(31)].map((_, i) => {
                          const date = i + 1;
                          return (
                            <Grid item xs={12 / 7} key={date}>
                              <Paper
                                elevation={0}
                                sx={{
                                  py: { xs: 0.25, sm: 0.5, md: 0.75 },
                                  textAlign: "center",
                                  bgcolor:
                                    date === currentDate
                                      ? "#004D40"
                                      : "transparent",
                                  color: date === currentDate ? "white" : "inherit",
                                  borderRadius: 1,
                                  minWidth: 0,
                                  margin: "1px",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: {
                                      xs: "0.6rem",
                                      sm: "0.625rem",
                                      md: "0.75rem",
                                    },
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {date}
                                </Typography>
                              </Paper>
                            </Grid>
                          );
                        })}
                      </Grid>

                      {!isXsScreen && !isSmScreen && visibleDates < 31 && (
                        <Box
                          sx={{ display: "flex", justifyContent: "center", mt: 1 }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#004D40",
                              cursor: "pointer",
                              fontSize: {
                                xs: "0.7rem",
                                sm: "0.75rem",
                                md: "0.875rem",
                              },
                            }}
                            onClick={() => setVisibleDates(31)}
                          >
                            Show all dates
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              {/* Third Column - Active Trainee, Chats, Recent Review */}
              <Grid item xs={12} lg={4}>
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  {/* Active Trainee */}
                  <Grid item xs={12} sm={6} sx={{ height: "auto" }} mb={4}>
                    <Paper
                      sx={{
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        height: "100%",
                        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: 6
                        },
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            variant={isXsScreen ? "body1" : "subtitle1"}
                            sx={{ mb: 0.5 }}
                          >
                            Active Trainee
                          </Typography>
                          <Typography
                            variant={isXsScreen ? "h6" : "h5"}
                            sx={{ fontWeight: 600 }}
                          >
                            {activeTrainees}
                          </Typography>
                        </Box>
                        <Avatar
                          sx={{
                            bgcolor: "#E8F5E9",
                            width: { xs: 36, sm: 40, md: 48 },
                            height: { xs: 36, sm: 40, md: 48 },
                          }}
                        >
                          <PeopleIcon
                            sx={{
                              color: "#2E7D32",
                              fontSize: { xs: 18, sm: 20, md: 24 },
                            }}
                          />
                        </Avatar>
                      </Box>
                    </Paper>
                  </Grid>

                  {/* Chats */}
                  <Grid item xs={12} sm={6} sx={{ height: "auto" }} mb={4}>
                    <Paper
                      sx={{
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: 6
                        },
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <ChatList maxItems={3} />
                      </Box>
                    </Paper>
                  </Grid>

                  {/* Recent Review */}
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        p: { xs: 1.5, sm: 2, md: 2.5 },
                        height: "100%",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: { xs: 1, sm: 1.5, md: 2 },
                        }}
                      >
                        <Typography
                          variant={isXsScreen ? "body1" : "subtitle1"}
                          sx={{
                            fontSize: { xs: "0.85rem", sm: "0.875rem", md: "1rem" },
                          }}
                        >
                          Recent Review
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: { xs: 1, sm: 1.5, md: 2 },
                          flexGrow: 1,
                        }}
                      >
                        <Avatar
                          src="/path-to-avatar"
                          sx={{
                            width: { xs: 28, sm: 32, md: 40 },
                            height: { xs: 28, sm: 32, md: 40 },
                          }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: { xs: 0.5, sm: 1, md: 1.5 },
                              mb: 0.5,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontSize: {
                                  xs: "0.7rem",
                                  sm: "0.75rem",
                                  md: "0.875rem",
                                },
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Hiam Nataroko
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontSize: {
                                  xs: "0.6rem",
                                  sm: "0.625rem",
                                  md: "0.7rem",
                                },
                                whiteSpace: "nowrap",
                              }}
                            >
                              10-08-2024
                            </Typography>
                          </Box>
                          <Rating
                            value={4.5}
                            readOnly
                            size={isXsScreen ? "small" : "medium"}
                            precision={0.5}
                            sx={{ mb: 0.5 }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: isXsScreen ? 2 : 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              fontSize: {
                                xs: "0.65rem",
                                sm: "0.7rem",
                                md: "0.75rem",
                              },
                              lineHeight: 1.3,
                            }}
                          >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type.
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default TrainerDashboard;