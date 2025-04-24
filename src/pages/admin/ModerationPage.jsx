import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchReportedUsers, 
  fetchReportedPosts, 
  fetchReportedComments, 
  fetchReportedCommunities,
  dismissReport, 
  updateUserAccountStatusAdmin,
  deleteReportedPost, // Import delete actions
  deleteReportedComment,
  deleteReportedCommunity 
} from '../../redux/adminSlice';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  CircularProgress, 
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; 
import CancelIcon from '@mui/icons-material/Cancel'; 
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; 
import BlockIcon from '@mui/icons-material/Block'; 

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`moderation-tabpanel-${index}`}
      aria-labelledby={`moderation-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ModerationPage = () => {
  const dispatch = useDispatch();
  const { reports, loadingReports, errorReports, actionLoading } = useSelector((state) => state.admin); 
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Fetch data based on the active tab
  useEffect(() => {
    switch (currentTab) {
      case 0: dispatch(fetchReportedUsers()); break;
      case 1: dispatch(fetchReportedPosts()); break;
      case 2: dispatch(fetchReportedComments()); break;
      case 3: dispatch(fetchReportedCommunities()); break;
      default: break;
    }
  }, [dispatch, currentTab]);

  // Get the current error message based on the active tab
  const getCurrentError = () => {
    if (!errorReports) return null;
    switch (currentTab) {
      case 0: return errorReports.users;
      case 1: return errorReports.posts;
      case 2: return errorReports.comments;
      case 3: return errorReports.communities;
      default: return null;
    }
  };

  const renderTable = (data, headers, rowRenderer, isLoading, specificError) => { 
    if (isLoading) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />; 
    if (specificError) return <Alert severity="error">{specificError}</Alert>; 
    if (!data || data.length === 0) return <Typography sx={{ p: 2, textAlign: 'center' }}>No reports found.</Typography>;

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => <TableCell key={header}>{header}</TableCell>)}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => rowRenderer(item))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Handle moderation actions
  const handleModerationAction = (action, item) => {
     if (actionLoading) return; 
     console.log(`Action: ${action} on item ID: ${item._id}`);
     
     let reportType = '';
     if (currentTab === 0) reportType = 'users';
     else if (currentTab === 1) reportType = 'posts';
     else if (currentTab === 2) reportType = 'comments';
     else if (currentTab === 3) reportType = 'communities';

     // Add confirmation for destructive actions
     const confirmAction = (message, apiCall) => {
       if (window.confirm(message)) {
         dispatch(apiCall);
       }
     };

     switch (action) {
       case 'dismiss_user_report':
       case 'dismiss_post_report':
       case 'dismiss_comment_report':
       case 'dismiss_community_report':
         dispatch(dismissReport({ reportType, reportId: item._id }));
         break;
       case 'suspend_user':
         if (item.reportedUser?._id) {
           confirmAction(
             `Are you sure you want to suspend user ${item.reportedUser.firstName}?`,
             updateUserAccountStatusAdmin({ userId: item.reportedUser._id, status: 'suspended' })
           );
         } else { console.error("Cannot suspend user: User ID missing from report item."); }
         break;
       case 'warn_user':
         console.log("[Placeholder] Warn user:", item.reportedUser?._id);
         // TODO: Implement warning logic (e.g., open modal, send notification)
         break;
       case 'delete_post':
         if (item.postId) { 
            confirmAction(
             `Are you sure you want to delete post ${item.postId}?`,
             deleteReportedPost(item.postId)
           );
         } else { console.error("Cannot delete post: Post ID missing from report item.", item); }
         break;
        case 'delete_comment':
         if (item.commentId) { 
            confirmAction(
             `Are you sure you want to delete comment ${item.commentId}?`,
             deleteReportedComment(item.commentId)
           );
         } else { console.error("Cannot delete comment: Comment ID missing from report item.", item); }
         break;
       case 'delete_community':
          if (item.communityId) { 
             confirmAction(
              `Are you sure you want to delete community ${item.communityName || item.communityId}?`,
              deleteReportedCommunity(item.communityId)
            );
          } else { console.error("Cannot delete community: Community ID missing from report item.", item); }
         break;
       default:
         console.warn("Unknown moderation action:", action);
      }
  };

  console.log("[ModerationPage] Rendering with state:", { reports, loadingReports, errorReports, currentTab }); 

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Content Moderation</Typography>
      
      {getCurrentError() && <Alert severity="error" sx={{ mb: 2 }}>{getCurrentError()}</Alert>}
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="moderation tabs">
          <Tab label="Reported Users" id="moderation-tab-0" />
          <Tab label="Reported Posts" id="moderation-tab-1" />
          <Tab label="Reported Comments" id="moderation-tab-2" />
          <Tab label="Reported Communities" id="moderation-tab-3" />
        </Tabs>
      </Box>

      {/* Reported Users Panel */}
      <TabPanel value={currentTab} index={0}>
        {renderTable(
          reports.users,
          ['User', 'Reported By', 'Reason', 'Date'],
          (item) => (
            <TableRow key={item._id}>
              <TableCell>{`${item.reportedUser?.firstName || ''} ${item.reportedUser?.lastName || ''}`}</TableCell>
              <TableCell>{`${item.reportedBy?.firstName || ''} ${item.reportedBy?.lastName || ''}`}</TableCell>
              <TableCell>{item.reason || 'No reason provided'}</TableCell>
              <TableCell>{new Date(item.reportedAt || item.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Tooltip title="Dismiss Report">
                  <IconButton onClick={() => handleModerationAction('dismiss_user_report', item)} disabled={actionLoading} size="small">
                    <CheckCircleOutlineIcon color="success" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Warn User">
                  <IconButton onClick={() => handleModerationAction('warn_user', item)} disabled={actionLoading} size="small">
                    <WarningAmberIcon color="warning" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Suspend User">
                  <IconButton onClick={() => handleModerationAction('suspend_user', item)} disabled={actionLoading} size="small">
                    <BlockIcon color="error" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ),
          loadingReports.users,
          errorReports?.users
        )}
      </TabPanel>

      {/* Reported Posts Panel */}
      <TabPanel value={currentTab} index={1}>
        {renderTable(
          reports.posts,
          ['Post', 'Author', 'Reported By', 'Reason', 'Date'],
          (item) => (
            <TableRow key={item._id}>
              <TableCell>{item.post?.content?.substring(0, 50) || 'No content available'}...</TableCell>
              <TableCell>{`${item.post?.author?.firstName || ''} ${item.post?.author?.lastName || ''}`}</TableCell>
              <TableCell>{`${item.reportedBy?.firstName || ''} ${item.reportedBy?.lastName || ''}`}</TableCell>
              <TableCell>{item.reason || 'No reason provided'}</TableCell>
              <TableCell>{new Date(item.reportedAt || item.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Tooltip title="Dismiss Report">
                  <IconButton onClick={() => handleModerationAction('dismiss_post_report', item)} disabled={actionLoading} size="small">
                    <CheckCircleOutlineIcon color="success" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Post">
                  <IconButton onClick={() => handleModerationAction('delete_post', item)} disabled={actionLoading} size="small">
                    <CancelIcon color="error" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ),
          loadingReports.posts,
          errorReports?.posts
        )}
      </TabPanel>

      {/* Reported Comments Panel */}
      <TabPanel value={currentTab} index={2}>
        {renderTable(
          reports.comments,
          ['Comment', 'Author', 'Reported By', 'Reason', 'Date'],
          (item) => (
            <TableRow key={item._id}>
              <TableCell>{item.comment?.content?.substring(0, 50) || 'No content available'}...</TableCell>
              <TableCell>{`${item.commenter?.firstName || ''} ${item.commenter?.lastName || ''}`}</TableCell>
              <TableCell>{`${item.reportedBy?.firstName || ''} ${item.reportedBy?.lastName || ''}`}</TableCell>
              <TableCell>{item.reason || 'No reason provided'}</TableCell>
              <TableCell>{new Date(item.reportedAt || item.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Tooltip title="Dismiss Report">
                  <IconButton onClick={() => handleModerationAction('dismiss_comment_report', item)} disabled={actionLoading} size="small">
                    <CheckCircleOutlineIcon color="success" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Comment">
                  <IconButton onClick={() => handleModerationAction('delete_comment', item)} disabled={actionLoading} size="small">
                    <CancelIcon color="error" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ),
          loadingReports.comments,
          errorReports?.comments
        )}
      </TabPanel>

      {/* Reported Communities Panel */}
      <TabPanel value={currentTab} index={3}>
        {renderTable(
          reports.communities,
          ['Community', 'Reported By', 'Reason', 'Date'],
          (item) => (
            <TableRow key={item._id}>
              <TableCell>{item.communityName || 'Unnamed Community'}</TableCell>
              <TableCell>{`${item.reportedBy?.firstName || ''} ${item.reportedBy?.lastName || ''}`}</TableCell>
              <TableCell>{item.reason || 'No reason provided'}</TableCell>
              <TableCell>{new Date(item.reportedAt || item.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Tooltip title="Dismiss Report">
                  <IconButton onClick={() => handleModerationAction('dismiss_community_report', item)} disabled={actionLoading} size="small">
                    <CheckCircleOutlineIcon color="success" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Community">
                  <IconButton onClick={() => handleModerationAction('delete_community', item)} disabled={actionLoading} size="small">
                    <CancelIcon color="error" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ),
          loadingReports.communities,
          errorReports?.communities
        )}
      </TabPanel>
    </Box>
  );
};

export default ModerationPage;
