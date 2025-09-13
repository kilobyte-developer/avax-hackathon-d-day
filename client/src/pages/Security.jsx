// src/components/Security.jsx
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Key, Eye, CheckCircle, Zap, Cpu, Database, Clock } from "lucide-react";
import { useTheme } from '../context/ThemeContext';

const Security = () => {
  const { isDarkTheme } = useTheme();

  const securityFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Smart Contract Audits",
      description: "Regular security audits by leading blockchain security firms",
      details: ["Quarterly external audits", "Continuous internal reviews", "Bug bounty programs", "Formal verification"]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Encryption & Data Protection",
      description: "End-to-end encryption and secure data handling practices",
      details: ["AES-256 encryption", "SSL/TLS encryption", "Secure key management", "Data minimization"]
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Access Control",
      description: "Multi-layered access control and permission systems",
      details: ["Role-based access control", "Multi-signature wallets", "Time-based permissions", "Geographic restrictions"]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Monitoring & Alerting",
      description: "24/7 security monitoring and real-time threat detection",
      details: ["Real-time monitoring", "Anomaly detection", "Automated alerts", "Incident response team"]
    }
  ];

  const auditPartners = [
    {
      name: "CertiK",
      audits: "12",
      findings: "0 Critical",
      status: "Active",
      lastAudit: "2024-01-15"
    },
    {
      name: "Quantstamp",
      audits: "8",
      findings: "2 Medium",
      status: "Active",
      lastAudit: "2023-11-30"
    },
    {
      name: "Trail of Bits",
      audits: "5",
      findings: "1 High",
      status: "Completed",
      lastAudit: "2023-09-22"
    },
    {
      name: "ConsenSys Diligence",
      audits: "6",
      findings: "0 Critical",
      status: "Active",
      lastAudit: "2024-02-10"
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
            Security & Trust
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkTheme
            ? 'text-blue-200'
            : 'text-blue-600'}`}>
            Enterprise-grade security measures protecting your policies, data, and funds
          </p>
        </motion.div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
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

        {/* Audit Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <h3 className={`text-3xl font-semibold mb-8 text-center ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
            Security Audits & Partners
          </h3>
          <div className={`rounded-2xl p-8 border backdrop-blur-sm ${
            isDarkTheme
              ? 'bg-[#172e60]/40 border-blue-900/60'
              : 'bg-white/70 border-blue-200/50'
          }`}>
            <div className="grid gap-6">
              {auditPartners.map((partner, index) => (
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
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <h4 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                        {partner.name}
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        <div className={`text-sm ${isDarkTheme ? 'text-blue-300' : 'text-blue-600'}`}>
                          <span className="font-semibold">{partner.audits}</span> Audits
                        </div>
                        <div className={`text-sm ${isDarkTheme ? 'text-blue-300' : 'text-blue-600'}`}>
                          <span className="font-semibold">{partner.findings}</span> Findings
                        </div>
                        <div className={`text-sm ${isDarkTheme ? 'text-blue-300' : 'text-blue-600'}`}>
                          Last: {partner.lastAudit}
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      partner.status === 'Active'
                        ? isDarkTheme ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
                        : isDarkTheme ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {partner.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Security Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className={`text-3xl font-semibold mb-8 text-center ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
            Security Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "0", label: "Critical Vulnerabilities", icon: <Shield className="w-8 h-8" /> },
              { value: "99.95%", label: "Uptime", icon: <Cpu className="w-8 h-8" /> },
              { value: "256-bit", label: "Encryption", icon: <Lock className="w-8 h-8" /> },
              { value: "24/7", label: "Monitoring", icon: <Eye className="w-8 h-8" /> }
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

        {/* Bug Bounty Program */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16"
        >
          <div className={`rounded-2xl p-8 text-center ${
            isDarkTheme
              ? 'bg-gradient-to-r from-blue-700 to-blue-800'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}>
            <h3 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-white'}`}>
              Bug Bounty Program
            </h3>
            <p className={`mb-6 max-w-2xl mx-auto ${isDarkTheme ? 'text-blue-100' : 'text-blue-100'}`}>
              We reward security researchers for discovering and reporting vulnerabilities in our platform.
              Join our bug bounty program to help make InsureX more secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
                View Program Details
              </button>
              <button className={`px-6 py-3 border-2 rounded-xl font-semibold transition-colors ${
                isDarkTheme
                  ? 'border-white text-white hover:bg-white/10'
                  : 'border-white text-white hover:bg-white/20'
              }`}>
                Report a Vulnerability
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;