import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const LoadingSpinner = () => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div className={`h-screen w-screen flex items-center justify-center ${
      isDarkTheme
        ? "bg-gradient-to-br from-[#030B1D] via-[#030B1D] to-[#030B1D]"
        : "bg-gradient-to-br from-slate-200 via-cyan-100 to-slate-300"
    }`}>
      <div className="flex flex-col items-center space-y-4">
        <div className={`w-8 h-8 border-2 rounded-full animate-spin ${
          isDarkTheme 
            ? "border-blue-500/30 border-t-blue-500" 
            : "border-cyan-500/30 border-t-cyan-500"
        }`} />
        <p className={`text-lg font-medium ${
          isDarkTheme ? "text-blue-300" : "text-slate-600"
        }`}>
          Verifying authentication...
        </p>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // If route requires authentication but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Save the attempted location for post-login redirect
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route is for unauthenticated users only (like login page) but user is authenticated
  if (!requireAuth && isAuthenticated) {
    // Redirect to dashboard or intended destination
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  // Render the protected component
  return children;
};

export default ProtectedRoute;