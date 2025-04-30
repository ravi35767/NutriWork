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
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PeopleIcon from "@mui/icons-material/People";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DashboardProfile from "../../components/Bio";
import ChatList from "./ChatList";
import TrainerHeader from "../../components/trainer/TrainerHeader";
import { dashboardService } from "../../services/api/dashboardService";

const Dashboard = () => {
  const theme = useTheme();
  const [totalTrainees, setTotalTrainees] = useState(0);
  const [activeTrainees, setActiveTrainees] = useState(0);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = 14;
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  const [visibleDates, setVisibleDates] = useState(
    isXsScreen ? 7 : isSmScreen ? 14 : 31
  );

  useEffect(() => {
    setVisibleDates(isXsScreen ? 7 : isSmScreen ? 14 : 31);
  }, [isXsScreen, isSmScreen]);

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
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        py: { xs: 2, sm: 3, md: 4 },
        overflow: "hidden",
      }}
    >
      <TrainerHeader />
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }} alignItems="stretch">
          {/* First Column - Profile */}
          <Grid item xs={12} md={6} lg={4}>
            <Box sx={{ height: "100%" }}>
              <DashboardProfile />
            </Box>
          </Grid>

          {/* Second Column */}
          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={2}>
              {/* Total Trainee */}
              <Grid item xs={12} sm={6} md={12}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    height: "100%",
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
                      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        Total Trainee
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {totalTrainees}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#2E7D32" }}>
                        <ArrowForwardIcon sx={{ transform: "rotate(-45deg)" }} />
                        <Typography variant="body2">8.5% Up from yesterday</Typography>
                      </Box>
                    </Box>
                    <Avatar sx={{ bgcolor: "#E8F5E9" }}>
                      <PeopleIcon sx={{ color: "#2E7D32" }} />
                    </Avatar>
                  </Box>
                </Paper>
              </Grid>

              {/* Upcoming Session */}
              <Grid item xs={12} sm={6} md={12}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#004D40",
                    color: "white",
                    height: "100%",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Upcoming Session
                  </Typography>
                  {upcomingSessions.length > 0 ? (
                    upcomingSessions.map((session) => (
                      <Box key={session.id} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        <Paper
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor: "rgba(255,255,255,0.1)",
                            color: "white",
                            minWidth: "50px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h6">
                            {new Date(session.sessionDate).getDate()}
                          </Typography>
                          <Typography variant="caption">
                            {new Date(session.sessionDate).toLocaleString("default", { month: "short" })}
                          </Typography>
                        </Paper>
                        <Box>
                          <Typography>Workout with {session.traineeName}</Typography>
                          <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            {session.sessionTime} session
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2">No upcoming sessions.</Typography>
                  )}
                </Paper>
              </Grid>

              {/* Calendar */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, borderRadius: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="subtitle1">Session schedule</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton size="small"><ArrowBackIosIcon /></IconButton>
                      <Typography variant="body2">
                        {currentMonth} {currentYear}
                      </Typography>
                      <IconButton size="small"><ArrowForwardIosIcon /></IconButton>
                    </Box>
                  </Box>

                  <Grid container spacing={0.5}>
                    {days.map((day) => (
                      <Grid item xs={12 / 7} key={day}>
                        <Typography align="center" variant="body2" color="text.secondary">
                          {day}
                        </Typography>
                      </Grid>
                    ))}
                    {Array.from({ length: visibleDates }, (_, i) => i + 1).map((date) => (
                      <Grid item xs={12 / 7} key={date}>
                        <Paper
                          elevation={0}
                          sx={{
                            textAlign: "center",
                            bgcolor: date === currentDate ? "#004D40" : "transparent",
                            color: date === currentDate ? "white" : "inherit",
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="body2">{date}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>

                  {!isXsScreen && !isSmScreen && visibleDates < 31 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ color: "#004D40", cursor: "pointer" }}
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

          {/* Third Column */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={2}>
              {/* Active Trainee */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                        Active Trainee
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {activeTrainees}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: "#E8F5E9" }}>
                      <PeopleIcon sx={{ color: "#2E7D32" }} />
                    </Avatar>
                  </Box>
                </Paper>
              </Grid>

              {/* Chat List */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  <ChatList maxItems={3} />
                </Paper>
              </Grid>

              {/* Recent Review */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="subtitle1">Recent Review</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#004D40",
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      See All
                    </Typography>
                  </Box>
                  <Rating name="read-only" value={4} readOnly />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    "Great trainer! Helped me achieve my fitness goals."
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    - John Doe, 2 days ago
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
