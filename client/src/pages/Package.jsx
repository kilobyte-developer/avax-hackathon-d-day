// src/components/Package.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plane, Briefcase, Heart, ArrowRight, X, Calendar, MapPin } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import travelinsurance2 from "../assets/travelinsurance2.jpeg";

const Package = () => {
  const { isDarkTheme } = useTheme();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = {
    flight: {
      icon: <Plane className="w-8 h-8" />,
      title: "Flight Delay Protection",
      features: ["2+ hour delay coverage", "Automatic verification", "Multi-oracle data", "No claim forms"],
      coverage: "$250-1000",
      premium: "$5-15 per flight",
      details: "Covers delays, cancellations, and missed connections with instant automated payouts"
    },
    baggage: {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Baggage Protection",
      features: ["Lost luggage", "Delayed baggage", "Essential items", "24/7 support"],
      coverage: "$500-2000",
      premium: "$8-20 per trip",
      details: "Comprehensive baggage coverage with quick resolution and emergency support"
    },
    medical: {
      icon: <Heart className="w-8 h-8" />,
      title: "Medical Add-on",
      features: ["Emergency medical", "Hospitalization", "Medical evacuation", "Telemedicine"],
      coverage: "$10,000-50,000",
      premium: "$15-30 per week",
      details: "Global medical coverage including emergency evacuation and telemedicine services"
    }
  };

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

  const slideInFromBottom = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
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
            Choose Your Protection
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkTheme ? 'text-blue-200' : 'text-blue-600'
          }`}>
            Flexible, parametric insurance products designed for the modern traveler
          </p>
        </motion.div>

        {/* Package Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {Object.entries(packages).map(([key, pkg]) => (
            <motion.div
              key={key}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedPackage(key)}
            >
              <div className={`absolute inset-0 rounded-2xl transform group-hover:scale-105 transition-all duration-300 ${
                isDarkTheme ? 'bg-blue-700/15' : 'bg-blue-400/10'
              }`}></div>
              <div className={`relative rounded-2xl p-8 border backdrop-blur-sm transition-all duration-300 h-full ${
                isDarkTheme
                  ? 'bg-[#172e60]/60 border-blue-900/60 group-hover:border-blue-400/60'
                  : 'bg-white/70 border-blue-200/50 group-hover:border-blue-400/50'
              }`}>
                <div className={`mb-6 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`}>
                  {pkg.icon}
                </div>
                <h3 className={`text-2xl font-semibold mb-4 ${
                  isDarkTheme ? 'text-white' : 'text-slate-800'
                }`}>{pkg.title}</h3>
                <div className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${
                        isDarkTheme ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <span className={`text-sm ${
                        isDarkTheme ? 'text-blue-200' : 'text-blue-600'
                      }`}>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className={`border-t pt-6 mt-6 ${
                  isDarkTheme ? 'border-blue-900/50' : 'border-blue-200/50'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={isDarkTheme ? 'text-blue-300' : 'text-blue-500'}>
                      Coverage:
                    </span>
                    <span className={`font-semibold ${
                      isDarkTheme ? 'text-white' : 'text-slate-800'
                    }`}>{pkg.coverage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDarkTheme ? 'text-blue-300' : 'text-blue-500'}>
                      Premium:
                    </span>
                    <span className={`font-semibold ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`}>{pkg.premium}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className={`w-6 h-6 ${
                    isDarkTheme ? 'text-blue-400' : 'text-blue-500'
                  }`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative rounded-2xl overflow-hidden group"
        >
          <img
            src={travelinsurance2}
            alt="Travel Protection"
            className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            style={{ opacity: 0.9 }}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDarkTheme
              ? 'from-[#030B1D] via-[#172e60]/80 to-transparent'
              : 'from-white via-white/50 to-transparent'
          }`}></div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center mb-4">
              <MapPin className={`w-6 h-6 mr-3 ${
                isDarkTheme ? 'text-blue-400' : 'text-blue-500'
              }`} />
              <span className={isDarkTheme ? 'text-blue-300' : 'text-blue-600'}>
                Global Coverage
              </span>
            </div>
            <h3 className={`text-3xl font-semibold mb-4 ${
              isDarkTheme ? 'text-white' : 'text-slate-800'
            }`}>Worldwide Protection</h3>
            <p className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
              From flight delays to medical emergencies, our parametric insurance covers you 
              wherever your travels take you, with instant payouts and zero paperwork.
            </p>
          </div>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedPackage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPackage(null)}
              style={{ backgroundColor: isDarkTheme ? 'rgba(3,11,29,0.93)' : 'rgba(255,255,255,0.93)' }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`rounded-2xl p-8 max-w-2xl w-full border ${
                  isDarkTheme
                    ? 'bg-[#172e60] border-blue-900/60'
                    : 'bg-white border-blue-200/50'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className={`mr-4 ${
                      isDarkTheme ? 'text-blue-400' : 'text-blue-500'
                    }`}>
                      {packages[selectedPackage].icon}
                    </div>
                    <h3 className={`text-2xl font-semibold ${
                      isDarkTheme ? 'text-white' : 'text-slate-800'
                    }`}>
                      {packages[selectedPackage].title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedPackage(null)}
                    className={isDarkTheme ? 'text-blue-200 hover:text-white' : 'text-slate-500 hover:text-slate-800'}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className={`mb-6 ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                  {packages[selectedPackage].details}
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className={`rounded-xl p-4 ${
                    isDarkTheme ? 'bg-blue-900/50' : 'bg-blue-50'
                  }`}>
                    <div className={`mb-2 ${isDarkTheme ? 'text-blue-300' : 'text-blue-500'}`}>
                      Coverage
                    </div>
                    <div className={`font-semibold text-xl ${
                      isDarkTheme ? 'text-white' : 'text-slate-800'
                    }`}>
                      {packages[selectedPackage].coverage}
                    </div>
                  </div>
                  <div className={`rounded-xl p-4 ${
                    isDarkTheme ? 'bg-blue-900/50' : 'bg-blue-50'
                  }`}>
                    <div className={`mb-2 ${isDarkTheme ? 'text-blue-300' : 'text-blue-500'}`}>
                      Premium
                    </div>
                    <div className={`font-semibold text-xl ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`}>
                      {packages[selectedPackage].premium}
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className={`font-semibold mb-3 ${
                    isDarkTheme ? 'text-white' : 'text-slate-800'
                  }`}>Includes:</div>
                  {packages[selectedPackage].features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${
                        isDarkTheme ? 'text-green-400' : 'text-green-500'
                      }`} />
                      <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 ${
                  isDarkTheme
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}>
                  <span>Get Protected Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Package;