import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  InputAdornment,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Chat = () => {
  const navigate = useNavigate();
  const { traineeId } = useParams();
  const [message, setMessage] = useState('');

  // Dummy chat data - in a real app, this would come from Redux or an API
  const chatData = {
    trainee: {
      name: 'Shaheen',
      avatar: '/path-to-avatar',
    },
    messages: [
      {
        id: 1,
        text: `Chat session with trainee ID: ${traineeId}`,
        timestamp: '6:30 pm',
        sender: 'trainee',
      },
      {
        id: 2,
        text: 'Welcome! How can I help you today?',
        timestamp: '6:34 pm',
        sender: 'trainer',
      },
      {
        id: 3,
        text: 'I would like to discuss my progress and set new goals.',
        timestamp: '6:38 pm',
        sender: 'trainee',
      },
    ],
  };

  const handleBack = () => {
    navigate('/trainer');
  };

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, this would dispatch to Redux or call an API
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'white',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <IconButton onClick={handleBack} sx={{ color: '#084043' }}>
          <ArrowBackIcon />
        </IconButton>
        <Avatar src={chatData.trainee.avatar} />
        <Typography variant="subtitle1" sx={{ flexGrow: 1, fontWeight: 500 }}>
          {chatData.trainee.name}
        </Typography>
        <IconButton sx={{ color: '#084043' }}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Chat Messages */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: '#f5f5f5',
          p: 2,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {chatData.messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'trainer' ? 'flex-end' : 'flex-start',
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: '80%',
                bgcolor: msg.sender === 'trainer' ? '#084043' : 'white',
                color: msg.sender === 'trainer' ? 'white' : 'inherit',
                borderRadius: 2,
                position: 'relative',
              }}
            >
              <Typography variant="body2">{msg.text}</Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'right',
                  mt: 0.5,
                  opacity: 0.8,
                }}
              >
                {msg.timestamp}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Message Input */}
      <Box sx={{ p: 2, bgcolor: 'white' }}>
        <TextField
          fullWidth
          placeholder="Write message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: '#f5f5f5',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton sx={{ color: '#084043' }}>
                  <MicIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton sx={{ color: '#084043' }}>
                    <AttachFileIcon />
                  </IconButton>
                  <IconButton onClick={handleSend} sx={{ color: '#084043' }}>
                    <SendIcon />
                  </IconButton>
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Chat; 