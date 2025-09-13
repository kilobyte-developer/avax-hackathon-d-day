// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Eye, Clock, Users, Lock, CheckCircle } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import travelinsurance1 from "../assets/travelinsurance1.jpg";
import crypto1 from "../assets/crypto1.jpeg";

const About = () => {
  const { isDarkTheme } = useTheme();

  const timelineData = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Payouts",
      description: "Smart contracts automate claims processing with payouts in under 60 seconds",
      image: crypto1
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Borderless protection for travelers worldwide using crypto payments",
      image: travelinsurance1
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure & Transparent",
      description: "All policies and transactions recorded on-chain for complete transparency",
      image: crypto1
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Powered",
      description: "DAO-governed platform with fair risk distribution and community voting",
      image: travelinsurance1
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={`pt-32 pb-20 px-6 ${isDarkTheme
      ? 'bg-gradient-to-br from-[#030B1D] via-[#172e60] to-[#030B1D]'
      : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className={`text-4xl lg:text-5xl font-light mb-6 ${isDarkTheme
            ? 'text-white'
            : 'text-slate-800'}`}>
            The Future of Travel Insurance is Here
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkTheme
            ? 'text-blue-200'
            : 'text-blue-600'}`}>
            Built on blockchain technology, InsureX redefines what travel protection should be
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${isDarkTheme
            ? 'bg-blue-800/40'
            : 'bg-blue-400/30'}`}></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative mb-16 flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={
                    `hidden lg:block absolute left-1/2 z-10 transform -translate-x-1/2 `
                    + `w-6 h-6 rounded-full border-4 `
                    + `${isDarkTheme ? 'bg-blue-700 border-[#030B1D]' : 'bg-blue-500 border-white'}` 
                  }
                  style={{
                    top: "50%",
                    marginTop: "-12px"
                  }}
                />
                {/* For mobile, place dot using flex below line */}
                <div className={
                  `block lg:hidden mx-auto mb-4 w-6 h-6 rounded-full border-4 `
                  + `${isDarkTheme ? 'bg-blue-700 border-[#030B1D]' : 'bg-blue-500 border-white'}`
                }/>
                {/* Content */}
                <motion.div 
                  className={`lg:w-1/2 ${index % 2 === 0
                    ? 'lg:pr-12 lg:pl-16'
                    : 'lg:pl-12 lg:pr-16'
                    } mb-8 lg:mb-0`}
                  variants={index % 2 === 0 ? slideInFromRight : slideInFromLeft}
                >
                  <div className={`rounded-2xl p-8 border backdrop-blur-sm ${
                    isDarkTheme
                      ? 'bg-[#172e60]/60 border-blue-900/60 shadow-2xl'
                      : 'bg-white/70 border-blue-200/50 shadow-lg'
                  }`}>
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        isDarkTheme ? 'bg-blue-700/80' : 'bg-blue-500'
                      }`}>
                        {item.icon}
                      </div>
                      <h3 className={`text-2xl font-semibold ${
                        isDarkTheme ? 'text-white' : 'text-slate-800'
                      }`}>{item.title}</h3>
                    </div>
                    <p className={`leading-relaxed ${
                      isDarkTheme ? 'text-blue-200' : 'text-blue-600'
                    }`}>{item.description}</p>
                    <div className="flex items-center mt-4">
                      <CheckCircle className={`w-5 h-5 mr-2 ${
                        isDarkTheme ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <span className={`text-sm ${
                        isDarkTheme ? 'text-green-300' : 'text-green-600'
                      }`}>Active & Live</span>
                    </div>
                  </div>
                </motion.div>
                {/* Image */}
                <motion.div 
                  className="lg:w-1/2 flex justify-center items-center relative"
                  variants={index % 2 === 0 ? slideInFromLeft : slideInFromRight}
                >
                  <div className="relative group">
                    <div className={`absolute -inset-2 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 ${
                      isDarkTheme ? 'bg-blue-700/25' : 'bg-blue-400/20'
                    }`}></div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300 max-w-md w-full h-56 object-cover"
                      style={{ opacity: 0.9 }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { value: "99.9%", label: "Uptime", icon: <Shield className="w-8 h-8" /> },
            { value: "60s", label: "Payout Speed", icon: <Clock className="w-8 h-8" /> },
            { value: "150+", label: "Countries", icon: <Globe className="w-8 h-8" /> },
            { value: "$0", label: "Paperwork", icon: <Eye className="w-8 h-8" /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className={`text-center p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-[#172e60]/50 border-blue-900/40 hover:border-blue-400/60'
                  : 'bg-white/60 border-blue-200/30 hover:border-blue-400/50'
              }`}
            >
              <div className={`mb-4 mx-auto w-max ${
                isDarkTheme ? 'text-blue-300' : 'text-blue-500'
              }`}>{stat.icon}</div>
              <div className={`text-3xl font-bold mb-2 ${
                isDarkTheme ? 'text-white' : 'text-slate-800'
              }`}>{stat.value}</div>
              <div className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;