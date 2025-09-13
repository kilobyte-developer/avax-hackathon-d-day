// src/pages/WhyInsureX.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Shield, Zap, Globe, Lock, BarChart } from "lucide-react";
import passport1 from "../assets/passportsecurity1.jpeg";
import stablecoin1 from "../assets/stablecoin1.jpeg";
import passport2 from "../assets/passportsecurity2.jpeg";
import { useTheme } from '../context/ThemeContext';

const WhyInsureX = () => {
  const [activeComparison, setActiveComparison] = useState("speed");
  const { isDarkTheme } = useTheme();

  const comparisons = {
    speed: {
      title: "Claim Processing Speed",
      traditional: "3-6 weeks",
      insurex: "Under 60 seconds",
      icon: <Zap className="w-6 h-6" />
    },
    cost: {
      title: "Premium Costs",
      traditional: "30-50% higher",
      insurex: "70% lower on average",
      icon: <BarChart className="w-6 h-6" />
    },
    transparency: {
      title: "Policy Transparency",
      traditional: "Hidden clauses",
      insurex: "Fully on-chain",
      icon: <Shield className="w-6 h-6" />
    },
    access: {
      title: "Global Access",
      traditional: "Geographic restrictions",
      insurex: "Borderless coverage",
      icon: <Globe className="w-6 h-6" />
    }
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Payouts",
      description: "Parametric triggers ensure instant payouts without manual claims processing"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Truly Global",
      description: "Serve customers worldwide without banking restrictions or geographic limitations"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Bulletproof Security",
      description: "Multi-sig treasuries and audited smart contracts protect user funds"
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Better Economics",
      description: "Remove intermediaries to offer better rates and higher returns for liquidity providers"
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
      ? 'bg-gradient-to-br from-[#030B1D] to-[#030B1D]'
      : 'bg-gradient-to-br from-blue-50 via-white to-slate-100'
    }`}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-light mb-6 ${
            isDarkTheme
              ? 'text-white'
              : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent'
          }`}>
            Why Choose InsureX?
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkTheme ? 'text-blue-200' : 'text-blue-600'
          }`}>
            The next generation of travel insurance built on decentralized technology
          </p>
        </motion.div>

        {/* Comparison Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-semibold mb-4 ${
              isDarkTheme ? 'text-white' : 'text-slate-800'
            }`}>
              Traditional vs. InsureX
            </h3>
            <p className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
              See how we're revolutionizing travel insurance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Comparison Selector */}
            <div className="space-y-4">
              {Object.entries(comparisons).map(([key, comparison]) => (
                <motion.button
                  key={key}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveComparison(key)}
                  className={`w-full p-6 rounded-2xl text-left transition-all duration-300 ${
                    activeComparison === key
                      ? isDarkTheme
                        ? "bg-blue-600/20 border-2 border-blue-500/50"
                        : "bg-blue-100/60 border-2 border-blue-400/50"
                      : isDarkTheme
                        ? "bg-[#172e60]/50 border border-[#172e60]/70 hover:border-blue-400/30"
                        : "bg-white/70 border border-slate-200/50 hover:border-blue-300/50"
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg ${
                      activeComparison === key
                        ? isDarkTheme ? "bg-blue-500" : "bg-blue-400"
                        : isDarkTheme ? "bg-slate-700" : "bg-slate-200"
                    }`}>
                      {comparison.icon}
                    </div>
                    <h4 className={`text-lg font-semibold ml-3 ${
                      isDarkTheme ? 'text-white' : 'text-slate-800'
                    }`}>
                      {comparison.title}
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className={`text-sm mb-1 ${
                        isDarkTheme ? 'text-red-400' : 'text-red-600'
                      }`}>Traditional</div>
                      <div className={isDarkTheme ? 'text-red-300 font-semibold' : 'text-red-500 font-semibold'}>
                        {comparison.traditional}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm mb-1 ${
                        isDarkTheme ? 'text-green-400' : 'text-green-600'
                      }`}>InsureX</div>
                      <div className={isDarkTheme ? 'text-green-300 font-semibold' : 'text-green-500 font-semibold'}>
                        {comparison.insurex}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Visual Comparison */}
            <motion.div
              key={activeComparison}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative h-[600px] rounded-2xl overflow-hidden ${
                isDarkTheme
                  ? 'bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm'
                  : 'bg-gradient-to-br from-blue-100/40 to-blue-200/40 backdrop-blur-sm'
              }`}
            >
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-center mb-8">
                    <div className={`mb-2 ${
                      isDarkTheme ? 'text-blue-400' : 'text-blue-500'
                    }`}>
                      {comparisons[activeComparison].icon}
                    </div>
                    <h3 className={`text-2xl font-semibold mb-2 ${
                      isDarkTheme ? 'text-white' : 'text-slate-800'
                    }`}>
                      {comparisons[activeComparison].title}
                    </h3>
                    <p className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                      {activeComparison === 'speed' && "No more waiting weeks for claim approvals"}
                      {activeComparison === 'cost' && "Direct risk pooling eliminates intermediary costs"}
                      {activeComparison === 'transparency' && "Every policy term visible and verifiable on-chain"}
                      {activeComparison === 'access' && "Serve the unbanked and underbanked globally"}
                    </p>
                  </div>

                  <div className="flex justify-around items-center mb-8">
                    <div className="text-center">
                      <X className={`w-12 h-12 mx-auto mb-2 ${
                        isDarkTheme ? 'text-red-400' : 'text-red-500'
                      }`} />
                      <span className={isDarkTheme ? 'text-red-300' : 'text-red-600'}>Traditional</span>
                    </div>
                    <div className="text-center">
                      <Check className={`w-12 h-12 mx-auto mb-2 ${
                        isDarkTheme ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <span className={isDarkTheme ? 'text-green-300' : 'text-green-600'}>InsureX</span>
                    </div>
                  </div>
                </div>

                {/* New content block */}
                <div className={isDarkTheme ? 'text-blue-200 text-sm leading-relaxed' : 'text-blue-600 text-sm leading-relaxed'}>
                  <p>
                    InsureX leverages cutting-edge blockchain technology to streamline the entire insurance process, 
                    providing users with transparency, faster claims, and reduced costs. Our parametric insurance models 
                    eliminate traditional bottlenecks and manual errors, ensuring swift payouts.
                  </p>
                  <p className="mt-4">
                    By removing intermediaries and using on-chain policy verification, InsureX offers a fair, borderless, 
                    and accessible insurance platform that adapts to the needs of modern travelers worldwide.
                  </p>
                  <p className="mt-4">
                    We're continuously innovating to expand coverage options and enhance user experience, making travel insurance smarter and more reliable.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature Showcase */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-12 items-start mb-20"
        >
          {/* Left Content */}
          <motion.div variants={slideInFromLeft} className="space-y-8 h-full">
            <div>
              <h3 className={`text-3xl font-semibold mb-6 ${
                isDarkTheme ? 'text-white' : 'text-slate-800'
              }`}>
                Built for the Digital Age
              </h3>
              <p className={`leading-relaxed mb-8 ${
                isDarkTheme ? 'text-blue-200' : 'text-blue-600'
              }`}>
                InsureX leverages blockchain technology to create a seamless, transparent, 
                and instant insurance experience that traditional providers simply can't match.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 ${
                    isDarkTheme
                      ? 'bg-[#172E60]/30 border-blue-500/30 hover:border-blue-400/30'
                      : 'bg-white/70 border-blue-400/20 hover:border-blue-300/40'
                  }`}
                >
                  <div className={`mb-4 ${
                    isDarkTheme ? 'text-blue-400' : 'text-blue-500'
                  }`}>{feature.icon}</div>
                  <h4 className={`text-xl font-semibold mb-3 ${
                    isDarkTheme ? 'text-white' : 'text-slate-800'
                  }`}>{feature.title}</h4>
                  <p className={isDarkTheme ? 'text-blue-200 text-sm' : 'text-blue-600 text-sm'}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Images and Card Section */}
          <motion.div
            variants={slideInFromRight}
            className="relative h-[480px] flex flex-col justify-between"
          >
            {/* Large image top - height intact */}
            <motion.div 
              initial={{ opacity: 0, y: -100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.5 }}
              className="rounded-xl shadow-2xl overflow-hidden w-full h-[60%] mt-8 mb-8"
            >
              <img
                src={passport1}
                alt="Global travel coverage"
                className="w-full h-full object-cover rounded-xl"
                style={{ opacity: 0.9 }}
              />
            </motion.div>
            {/* Two smaller side by side images bottom - height increased and gap increased */}
            <div className="flex gap-8 h-[32%]">
              <motion.div 
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className="flex-1 rounded-xl shadow-xl overflow-hidden"
              >
                <img
                  src={stablecoin1}
                  alt="Stablecoin payments"
                  className="w-full h-full object-cover rounded-xl"
                  style={{ opacity: 0.8 }}
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="flex-1 rounded-xl shadow-xl overflow-hidden"
              >
                <img
                  src={passport2}
                  alt="Borderless access"
                  className="w-full h-full object-cover rounded-xl"
                  style={{ opacity: 0.7 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyInsureX;