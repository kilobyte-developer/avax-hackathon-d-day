// src/components/home/HeroSection.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { FlipWords } from "./FlipWords";
import { Spotlight } from "./Spotlight";
import { useTheme } from "../context/ThemeContext";

// Import prop images
import prop1 from "../assets/prop1.png";
import prop2 from "../assets/prop2.png";
import prop3 from "../assets/prop3.png";
import prop4 from "../assets/prop4.png";
import prop5 from "../assets/prop5.png";
import prop6 from "../assets/prop6.png";
import prop7 from "../assets/prop7.png";
import prop8 from "../assets/prop8.png";
import herolightbg from "../assets/herolightbg.png";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textAnimationState, setTextAnimationState] = useState("initial");
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    // Initial visibility animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Text pop-up animation sequence
    const textTimer = setTimeout(() => {
      setTextAnimationState("popup");
      setTimeout(() => {
        setTextAnimationState("settled");
      }, 800);
    }, 600);

    return () => {
      clearTimeout(timer);
      clearTimeout(textTimer);
    };
  }, []);

  // Get theme-based styles
  const getBackgroundStyles = () => {
    if (isDarkTheme) {
      return {
        backgroundColor: "#030B1D",
        backgroundImage:
          "radial-gradient(circle at 15% 50%, rgba(23, 46, 96, 0.4) 0%, transparent 40%), radial-gradient(circle at 85% 30%, rgba(23, 46, 96, 0.3) 0%, transparent 40%)",
      };
    } else {
      return {
        backgroundColor: "#f8fafc",
        backgroundImage:
          "radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 85% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)",
      };
    }
  };

  const getTextColor = () => {
    return isDarkTheme ? "text-white" : "text-slate-800";
  };

  const getSubtextColor = () => {
    return isDarkTheme ? "text-blue-300" : "text-blue-600";
  };

  const getAccentColor = () => {
    return isDarkTheme ? "text-blue-300" : "text-blue-600";
  };

  const GetGlassContainerStyle = () => {
    if (isDarkTheme) {
      return {
        background:
          "linear-gradient(135deg, rgba(23, 46, 96, 0.2), rgba(11, 25, 55, 0.3))",
        border: "1px solid rgba(59, 130, 246, 0.3)",
        boxShadow:
          "0 16px 32px rgba(23, 46, 96, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
      };
    } else {
      return {
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(248, 250, 252, 0.7))",
        border: "1px solid rgba(59, 130, 246, 0.2)",
        boxShadow:
          "0 16px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
      };
    }
  };

  return (
    <section
      className="relative pt-20 pb-12 px-6 min-h-screen overflow-hidden transition-colors duration-500"
      style={getBackgroundStyles()}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes float-diag {
          0% { transform: translate(-20%, 20%) scale(1); opacity: 0; }
          20% { opacity: 0.35; }
          100% { transform: translate(140%, -120%) scale(1.6); opacity: 0; }
        }
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0.35; }
          80% { opacity: 0.15; }
          100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
        }
        @keyframes aurora-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes textPopUp {
          0% { 
            transform: translateY(60px) scale(0.8); 
            opacity: 0; 
          }
          60% { 
            transform: translateY(-8px) scale(1.05); 
            opacity: 0.9; 
          }
          100% { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
          }
        }
        @keyframes subtitleSlideUp {
          0% { 
            transform: translateY(40px); 
            opacity: 0; 
          }
          100% { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        @keyframes pillsFadeIn {
          0% { 
            transform: translateY(30px) scale(0.9); 
            opacity: 0; 
          }
          100% { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
          }
        }
        @keyframes buttonSlideUp {
          0% { 
            transform: translateY(50px); 
            opacity: 0; 
          }
          100% { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slideInFromLeft {
          0% { 
            transform: translateX(-100px);
            opacity: 0;
          }
          100% { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInFromRight {
          0% { 
            transform: translateX(100px);
            opacity: 0;
          }
          100% { 
            transform: translateX(0);
            opacity: 0.95;
          }
        }
        @keyframes glassShine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(300%) rotate(45deg); }
        }
        @keyframes floatingGlow {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.9; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(5px) rotate(-2deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        @keyframes particles-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(var(--tx), var(--ty)); }
        }
      `}</style>

      {/* Aurora effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          background: isDarkTheme
            ? "linear-gradient(115deg, rgba(23, 46, 96, 0.4), rgba(37, 99, 235, 0.2), rgba(29, 78, 216, 0.25))"
            : "linear-gradient(115deg, rgba(59, 130, 246, 0.15), rgba(96, 165, 250, 0.1), rgba(147, 197, 253, 0.12))",
          backgroundSize: "200% 200%",
          mixBlendMode: isDarkTheme ? "screen" : "multiply",
          animation: "aurora-pan 16s ease-in-out infinite",
        }}
      />

      {/* Floating particles for light theme */}
      {!isDarkTheme && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                background: "rgba(59, 130, 246, 0.3)",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.2,
                animation: `particles-move ${
                  Math.random() * 20 + 10
                }s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                "--tx": `${Math.random() * 100 - 50}px`,
                "--ty": `${Math.random() * 100 - 50}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Floating orbs */}
      <>
        <div
          className="absolute w-96 h-96 rounded-full z-0"
          style={{
            top: "10%",
            left: "-10%",
            background: isDarkTheme
              ? "radial-gradient(circle, rgba(23, 46, 96, 0.3) 0%, rgba(23, 46, 96, 0.1) 40%, transparent 70%)"
              : "radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, rgba(59, 130, 246, 0.15) 40%, transparent 70%)",
            filter: "blur(60px)",
            animation: isVisible
              ? "slideInFromLeft 1.5s ease-out 0.3s both, floatingGlow 8s ease-in-out infinite"
              : "none",
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full z-0"
          style={{
            bottom: "5%",
            right: "-8%",
            background: isDarkTheme
              ? "radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(23, 46, 96, 0.15) 40%, transparent 70%)"
              : "radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, rgba(59, 130, 246, 0.15) 40%, transparent 70%)",
            filter: "blur(50px)",
            animation: isVisible
              ? "slideInFromRight 1.5s ease-out 0.5s both, floatingGlow 10s ease-in-out infinite reverse"
              : "none",
          }}
        />
      </>

      {/* Glass circles */}
      <>
        <div
          className="absolute z-0"
          style={{
            width: "35rem",
            height: "35rem",
            top: "-5%",
            left: "-15%",
            animation: isVisible
              ? "slideInFromLeft 1.4s ease-out 0.4s both"
              : "none",
          }}
        >
          <div
            className="w-full h-full rounded-full relative"
            style={{
              background: isDarkTheme
                ? "linear-gradient(135deg, rgba(23, 46, 96, 0.2), rgba(11, 25, 55, 0.15))"
                : "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(29, 78, 216, 0.12))",
              border: isDarkTheme
                ? "1px solid rgba(59, 130, 246, 0.25)"
                : "1px solid rgba(37, 99, 235, 0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: isDarkTheme
                ? `0 32px 64px rgba(23, 46, 96, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 0 60px rgba(23, 46, 96, 0.2)`
                : `0 32px 64px rgba(37, 99, 235, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.6),
                    0 0 60px rgba(37, 99, 235, 0.1)`,
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "65%",
                height: "65%",
                background: isDarkTheme
                  ? "linear-gradient(135deg, rgba(11, 25, 55, 0.3), rgba(3, 11, 29, 0.5))"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(248, 250, 252, 0.5))",
                border: isDarkTheme
                  ? "1px solid rgba(59, 130, 246, 0.2)"
                  : "1px solid rgba(37, 99, 235, 0.15)",
                backdropFilter: "blur(10px)",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>

        {isDarkTheme && (
          <div
            className="absolute z-0"
            style={{
              width: "35rem",
              height: "35rem",
              bottom: "-5%",
              right: "-15%",
              animation: isVisible
                ? "slideInFromRight 1.4s ease-out 0.6s both"
                : "none",
            }}
          >
            <div
              className="w-full h-full rounded-full relative"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(23, 46, 96, 0.15))",
                border: "1px solid rgba(96, 165, 250, 0.25)",
                backdropFilter: "blur(20px)",
                boxShadow: `0 32px 64px rgba(37, 99, 235, 0.25),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1),
                    0 0 60px rgba(37, 99, 235, 0.2)`,
              }}
            >
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: "65%",
                  height: "65%",
                  background:
                    "linear-gradient(135deg, rgba(11, 25, 55, 0.3), rgba(3, 11, 29, 0.5))",
                  border: "1px solid rgba(96, 165, 250, 0.2)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              />
            </div>
          </div>
        )}
      </>

      {/* Full page spotlights - Only show in dark theme */}
      {isDarkTheme && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Left spotlight - pushed inside and starting a little from left */}
          <Spotlight
            className="absolute top-0 left-0 w-1/2 h-full opacity-100"
            fill="#1e40af"
            intensity={0.6}
            style={{
              transform: "translateX(10%)", // Pushed inside
              clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)", // Start from 20% from left
            }}
          />
          {/* Right spotlight - pushed inside and starting a little from right */}
          <Spotlight
            className="absolute top-0 right-0 w-1/2 h-full opacity-100"
            fill="#3b82f6"
            intensity={0.6}
            style={{
              transform: "translateX(-10%)", // Pushed inside
              clipPath: "polygon(0% 0%, 80% 0%, 100% 100%, 0% 100%)", // Start from 20% from right
            }}
          />
        </div>
      )}

      <div className="container mx-auto relative z-10 pt-12">
        <div className="flex flex-col lg:flex-row items-center pt-12">
          {/* Left Column - Text Content */}
          <div className="lg:w-1/2 lg:pr-10 text-center lg:text-left mb-10 lg:mb-0 mx-auto lg:mx-0 lg:pl-40 mt-[-40px]">
            <div
              className={`transform transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="relative mb-4">
                <h1
                  className={`relative z-10 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-3 leading-tight font-light tracking-tight ${getTextColor()} ${
                    textAnimationState === "popup" ? "animate-pulse" : ""
                  }`}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    animation:
                      textAnimationState === "popup"
                        ? "textPopUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards"
                        : "none",
                  }}
                >
                  <div className="block mt-4">
                    <span
                      className="bg-clip-text text-transparent relative"
                      style={{
                        backgroundImage: isDarkTheme
                          ? "linear-gradient(135deg, #3b82f6 0%, #93c5fd 20%, #dbeafe 40%, #f0f9ff 50%, #dbeafe 60%, #93c5fd 80%, #3b82f6 100%)"
                          : "linear-gradient(135deg, #1e40af 0%, #3b82f6 20%, #60a5fa 40%, #93c5fd 50%, #60a5fa 60%, #3b82f6 80%, #1e40af 100%)",
                        backgroundSize: "300% 300%",
                        animation:
                          textAnimationState === "settled"
                            ? "gradientShift 8s ease-in-out infinite"
                            : "none",
                        filter: isDarkTheme
                          ? "drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3))"
                          : "drop-shadow(0 4px 12px rgba(59, 130, 246, 0.2))",
                      }}
                    >
                      Get Your Travel
                    </span>
                  </div>
                  <div className="block">
                    <span
                      className="bg-clip-text text-transparent relative"
                      style={{
                        backgroundImage: isDarkTheme
                          ? "linear-gradient(135deg, #3b82f6 0%, #93c5fd 20%, #dbeafe 40%, #f0f9ff 50%, #dbeafe 60%, #93c5fd 80%, #3b82f6 100%)"
                          : "linear-gradient(135deg, #1e40af 0%, #3b82f6 20%, #60a5fa 40%, #93c5fd 50%, #60a5fa 60%, #3b82f6 80%, #1e40af 100%)",
                        backgroundSize: "300% 300%",
                        animation:
                          textAnimationState === "settled"
                            ? "gradientShift 8s ease-in-out infinite"
                            : "none",
                        filter: isDarkTheme
                          ? "drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3))"
                          : "drop-shadow(0 4px 12px rgba(59, 130, 246, 0.2))",
                      }}
                    >
                      Insurance with Crypto !!!
                    </span>
                  </div>
                </h1>
              </div>

              {/* Subtitle */}
              <div
                className="mb-5"
                style={{
                  animation:
                    textAnimationState === "popup"
                      ? "subtitleSlideUp 0.8s ease-out 0.3s both"
                      : "none",
                }}
              >
                <p
                  className={`text-xl lg:text-2xl max-w-3xl mx-auto lg:mx-0 leading-relaxed font-light mb-2 ${getTextColor()}`}
                >
                  Parametric protection with{" "}
                  <FlipWords
                    words={["Auto-Payouts", "Zero Claims", "Instant Coverage"]}
                    duration={2500}
                    className={`font-medium ${getAccentColor()} inline`}
                  />
                </p>
                <p className="text-lg font-light">
                  Secure, Transparent, and Truly Decentralized.
                </p>
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 mt-4"
                style={{
                  animation:
                    textAnimationState === "popup"
                      ? "buttonSlideUp 0.7s ease-out 0.8s both"
                      : "none",
                }}
              >
                {/* Primary button */}
                <Link
                  to="/products"
                  className="group relative flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-500 overflow-hidden font-medium text-white transform hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)",
                    boxShadow: `
                      0 20px 40px rgba(37, 99, 235, 0.4),
                      0 8px 16px rgba(29, 78, 216, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                    `,
                    border: "1px solid rgba(96, 165, 250, 0.4)",
                    animation: "pulse-glow 4s ease-in-out infinite",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `
                      0 25px 50px rgba(37, 99, 235, 0.5),
                      0 12px 20px rgba(29, 78, 216, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                    `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `
                      0 20px 40px rgba(37, 99, 235, 0.4),
                      0 8px 16px rgba(29, 78, 216, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                    `;
                  }}
                >
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                      animation: "shimmer 2s ease-in-out infinite",
                    }}
                  />
                  <Sparkles className="w-5 h-5 relative z-10 text-blue-100" />
                  <span className="relative z-10">Get Protected</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300 text-blue-100" />
                </Link>

                {/* Secondary glass button */}
                <Link
                  to="/dashboard"
                  className="group relative flex items-center space-x-3 px-8 py-4 rounded-xl overflow-hidden font-medium transition-all duration-500 transform hover:scale-105"
                  style={{
                    background: isDarkTheme
                      ? "linear-gradient(135deg, rgba(23, 46, 96, 0.2), rgba(11, 25, 55, 0.3))"
                      : "linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(248, 250, 252, 0.8))",
                    backdropFilter: "blur(20px)",
                    border: isDarkTheme
                      ? "1px solid rgba(59, 130, 246, 0.3)"
                      : "1px solid rgba(59, 130, 246, 0.2)",
                    boxShadow: isDarkTheme
                      ? "0 16px 32px rgba(23, 46, 96, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.05)"
                      : "0 16px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05)",
                    color: isDarkTheme ? "#dbeafe" : "#1e40af",
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty("--x", x + "px");
                    e.currentTarget.style.setProperty("--y", y + "px");
                  }}
                  onClick={(e) => {
                    const ripple = document.createElement("span");
                    ripple.className =
                      "pointer-events-none absolute left-0 top-0 h-6 w-6 rounded-full";
                    ripple.style.left = "var(--x)";
                    ripple.style.top = "var(--y)";
                    ripple.style.background = isDarkTheme
                      ? "rgba(96, 165, 250, 0.4)"
                      : "rgba(59, 130, 246, 0.2)";
                    ripple.style.animation = "ripple 700ms ease-out forwards";
                    e.currentTarget.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 720);
                  }}
                >
                  {/* Enhanced shimmer effect */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                      animation: "shimmer 1.5s ease-out infinite",
                    }}
                  />

                  <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-600">
                    Dashboard
                  </span>
                </Link>
              </div>

              {/* Footer text */}
              <p
                className={`text-sm font-light ${getSubtextColor()}`}
                style={{
                  animation:
                    textAnimationState === "popup"
                      ? "subtitleSlideUp 0.6s ease-out 1s both"
                      : "none",
                  textShadow: isDarkTheme
                    ? "0 2px 8px rgba(59, 130, 246, 0.3)"
                    : "0 2px 4px rgba(59, 130, 246, 0.1)",
                }}
              >
                Powered by BNB Chain • Multi-sig Treasury • Oracle-backed
              </p>
            </div>
          </div>

          {/* Right Column - Prop Images */}
          <div className="lg:w-1/2 relative h-[600px] lg:h-auto flex items-center justify-center mt-6 lg:mt-0 scale-110 lg:pl-4">
            {isDarkTheme ? (
              <div className="relative w-full max-w-2xl h-full">
                {/* Prop images arranged in a grid with proper spacing */}
                {/* Top Row */}
                <div
                  className="absolute w-48 top-9 left-22 z-30 rounded-xl p-4 transition-all duration-300 hover:scale-105"
                  style={{ animation: "float 6s ease-in-out infinite" }}
                >
                  <img
                    src={prop1}
                    alt="Flight Protection"
                    className="w-full h-auto rounded-lg"
                    style={{ opacity: 0.9 }}
                  />
                </div>

                <div
                  className="absolute w-40 top-12 right-30 z-20 rounded-xl p-4 transition-all duration-300 hover:scale-105"
                  style={{ animation: "float 7s ease-in-out infinite 0.5s" }}
                >
                  <img
                    src={prop2}
                    alt="Baggage Protection"
                    className="w-full h-auto rounded-lg"
                    style={{ opacity: 0.8 }}
                  />
                </div>

                {/* Middle Row */}
                <div
                  className="absolute w-52 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-40 rounded-xl p-6 transition-all duration-300 hover:scale-105"
                  style={{ animation: "float 8s ease-in-out infinite 1s" }}
                >
                  <img
                    src={prop3}
                    alt="Trip Protection"
                    className="w-full h-auto rounded-lg"
                    style={{ opacity: 1 }}
                  />
                </div>

                <div
                  className="absolute w-44 top-1/2 right-98 transform -translate-y-1/2 z-50 rounded-xl p-4 transition-all duration-300 hover:scale-105"
                  style={{ animation: "float 6.5s ease-in-out infinite 1.5s" }}
                >
                  <img
                    src={prop4}
                    alt="Medical Protection"
                    className="w-full h-auto rounded-lg"
                    style={{ opacity: 0.7 }}
                  />
                </div>

                {/* Bottom Row */}
                <div
                  className="absolute w-36 bottom-11 left-32 z-10 rounded-xl p-3 transition-all duration-300 hover:scale-105"
                  style={{ animation: "float 7.5s ease-in-out infinite 2s" }}
                >
                  <img
                    src={prop5}
                    alt="Travel Protection"
                    className="w-full h-auto rounded-lg"
                    style={{ opacity: 0.6 }}
                  />
                </div>

                <div className="absolute w-48 bottom-4 left-1/2 transform -translate-x-1/2 z-35 rounded-xl p-4 transition-all duration-300 hover:scale-105">
                  <img
                    src={prop6}
                    alt="Insurance Protection"
                    className="w-full h-auto rounded-lg"
                    style={{ opacity: 0.85 }}
                  />
                </div>

                <div className="absolute w-40 bottom-12 right-30 z-25 rounded-xl p-3 transition-all duration-300 hover:scale-105">
                  <img
                    src={prop7}
                    alt="Coverage Protection"
                    className="w-full h-auto rounded-lg"
                    style={{ opacity: 0.5 }}
                  />
                </div>

                <div className="absolute w-44 -bottom-23 right-29 z-45 rounded-xl p-4 transition-all duration-300 hover:scale-105">
                  <img
                    src={prop8}
                    alt="DeFi Protection"
                    className="w-full h-auto rounded-lg"
                    style={{ opacity: 0.75 }}
                  />
                </div>
              </div>
            ) : (
              <div className="relative w-full max-w-2xl h-full">
                <img
                  src={herolightbg}
                  alt="Hero Background"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-0"
                  style={{
                    width: "850px", // force large width
                    maxWidth: "none", // override Tailwind's default max-width
                    height: "auto",
                    opacity: 0.7,
                    pointerEvents: "none",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
