import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Add check: If authenticated but user object is not yet loaded, redirect or show loading
  // Redirecting to login might be simplest for now if this state occurs unexpectedly
  if (!user) {
    console.warn("ProtectedRoute: User is authenticated but user object is null. Redirecting to login.");
    // Optionally, show a loading spinner here instead while user data is fetched
    // import { CircularProgress } from '@mui/material'; return <CircularProgress />;
    return <Navigate to="/login" replace />; 
  }

  // Now safe to check user.role
  console.log(`[ProtectedRoute] Checking access. User Role: '${user?.role}', Allowed Roles: ${allowedRoles}`); // Added detailed log
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Log role mismatch for debugging
    console.warn(`[ProtectedRoute] Role mismatch! User role: '${user.role}', Allowed roles: ${allowedRoles.join(', ')}. Redirecting to /unauthorized.`);
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
