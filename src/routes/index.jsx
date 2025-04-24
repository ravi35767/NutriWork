import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from '../redux/authSlice';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/LoginPage'; // Corrected import to use the actual Login page
import Signup from '../pages/SignupPage'; // Corrected import to use the actual Signup page
import ForgotPassword from '../pages/ForgetPassword'; // Corrected path and typo
import ResetPassword from '../pages/ResetPassward'; // Corrected path and typo
import Profile from '../pages/Profile'; // Path seems correct based on list_files
import Trainees from '../pages/TraineesPage'; // Corrected filename based on list_files
import Reviews from '../pages/Reviews'; // Path seems correct based on list_files
import MyVideos from '../features/videos/MyVideos'; // Assuming this exists
import Home from '../pages/Home'; // Assuming this exists
import Unauthorized from '../pages/Unauthorized';
import MainLayout from '../layouts/MainLayout';
import VerificationQueue from '../pages/admin/VerificationQueue';
import UserManagement from '../pages/admin/UserManagement';
import ModerationPage from '../pages/admin/ModerationPage';
import ReviewManagement from '../pages/admin/ReviewManagement'; // Import new admin page

const AppRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [location, dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      {/* Add Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      {/* Protected Routes within MainLayout */}
      <Route
        element={ // Wrap protected routes in MainLayout
          <MainLayout />
        }
      >
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['trainer', 'nutritionist', 'admin', 'support']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainees"
          element={
            <ProtectedRoute allowedRoles={['trainer', 'nutritionist']}> {/* Assuming nutritionists also see trainees */}
              <Trainees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['trainer', 'nutritionist', 'admin', 'support']}> {/* All authenticated users have a profile */}
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute allowedRoles={['trainer', 'nutritionist']}> {/* Assuming nutritionists also have reviews */}
              <Reviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos"
          element={
            <ProtectedRoute allowedRoles={['trainer', 'nutritionist']}> {/* Assuming nutritionists also have videos */}
              <MyVideos />
            </ProtectedRoute>
          }
        />
         {/* Add other protected routes here (e.g., Create Session, Chat) */}
         {/*
         <Route path="/create-session" element={<ProtectedRoute allowedRoles={['trainer', 'nutritionist']}><CreateSession /></ProtectedRoute>} />
         <Route path="/chat" element={<ProtectedRoute allowedRoles={['trainer', 'nutritionist']}><Chat /></ProtectedRoute>} />
         <Route path="/create-session" element={<ProtectedRoute allowedRoles={['trainer', 'nutritionist']}><CreateSession /></ProtectedRoute>} />
         <Route path="/chat" element={<ProtectedRoute allowedRoles={['trainer', 'nutritionist']}><Chat /></ProtectedRoute>} />
         <Route path="/chat/:conversationId" element={<ProtectedRoute allowedRoles={['trainer', 'nutritionist']}><Chat /></ProtectedRoute>} />
         */}
         {/* Admin Routes */}
         <Route
            path="/admin/verify"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <VerificationQueue />
              </ProtectedRoute>
            }
         />
         <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagement />
              </ProtectedRoute>
            }
         />
          <Route
            path="/admin/moderation"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ModerationPage />
              </ProtectedRoute>
            }
         />
         <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ReviewManagement />
              </ProtectedRoute>
            }
         />
         {/* Add other admin routes here */}
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
