// src/pages/Home.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import HeroSection from '../components/Hero';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import Footer from '../components/Footer';

const Home = () => {
  const { isDarkTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-slate-100 text-slate-800'
    }`}>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Home;