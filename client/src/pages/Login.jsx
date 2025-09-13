// src/pages/Login.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import wolf from "../assets/wolf.png";
import loginLightBg from "../assets/loginlightbg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const typingTimeout = useRef(null);
  const { isDarkTheme } = useTheme();

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const handleMagicLink = () => {
    if (!email.trim()) {
      setErrors({ email: "Email is required for magic link" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsMagicLinkSent(true);
      setTimeout(() => setIsMagicLinkSent(false), 5000);
    }, 1000);
  };

  // Handle typing detection for eye animation and clear errors on typing
  useEffect(() => {
    if (email || password) {
      setIsTyping(true);
      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      // Clear errors when user starts typing
      setErrors({});

      typingTimeout.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    } else {
      setIsTyping(false);
    }

    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, [email, password]);

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

        {/* Subtle breathing animation when not typing */}
        <style>
          {`
            @keyframes pulse {
              0% { opacity: 0.2; }
              50% { opacity: 0.4; }
              100% { opacity: 0.2; }
            }
            .pulse {
              animation: pulse 3s infinite ease-in-out;
            }
          `}
        </style>
      </div>

      {/* Login Form Section */}
      <div className="w-full flex items-center justify-end py-6 pr-6 relative z-30">
        <div className="w-full max-w-xl">
          {/* Login Card */}
          <div
            className={`rounded-2xl p-6 shadow-2xl backdrop-blur-xl border ${
              isDarkTheme
                ? "bg-[#172E60]/30 border-blue-500/30"
                : "bg-white/80 border-cyan-200/60 shadow-cyan-200/20"
            }`}
          >
            {/* Logo */}
            <div className="text-center mb-6">
              <div
                className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-3 ${
                  isDarkTheme
                    ? "bg-gradient-to-r from-blue-600 to-blue-500"
                    : "bg-gradient-to-r from-cyan-500 to-cyan-600"
                }`}
              >
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h1
                className={`text-2xl font-light bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkTheme
                    ? "from-blue-300 via-blue-400 to-blue-300"
                    : "from-cyan-600 via-slate-700 to-cyan-600"
                }`}
              >
                Welcome Back
              </h1>
              <p
                className={
                  isDarkTheme ? "text-blue-300 mt-1" : "text-slate-600 mt-1"
                }
              >
                Sign in to your account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-1 ${
                    isDarkTheme ? "text-blue-300" : "text-slate-700"
                  }`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isDarkTheme ? "text-blue-400" : "text-cyan-600"
                    }`}
                  />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.email ? "border-red-500 focus:ring-red-500" : ""
                    } ${
                      isDarkTheme
                        ? "bg-[#172E60]/30 border-blue-500/30 text-white placeholder-blue-400"
                        : "bg-white/60 border-cyan-200/50 text-slate-800 placeholder-slate-500"
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-1 ${
                    isDarkTheme ? "text-blue-300" : "text-slate-700"
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isDarkTheme ? "text-blue-400" : "text-cyan-600"
                    }`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-9 pr-11 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.password ? "border-red-500 focus:ring-red-500" : ""
                    } ${
                      isDarkTheme
                        ? "bg-[#172E60]/30 border-blue-500/30 text-white placeholder-blue-400"
                        : "bg-white/60 border-cyan-200/50 text-slate-800 placeholder-slate-500"
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                      isDarkTheme
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-cyan-600 hover:text-slate-700"
                    }`}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className={`w-4 h-4 rounded focus:ring-blue-500 ${
                      isDarkTheme
                        ? "text-blue-600 bg-[#172E60]/30 border-blue-500/30"
                        : "text-cyan-600 bg-white border-cyan-300"
                    }`}
                  />
                  <span
                    className={`ml-2 text-sm ${
                      isDarkTheme ? "text-blue-300" : "text-slate-700"
                    }`}
                  >
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className={`text-sm transition-colors ${
                    isDarkTheme
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-cyan-600 hover:text-slate-800"
                  }`}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email.trim() || !password.trim()}
                className={`w-full text-white py-2.5 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                  isDarkTheme
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    : "bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
                }`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                <span>{isLoading ? "Signing in..." : "Sign In"}</span>
              </button>
            </form>

            {/* Magic Link Option */}
            <div className="mt-4">
              <button
                onClick={handleMagicLink}
                disabled={isLoading || !email.trim() || isMagicLinkSent}
                className={`w-full text-white py-2.5 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                  isDarkTheme
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    : "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
                }`}
              >
                {isMagicLinkSent ? (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Magic Link Sent!</span>
                  </>
                ) : isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Send Magic Link</span>
                  </>
                )}
              </button>
              {isMagicLinkSent && (
                <p
                  className={`text-sm mt-1 text-center ${
                    isDarkTheme ? "text-blue-400" : "text-slate-600"
                  }`}
                >
                  Check your email for the magic link
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t ${
                    isDarkTheme ? "border-blue-500/30" : "border-cyan-300/60"
                  }`}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className={`px-2 ${
                    isDarkTheme
                      ? "bg-[#172E60]/30 text-blue-400"
                      : "bg-white text-slate-600"
                  }`}
                >
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`flex items-center justify-center space-x-2 py-2 rounded-xl transition-all ${
                  isDarkTheme
                    ? "bg-[#172E60]/30 border border-blue-500/30 text-blue-300 hover:bg-[#172E60]/50 hover:text-white"
                    : "bg-white/80 border border-cyan-200/60 text-slate-700 hover:bg-cyan-50/80 hover:text-slate-900"
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xs">G</span>
                </div>
                <span>Google</span>
              </button>
              <button
                className={`flex items-center justify-center space-x-2 py-2 rounded-xl transition-all ${
                  isDarkTheme
                    ? "bg-[#172E60]/30 border border-blue-500/30 text-blue-300 hover:bg-[#172E60]/50 hover:text-white"
                    : "bg-white/80 border border-cyan-200/60 text-slate-700 hover:bg-cyan-50/80 hover:text-slate-900"
                }`}
              >
                <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">G</span>
                </div>
                <span>GitHub</span>
              </button>
            </div>

            {/* Sign up link */}
            <div className="text-center mt-6">
              <p className={isDarkTheme ? "text-blue-300" : "text-slate-700"}>
                Don't have an account?{" "}
                <button
                  className={`font-medium transition-colors ${
                    isDarkTheme
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-cyan-500 hover:text-cyan-600"
                  }`}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
