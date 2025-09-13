import React, { useState, useRef, useEffect } from "react";
import {
  Shield,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import authService from "../services/auth.service";
import wolf from "../assets/wolf.png";
import loginLightBg from "../assets/loginlightbg.png";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const typingTimeout = useRef(null);
  const { isDarkTheme } = useTheme();

  // Check for auth errors from URL params and handle callbacks
  useEffect(() => {
    const handleAuthFlow = async () => {
      setIsCheckingAuth(true);
      
      const urlParams = new URLSearchParams(window.location.search);
      
      // Handle auth errors
      if (urlParams.get('error') === 'auth_failed') {
        setAuthError("Authentication failed. Please try again.");
        // Clear the error from URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // Check if user is already authenticated
      try {
        const authStatus = await authService.checkAuthStatus();
        if (authStatus.isAuthenticated) {
          const redirectTo = authService.getPostLoginRedirect();
          navigate(redirectTo);
          return;
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
      
      setIsCheckingAuth(false);
    };

    handleAuthFlow();
  }, [navigate]);

  // Save intended destination for post-login redirect
  useEffect(() => {
    const from = location.state?.from?.pathname;
    if (from && from !== '/login') {
      authService.savePostLoginRedirect(from);
    }
  }, [location.state]);

  const handleGoogleSignIn = async () => {
    setAuthError("");
    setIsLoading(true);
    
    try {
      // This will redirect to Google OAuth
      const result = authService.signInWithGoogle();
      
      if (!result.success) {
        setAuthError(result.error || "Failed to initiate Google sign-in");
        setIsLoading(false);
      }
      // If successful, user will be redirected and component will unmount
    } catch (error) {
      console.error('Google sign-in error:', error);
      setAuthError("Failed to sign in with Google. Please try again.");
      setIsLoading(false);
    }
  };

  // Simulate typing for eye animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }, 8000); // Every 8 seconds, simulate typing for 2 seconds

    return () => clearInterval(interval);
  }, []);

  // Show loading spinner while checking authentication
  if (isCheckingAuth) {
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
          <p className={isDarkTheme ? "text-blue-300" : "text-slate-600"}>
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen w-screen flex px-4 fixed inset-0 overflow-hidden ${
        isDarkTheme
          ? "bg-gradient-to-br from-[#030B1D] via-[#030B1D] to-[#030B1D] text-white"
          : "bg-gradient-to-br from-slate-200 via-cyan-100 to-slate-300 text-slate-800"
      }`}
    >
      {/* Background Elements */}
      <div
        className={`absolute inset-0 ${
          isDarkTheme
            ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=")] opacity-10'
            : 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=")] opacity-5'
        }`}
      />
      <div
        className={`absolute top-0 left-1/4 w-96 h-96 ${
          isDarkTheme ? "bg-blue-600" : "bg-cyan-300"
        } opacity-10 rounded-full blur-3xl`}
      />
      <div
        className={`absolute bottom-0 right-1/4 w-96 h-96 ${
          isDarkTheme ? "bg-blue-500" : "bg-slate-400"
        } opacity-10 rounded-full blur-3xl`}
      />

      {/* Return to Home Button Top Left */}
      <button
        onClick={() => navigate("/")}
        className={`absolute top-6 left-6 flex items-center space-x-1 transition-colors rounded-md px-3 py-1.5 font-medium z-40 ${
          isDarkTheme
            ? "bg-[#172E60]/60 hover:bg-[#172E60]/80 text-blue-300 hover:text-white"
            : "bg-cyan-200/80 hover:bg-cyan-300/90 text-slate-700 hover:text-slate-900"
        }`}
        aria-label="Return to Home"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Home</span>
      </button>

      {/* Wolf Image Section */}
      <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={isDarkTheme ? wolf : loginLightBg}
          alt={isDarkTheme ? "Wolf" : "Background"}
          className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 object-contain max-w-none"
          style={{
            width: isDarkTheme ? "1200px" : "800px",
            height: isDarkTheme ? "1200px" : "800px",
            filter: isDarkTheme ? "none" : "brightness(1.1) contrast(1.1)",
          }}
        />

        {/* Animated Eyes Overlay - Only show in dark mode */}
        {isDarkTheme && (
          <div
            className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ width: "1200px", height: "1200px" }}
          >
            {/* Left eye container */}
            <div
              className="absolute"
              style={{
                width: "66px",
                height: "38px",
                left: "44%",
                top: "48%",
              }}
            >
              {/* Left eye - always full size */}
              <div
                className="absolute overflow-hidden"
                style={{
                  width: "66px",
                  height: "38px",
                  clipPath:
                    "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
                  backgroundColor: "#1a1a1a",
                }}
              >
                <div
                  className="absolute"
                  style={{
                    width: "52px",
                    height: "32px",
                    left: "7px",
                    top: "3px",
                    clipPath:
                      "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #1e40af 30%, #2563eb 70%, #3b82f6 100%)",
                  }}
                ></div>
                <div
                  className="absolute bg-white rounded-full"
                  style={{
                    width: "12px",
                    height: "12px",
                    left: "38px",
                    top: "13px",
                  }}
                ></div>
              </div>

              {/* Eyelids that close over the eye */}
              <div
                className={`absolute transition-all duration-300 ease-in-out ${
                  isTyping ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  width: "66px",
                  height: isTyping ? "19px" : "0px",
                  top: "0px",
                  clipPath: "polygon(15% 100%, 85% 100%, 100% 0%, 0% 0%)",
                  background:
                    "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                }}
              ></div>
              <div
                className={`absolute transition-all duration-300 ease-in-out ${
                  isTyping ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  width: "66px",
                  height: isTyping ? "19px" : "0px",
                  bottom: "0px",
                  clipPath: "polygon(0% 100%, 100% 100%, 85% 0%, 15% 0%)",
                  background:
                    "linear-gradient(0deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                }}
              ></div>
            </div>

            {/* Right eye container */}
            <div
              className="absolute"
              style={{
                width: "66px",
                height: "38px",
                right: "44%",
                top: "48%",
              }}
            >
              {/* Right eye - always full size */}
              <div
                className="absolute overflow-hidden"
                style={{
                  width: "66px",
                  height: "38px",
                  clipPath:
                    "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
                  backgroundColor: "#1a1a1a",
                }}
              >
                <div
                  className="absolute"
                  style={{
                    width: "52px",
                    height: "32px",
                    left: "7px",
                    top: "3px",
                    clipPath:
                      "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #1e40af 30%, #2563eb 70%, #3b82f6 100%)",
                  }}
                ></div>
                <div
                  className="absolute bg-white rounded-full"
                  style={{
                    width: "12px",
                    height: "12px",
                    left: "16px",
                    top: "13px",
                  }}
                ></div>
              </div>

              {/* Eyelids that close over the eye */}
              <div
                className={`absolute transition-all duration-300 ease-in-out ${
                  isTyping ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  width: "66px",
                  height: isTyping ? "19px" : "0px",
                  top: "0px",
                  clipPath: "polygon(15% 100%, 85% 100%, 100% 0%, 0% 0%)",
                  background:
                    "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                }}
              ></div>
              <div
                className={`absolute transition-all duration-300 ease-in-out ${
                  isTyping ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  width: "66px",
                  height: isTyping ? "19px" : "0px",
                  bottom: "0px",
                  clipPath: "polygon(0% 100%, 100% 100%, 85% 0%, 15% 0%)",
                  background:
                    "linear-gradient(0deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Login Form Section */}
      <div className="w-full flex items-center justify-end py-6 pr-6 relative z-30">
        <div className="w-full max-w-xl">
          {/* Login Card */}
          <div
            className={`rounded-2xl p-8 shadow-2xl backdrop-blur-xl border ${
              isDarkTheme
                ? "bg-[#172E60]/30 border-blue-500/30"
                : "bg-white/80 border-cyan-200/60 shadow-cyan-200/20"
            }`}
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <div
                className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                  isDarkTheme
                    ? "bg-gradient-to-r from-blue-600 to-blue-500"
                    : "bg-gradient-to-r from-cyan-500 to-cyan-600"
                }`}
              >
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1
                className={`text-3xl font-light bg-gradient-to-r bg-clip-text text-transparent mb-2 ${
                  isDarkTheme
                    ? "from-blue-300 via-blue-400 to-blue-300"
                    : "from-cyan-600 via-slate-700 to-cyan-600"
                }`}
              >
                Welcome Back
              </h1>
              <p
                className={`text-lg ${
                  isDarkTheme ? "text-blue-300" : "text-slate-600"
                }`}
              >
                Sign in with your Google account
              </p>
            </div>

            {/* Error Messages */}
            {authError && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-red-400 text-sm text-center">{authError}</p>
              </div>
            )}

            {/* Google Sign-In Button - Main CTA */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className={`w-full text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-4 mb-8 shadow-lg hover:shadow-xl ${
                isDarkTheme
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105"
                  : "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 hover:scale-105"
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285f4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34a853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#fbbc05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#ea4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
              )}
              <span>{isLoading ? "Signing in..." : "Continue with Google"}</span>
            </button>

            {/* Features/Benefits */}
            <div className={`text-center space-y-3 mb-6 ${isDarkTheme ? "text-blue-200" : "text-slate-600"}`}>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isDarkTheme ? "bg-blue-400" : "bg-cyan-500"}`}></div>
                <span>Secure authentication with Google</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isDarkTheme ? "bg-blue-400" : "bg-cyan-500"}`}></div>
                <span>No password required</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isDarkTheme ? "bg-blue-400" : "bg-cyan-500"}`}></div>
                <span>Quick and easy access</span>
              </div>
            </div>

            {/* Sign up link */}
            <div className="text-center">
              <p className={`text-sm ${isDarkTheme ? "text-blue-300" : "text-slate-600"}`}>
                Don't have an account?{" "}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className={`font-medium transition-colors underline ${
                    isDarkTheme
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-cyan-500 hover:text-cyan-600"
                  }`}
                >
                  Sign up with Google
                </button>
              </p>
            </div>

            {/* Terms and Privacy */}
            <div className="text-center mt-6 pt-4 border-t border-opacity-20">
              <p className={`text-xs ${isDarkTheme ? "text-blue-400/70" : "text-slate-500"}`}>
                By signing in, you agree to our{" "}
                <button className="underline hover:opacity-80">Terms of Service</button>
                {" "}and{" "}
                <button className="underline hover:opacity-80">Privacy Policy</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;