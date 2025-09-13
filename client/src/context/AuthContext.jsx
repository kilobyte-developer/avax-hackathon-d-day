import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update auth state
  const updateAuthState = useCallback((authData) => {
    setIsAuthenticated(authData.isAuthenticated);
    setUser(authData.user);
    setError(null);
  }, []);

  // Handle auth state changes
  const handleAuthChange = useCallback((authData) => {
    updateAuthState(authData);
  }, [updateAuthState]);

  // Initialize auth state
  const initializeAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const authStatus = await authService.initialize();
      updateAuthState({
        isAuthenticated: authStatus.isAuthenticated,
        user: authStatus.user
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      setError(error.message);
      updateAuthState({
        isAuthenticated: false,
        user: null
      });
    } finally {
      setIsLoading(false);
    }
  }, [updateAuthState]);

  // Login function
  const login = useCallback(async () => {
    try {
      setError(null);
      const result = authService.signInWithGoogle();
      return result;
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      setError(null);
      const result = await authService.logout();
      
      if (result.success) {
        updateAuthState({
          isAuthenticated: false,
          user: null
        });
      }
      
      return result;
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [updateAuthState]);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    try {
      setError(null);
      const result = await authService.refreshUser();
      
      if (result.success) {
        setUser(result.user);
      }
      
      return result;
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (profileData) => {
    try {
      setError(null);
      const result = await authService.updateProfile(profileData);
      
      if (result.success) {
        setUser(result.user);
      }
      
      return result;
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, []);

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
    
    // Setup auth listener
    const removeListener = authService.addAuthListener(handleAuthChange);
    
    // Cleanup
    return () => {
      removeListener();
    };
  }, [initializeAuth, handleAuthChange]);

  // Handle auth callback from URL
  const handleAuthCallback = useCallback(async () => {
    try {
      setError(null);
      const result = await authService.handleAuthCallback();
      
      if (result.success) {
        updateAuthState({
          isAuthenticated: true,
          user: result.user
        });
      }
      
      return result;
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  }, [updateAuthState]);

  const contextValue = {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    login,
    logout,
    refreshUser,
    updateProfile,
    handleAuthCallback,
    initializeAuth,
    
    // Utils
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};