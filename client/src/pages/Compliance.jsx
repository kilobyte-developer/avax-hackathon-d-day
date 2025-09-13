import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Globe, Lock, CheckCircle, Award, Users, BarChart, ArrowRight } from "lucide-react";
import { useTheme } from '../context/ThemeContext';

const Compliance = () => {
  const { isDarkTheme } = useTheme();

  const complianceAreas = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Regulatory Compliance",
      description: "We operate in full compliance with international insurance regulations and financial services standards.",
      details: [
        "Licensed insurance provider in multiple jurisdictions",
        "Regular audits by independent regulatory bodies",
        "Transparent reporting to regulatory authorities",
        "Compliance with travel insurance specific regulations"
      ]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Data Protection & Privacy",
      description: "Your privacy is paramount. We implement stringent data protection measures in accordance with global standards.",
      details: [
        "GDPR compliance for European customers",
        "CCPA compliance for California residents",
        "End-to-end encryption for all sensitive data",
        "Regular security audits and penetration testing"
      ]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "International Standards",
      description: "Our operations adhere to international insurance and financial service standards across all jurisdictions.",
      details: [
        "ISO 27001 certified information security management",
        "SOC 2 Type II compliance for service organizations",
        "Cross-border compliance framework",
        "International Association of Insurance Supervisors (IAIS) standards"
      ]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Transparent Operations",
      description: "Blockchain technology enables unprecedented transparency in insurance operations and claims handling.",
      details: [
        "All policy terms recorded on-chain for immutability",
        "Transparent claims process visible to all parties",
        "Real-time audit trails for all transactions",
        "Open verification of reserves and capital adequacy"
      ]
    }
  ];

  const certifications = [
    {
      name: "Insurance License",
      issuer: "Bermuda Monetary Authority",
      validity: "2023-2026",
      description: "Full insurance provider license for travel insurance products"
    },
    {
      name: "Data Protection Certification",
      issuer: "EU Data Protection Board",
      validity: "2024-2027",
      description: "GDPR compliance certification for data processing operations"
    },
    {
      name: "Cybersecurity Excellence",
      issuer: "International Cybersecurity Council",
      validity: "2024-2025",
      description: "Award for exceptional security measures in fintech applications"
    },
    {
      name: "Blockchain Transparency",
      issuer: "Decentralized Assurance Foundation",
      validity: "2023-2024",
      description: "Certification for transparent smart contract operations"
    }
  ];

  const policies = [
    {
      name: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      link: "/privacy-policy"
    },
    {
      name: "Terms of Service",
      description: "The legal agreement between you and InsureX",
      link: "/terms-of-service"
    },
    {
      name: "Cookie Policy",
      description: "Information about how we use cookies and similar technologies",
      link: "/cookie-policy"
    },
    {
      name: "Claims Policy",
      description: "Detailed information about our claims process and requirements",
      link: "/claims-policy"
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
    <section className={`pt-32 pb-20 px-6 min-h-screen ${isDarkTheme
      ? 'bg-gradient-to-br from-[#030B1D] via-[#172e60] to-[#030B1D]'
      : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'}`}>
      
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl lg:text-5xl font-light mb-6 ${isDarkTheme
            ? 'text-white'
            : 'text-slate-800'}`}>
            Compliance & Regulatory Information
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkTheme
            ? 'text-blue-200'
            : 'text-blue-600'}`}>
            Our commitment to regulatory compliance, security, and transparent operations
          </p>
        </motion.div>

        {/* Compliance Areas */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          {complianceAreas.map((area, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`rounded-2xl p-8 border backdrop-blur-sm h-full ${
                isDarkTheme
                  ? 'bg-[#172e60]/60 border-blue-900/60'
                  : 'bg-white/70 border-blue-200/50'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                isDarkTheme ? 'bg-blue-700/40' : 'bg-blue-100'
              }`}>
                <div className={isDarkTheme ? 'text-blue-300' : 'text-blue-500'}>
                  {area.icon}
                </div>
              </div>
              
              <h3 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                {area.title}
              </h3>
              
              <p className={`mb-6 ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                {area.description}
              </p>
              
              <ul className="space-y-3">
                {area.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                      isDarkTheme ? 'text-green-400' : 'text-green-500'
                    }`} />
                    <span className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications & Licenses */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
              Certifications & Licenses
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
              Our credentials and regulatory approvals that ensure we meet the highest standards
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`rounded-2xl p-6 border backdrop-blur-sm ${
                  isDarkTheme
                    ? 'bg-[#172e60]/40 border-blue-900/60'
                    : 'bg-white/70 border-blue-200/50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Award className={`w-8 h-8 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`} />
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    isDarkTheme ? 'bg-blue-700/40 text-blue-300' : 'bg-blue-100 text-blue-600'
                  }`}>
                    Valid until {cert.validity}
                  </span>
                </div>
                
                <h3 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                  {cert.name}
                </h3>
                
                <p className={`mb-3 ${isDarkTheme ? 'text-blue-300' : 'text-blue-500'}`}>
                  <strong>Issued by:</strong> {cert.issuer}
                </p>
                
                <p className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Policy Documents */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
              Policy Documents
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
              Important legal documents that govern your relationship with InsureX
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`rounded-2xl p-6 border backdrop-blur-sm group cursor-pointer ${
                  isDarkTheme
                    ? 'bg-[#172e60]/40 border-blue-900/60 hover:border-blue-400/60'
                    : 'bg-white/70 border-blue-200/50 hover:border-blue-400/50'
                } transition-all duration-300`}
              >
                <FileText className={`w-8 h-8 mb-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`} />
                
                <h3 className={`text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors ${
                  isDarkTheme ? 'text-white' : 'text-slate-800'
                }`}>
                  {policy.name}
                </h3>
                
                <p className={`mb-4 ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                  {policy.description}
                </p>
                
                <button className={`flex items-center gap-2 font-medium ${
                  isDarkTheme ? 'text-blue-400' : 'text-blue-500'
                }`}>
                  View Document
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Compliance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className={`rounded-2xl p-8 ${
            isDarkTheme
              ? 'bg-gradient-to-r from-blue-700 to-blue-800'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}
        >
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-white'}`}>
              Our Compliance Commitment in Numbers
            </h2>
            <p className={isDarkTheme ? 'text-blue-100' : 'text-blue-100'}>
              Transparency and accountability through measurable compliance metrics
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "100%", label: "Regulatory Compliance", icon: <Shield className="w-6 h-6" /> },
              { value: "24/7", label: "Security Monitoring", icon: <Lock className="w-6 h-6" /> },
              { value: "150+", label: "Countries Covered", icon: <Globe className="w-6 h-6" /> },
              { value: "0", label: "Major Incidents", icon: <BarChart className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm"
              >
                <div className="mb-4 mx-auto w-max text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2 text-white">
                  {stat.value}
                </div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Compliance Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
            Questions about Compliance?
          </h2>
          <p className={`mb-6 max-w-2xl mx-auto ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
            Our compliance team is available to address any questions or concerns regarding our regulatory framework.
          </p>
          <button className={`px-8 py-3 rounded-xl font-medium transition-all ${
            isDarkTheme
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}>
            Contact Compliance Team
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Compliance;