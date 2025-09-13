// src/components/B2BSolutions.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Handshake, Code, Wallet, TrendingUp, Users, Shield, ArrowRight, Check, Globe, BarChart3, Zap, Settings } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import globalcoverage from "../assets/globalcoverage.jpeg";
import metamask1 from "../assets/metamask1.jpeg";

const B2BSolutions = () => {
  const { isDarkTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("integration");

  const tabs = {
    integration: {
      icon: <Code className="w-6 h-6" />,
      title: "Seamless Integration",
      content: "Our API-first approach makes integration effortless with comprehensive documentation and dedicated support"
    },
    revenue: {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Revenue Sharing",
      content: "Earn competitive commissions on every policy sold through your platform with transparent reporting"
    },
    support: {
      icon: <Users className="w-6 h-6" />,
      title: "Dedicated Support",
      content: "24/7 technical support and account management to ensure smooth operations and maximum conversion"
    }
  };

  const solutions = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Travel Agencies",
      description: "Offer insurance directly within your booking flow"
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Crypto Wallets",
      description: "Integrate travel protection for your users"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "DeFi Platforms",
      description: "Add insurance products to your ecosystem"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Travel Tech",
      description: "Enhance your app with parametric insurance"
    }
  ];

  const benefits = [
    "No upfront costs or integration fees",
    "White-label solutions available",
    "Multi-language support",
    "Real-time analytics dashboard",
    "Competitive commission structure",
    "Dedicated account manager"
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
      : 'bg-gradient-to-br from-blue-50 to-white'}`}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-light mb-6 ${
            isDarkTheme ? 'text-white' : 'text-slate-800'
          }`}>
            B2B Solutions
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkTheme ? 'text-blue-200' : 'text-blue-600'
          }`}>
            Partner with us to offer cutting-edge travel insurance solutions to your customers
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          {/* Left Content - Interactive Tabs */}
          <motion.div variants={slideInFromLeft} className="space-y-8">
            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-8">
              {Object.entries(tabs).map(([key, tab]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === key
                      ? isDarkTheme
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-blue-500 text-white shadow-lg"
                      : isDarkTheme
                        ? "bg-[#172e60]/70 text-blue-300 hover:bg-[#172e60]/90"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {tab.icon}
                    <span>{tab.title}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl p-8 border backdrop-blur-sm ${
                isDarkTheme
                  ? 'bg-[#172e60]/60 border-blue-900/60 shadow-2xl'
                  : 'bg-white/70 border-blue-200/50'
              }`}
            >
              <h3 className={`text-2xl font-semibold mb-4 ${
                isDarkTheme ? 'text-white' : 'text-slate-800'
              }`}>
                {tabs[activeTab].title}
              </h3>
              <p className={`leading-relaxed ${
                isDarkTheme ? 'text-blue-200' : 'text-blue-600'
              }`}>
                {tabs[activeTab].content}
              </p>
            </motion.div>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className={`flex items-center p-4 rounded-xl border ${
                    isDarkTheme
                      ? 'bg-[#172e60]/30 border-blue-900/30'
                      : 'bg-blue-50 border-blue-200/30'
                  }`}
                >
                  <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${
                    isDarkTheme ? 'text-green-400' : 'text-green-500'
                  }`} />
                  <span className={`text-sm ${
                    isDarkTheme ? 'text-blue-200' : 'text-blue-600'
                  }`}>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Solutions Grid */}
          <motion.div variants={slideInFromRight} className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`rounded-2xl p-6 border backdrop-blur-sm ${
                  isDarkTheme
                    ? 'bg-[#172e60]/40 border-blue-900/40'
                    : 'bg-white/70 border-blue-200/30'
                }`}
              >
                <div className={`mb-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`}>
                  {solution.icon}
                </div>
                <h4 className={`text-xl font-semibold mb-3 ${
                  isDarkTheme ? 'text-white' : 'text-slate-800'
                }`}>{solution.title}</h4>
                <p className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Integration Process */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`rounded-2xl p-12 ${
            isDarkTheme
              ? 'bg-[#172e60]/40 border border-blue-900/40'
              : 'bg-blue-50 border border-blue-200/50'
          } mb-16`}
        >
          <h3 className={`text-3xl font-semibold mb-12 text-center ${
            isDarkTheme ? 'text-white' : 'text-slate-800'
          }`}>Simple Integration Process</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "API Access",
                description: "Get your API keys and documentation",
                icon: <Settings className="w-8 h-8" />
              },
              {
                step: "2",
                title: "Integration",
                description: "Implement our API into your platform",
                icon: <Code className="w-8 h-8" />
              },
              {
                step: "3",
                title: "Testing",
                description: "Test in our sandbox environment",
                icon: <Shield className="w-8 h-8" />
              },
              {
                step: "4",
                title: "Go Live",
                description: "Launch to your customers",
                icon: <Zap className="w-8 h-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`text-center p-6 rounded-2xl ${
                  isDarkTheme
                    ? 'bg-[#172e60]/60 border border-blue-900/40'
                    : 'bg-white border border-blue-200/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  isDarkTheme ? 'bg-blue-700/40' : 'bg-blue-500/20'
                }`}>
                  <div className={isDarkTheme ? 'text-blue-300' : 'text-blue-500'}>
                    {step.icon}
                  </div>
                </div>
                <div className={`text-2xl font-bold mb-2 ${
                  isDarkTheme ? 'text-blue-400' : 'text-blue-600'
                }`}>Step {step.step}</div>
                <h4 className={`text-xl font-semibold mb-3 ${
                  isDarkTheme ? 'text-white' : 'text-slate-800'
                }`}>{step.title}</h4>
                <p className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`rounded-2xl p-12 text-center relative overflow-hidden ${
            isDarkTheme
              ? 'bg-gradient-to-r from-blue-700 to-blue-800'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}
        >
          <div className="relative z-10">
            <h3 className={`text-3xl font-semibold mb-6 ${
              isDarkTheme ? 'text-white' : 'text-white'
            }`}>
              Ready to Partner With Us?
            </h3>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${
              isDarkTheme ? 'text-blue-100' : 'text-blue-100'
            }`}>
              Join hundreds of partners already benefiting from our decentralized insurance platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center space-x-2">
                <span>Request Demo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className={`px-8 py-4 border-2 rounded-xl font-semibold transition-colors ${
                isDarkTheme
                  ? 'border-white text-white hover:bg-white/10'
                  : 'border-white text-white hover:bg-white/20'
              }`}>
                View API Documentation
              </button>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default B2BSolutions;