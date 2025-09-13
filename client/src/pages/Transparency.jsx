// src/components/Transparency.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Shield, Lock, CheckCircle, FileText, BarChart3, ExternalLink, ArrowRight, Users, Clock, Zap } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import crypto1 from "../assets/crypto1.jpeg";
import travelinsurance1 from "../assets/travelinsurance1.jpg";

const Transparency = () => {
  const { isDarkTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("onchain");

  const tabs = {
    onchain: {
      icon: <Shield className="w-6 h-6" />,
      title: "On-Chain Policies",
      content: "All policy terms and conditions are stored immutably on the blockchain"
    },
    audits: {
      icon: <Lock className="w-6 h-6" />,
      title: "Security Audits",
      content: "Regular third-party audits ensure the security of our smart contracts"
    },
    governance: {
      icon: <Users className="w-6 h-6" />,
      title: "DAO Governance",
      content: "Community voting on key parameters and claim disputes"
    }
  };

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Immutable Policy Terms",
      description: "Policy rules are hashed and stored on-chain, preventing any changes after purchase"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description: "Track pool utilization, claims history, and protocol performance in real-time"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Public Verifiability",
      description: "Anyone can verify policy terms, claims, and payouts on the blockchain"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Automated Execution",
      description: "Smart contracts execute claims automatically based on predefined conditions"
    }
  ];

  const stats = [
    { value: "100%", label: "On-Chain Policies" },
    { value: "12", label: "Security Audits" },
    { value: "0", label: "Hidden Clauses" },
    { value: "24/7", label: "Public Verification" }
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
            Complete Transparency
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkTheme ? 'text-blue-200' : 'text-blue-600'
          }`}>
            Built on blockchain technology for verifiable, trustless insurance with no fine print
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`text-center p-8 rounded-2xl border backdrop-blur-sm ${
                isDarkTheme
                  ? 'bg-[#172e60]/50 border-blue-900/40 hover:border-blue-400/60'
                  : 'bg-white/60 border-blue-200/30 hover:border-blue-400/50'
              }`}
            >
              <div className={`text-3xl font-bold mb-2 ${
                isDarkTheme ? 'text-white' : 'text-slate-800'
              }`}>{stat.value}</div>
              <div className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                {stat.label}
              </div>
            </motion.div>
          ))}
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
              <p className={`leading-relaxed mb-6 ${
                isDarkTheme ? 'text-blue-200' : 'text-blue-600'
              }`}>
                {tabs[activeTab].content}
              </p>
              
              {activeTab === "onchain" && (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                      Policy terms stored as SHA-256 hashes on BNB Chain
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                      Immutable record of all policy purchases and claims
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                      Publicly verifiable using blockchain explorers
                    </span>
                  </div>
                </div>
              )}
              
              {activeTab === "audits" && (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                      Regular audits by CertiK, OpenZeppelin, and Hacken
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                      Bug bounty program with up to $100,000 rewards
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                      Multi-signature treasury management
                    </span>
                  </div>
                </div>
              )}
              
              {activeTab === "governance" && (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                      Community voting on claim disputes
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                      Token holders govern protocol parameters
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                      Transparent treasury management
                    </span>
                  </div>
                </div>
              )}
              
              <button className={`mt-6 flex items-center space-x-2 ${
                isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`}>
                <span>Learn more</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Features Grid */}
          <motion.div variants={slideInFromRight} className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
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
                  {feature.icon}
                </div>
                <h4 className={`text-xl font-semibold mb-3 ${
                  isDarkTheme ? 'text-white' : 'text-slate-800'
                }`}>{feature.title}</h4>
                <p className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`rounded-2xl p-12 ${
            isDarkTheme
              ? 'bg-[#172e60]/40 border border-blue-900/40'
              : 'bg-blue-50 border border-blue-200/50'
          }`}
        >
          <h3 className={`text-3xl font-semibold mb-12 text-center ${
            isDarkTheme ? 'text-white' : 'text-slate-800'
          }`}>Transparent Claim Process</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Event Occurs",
                description: "Flight delay, baggage loss, or other insured event happens",
                icon: <Clock className="w-8 h-8" />
              },
              {
                step: "2",
                title: "Oracle Verification",
                description: "Multiple oracles verify the event using trusted data sources",
                icon: <Shield className="w-8 h-8" />
              },
              {
                step: "3",
                title: "Automatic Payout",
                description: "Smart contract automatically pays claim to your wallet",
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
          className={`rounded-2xl p-12 text-center relative overflow-hidden mt-16 ${
            isDarkTheme
              ? 'bg-gradient-to-r from-blue-700 to-blue-800'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}
        >
          <div className="relative z-10">
            <h3 className={`text-3xl font-semibold mb-6 ${
              isDarkTheme ? 'text-white' : 'text-white'
            }`}>
              Experience Truly Transparent Insurance
            </h3>
            <p className={`text-xl mb-8 max-w-2xl mx-auto ${
              isDarkTheme ? 'text-blue-100' : 'text-blue-100'
            }`}>
              Join thousands of travelers who trust our blockchain-based insurance platform
            </p>
            <button className={`px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center space-x-2 mx-auto ${
              isDarkTheme ? 'shadow-lg' : 'shadow-md'
            }`}>
              <span>Get Protected Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
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

export default Transparency;