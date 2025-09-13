import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Zap, Globe, Award, Clock, Heart, ArrowRight, MapPin, Briefcase, DollarSign } from "lucide-react";
import { useTheme } from '../context/ThemeContext';

const Careers = () => {
  const { isDarkTheme } = useTheme();
  const [activeDepartment, setActiveDepartment] = useState("all");

  const openPositions = [
    {
      id: 1,
      title: "Senior Blockchain Developer",
      department: "engineering",
      type: "Full-time",
      location: "Remote",
      description: "Develop and maintain smart contracts for our decentralized insurance platform, ensuring security and efficiency.",
      requirements: ["5+ years blockchain development", "Solidity expertise", "Experience with DeFi protocols", "Security best practices"],
      salary: "$120,000 - $180,000"
    },
    {
      id: 2,
      title: "Frontend React Developer",
      department: "engineering",
      type: "Full-time",
      location: "Remote",
      description: "Build beautiful, responsive user interfaces for our insurance platform using modern React practices.",
      requirements: ["3+ years React experience", "TypeScript proficiency", "CSS/SCSS expertise", "Web3 experience preferred"],
      salary: "$90,000 - $140,000"
    },
    {
      id: 3,
      title: "Product Manager",
      department: "product",
      type: "Full-time",
      location: "Remote",
      description: "Lead product development for our insurance products, from conception to launch and iteration.",
      requirements: ["5+ years product management", "Fintech/Insurtech experience", "User-centric approach", "Data-driven decision making"],
      salary: "$110,000 - $160,000"
    },
    {
      id: 4,
      title: "Growth Marketing Manager",
      department: "marketing",
      type: "Full-time",
      location: "Remote",
      description: "Develop and execute growth strategies to acquire and retain customers for our insurance platform.",
      requirements: ["4+ years growth marketing", "Crypto/Web3 experience", "Data analytics skills", "A/B testing expertise"],
      salary: "$95,000 - $135,000"
    },
    {
      id: 5,
      title: "Customer Success Specialist",
      department: "operations",
      type: "Full-time",
      location: "Remote",
      description: "Provide exceptional support to our customers and help them navigate our insurance products.",
      requirements: ["2+ years customer support", "Insurance knowledge preferred", "Excellent communication", "Problem-solving skills"],
      salary: "$60,000 - $85,000"
    },
    {
      id: 6,
      title: "DevOps Engineer",
      department: "engineering",
      type: "Contract",
      location: "Remote",
      description: "Design and maintain our cloud infrastructure, ensuring reliability, security, and scalability.",
      requirements: ["4+ years DevOps experience", "AWS/Azure expertise", "Kubernetes proficiency", "CI/CD pipeline development"],
      salary: "$80 - $120/hour"
    }
  ];

  const departments = [
    { id: "all", name: "All Departments" },
    { id: "engineering", name: "Engineering" },
    { id: "product", name: "Product" },
    { id: "marketing", name: "Marketing" },
    { id: "operations", name: "Operations" }
  ];

  const benefits = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Remote First",
      description: "Work from anywhere in the world with our fully remote team structure."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Competitive Compensation",
      description: "Receive competitive salary and equity packages in a fast-growing company."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Cutting-Edge Technology",
      description: "Work with the latest blockchain and web3 technologies in the insurtech space."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Professional Development",
      description: "Annual budget for conferences, courses, and continuous learning."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Hours",
      description: "Flexible working hours to accommodate your lifestyle and peak productivity times."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness stipend for all team members."
    }
  ];

  const filteredPositions = activeDepartment === "all" 
    ? openPositions 
    : openPositions.filter(position => position.department === activeDepartment);

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
            Join Our Team
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkTheme
            ? 'text-blue-200'
            : 'text-blue-600'}`}>
            Help us revolutionize travel insurance with blockchain technology and parametric protection
          </p>
        </motion.div>

        {/* Culture Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mb-20"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className={`text-3xl font-semibold mb-6 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                Our Culture
              </h2>
              <div className={`space-y-4 text-lg ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                <p>
                  At InsureX, we're building the future of travel insurance—decentralized, transparent, and instant. 
                  We believe in empowering travelers with parametric protection that actually works when you need it.
                </p>
                <p>
                  Our team is a diverse group of innovators, builders, and insurance experts who are passionate about 
                  leveraging blockchain technology to solve real-world problems in the travel industry.
                </p>
                <p>
                  We value transparency, autonomy, and continuous learning. If you're excited about web3, insurtech, 
                  and creating products that make a difference, we'd love to hear from you.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className={`rounded-2xl p-8 border backdrop-blur-sm ${
                isDarkTheme
                  ? 'bg-[#172e60]/60 border-blue-900/60'
                  : 'bg-white/70 border-blue-200/50'
              }`}>
                <div className="flex items-center mb-6">
                  <Users className={`w-10 h-10 mr-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'}`} />
                  <h3 className={`text-2xl font-semibold ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                    Team Stats
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "25+", label: "Team Members" },
                    { value: "15+", label: "Countries" },
                    { value: "100%", label: "Remote" },
                    { value: "2 years", label: "Average Tenure" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl font-bold mb-1 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                        {stat.value}
                      </div>
                      <div className={isDarkTheme ? 'text-blue-300' : 'text-blue-600'}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
              Perks & Benefits
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
              We take care of our team with comprehensive benefits and a supportive work environment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border backdrop-blur-sm h-full ${
                  isDarkTheme
                    ? 'bg-[#172e60]/60 border-blue-900/60'
                    : 'bg-white/70 border-blue-200/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  isDarkTheme ? 'bg-blue-700/40' : 'bg-blue-100'
                }`}>
                  <div className={isDarkTheme ? 'text-blue-300' : 'text-blue-500'}>
                    {benefit.icon}
                  </div>
                </div>
                
                <h3 className={`text-xl font-semibold mb-3 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
                  {benefit.title}
                </h3>
                
                <p className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Open Positions - No animations */}
        <div className="mb-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-slate-800'}`}>
              Open Positions
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
              Join our team and help build the future of decentralized travel insurance
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {departments.map(department => (
              <button
                key={department.id}
                onClick={() => setActiveDepartment(department.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeDepartment === department.id
                    ? isDarkTheme
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : isDarkTheme
                      ? 'bg-[#172e60]/40 text-blue-300 hover:bg-[#172e60]/80'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                {department.name}
              </button>
            ))}
          </div>

          {/* Positions List */}
          <div className="space-y-6">
            {filteredPositions.map(position => (
              <div
                key={position.id}
                className={`rounded-2xl p-6 border backdrop-blur-sm group cursor-pointer ${
                  isDarkTheme
                    ? 'bg-[#172e60]/60 border-blue-900/60 hover:border-blue-400/60'
                    : 'bg-white/70 border-blue-200/50 hover:border-blue-400/50'
                } transition-all duration-300`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors ${
                      isDarkTheme ? 'text-white' : 'text-slate-800'
                    }`}>
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <span className={`flex items-center gap-1 text-sm ${
                        isDarkTheme ? 'text-blue-300' : 'text-blue-500'
                      }`}>
                        <Briefcase className="w-4 h-4" />
                        {position.type}
                      </span>
                      <span className={`flex items-center gap-1 text-sm ${
                        isDarkTheme ? 'text-blue-300' : 'text-blue-500'
                      }`}>
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className={`flex items-center gap-1 text-sm ${
                        isDarkTheme ? 'text-blue-300' : 'text-blue-500'
                      }`}>
                        <DollarSign className="w-4 h-4" />
                        {position.salary}
                      </span>
                    </div>
                  </div>
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                    isDarkTheme
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}>
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                <p className={`mb-4 ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                  {position.description}
                </p>
                
                <div className={`text-sm font-medium mb-2 ${isDarkTheme ? 'text-blue-300' : 'text-blue-500'}`}>
                  Key Requirements:
                </div>
                <ul className={`grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 ${
                  isDarkTheme ? 'text-blue-200' : 'text-blue-600'
                }`}>
                  {position.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-12">
              <Users className={`w-16 h-16 mx-auto mb-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'} opacity-50`} />
              <h3 className={`text-xl font-medium mb-2 ${isDarkTheme ? 'text-blue-300' : 'text-blue-500'}`}>
                No open positions in this department
              </h3>
              <p className={isDarkTheme ? 'text-blue-200' : 'text-blue-600'}>
                Check back later or explore other departments
              </p>
            </div>
          )}
        </div>

        {/* General Application */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className={`mt-16 rounded-2xl p-8 ${
            isDarkTheme
              ? 'bg-gradient-to-r from-blue-700 to-blue-800'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className={`text-2xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-white'}`}>
                Don't see the perfect role?
              </h2>
              <p className={isDarkTheme ? 'text-blue-100' : 'text-blue-100'}>
                We're always interested in meeting talented people. Send us your resume!
              </p>
            </div>
            <button className={`px-6 py-3 rounded-xl font-medium ${
              isDarkTheme
                ? 'bg-white text-blue-700 hover:bg-slate-100'
                : 'bg-white text-blue-600 hover:bg-slate-100'
            }`}>
              Submit General Application
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Careers;