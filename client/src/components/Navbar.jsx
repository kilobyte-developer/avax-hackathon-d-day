// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { title: "About", href: "/about" },
  { title: "Package", href: "/package" },
  { title: "Partnership", href: "/partnership" },
  { title: "Why InsureX", href: "/whyinsurex" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isDarkTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // Refs for animations
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const themeButtonRef = useRef(null);
  const loginButtonRef = useRef(null);
  const desktopLinksRef = useRef([]);
  const glassOverlayRef = useRef(null);

  // Function to handle logo click
  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced theme-based styles with premium glass effects
  const getNavbarStyles = () => {
    if (isDarkTheme) {
      return {
        background: scrolled 
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.35) 0%, rgba(30, 41, 59, 0.4) 50%, rgba(51, 65, 85, 0.45) 100%)'
          : 'linear-gradient(135deg, rgba(15, 23, 42, 0.25) 0%, rgba(30, 41, 59, 0.3) 50%, rgba(51, 65, 85, 0.35) 100%)',
        backdropFilter: scrolled ? 'blur(25px) saturate(200%) brightness(1.1)' : 'blur(20px) saturate(180%) brightness(1.05)',
        border: scrolled ? '1px solid rgba(148, 163, 184, 0.25)' : '1px solid rgba(148, 163, 184, 0.2)',
        boxShadow: scrolled 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 8px 32px -8px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
          : '0 15px 35px -8px rgba(0, 0, 0, 0.25), 0 4px 20px -4px rgba(59, 130, 246, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(255, 255, 255, 0.03)'
      };
    } else {
      return {
        background: scrolled 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(248, 250, 252, 0.65) 50%, rgba(241, 245, 249, 0.7) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(248, 250, 252, 0.55) 50%, rgba(241, 245, 249, 0.6) 100%)',
        backdropFilter: scrolled ? 'blur(25px) saturate(200%) brightness(1.05)' : 'blur(20px) saturate(180%) brightness(1.02)',
        border: scrolled ? '1px solid rgba(71, 85, 105, 0.15)' : '1px solid rgba(71, 85, 105, 0.12)',
        boxShadow: scrolled 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 8px 32px -8px rgba(59, 130, 246, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(255, 255, 255, 0.6)'
          : '0 15px 35px -8px rgba(0, 0, 0, 0.1), 0 4px 20px -4px rgba(59, 130, 246, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 -1px 0 rgba(255, 255, 255, 0.5)'
      };
    }
  };

  // Handle navigation
  const handleNavLinkClick = (href) => {
    navigate(href);
  };

  // Handle login navigation
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="fixed top-3 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-4xl px-4">
      <nav 
        ref={navbarRef}
        className="relative flex items-center justify-between px-6 py-3 rounded-xl transition-all duration-500 overflow-hidden animate-fadeInDown"
        style={getNavbarStyles()}
      >
        {/* Enhanced glass shine overlay with more intensity */}
        <div 
          ref={glassOverlayRef}
          className={`absolute top-0 left-0 w-1/3 h-full transform -skew-x-12 -translate-x-full animate-shine ${
            isDarkTheme 
              ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-blue-200/40 to-transparent'
          }`}
        />
        
        {/* Enhanced multi-layered glass effect */}
        <div className={`absolute inset-0 rounded-xl ${
          isDarkTheme 
            ? 'bg-gradient-to-br from-blue-500/8 via-transparent to-indigo-500/12'
            : 'bg-gradient-to-br from-blue-100/30 via-transparent to-indigo-100/35'
        }`} />
        
        {/* Premium animated border gradient */}
        <div className={`absolute inset-0 rounded-xl p-[0.5px] opacity-40 ${
          isDarkTheme 
            ? 'bg-gradient-to-r from-blue-500/15 via-indigo-400/25 to-blue-500/15'
            : 'bg-gradient-to-r from-blue-300/25 via-indigo-200/35 to-blue-300/25'
        }`}>
          <div className="w-full h-full rounded-xl" style={{ background: 'transparent' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between w-full">
          {/* Logo with enhanced styling */}
          <div ref={logoRef} className="flex items-center animate-slideInLeft">
            <button 
              className="flex items-center space-x-2 whitespace-nowrap hover:scale-105 transition-transform duration-300 bg-transparent border-none cursor-pointer"
              onClick={handleLogoClick}
            >
              <span className={`text-xl font-bold whitespace-nowrap transition-colors duration-300 ${
                isDarkTheme 
                  ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent' 
                  : 'bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent'
              }`}>
                InsureX
              </span>
            </button>
          </div>

          {/* Navigation Links - Enhanced contrast */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link, index) => (
              <div
                key={link.title}
                ref={el => desktopLinksRef.current[index] = el}
                className="relative animate-slideInUp"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <button
                  onClick={() => handleNavLinkClick(link.href)}
                  className={`relative text-sm font-medium transition-all duration-300 px-3 py-1.5 rounded-lg block whitespace-nowrap hover:transform hover:-translate-y-0.5 bg-transparent border-none cursor-pointer ${
                    isDarkTheme 
                      ? 'text-blue-200 hover:text-white hover:bg-blue-800/20 hover:backdrop-blur-sm hover:shadow-lg' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-blue-50/40 hover:backdrop-blur-sm hover:shadow-lg'
                  }`}
                >
                  {link.title}
                </button>
              </div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Premium Theme Toggle Button */}
            <div className="animate-slideInRight" style={{ animationDelay: '1.2s' }}>
              <button
                ref={themeButtonRef}
                onClick={toggleTheme}
                className="p-2 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: isDarkTheme 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.18) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(248, 250, 252, 0.8) 100%)',
                  backdropFilter: 'blur(25px) saturate(200%)',
                  border: isDarkTheme 
                    ? '1px solid rgba(148, 163, 184, 0.25)'
                    : '1px solid rgba(71, 85, 105, 0.15)',
                  boxShadow: isDarkTheme
                    ? '0 4px 20px -4px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    : '0 4px 20px -4px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
                }}
              >
                {isDarkTheme ? (
                  <Sun size={16} className="text-blue-300 transition-transform duration-300 hover:rotate-180" />
                ) : (
                  <Moon size={16} className="text-slate-700 transition-transform duration-300 hover:rotate-12" />
                )}
              </button>
            </div>

            {/* Premium Login Button with enhanced styling */}
            <div className="animate-slideInRight" style={{ animationDelay: '1.4s' }}>
              <button
                ref={loginButtonRef}
                onClick={handleLogin}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-xl relative overflow-hidden group"
                style={{
                  background: isDarkTheme 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.35) 50%, rgba(29, 78, 216, 0.3) 100%)'
                    : 'linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(59, 130, 246, 0.95) 50%, rgba(29, 78, 216, 0.92) 100%)',
                  backdropFilter: 'blur(30px) saturate(200%)',
                  borderColor: isDarkTheme 
                    ? 'rgba(96, 165, 250, 0.4)'
                    : 'rgba(37, 99, 235, 0.7)',
                  color: isDarkTheme ? 'rgba(255, 255, 255, 0.95)' : 'white',
                  boxShadow: isDarkTheme
                    ? '0 8px 32px -8px rgba(59, 130, 246, 0.3), 0 4px 16px -4px rgba(37, 99, 235, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                    : '0 8px 32px -8px rgba(37, 99, 235, 0.4), 0 4px 16px -4px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                
                <LogIn size={14} className="relative z-10" />
                <span className="relative z-10 font-semibold">Login</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-25px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(25px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(300%) skewX(-12deg);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out forwards;
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-slideInUp {
          animation: slideInUp 0.7s ease-out forwards;
          opacity: 0;
        }

        .animate-shine {
          animation: shine 3s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Navbar;