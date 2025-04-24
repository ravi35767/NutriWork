import React from "react";
import { Box, Typography, Paper, Avatar, Divider } from "@mui/material";

const chatData = [
  {
    name: "Hina",
    message: "I hope you are well.",
    time: "2s ago",
  },
  {
    name: "Hira Absar",
    message: "This afternoon at 5:30PM",
    time: "1 min",
  },
  {
    name: "Amna mohsin",
    message: "Are you ready for this after...",
    time: "2 mins",
  },
  {
    name: "Magnus Carlson",
    message: "Hi guys, How is going?",
    time: "5 mins",
  },
];

function ChatsSection() {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography variant="h6">Chats</Typography>
        <Typography variant="body2" color="primary">
          View All
        </Typography>
      </Box>
      {chatData.map((chat, index) => (
        <Box key={index}>
          <Box sx={{ display: "flex", alignItems: "center", py: 1 }}>
            <Avatar
              alt={chat.name}
              src="/static/images/avatar/4.jpg" // Replace with actual avatar URL
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Box>
              <Typography variant="subtitle2">{chat.name}</Typography>
              <Typography variant="caption" color="textSecondary">
                {chat.message}
              </Typography>
            </Box>
            <Typography variant="caption" color="textSecondary" sx={{ ml: "auto" }}>
              {chat.time}
            </Typography>
          </Box>
          {index !== chatData.length - 1 && <Divider />}
        </Box>
      ))}
    </Paper>
  );
}

export default ChatsSection;