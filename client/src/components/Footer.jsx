import React from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const year = new Date().getFullYear();
  const { isDarkTheme, toggleTheme } = useTheme();

  // Scroll to top handler for footer links
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const getFooterStyles = () => ({
    backgroundColor: isDarkTheme ? "#030B1D" : "#f8fafc",
    backgroundImage: isDarkTheme
      ? "radial-gradient(circle at 15% 50%, rgba(23, 46, 96, 0.4) 0%, transparent 40%), radial-gradient(circle at 85% 30%, rgba(23, 46, 96, 0.3) 0%, transparent 40%)"
      : "radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 85% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)",
    color: isDarkTheme ? "white" : "#030B1D",
    border: isDarkTheme ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(71, 85, 105, 0.15)",
    boxShadow: isDarkTheme
      ? "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
      : "0 25px 50px -12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
  });

  const getTextColor = () => (isDarkTheme ? "text-blue-300" : "text-slate-600");
  const getLinkHoverColor = () => (isDarkTheme ? "hover:text-white" : "hover:text-blue-700");
  const getAnimatedHeaderStyle = () => {
    if (isDarkTheme) {
      return {
        backgroundImage:
          "linear-gradient(135deg, #3b82f6 0%, #93c5fd 20%, #dbeafe 40%, #f0f9ff 50%, #dbeafe 60%, #93c5fd 80%, #3b82f6 100%)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 8s ease-in-out infinite",
        WebkitBackgroundClip: "text",
        color: "transparent",
      };
    } else {
      return {
        backgroundImage:
          "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 35%, #60a5fa 60%, #93c5fd 80%, #1e3a8a 100%)",
        backgroundSize: "300% 300%",
        animation: "gradientShiftLight 8s ease-in-out infinite",
        WebkitBackgroundClip: "text",
        color: "transparent",
      };
    }
  };
  const getProtectionTextStyle = () => {
    if (isDarkTheme) {
      return {
        backgroundImage:
          "linear-gradient(135deg, #3b82f6 0%, #93c5fd 20%, #dbeafe 40%, #f0f9ff 50%, #dbeafe 60%, #93c5fd 80%, #3b82f6 100%)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 8s ease-in-out infinite",
        WebkitBackgroundClip: "text",
        color: "transparent",
        filter: "drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3))",
      };
    } else {
      return {
        backgroundImage:
          "linear-gradient(135deg, #1e40af 0%, #1e3a8a 20%, #2563eb 40%, #3b82f6 60%, #93c5fd 80%, #1e40af 100%)",
        backgroundSize: "300% 300%",
        animation: "gradientShiftProtectionLight 8s ease-in-out infinite",
        WebkitBackgroundClip: "text",
        color: "transparent",
        filter: "drop-shadow(0 4px 12px rgba(59, 130, 246, 0.2))",
      };
    }
  };
  const getEmailInputStyle = () => ({
    color: isDarkTheme ? "rgba(219, 234, 254, 0.9)" : "#030B1D",
  });
  const emailPlaceholderStyle = isDarkTheme
    ? { color: "rgba(147,197,253,0.4)" }
    : { color: "rgba(30,64,175,0.85)" };
  const getEmailBoxShadow = () =>
    isDarkTheme
      ? "0 16px 32px rgba(23,46,96,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
      : "0 8px 12px rgba(59,130,246,0.11), inset 0 1px 0 rgba(255,255,255,0.7)";

  return (
    <>
      <footer className="relative w-full overflow-hidden" style={getFooterStyles()}>
       
        {/* Aurora effect */}
        {isDarkTheme && (
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-20"
            style={{
              background:
                "linear-gradient(115deg, rgba(23,46,96,0.4), rgba(37,99,235,0.2), rgba(29,78,216,0.25))",
              backgroundSize: "200% 200%",
              mixBlendMode: "screen",
              animation: "aurora-pan 16s ease-in-out infinite",
            }}
          />
        )}
        {/* Floating orbs - only show in dark mode */}
        {isDarkTheme && (
          <>
            <div
              className="absolute w-96 h-96 rounded-full z-0"
              style={{
                top: "20%",
                left: "-10%",
                background:
                  "radial-gradient(circle, rgba(23,46,96,0.2) 0%, rgba(23,46,96,0.1) 40%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            <div
              className="absolute w-80 h-80 rounded-full z-0"
              style={{
                bottom: "20%",
                right: "-8%",
                background:
                  "radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(23,46,96,0.1) 40%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />
          </>
        )}
        <div className="relative z-10">
          {/* Newsletter CTA */}
          <section className="max-w-6xl mx-auto px-6 pt-20 pb-12">
            <h2
              className="text-center text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight"
              style={{ color: isDarkTheme ? "white" : "#030B1D" }}
            >
              Revolutionize Travel{" "}
              <span className="bg-clip-text text-transparent relative" style={getProtectionTextStyle()}>
                Protection
              </span>
            </h2>
            <p className={`mt-4 text-center max-w-2xl mx-auto ${getTextColor()}`}>
              Stay updated with DeFi Travel Shield for the latest in parametric insurance innovation!
            </p>
            <div className="mt-8 flex justify-center">
              <div className="relative w-full max-w-xl">
                <div
                  className="relative flex items-center rounded-full border shadow-lg"
                  style={{
                    background: isDarkTheme
                      ? "linear-gradient(135deg, rgba(23, 46, 96, 0.4), rgba(11, 25, 55, 0.5))"
                      : "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,250,252,0.9))",
                    backdropFilter: "blur(20px)",
                    border: isDarkTheme ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(59,130,246,0.2)",
                    boxShadow: getEmailBoxShadow(),
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-transparent px-6 py-4 outline-none"
                    style={getEmailInputStyle()}
                    onFocus={(e) => (e.target.style.color = isDarkTheme ? "rgba(219,234,254,0.97)" : "#1e3a8a")}
                  />
                  <style>
                    {`
                      input::placeholder {
                        color: ${emailPlaceholderStyle.color} !important;
                        opacity: 1;
                      }
                    `}
                  </style>
                  <button
                    className="m-1 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-normal text-white transition-all duration-300 border"
                    style={{
                      background: "linear-gradient(135deg, rgba(59,130,246,0.8) 0%, rgba(37,99,235,0.6) 100%)",
                      border: isDarkTheme ? "1px solid rgba(96,165,250,0.4)" : "1px solid rgba(96,165,250,0.6)",
                      boxShadow: "0 8px 16px rgba(59,130,246,0.2)",
                    }}
                    onMouseEnter={(e) => (e.target.style.boxShadow = "0 12px 24px rgba(59,130,246,0.28)")}
                    onMouseLeave={(e) => (e.target.style.boxShadow = "0 8px 16px rgba(59,130,246,0.2)")}
                  >
                    <span className="relative z-10">Get Started</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

          {/* Main footer with all 5 sections in one row */}
          <section
            className="max-w-6xl mx-auto px-6 py-14"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "nowrap",
            }}
          >
            {/* Brand Section */}
            <div style={{ flex: "1 1 20%" }}>
              <div className="flex items-center gap-2">
                <div
                  className="h-7 w-7 rounded-md"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                    boxShadow: "0 0 20px rgba(59,130,246,0.4)",
                  }}
                />
                <span className="text-lg font-normal bg-clip-text text-transparent" style={getAnimatedHeaderStyle()}>
                  DeFi Travel Shield
                </span>
              </div>
              <p className={`mt-5 max-w-sm ${getTextColor()}`}>
                Trusted by travelers worldwide, we prioritize security, transparency, and instant payouts to protect your journeys.
              </p>
              <div className="mt-6">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg border transition-all duration-300 hover:scale-105"
                  style={{
                    background: isDarkTheme
                      ? "linear-gradient(135deg, rgba(23,46,96,0.3), rgba(11,25,55,0.4))"
                      : "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(248,250,252,0.7))",
                    backdropFilter: "blur(10px)",
                    border: isDarkTheme ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(71,85,105,0.2)",
                  }}
                  aria-label="Toggle theme"
                >
                  {isDarkTheme ? (
                    <Sun size={18} className="text-blue-300 transition-transform duration-300 hover:rotate-180" />
                  ) : (
                    <Moon size={18} className="text-slate-600 transition-transform duration-300 hover:rotate-12" />
                  )}
                </button>
              </div>
            </div>

            {/* Pages */}
            <div style={{ flex: "1 1 20%", marginLeft: "2rem" }}>
              <h4 className="font-normal mb-4" style={getAnimatedHeaderStyle()}>
                Pages
              </h4>
              <ul className={`space-y-3 ${getTextColor()}`}>
                <li><Link to="/about" onClick={handleLinkClick} className={getLinkHoverColor()}>About</Link></li>
                <li><Link to="/package" onClick={handleLinkClick} className={getLinkHoverColor()}>Package</Link></li>
                <li><Link to="/partnership" onClick={handleLinkClick} className={getLinkHoverColor()}>Partnership</Link></li>
                <li><Link to="/whyinsurex" onClick={handleLinkClick} className={getLinkHoverColor()}>WhyInsureX</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div style={{ flex: "1 1 20%" }}>
              <h4 className="font-normal mb-4" style={getAnimatedHeaderStyle()}>Products</h4>
              <ul className={`space-y-3 ${getTextColor()}`}>
                <li><Link to="/products" onClick={handleLinkClick} className={getLinkHoverColor()}>Insurance Products</Link></li>
                <li><Link to="/dashboard" onClick={handleLinkClick} className={getLinkHoverColor()}>Dashboard</Link></li>
                <li><Link to="/transparency" onClick={handleLinkClick} className={getLinkHoverColor()}>Transparency</Link></li>
                <li><Link to="/b2b" onClick={handleLinkClick} className={getLinkHoverColor()}>B2B Solutions</Link></li>
              </ul>
            </div>

            {/* Developers */}
            <div style={{ flex: "1 1 20%" }}>
              <h4 className="font-normal mb-4" style={getAnimatedHeaderStyle()}>Developers</h4>
              <ul className={`space-y-3 ${getTextColor()}`}>
                <li><Link to="/developers" onClick={handleLinkClick} className={getLinkHoverColor()}>Documentation</Link></li>
                <li><Link to="/oracles" onClick={handleLinkClick} className={getLinkHoverColor()}>Oracle Network</Link></li>
                <li><Link to="/api" onClick={handleLinkClick} className={getLinkHoverColor()}>API Reference</Link></li>
                <li><Link to="/security" onClick={handleLinkClick} className={getLinkHoverColor()}>Security</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div style={{ flex: "1 1 20%" }}>
              <h4 className="font-normal mb-4" style={getAnimatedHeaderStyle()}>Company</h4>
              <ul className={`space-y-3 ${getTextColor()}`}>
                <li><Link to="/blog" onClick={handleLinkClick} className={getLinkHoverColor()}>Blog</Link></li>
                <li><Link to="/faq" onClick={handleLinkClick} className={getLinkHoverColor()}>FAQ</Link></li>
                <li><Link to="/compliance" onClick={handleLinkClick} className={getLinkHoverColor()}>Compliance</Link></li>
                <li><Link to="/careers" onClick={handleLinkClick} className={getLinkHoverColor()}>Careers</Link></li>
              </ul>
            </div>
          </section>

          {/* Bottom bar */}
          <div className="border-t border-blue-400/20">
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className={`text-xs ${isDarkTheme ? "text-blue-300/50" : "text-slate-500"}`}>
                Copyright © {year} DeFi Travel Shield. All rights reserved.
              </p>
              {/* Social icons */}
              <div className={`flex items-center gap-4 ${isDarkTheme ? "text-blue-300/60" : "text-slate-500"}`}>
                <a href="#" aria-label="X" className={`transition-colors duration-300 p-2 rounded-md ${isDarkTheme ? "hover:bg-blue-500/20 hover:text-white" : "hover:bg-blue-500/10 hover:text-blue-700"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.9 2H22l-7.5 8.6L23 22h-6.6l-5.2-6.8L5 22H2l8.2-9.4L1 2h6.7l4.7 6.2L18.9 2zm-1.2 18h2L8.4 4H6.4l11.3 16z" />
                  </svg>
                </a>
                <a href="#" aria-label="GitHub" className={`transition-colors duration-300 p-2 rounded-md ${isDarkTheme ? "hover:bg-blue-500/20 hover:text-white" : "hover:bg-blue-500/10 hover:text-blue-700"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="CurrentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.50.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.20 2.39.10 2.64.65.71 1.03 1.60 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.50C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className={`transition-colors duration-300 p-2 rounded-md ${isDarkTheme ? "hover:bg-blue-500/20 hover:text-white" : "hover:bg-blue-500/10 hover:text-blue-700"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="CurrentColor">
                    <path d="M20.45 20.45h-3.56v-5.6c0-1.34-.02-3.06-1.87-3.06-1.88 0-2.17 1.46-2.17 2.96v5.7H9.29V9h3.41v1.56h.05c.48-.90 1.66-1.85 3.41-1.85 3.65 0 4.32 2.4 4.32 5.5v6.24zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                </a>
                <a href="#" aria-label="Discord" className={`transition-colors duration-300 p-2 rounded-md ${isDarkTheme ? "hover:bg-blue-500/20 hover:text-white" : "hover:bg-blue-500/10 hover:text-blue-700"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="CurrentColor">
                    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
                  </svg>
                </a>
                <a href="#" aria-label="Telegram" className={`transition-colors duration-300 p-2 rounded-md ${isDarkTheme ? "hover:bg-white/10 hover:text-white" : "hover:bg-blue-500/10 hover:text-blue-700"}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="CurrentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.78 5.42-.92 6.8-.06.67-.36.89-.89.56-2.45-1.83-3.57-2.92-5.79-4.68-.54-.42-.19-.65.33-1.02.23-.16 4.21-3.81 4.40-4.12.06-.08.11-.36.01-.50-.11-.14-.32-.16-.50-.06-.21.12-3.56 2.27-5.02 3.35-.53.33-.85.49-.85.49s-.25.08-.57-.08c-.20-.10-.35-.25-.35-.25s.02-1.98.04-2.71c.01-.38.11-.61.39-.77.38-.22.84-.14 1.05-.08.26.08 4.08 2.60 4.90 3.19.56.35.96.53 1.04.83.09.30-.07.63-.20.82z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Shift Animations */}
        <style>
          {`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes gradientShiftLight {
              0% { background-position: 0% 50%; }
              25% { background-position: 45% 50%; }
              50% { background-position: 100% 50%; }
              75% { background-position: 55% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes gradientShiftProtectionLight {
              0% { background-position: 0% 50%; }
              33% { background-position: 60% 50%; }
              66% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
      </footer>
    </>
  );
};

export default Footer;
