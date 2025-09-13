// src/components/Documentation.jsx
import React from "react";
import { motion } from "framer-motion";
import { FileText, BookOpen, Download, Code, Search, ArrowRight, CheckCircle } from "lucide-react";
import { useTheme } from '../context/ThemeContext';

const Documentation = () => {
  const { isDarkTheme } = useTheme();

  const documentationSections = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Getting Started",
      description: "Learn how to set up your account, connect your wallet, and purchase your first policy",
      items: ["Account Setup", "Wallet Connection", "First Policy Purchase", "KYC Process"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Developer Guides",
      description: "Technical documentation for developers looking to integrate with our platform",
      items: ["API Integration", "Smart Contract Interaction", "Web3 Implementation", "Testing Procedures"]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Policy Documentation",
      description: "Comprehensive guides on policy types, coverage details, and claim processes",
      items: ["Policy Types", "Coverage Details", "Claim Process", "Terms & Conditions"]
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Resources & Downloads",
      description: "Access whitepapers, API references, SDKs, and other technical resources",
      items: ["Whitepapers", "API References", "SDK Downloads", "Integration Examples"]
    }
  ];

  const popularGuides = [
    {
      title: "Integrating Flight Delay Insurance",
      description: "Step-by-step guide to implementing flight delay coverage in your application",
      category: "Integration"
    },
    {
      title: "Smart Contract Audit Reports",
      description: "Complete security audit reports for all deployed smart contracts",
      category: "Security"
    },
    {
      title: "Parametric Insurance Explained",
      description: "Understanding how parametric triggers work and their implementation",
      category: "Education"
    },
    {
      title: "Multi-chain Deployment Guide",
      description: "How to deploy and manage policies across different blockchain networks",
      category: "Development"
    }
  ];

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
          className="text-center mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-light mb-6 ${isDarkTheme
            ? 'text-white'
            : 'text-slate-800'}`}>
            Comprehensive Documentation
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkTheme
            ? 'text-blue-200'
            : 'text-blue-600'}`}>
            Everything you need to understand, implement, and utilize our DeFi travel insurance platform
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
          className={`max-w-2xl mx-auto mb-16 rounded-xl p-2 border backdrop-blur-sm ${
            isDarkTheme
              ? 'bg-[#172e60]/40 border-blue-900/60'
              : 'bg-white/70 border-blue-200/50'
          }`}
        >
          <div className="flex items-center px-4 py-2">
            <Search className={`w-5 h-5 mr-3 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`} />
            <input
              type="text"
              placeholder="Search documentation, guides, and API references..."
              className={`flex-1 bg-transparent outline-none text-lg ${
                isDarkTheme ? 'text-blue-100 placeholder-blue-400' : 'text-blue-600 placeholder-blue-400'
              }`}
            />
          </div>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {documentationSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className={`rounded-2xl p-8 border backdrop-blur-sm hover:border-blue-400 transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-[#172e60]/60 border-blue-900/60'
                  : 'bg-white/70 border-blue-200/50'
              }`}
            >
              <div className={`mb-6 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`}>
                {section.icon}
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                {section.title}
              </h3>
              <p className={`mb-6 ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                {section.description}
              </p>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>{item}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-6 flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isDarkTheme
                  ? 'bg-blue-700 text-white hover:bg-blue-600'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              } transition-colors`}>
                <span>Explore</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Popular Guides */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className={`text-3xl font-semibold mb-8 text-center ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
            Popular Guides & Resources
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {popularGuides.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`rounded-xl p-6 border backdrop-blur-sm hover:border-blue-400 transition-all duration-300 ${
                  isDarkTheme
                    ? 'bg-[#172e60]/40 border-blue-900/60'
                    : 'bg-white/70 border-blue-200/50'
                }`}
              >
                <div className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
                  isDarkTheme ? 'bg-blue-700 text-blue-200' : 'bg-blue-100 text-blue-600'
                }`}>
                  {guide.category}
                </div>
                <h4 className={`text-xl font-semibold mb-3 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                  {guide.title}
                </h4>
                <p className={`mb-4 ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                  {guide.description}
                </p>
                <button className={`flex items-center space-x-2 text-sm ${
                  isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}>
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Documentation;