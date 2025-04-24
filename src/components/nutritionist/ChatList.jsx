import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const MessagePreview = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '200px',
}));

const TimeText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
}));

const ChatList = ({ chats }) => {
  return (
    <StyledPaper elevation={0}>
      <ChatHeader>
        <Typography variant="h6">Recent Chats</Typography>
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ cursor: 'pointer' }}
        >
          View All
        </Typography>
      </ChatHeader>

      <List>
        {chats.map((chat) => (
          <StyledListItem key={chat.id}>
            <ListItemAvatar>
              <Badge
                color="success"
                variant="dot"
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Avatar src={chat.avatar} alt={chat.name} />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2">
                    {chat.name}
                  </Typography>
                  <TimeText>{chat.time}</TimeText>
                </Box>
              }
              secondary={<MessagePreview>{chat.message}</MessagePreview>}
            />
          </StyledListItem>
        ))}
      </List>
    </StyledPaper>
  );
};

export default ChatList; 