// ChatWidget.tsx
import React, { useState } from 'react';
import { Box, IconButton, Paper, TextField, Button, useTheme, Slide } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
const ChatWidget = ({ recipientId }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const toggleChat = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1500,
        }}
      >
        <IconButton
          size="large"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            boxShadow: 4,
          }}
          onClick={toggleChat}
        >
          {open ? <CloseIcon /> : <ChatIcon />}
        </IconButton>
      </Box>

      {/* Chat Section */}
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            width: 320,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
            zIndex: 1400,
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              p: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            Chat with us
          </Box>

          {/* Messages Section (Placeholder for now) */}
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              overflowY: 'auto',
            }}
          >
            <Box sx={{ mb: 1 }}>👋 Hi there! How can we help?</Box>
          </Box>

          {/* Input Section */}
          <Box
            sx={{
              p: 1,
              borderTop: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Type your message..."
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={async () => {
                try {
                  setError('');
                  setSuccess('');
                  await axios.post('/api/chat/send', { content: message, recipientId: recipientId });
                  setMessage(''); // Clear the input after sending
                  setSuccess('Message sent successfully!');
                } catch (error) {
                  console.error('Error sending message:', error);
                  setError(error.response?.data?.message || 'Failed to send message');
                }
              }}>
        Send
      </Button>
          </Box>
          {error && <Box color="error">{error}</Box>}
          {success && <Box color="success.main">{success}</Box>}
        </Paper>
        </Slide>
      </>
    );
  };

export default ChatWidget;