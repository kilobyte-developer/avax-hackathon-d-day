// src/components/home/FeaturesSection.js
import React, { useState, useEffect } from 'react';
import { Zap, Shield, Clock, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import mprop1 from "../assets/mprop1.png";
import mprop2 from "../assets/mprop2.png";
import mprop3 from "../assets/mprop3.png";
import mprop4 from "../assets/mprop4.png";
import mobile from "../assets/mobile.png";
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children, direction = "left", delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getTransform = () => {
    switch (direction) {
      case "left": return "translateX(-100px)";
      case "right": return "translateX(100px)";
      case "up": return "translateY(100px)";
      case "down": return "translateY(-100px)";
      default: return "translateX(-100px)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0, 0)" : getTransform(),
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const FeaturesSection = () => {
  const [stats, setStats] = useState({ policies: 0, payouts: 0, uptime: 0, customers: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  const { isDarkTheme } = useTheme();

  // Intersection Observer hook for viewport detection
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Claim Settlements',
      description: 'Smart contracts automate payouts without human intervention',
      benefits: ['Flight delay protection', 'Weather event coverage', 'Automatic verification']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Built-in Transparency',
      description: 'Policy terms and execution are verifiable on-chain',
      benefits: ['No hidden clauses', 'Immutable records', 'Community governance']
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Borderless Coverage',
      description: 'Crypto and stablecoin payments remove banking dependencies',
      benefits: ['Global accessibility', 'No geographical restrictions', 'Stablecoin support']
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Lower Costs & Higher Efficiency',
      description: 'Eliminate middlemen, reducing overhead and premiums',
      benefits: ['Reduced premiums', 'Direct risk pooling', 'Fair distribution']
    }
  ];

  // Animate stats only when inView
  useEffect(() => {
    if (!inView) return;

    let step = 0;
    const duration = 2000;
    const steps = 60;

    const targets = { policies: 12489, payouts: 2400, uptime: 99.9, customers: 89400 };

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setStats({
        policies: Math.floor(targets.policies * easeOutQuart),
        payouts: Math.floor(targets.payouts * easeOutQuart),
        uptime: Math.min(targets.uptime, targets.uptime * easeOutQuart),
        customers: Math.floor(targets.customers * easeOutQuart)
      });

      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView]);

  // Auto-rotate features when inView
  useEffect(() => {
    if (!inView) return;

    const featureTimer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(featureTimer);
  }, [inView, features.length]);

  return (
    <section
      ref={ref}
      className={`relative py-20 px-6 overflow-hidden ${
        isDarkTheme
          ? 'bg-gradient-to-b from-[#030B1D] to-[#030B1D]'
          : 'bg-gradient-to-b from-blue-50 via-white to-slate-100'
      }`}
      aria-label="Features Section"
    >
      {/* Background Elements */}
      <div
        className={`absolute inset-0 ${
          isDarkTheme
            ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg6MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=")] opacity-10'
            : 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg6MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA5NiwwYTI4LDI4IDAgMSwxIC05NiwwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4xIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjAzIi8+PC9zdmc+")] opacity-5'
        }`}
      />
      <div
        className={`absolute top-1/4 -left-40 w-80 h-80 rounded-full blur-3xl ${
          isDarkTheme ? 'bg-blue-500 opacity-10' : 'bg-blue-300 opacity-5'
        }`}
      />
      <div
        className={`absolute bottom-0 -right-40 w-80 h-80 rounded-full blur-3xl ${
          isDarkTheme ? 'bg-blue-600 opacity-10' : 'bg-blue-400 opacity-5'
        }`}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <AnimatedSection direction="down" className="text-center mb-16">
          <h2
            className={`text-4xl pb-2 md:text-5xl font-light mb-6 ${
              isDarkTheme
                ? 'bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent'
            }`}
          >
            Revolutionizing Travel Insurance with DeFi
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkTheme ? 'text-blue-300' : 'text-blue-600'}`}>
            Experience instant payouts, transparent policies, and borderless coverage powered by blockchain technology
          </p>
        </AnimatedSection>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: stats.policies.toLocaleString(), label: 'Active Policies', suffix: '+' },
            { value: `$${stats.payouts.toLocaleString()}k`, label: 'Total Payouts' },
            { value: `${stats.uptime.toFixed(1)}%`, label: 'Platform Uptime' },
            { value: stats.customers.toLocaleString(), label: 'Happy Customers', suffix: '+' }
          ].map((stat, index) => (
            <AnimatedSection
              key={index}
              direction="up"
              delay={index * 100}
              className={`rounded-2xl p-6 text-center border backdrop-blur-sm transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-[#172E60]/30 border-blue-500/30 hover:border-blue-400/30 text-white'
                  : 'bg-white/70 border-blue-400/20 hover:border-blue-300/40 text-slate-800'
              }`}
              aria-label={`${stat.label}: ${stat.value}${stat.suffix || ''}`}
            >
              <div className="text-3xl md:text-4xl font-medium mb-2">
                {stat.value}
                {stat.suffix || ''}
              </div>
              <div className={isDarkTheme ? 'text-blue-300' : 'text-blue-600'}>{stat.label}</div>
            </AnimatedSection>
          ))}
        </div>

        {/* Main Content - Mobile + Features */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Left Side - Mobile Visualization */}
          <AnimatedSection direction="left" className="relative lg:w-1/2 flex justify-center">
            <div className="relative w-80" aria-label="Mobile app visualization">
              <img src={mobile} alt="DeFi Travel Insurance App" className="relative z-10 w-full" />

              {/* Floating Feature Props */}
              <img
                src={mprop1}
                alt="Instant Payouts"
                className="absolute -top-8 -right-8 w-24 h-24 z-20 animate-float"
                style={{ animationDelay: '0s' }}
                aria-hidden="true"
              />
              <img
                src={mprop2}
                alt="Global Coverage"
                className="absolute -bottom-6 -left-6 w-20 h-20 z-20 animate-float"
                style={{ animationDelay: '1s' }}
                aria-hidden="true"
              />
              <img
                src={mprop3}
                alt="Secure Transactions"
                className="absolute top-1/3 -left-10 w-16 h-16 z-20 animate-float"
                style={{ animationDelay: '2s' }}
                aria-hidden="true"
              />
              <img
                src={mprop4}
                alt="Transparent Policies"
                className="absolute bottom-1/4 -right-10 w-18 h-18 z-20 animate-float"
                style={{ animationDelay: '3s' }}
                aria-hidden="true"
              />
            </div>
          </AnimatedSection>

          {/* Right Side - Feature Content */}
          <AnimatedSection direction="right" delay={200} className="lg:w-1/2" aria-live="polite">
            <h3 className={`text-3xl font-medium mb-6 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
              {features[activeFeature].title}
            </h3>
            <p className={`text-lg mb-6 ${isDarkTheme ? 'text-blue-300' : 'text-blue-600'}`}>
              {features[activeFeature].description}
            </p>

            <div className="space-y-4 mb-8">
              {features[activeFeature].benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle
                    className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${
                      isDarkTheme ? 'text-blue-400' : 'text-blue-500'
                    }`}
                    aria-hidden="true"
                  />
                  <span className={isDarkTheme ? 'text-blue-300' : 'text-blue-600'}>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Feature Navigation Dots */}
            <div className="flex space-x-3 mb-8" role="tablist" aria-label="Feature selection">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeFeature
                      ? isDarkTheme
                        ? 'bg-blue-400 scale-110'
                        : 'bg-blue-500 scale-110'
                      : isDarkTheme
                      ? 'bg-blue-700'
                      : 'bg-blue-300'
                  }`}
                  aria-selected={index === activeFeature}
                  aria-label={`View feature ${index + 1}`}
                  role="tab"
                  tabIndex={index === activeFeature ? 0 : -1}
                />
              ))}
            </div>

            <button
              className={`group flex items-center px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 shadow-lg ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-blue-500/20'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-600/20'
              }`}
              aria-label="Explore coverage options"
            >
              Explore Coverage Options
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </AnimatedSection>
        </div>

        {/* USP Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: <Zap className="w-5 h-5" />,
              title: 'Parametric, Instant Payouts',
              content:
                'Smart contracts automatically trigger payouts based on predefined conditions using oracle data—no paperwork or waiting.'
            },
            {
              icon: <Globe className="w-5 h-5" />,
              title: 'Global-First Coverage',
              content:
                'No restrictions by nationality or residence. Any traveler with a crypto wallet can access coverage instantly.'
            }
          ].map((item, index) => (
            <AnimatedSection
              key={index}
              direction="up"
              delay={index * 200}
              className={`rounded-2xl p-6 border backdrop-blur-sm ${
                isDarkTheme ? 'bg-[#172E60]/20 border-blue-500/30' : 'bg-white/70 border-blue-400/20'
              }`}
              aria-label={item.title}
              tabIndex={0}
            >
              <h4 className={`text-xl font-medium mb-4 flex items-center ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                <span className={`mr-2 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`}>{item.icon}</span>
                {item.title}
              </h4>
              <p className={isDarkTheme ? 'text-blue-300' : 'text-blue-600'}>{item.content}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Add custom animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;