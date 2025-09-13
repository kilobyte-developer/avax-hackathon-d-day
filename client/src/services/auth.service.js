// src/services/auth.service.js
import apiService from './apiService';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.authListeners = [];
  }

  // Add auth state listener
  addAuthListener(callback) {
    this.authListeners.push(callback);
    return () => {
      this.authListeners = this.authListeners.filter(listener => listener !== callback);
    };
  }

  // Notify all auth listeners
  notifyAuthListeners() {
    this.authListeners.forEach(callback => {
      callback({
        isAuthenticated: this.isAuthenticated,
        user: this.currentUser
      });
    });
  }

  // Check authentication status
  async checkAuthStatus() {
    try {
      const response = await apiService.get('/auth/status');
      
      if (response.success && response.data) {
        this.isAuthenticated = response.data.isAuthenticated;
        this.currentUser = response.data.user;
        this.notifyAuthListeners();
        return {
          success: true,
          isAuthenticated: this.isAuthenticated,
          user: this.currentUser
        };
      }
      
      return {
        success: false,
        isAuthenticated: false,
        user: null
      };
    } catch (error) {
      console.error('Error checking auth status:', error);
      this.isAuthenticated = false;
      this.currentUser = null;
      this.notifyAuthListeners();
      return {
        success: false,
        isAuthenticated: false,
        user: null,
        error: error.message
      };
    }
  }

  // Get current user details
  async getCurrentUser() {
    try {
      const response = await apiService.get('/auth/user');
      
      if (response.success && response.data) {
        this.currentUser = response.data.user;
        this.isAuthenticated = true;
        this.notifyAuthListeners();
        return {
          success: true,
          user: this.currentUser
        };
      }
      
      return {
        success: false,
        error: 'Failed to get user data'
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Google Sign-In
  signInWithGoogle() {
    try {
      // Redirect to backend Google OAuth endpoint
      const googleAuthUrl = `${apiService.getBaseURL()}/auth/google`;
      window.location.href = googleAuthUrl;
      
      return {
        success: true,
        message: 'Redirecting to Google...'
      };
    } catch (error) {
      console.error('Error initiating Google sign-in:', error);
      return {
        success: false,
        error: 'Failed to initiate Google sign-in'
      };
    }
  }

  // Logout
  async logout() {
    try {
      const response = await apiService.post('/auth/logout');
      
      if (response.success) {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.notifyAuthListeners();
        
        return {
          success: true,
          message: 'Logged out successfully'
        };
      }
      
      return {
        success: false,
        error: 'Failed to logout'
      };
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if API call fails, clear local auth state
      this.isAuthenticated = false;
      this.currentUser = null;
      this.notifyAuthListeners();
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get user authentication state
  getAuthState() {
    return {
      isAuthenticated: this.isAuthenticated,
      user: this.currentUser
    };
  }

  // Check if user is authenticated (synchronous)
  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  // Get current user (synchronous)
  getUser() {
    return this.currentUser;
  }

  // Initialize auth service (call this on app startup)
  async initialize() {
    try {
      console.log('Initializing auth service...');
      const authStatus = await this.checkAuthStatus();
      
      if (authStatus.isAuthenticated) {
        console.log('User is authenticated:', authStatus.user?.email);
      } else {
        console.log('User is not authenticated');
      }
      
      return authStatus;
    } catch (error) {
      console.error('Error initializing auth service:', error);
      return {
        success: false,
        isAuthenticated: false,
        user: null,
        error: error.message
      };
    }
  }

  // Handle authentication callback (for OAuth flows)
  async handleAuthCallback() {
    try {
      // Check if we're on a callback URL
      const urlParams = new URLSearchParams(window.location.search);
      const hasError = urlParams.get('error');
      
      if (hasError) {
        return {
          success: false,
          error: 'Authentication failed',
          redirectTo: '/login'
        };
      }

      // Check auth status after callback
      const authStatus = await this.checkAuthStatus();
      
      if (authStatus.isAuthenticated) {
        return {
          success: true,
          user: authStatus.user,
          redirectTo: '/dashboard'
        };
      }
      
      return {
        success: false,
        error: 'Authentication verification failed',
        redirectTo: '/login'
      };
    } catch (error) {
      console.error('Error handling auth callback:', error);
      return {
        success: false,
        error: error.message,
        redirectTo: '/login'
      };
    }
  }

  // Update user profile (if needed)
  async updateProfile(profileData) {
    try {
      const response = await apiService.patch('/auth/user', profileData);
      
      if (response.success && response.data) {
        this.currentUser = { ...this.currentUser, ...response.data.user };
        this.notifyAuthListeners();
        
        return {
          success: true,
          user: this.currentUser
        };
      }
      
      return {
        success: false,
        error: 'Failed to update profile'
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Refresh user data
  async refreshUser() {
    return await this.getCurrentUser();
  }

  // Clear auth state (for testing or manual logout)
  clearAuthState() {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.notifyAuthListeners();
  }

  // Check if current route requires authentication
  requiresAuth(pathname) {
    const publicRoutes = ['/', '/login', '/signup', '/about', '/contact'];
    return !publicRoutes.includes(pathname);
  }

  // Get redirect URL after login
  getPostLoginRedirect() {
    const savedRedirect = sessionStorage.getItem('postLoginRedirect');
    if (savedRedirect) {
      sessionStorage.removeItem('postLoginRedirect');
      return savedRedirect;
    }
    return '/dashboard';
  }

  // Save redirect URL for after login
  savePostLoginRedirect(url) {
    sessionStorage.setItem('postLoginRedirect', url);
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;