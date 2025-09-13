// src/components/Package.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plane, Briefcase, Heart, ArrowRight, X, MapPin, Loader2, Shield } from "lucide-react";
import { useTheme } from '../context/ThemeContext';
import travelinsurance2 from "../assets/travelinsurance2.jpeg";
import {useAuth} from "../context/AuthContext";

const Package = () => {
  const { isDarkTheme } = useTheme();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:5000/api/packages');
        
        if (response.data.success) {
          setPackages(response.data.data);
        } else {
          setError('Failed to fetch packages');
        }
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError(err.response?.data?.message || 'Failed to fetch packages');
        
        // Fallback to mock data if API fails (for demo purposes)
        setPackages(getMockPackages());
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Mock data fallback for demo/hackathon
  const getMockPackages = () => [
    {
      _id: "1",
      name: "Flight Delay Protection - Basic",
      type: "FLIGHT_DELAY",
      coverage: 250,
      premium: 12.50,
      description: "Get compensated for flight delays over 2 hours",
      features: [
        "Automatic delay detection",
        "Instant payout",
        "Covers all airlines",
        "No paperwork required"
      ],
      duration: 24,
      claimsProcess: "Automatically triggered when flight delay exceeds 2 hours",
      payoutTime: 5,
      category: "BASIC",
      active: true
    },
    {
      _id: "2",
      name: "Baggage Protection",
      type: "BAGGAGE",
      coverage: 500,
      premium: 8.75,
      description: "Coverage for lost, delayed, or damaged baggage",
      features: [
        "Covers lost luggage",
        "Delayed baggage compensation",
        "Essential items coverage",
        "24/7 support"
      ],
      duration: 72,
      claimsProcess: "File claim through app with photos and documentation",
      payoutTime: 15,
      category: "STANDARD",
      active: true
    },
    {
      _id: "3",
      name: "Emergency Medical Coverage",
      type: "MEDICAL",
      coverage: 10000,
      premium: 45.00,
      description: "Emergency medical expenses coverage while traveling",
      features: [
        "Hospitalization coverage",
        "Emergency evacuation",
        "Medical consultation",
        "Prescription coverage"
      ],
      duration: 168,
      category: "PREMIUM",
      active: true
    }
  ];

  // Get icon based on package type
  const getPackageIcon = (type) => {
    switch (type) {
      case 'FLIGHT_DELAY':
        return <Plane className="w-8 h-8" />;
      case 'BAGGAGE':
        return <Briefcase className="w-8 h-8" />;
      case 'MEDICAL':
        return <Heart className="w-8 h-8" />;
      case 'TRIP_CANCELLATION':
        return <Shield className="w-8 h-8" />;
      default:
        return <Shield className="w-8 h-8" />;
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
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

  if (loading) {
    return (
      <section className={`pt-32 pb-20 px-6 min-h-screen flex items-center justify-center ${
        isDarkTheme
          ? 'bg-gradient-to-br from-[#030B1D] via-[#172e60] to-[#030B1D]'
          : 'bg-gradient-to-br from-blue-50 to-white'
      }`}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
          <p className={isDarkTheme ? 'text-blue-300' : 'text-blue-600'}>
            Loading insurance packages...
          </p>
        </div>
      </section>
    );
  }

  if (error && packages.length === 0) {
    return (
      <section className={`pt-32 pb-20 px-6 min-h-screen flex items-center justify-center ${
        isDarkTheme
          ? 'bg-gradient-to-br from-[#030B1D] via-[#172e60] to-[#030B1D]'
          : 'bg-gradient-to-br from-blue-50 to-white'
      }`}>
        <div className="text-center">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <p className={isDarkTheme ? 'text-blue-300' : 'text-blue-600'}>
            Using demo data for presentation
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`pt-32 pb-20 px-6 ${
      isDarkTheme
        ? 'bg-gradient-to-br from-[#030B1D] via-[#172e60] to-[#030B1D]'
        : 'bg-gradient-to-br from-blue-50 to-white'
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
            isDarkTheme ? 'text-white' : 'text-slate-800'
          }`}>
            Choose Your Protection
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkTheme ? 'text-blue-200' : 'text-blue-600'
          }`}>
            Flexible, parametric insurance products designed for the modern traveler
          </p>
          {error && (
            <div className={`mt-4 p-3 rounded-lg ${
              isDarkTheme ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
            }`}>
              ⚠️ {error} - Showing demo data
            </div>
          )}
        </motion.div>

        {/* Package Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg._id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedPackage(pkg)}
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
                  {getPackageIcon(pkg.type)}
                </div>
                <h3 className={`text-2xl font-semibold mb-4 ${
                  isDarkTheme ? 'text-white' : 'text-slate-800'
                }`}>{pkg.name}</h3>
                <p className={`text-sm mb-4 ${
                  isDarkTheme ? 'text-blue-200' : 'text-blue-600'
                }`}>
                  {pkg.description}
                </p>
                <div className="space-y-3 mb-6">
                  {pkg.features.slice(0, 4).map((feature, index) => (
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
                    }`}>{formatCurrency(pkg.coverage)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={isDarkTheme ? 'text-blue-300' : 'text-blue-500'}>
                      Premium:
                    </span>
                    <span className={`font-semibold ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`}>{formatCurrency(pkg.premium)}</span>
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
                      {getPackageIcon(selectedPackage.type)}
                    </div>
                    <h3 className={`text-2xl font-semibold ${
                      isDarkTheme ? 'text-white' : 'text-slate-800'
                    }`}>
                      {selectedPackage.name}
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
                  {selectedPackage.description}
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
                      {formatCurrency(selectedPackage.coverage)}
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
                      {formatCurrency(selectedPackage.premium)}
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className={`font-semibold mb-3 ${
                    isDarkTheme ? 'text-white' : 'text-slate-800'
                  }`}>Includes:</div>
                  {selectedPackage.features.map((feature, index) => (
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
                <div className={`mb-6 p-4 rounded-xl ${
                  isDarkTheme ? 'bg-blue-900/30' : 'bg-blue-50'
                }`}>
                  <div className={`font-semibold mb-2 ${
                    isDarkTheme ? 'text-blue-300' : 'text-blue-600'
                  }`}>Claims Process:</div>
                  <p className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                    {selectedPackage.claimsProcess}
                  </p>
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