import ChatWidget from "../../components/ChatWidget";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Typography,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Avatar,
  ButtonBase,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { fetchAdminStats } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const StatCard = ({ title, value, icon, onClick }) => (
  <ButtonBase
    onClick={onClick}
    sx={{
      width: "100%",
      textAlign: "left",
    }}
  >
    <Paper
      elevation={4}
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        borderRadius: 3,
        width: "100%",
        height: 130,
        transition: "0.3s",
        bgcolor: "background.paper",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)",
          bgcolor: "grey.100",
        },
      }}
    >
      <Avatar sx={{ bgcolor: "primary.main", mr: 2, width: 56, height: 56 }}>
        {icon}
      </Avatar>
      <Box>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
    </Paper>
  </ButtonBase>
);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminStats, loadingStats, errorStats } = useSelector(
    (state) => state.admin
  );
  const [usersJoinedDays, setUsersJoinedDays] = useState(24);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  if (loadingStats) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (errorStats) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Error fetching dashboard data: {errorStats}
        </Typography>
      </Box>
    );
  }

  const handleUsersJoinedDaysChange = (event) => {
    setUsersJoinedDays(event.target.value);
  };

  let usersJoinedLastXDays;
  switch (usersJoinedDays) {
    case 7:
      usersJoinedLastXDays = adminStats?.signupCounts?.last7Days ?? "0";
      break;
    case 30:
      usersJoinedLastXDays = adminStats?.signupCounts?.last30Days ?? "0";
      break;
    default:
      usersJoinedLastXDays = adminStats?.signupCounts?.last24Hours ?? "0";
      break;
  }

  const handleAllUsersClick = () => navigate("/admin/users");
  const handleTrainersClick = () => navigate("/admin/users?role=trainer");
  const handleNutritionistsClick = () =>
    navigate("/admin/users?role=nutritionist");
  const handleVerificationQueueClick = () => navigate("/admin/verify");
  const handleReportsClick = () => navigate("/admin/moderation");

  // Dummy data for LineChart (can be improved based on real backend if needed)
  const signupData = [
    { name: "24H", users: adminStats?.signupCounts?.last24Hours ?? 0 },
    { name: "7D", users: adminStats?.signupCounts?.last7Days ?? 0 },
    { name: "30D", users: adminStats?.signupCounts?.last30Days ?? 0 },
  ];

  const pieData = [
    { name: "Trainers", value: adminStats?.totalTrainers ?? 0 },
    { name: "Nutritionists", value: adminStats?.totalNutritionists ?? 0 },
    {
      name: "Other Users",
      value:
        (adminStats?.totalUserCount ?? 0) -
        (adminStats?.totalTrainers ?? 0) -
        (adminStats?.totalNutritionists ?? 0),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        color="text.primary"
      >
        Admin Dashboard
      </Typography>

      {/* Chat Widget */}
      <Box sx={{ mt: 3 }}>
        <ChatWidget />
      </Box>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Users"
            value={adminStats?.totalUserCount ?? "0"}
            icon={<GroupIcon />}
            onClick={handleAllUsersClick}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Reports"
            value={adminStats?.totalReportsCount ?? "0"}
            icon={<DirectionsRunIcon />}
            onClick={handleReportsClick}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Trainers"
            value={adminStats?.totalTrainers ?? "0"}
            icon={<GroupIcon />}
            onClick={handleTrainersClick}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Nutritionists"
            value={adminStats?.totalNutritionists ?? "0"}
            icon={<GroupIcon />}
            onClick={handleNutritionistsClick}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Verification Queue"
            value={adminStats?.totalPendingVerificationCount ?? "0"}
            icon={<GroupIcon />}
            onClick={handleVerificationQueueClick}
          />
        </Grid>

        {/* Users Joined dropdown */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              borderRadius: 3,
              width: "100%",
              height: 130,
              position: "relative",
              transition: "0.3s",
              bgcolor: "background.paper",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-4px)",
                bgcolor: "grey.100",
              },
            }}
          >
            {/* Icon */}
            <Avatar
              sx={{ bgcolor: "primary.main", mr: 2, width: 56, height: 56 }}
            >
              <TrendingUpIcon />
            </Avatar>

            {/* Text and Count */}
            <Box>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                {usersJoinedLastXDays}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Users Joined In
              </Typography>
            </Box>

            {/* Dropdown */}
            <FormControl
              size="small"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                minWidth: 100,
              }}
            >
              <Select
                value={usersJoinedDays}
                onChange={handleUsersJoinedDaysChange}
              >
                <MenuItem value={24}>Last 24 Hours</MenuItem>
                <MenuItem value={7}>Last 7 Days</MenuItem>
                <MenuItem value={30}>Last 30 Days</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, height: 300 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              User Growth
            </Typography>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={signupData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, height: 300 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              User Roles
            </Typography>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
