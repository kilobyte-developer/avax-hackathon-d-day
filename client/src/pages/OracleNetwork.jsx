// src/components/OracleNetwork.jsx
import React from "react";
import { motion } from "framer-motion";
import { Database, Shield, Cpu, Clock, CheckCircle, Zap, BarChart3, Globe } from "lucide-react";
import { useTheme } from '../context/ThemeContext';

const OracleNetwork = () => {
  const { isDarkTheme } = useTheme();

  const oracleFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Data Verification",
      description: "Multiple oracle nodes with cryptographic proof verification ensure data integrity",
      details: ["Multi-signature validation", "Cryptographic proofs", "Node reputation system"]
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Real-time Data Feeds",
      description: "Continuous data streaming from trusted sources with minimal latency",
      details: ["Sub-second updates", "Multiple data providers", "Redundant data sources"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Decentralized Infrastructure",
      description: "Distributed oracle network eliminates single points of failure",
      details: ["Geographically distributed", "Multiple providers", "Fault-tolerant design"]
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Trigger Execution",
      description: "Automated claim processing based on verified real-world data",
      details: ["Smart contract automation", "No manual intervention", "Instant payout triggers"]
    }
  ];

  const dataSources = [
    { name: "Flight Status Data", providers: ["Cirium", "FlightStats", "OAG", "AviationStack"], reliability: "99.9%" },
    { name: "Weather Data", providers: ["AccuWeather", "Weather.com", "OpenWeather", "NOAA"], reliability: "99.8%" },
    { name: "Crypto Price Feeds", providers: ["Chainlink", "Band Protocol", "API3", "DIA"], reliability: "99.99%" },
    { name: "Geolocation Data", providers: ["Google Maps", "Mapbox", "HERE Technologies", "Apple Maps"], reliability: "99.7%" }
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
            Oracle Network Infrastructure
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkTheme
            ? 'text-blue-200'
            : 'text-blue-600'}`}>
            Secure, reliable, and decentralized oracle network powering our parametric insurance products
          </p>
        </motion.div>

        {/* Oracle Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {oracleFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className={`rounded-2xl p-8 border backdrop-blur-sm ${
                isDarkTheme
                  ? 'bg-[#172e60]/60 border-blue-900/60'
                  : 'bg-white/70 border-blue-200/50'
              }`}
            >
              <div className={`mb-6 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`}>
                {feature.icon}
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                {feature.title}
              </h3>
              <p className={`mb-6 ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                {feature.description}
              </p>
              <ul className="space-y-3">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center">
                    <CheckCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Data Sources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <h3 className={`text-3xl font-semibold mb-8 text-center ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
            Trusted Data Sources
          </h3>
          <div className={`rounded-2xl p-8 border backdrop-blur-sm ${
            isDarkTheme
              ? 'bg-[#172e60]/40 border-blue-900/60'
              : 'bg-white/70 border-blue-200/50'
          }`}>
            <div className="grid gap-6">
              {dataSources.map((source, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className={`p-6 rounded-xl border ${
                    isDarkTheme
                      ? 'bg-[#172e60]/30 border-blue-900/40'
                      : 'bg-blue-50/50 border-blue-200/30'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                        {source.name}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {source.providers.map((provider, providerIndex) => (
                          <span
                            key={providerIndex}
                            className={`px-3 py-1 rounded-full text-sm ${
                              isDarkTheme
                                ? 'bg-blue-700/40 text-blue-200'
                                : 'bg-blue-100 text-blue-600'
                            }`}
                          >
                            {provider}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                      isDarkTheme ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                    }`}>
                      <Zap className="w-4 h-4" />
                      <span className="font-semibold">{source.reliability} Reliability</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Network Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className={`text-3xl font-semibold mb-8 text-center ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
            Network Performance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "124,890", label: "Data Requests", icon: <Database className="w-8 h-8" /> },
              { value: "58s", label: "Avg. Response Time", icon: <Clock className="w-8 h-8" /> },
              { value: "99.95%", label: "Uptime", icon: <BarChart3 className="w-8 h-8" /> },
              { value: "42", label: "Node Operators", icon: <Globe className="w-8 h-8" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`text-center p-6 rounded-2xl border backdrop-blur-sm ${
                  isDarkTheme
                    ? 'bg-[#172e60]/40 border-blue-900/60'
                    : 'bg-white/70 border-blue-200/50'
                }`}
              >
                <div className={`mb-4 mx-auto w-max ${
                  isDarkTheme ? 'text-blue-400' : 'text-blue-500'
                }`}>{stat.icon}</div>
                <div className={`text-3xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                  {stat.value}
                </div>
                <div className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OracleNetwork;