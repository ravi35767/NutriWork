import React, { useState } from "react";
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
import ChatList from './ChatList';

const Dashboard = () => {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = 14;
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentYear = new Date().getFullYear();

  // For responsive calendar
  const [visibleDates, setVisibleDates] = useState(
    isXsScreen ? 7 : isSmScreen ? 14 : 31
  );

  React.useEffect(() => {
    setVisibleDates(isXsScreen ? 7 : isSmScreen ? 14 : 31);
  }, [isXsScreen, isSmScreen]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        py: { xs: 2, sm: 3, md: 4 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Grid
          container
          spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          alignItems="stretch"
        >
          
          
          {/* First Column - Profile */}
          <Grid item xs={12} md={6} lg={4}>
            <Box sx={{ height: "100%" }}>
              <DashboardProfile />
            </Box>
          </Grid>

          {/* Second Column - Total Trainee, Upcoming Session, Calendar */}
          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} height="100%">
              {/* Total Trainee */}
              <Grid item xs={12} sm={6} md={12} mb={4}>
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2, md: 2.5 },
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
                        120
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
              <Grid item xs={12} sm={6} md={12} mb={4}>
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2, md: 2.5 },
                    borderRadius: 2,
                    bgcolor: "#004D40",
                    color: "white",
                    height: "100%",
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
                        14
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
                        Jan
                      </Typography>
                    </Paper>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant={isXsScreen ? "body1" : "subtitle1"}
                        sx={{
                          fontSize: {
                            xs: "0.85rem",
                            sm: "0.875rem",
                            md: "1rem",
                          },
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        Workout with John
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
                        30 minutes session
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Calendar */}
              <Grid item xs={12}>
                <Paper sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, borderRadius: 2 }}>
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

                    {Array.from({ length: visibleDates }, (_, i) => i + 1).map(
                      (date) => (
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
                      )
                    )}
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
              <Grid item xs={12} sm={6} md={6} lg={12} mb={4}>
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2, md: 2.5 },
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
                        10
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
              <Grid item xs={12} sm={6} md={6} lg={12} mb={4}>
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2, md: 2.5 },
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                  }}
                >
                  <ChatList 
                    maxItems={3} 
                    sx={{ 
                      '& .MuiPaper-root': {
                        boxShadow: 'none',
                        height: '100%'
                      },
                      '& .MuiBox-root': {
                        height: '100%'
                      }
                    }}
                  />
                </Paper>
              </Grid>

              {/* Recent Review */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: { xs: 1.5, sm: 2, md: 2.5 },
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
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#004D40",
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                        fontSize: {
                          xs: "0.7rem",
                          sm: "0.75rem",
                          md: "0.875rem",
                        },
                      }}
                    >
                      View All
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
  );
};

export default Dashboard;
