import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Paper,
  Divider,
  IconButton,
} from '@mui/material';
import API from '../../services/api';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ChatList = ({ maxItems = 5, sx = {}, onChatClick }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await API.get('/chat/conversations');
        setChats(response.data.conversations);
      } catch (error) {
        console.error('Error fetching chats:', error);
        setError(error.message || 'Failed to fetch chats');
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleViewAllClick = () => {
    navigate('/trainer/chats');
  };

  // If maxItems is provided, limit the number of chats shown
  const displayedChats = maxItems ? chats.slice(0, maxItems) : chats;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column',}}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontSize: { xs: '0.85rem', sm: '0.875rem', md: '1rem' },
            fontWeight: 600,
            color: '#004D40'
          }}
        >
          Chats
        </Typography>
        {maxItems && (
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#004D40',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' },
              fontWeight: 500
            }}
            onClick={handleViewAllClick}
          >
            View All
          </Typography>
        )}
      </Box>
      <List sx={{ 
        flexGrow: 1, 
        overflow: 'auto', 
        minHeight: 0,
        mt: 1,
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      }}>
        {displayedChats.map((chat, index) => (
          <React.Fragment key={chat.id}>
            <ListItem
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 77, 64, 0.04)',
                  transform: 'translateX(4px)'
                },
                py: 1
              }}
              onClick={() => onChatClick(chat.id)}
            >
              <ListItemAvatar>
                <Avatar 
                  alt={chat.name} 
                  src={chat.avatar}
                  sx={{
                    width: { xs: 32, sm: 36, md: 40 },
                    height: { xs: 32, sm: 36, md: 40 }
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Typography 
                      variant="subtitle2"
                      sx={{
                        fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                        fontWeight: 500,
                        color: '#2c2c2c'
                      }}
                    >
                      {chat.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {chat.timestamp}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      pr: 2,
                      mt: 0.5
                    }}
                  >
                    {chat.lastMessage}
                  </Typography>
                }
              />
            </ListItem>
            {index < displayedChats.length - 1 && (
              <Divider variant="inset" component="li" sx={{ ml: 0 }} />
            )}
          </React.Fragment>
        ))}
      </List>
      {loading && <Typography>Loading chats...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      {!loading && chats.length === 0 && (
        <Typography sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
          No recent chats.
        </Typography>
      )}
    </Box>
  );
};

export default ChatList;