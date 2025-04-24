import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
} from "@mui/material"; // Added more MUI components
import { fetchTrainerDashboard } from "../../redux/trainerSlice";
// Placeholder Icons (replace with actual ones if needed)
import GroupIcon from "@mui/icons-material/Group";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EventIcon from "@mui/icons-material/Event"; // For upcoming session

// Simple Stat Card component - enhanced styling
const StatCard = ({ title, value, icon, trend }) => (
  <Paper
    elevation={3}
    sx={{ p: 2, display: "flex", alignItems: "center", borderRadius: 2 }}
  >
    <Avatar sx={{ bgcolor: "primary.light", mr: 2 }}>{icon}</Avatar>
    <Box>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      {/* Optional: Add trend indicator */}
      {/* {trend && <Typography variant="caption" color={trend.startsWith('+') ? 'success.main' : 'error.main'}>{trend}</Typography>} */}
    </Box>
  </Paper>
);

const TrainerDashboard = () => {
  const dispatch = useDispatch();
  // Assuming dashboardData structure matches design needs (totalTrainees, activeTrainees, upcomingSession, recentChats, recentReviews)
  const { dashboardData, loading, error } = useSelector(
    (state) => state.trainer
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTrainerDashboard());
  }, [dispatch]);

  // Use data directly from Redux state, applying defaults or checks where needed
  const upcomingSession = dashboardData?.upcomingSessions?.[0]; // Get the first upcoming session if it exists
  const recentChats = dashboardData?.recentChats ?? []; // Default to empty array
  const recentReviews = dashboardData?.recentReviews ?? []; // Default to empty array

  return (
    <Box>
      {/* Loading and Error states */}
      <Box mb={2}>
        {loading && (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Error fetching dashboard data: {error}
          </Alert>
        )}
      </Box>

      {/* Welcome message can be moved to Topbar later */}
      {/* <Typography variant="h4" gutterBottom> Welcome, {user?.firstName || 'Trainer'}! </Typography> */}

      {/* Main Grid Layout */}
      <Grid container spacing={3}>
        {/* Left Column (Stats, Upcoming Session, Calendar) */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            {/* Stats Row */}
            <Grid item xs={12} sm={6}>
              <StatCard
                title="Total Trainee"
                value={dashboardData?.totalTrainees ?? "120"}
                icon={<GroupIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StatCard
                title="Active Trainee"
                value={dashboardData?.activeTrainees ?? "10"}
                icon={<DirectionsRunIcon />}
              />
            </Grid>

            {/* Upcoming Session Card */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "white",
                  minHeight: 150 /* Ensure some height */,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Upcoming Session
                </Typography>
                {upcomingSession ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ mr: 2, textAlign: "center" }}>
                      {/* TODO: Format date properly */}
                      <Typography variant="h4">
                        {new Date(upcomingSession.startTime).getDate() || "N/A"}
                      </Typography>
                      <Typography variant="body2">
                        {new Date(upcomingSession.startTime).toLocaleString(
                          "default",
                          { month: "short" }
                        ) || ""}
                      </Typography>
                    </Box>
                    <Box>
                      {/* TODO: Use actual session details */}
                      <Typography variant="subtitle1" fontWeight="bold">
                        {upcomingSession.title || "Session Title"}
                      </Typography>
                      <Typography variant="body2">
                        {upcomingSession.duration || "N/A"} minutes
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    No upcoming sessions.
                  </Typography>
                )}
                {/* Missing closing tags were here */}
              </Paper>
            </Grid>

            {/* Session Schedule (Calendar Placeholder) */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{ p: 2, borderRadius: 2, minHeight: 300 }}
              >
                <Typography variant="h6" gutterBottom>
                  Session schedule
                </Typography>
                {/* Calendar Component Placeholder */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "250px",
                    border: "1px dashed grey",
                  }}
                >
                  <CalendarTodayIcon sx={{ fontSize: 40, color: "grey.400" }} />
                  <Typography sx={{ ml: 1, color: "grey.600" }}>
                    Calendar Placeholder
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column (Chats, Reviews) */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            {/* Chats Card */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{ p: 2, borderRadius: 2, minHeight: 300 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6">Chats</Typography>
                  <Button size="small">View All</Button>
                </Box>
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  {recentChats.length > 0 ? (
                    recentChats.slice(0, 3).map(
                      (
                        chat,
                        index // Display max 3 chats
                      ) => (
                        <React.Fragment key={chat.conversationId || index}>
                          {" "}
                          {/* Use a stable key */}
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              {/* TODO: Get actual participant info */}
                              <Avatar
                                alt={
                                  chat.participants?.[0]?.firstName || "User"
                                }
                                src={chat.participants?.[0]?.profilePicture}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                chat.participants?.[0]?.firstName ||
                                "Conversation"
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {chat.lastMessage?.content ||
                                      "No messages yet..."}
                                  </Typography>
                                  {/* TODO: Format time properly */}
                                  {chat.lastMessage?.timestamp
                                    ? ` — ${new Date(
                                        chat.lastMessage.timestamp
                                      ).toLocaleTimeString()}`
                                    : ""}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          {index < recentChats.slice(0, 3).length - 1 && (
                            <Divider variant="inset" component="li" />
                          )}
                        </React.Fragment>
                      )
                    )
                  ) : (
                    <Typography
                      sx={{
                        p: 2,
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      No recent chats.
                    </Typography>
                  )}
                </List>
              </Paper>
            </Grid>

            {/* Recent Review Card */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{ p: 2, borderRadius: 2, minHeight: 200 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6">Recent Review</Typography>
                  <Button size="small">View All</Button>
                </Box>
                {/* Display first review if available */}
                {recentReviews.length > 0 ? (
                  <ListItem alignItems="flex-start" disableGutters>
                    <ListItemAvatar>
                      {/* TODO: Get actual reviewer info */}
                      <Avatar
                        alt={recentReviews[0].client?.firstName || "Client"}
                        src={recentReviews[0].client?.profilePicture}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={recentReviews[0].client?.firstName || "Review"}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {"⭐".repeat(recentReviews[0].rating || 0)}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            sx={{ ml: 1 }}
                          >
                            {/* TODO: Format date properly */}
                            {recentReviews[0].createdAt
                              ? new Date(
                                  recentReviews[0].createdAt
                                ).toLocaleDateString()
                              : ""}
                          </Typography>
                          <Typography component="p" variant="body2">
                            {recentReviews[0].comment || "No comment."}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ) : (
                  <Typography
                    sx={{ p: 2, textAlign: "center", color: "text.secondary" }}
                  >
                    No recent reviews.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    // Removed extraneous closing tags below this line
  );
};

export default TrainerDashboard;
