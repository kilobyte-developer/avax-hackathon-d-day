const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

const router = express.Router();

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google OAuth callback received for:', profile.emails[0].value);
    
    // Check if user already exists with Google ID
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      console.log('Existing user found with Google ID');
      user.lastLogin = new Date();
      await user.save();
      return done(null, user);
    }

    // Check if user exists with same email
    const existingEmailUser = await User.findOne({ email: profile.emails[0].value });
    
    if (existingEmailUser) {
      console.log('Existing user found with email, linking Google account');
      existingEmailUser.googleId = profile.id;
      existingEmailUser.provider = 'google';
      existingEmailUser.avatar = profile.photos[0]?.value || '';
      existingEmailUser.lastLogin = new Date();
      await existingEmailUser.save();
      return done(null, existingEmailUser);
    }

    // Create new user
    console.log('Creating new user');
    user = new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      firstName: profile.name?.givenName || '',
      lastName: profile.name?.familyName || '',
      avatar: profile.photos[0]?.value || '',
      provider: 'google'
    });

    await user.save();
    console.log('New user created successfully');
    done(null, user);
  } catch (error) {
    console.error('Google OAuth Error:', error);
    done(error, null);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-__v');
    done(null, user);
  } catch (error) {
    console.error('Deserialization error:', error);
    done(error, null);
  }
});

// Auth middleware
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    success: false,
    message: 'Authentication required' 
  });
};

// Routes

// Google OAuth initiate
router.get('/google', (req, res, next) => {
  console.log('Initiating Google OAuth');
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account' // Force account selection
  })(req, res, next);
});

// Google OAuth callback
router.get('/google/callback', (req, res, next) => {
  console.log('Google OAuth callback hit');
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=auth_failed`
  })(req, res, next);
}, (req, res) => {
  // Successful authentication
  console.log('Authentication successful for user:', req.user.email);
  res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard`);
});

// Get current user
router.get('/user', requireAuth, (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: {
          id: req.user._id,
          email: req.user.email,
          name: req.user.name,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          fullName: req.user.fullName,
          avatar: req.user.avatar,
          provider: req.user.provider,
          lastLogin: req.user.lastLogin,
          createdAt: req.user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user data'
    });
  }
});

// Check auth status
router.get('/status', (req, res) => {
  try {
    const isAuthenticated = req.isAuthenticated();
    
    res.json({
      success: true,
      data: {
        isAuthenticated,
        user: isAuthenticated ? {
          id: req.user._id,
          email: req.user.email,
          name: req.user.name,
          avatar: req.user.avatar,
          provider: req.user.provider
        } : null
      }
    });
  } catch (error) {
    console.error('Auth status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check authentication status'
    });
  }
});

// Update user profile
router.patch('/user', requireAuth, async (req, res) => {
  try {
    const { firstName, lastName, name } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { 
        firstName: firstName || req.user.firstName,
        lastName: lastName || req.user.lastName,
        name: name || req.user.name
      },
      { new: true, runValidators: true }
    ).select('-__v');
    
    res.json({
      success: true,
      data: {
        user: {
          id: updatedUser._id,
          email: updatedUser.email,
          name: updatedUser.name,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          fullName: updatedUser.fullName,
          avatar: updatedUser.avatar,
          provider: updatedUser.provider
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (!req.user) {
    return res.json({ 
      success: true, 
      message: 'Already logged out' 
    });
  }
  
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ 
        success: false,
        message: 'Error logging out' 
      });
    }
    
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error destroying session'
        });
      }
      
      res.clearCookie('connect.sid'); // Clear session cookie
      res.json({ 
        success: true,
        message: 'Logged out successfully' 
      });
    });
  });
});

// Delete account
router.delete('/user', requireAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    
    req.logout((err) => {
      if (err) {
        console.error('Logout after delete error:', err);
      }
      
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destroy after delete error:', err);
        }
        
        res.clearCookie('connect.sid');
        res.json({
          success: true,
          message: 'Account deleted successfully'
        });
      });
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete account'
    });
  }
});

module.exports = router;