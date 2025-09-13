import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MessageCircle, Mail, Zap, Shield, Globe, Users } from "lucide-react";
import { useTheme } from '../context/ThemeContext';

const FAQ = () => {
  const { isDarkTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      id: "general",
      name: "General",
      icon: <MessageCircle className="w-5 h-5" />,
      questions: [
        {
          question: "What is InsureX?",
          answer: "InsureX is a decentralized travel insurance platform powered by blockchain technology. We offer parametric insurance products that provide instant payouts for travel disruptions like flight delays, cancellations, and baggage issues without traditional claims paperwork."
        },
        {
          question: "How does decentralized insurance work?",
          answer: "Decentralized insurance uses smart contracts on blockchain networks to automate policy issuance, premium payments, and claim payouts. This eliminates intermediaries, reduces costs, and enables instant settlements based on predefined parameters verified by trusted data sources."
        },
        {
          question: "Is my personal data secure?",
          answer: "Yes, we prioritize security and privacy. We only store essential information required for policy issuance and claims processing. Personal data is encrypted, and we comply with global data protection regulations. Blockchain technology ensures transparency without compromising privacy."
        }
      ]
    },
    {
      id: "coverage",
      name: "Coverage",
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          question: "What types of travel insurance do you offer?",
          answer: "We currently offer parametric coverage for flight delays, flight cancellations, missed connections, and baggage delays. Our products are designed to provide instant payouts when predefined conditions are met, verified by trusted oracle data feeds."
        },
        {
          question: "Which countries are covered?",
          answer: "Our coverage is global and available to travelers worldwide. There are no geographical restrictions as long as you have a compatible crypto wallet and internet connection to purchase and manage your policies."
        },
        {
          question: "How long does coverage last?",
          answer: "Coverage periods are flexible. You can purchase single-trip policies that cover a specific journey or opt for annual multi-trip coverage. Most of our flight delay policies activate 2-4 hours before your scheduled departure and remain active until you reach your destination."
        }
      ]
    },
    {
      id: "claims",
      name: "Claims & Payouts",
      icon: <Zap className="w-5 h-5" />,
      questions: [
        {
          question: "How do I file a claim?",
          answer: "With parametric insurance, there's no traditional claims process. Payouts are automatically triggered when predefined conditions are met (e.g., flight delay exceeding 2 hours). Our smart contracts monitor trusted data sources and automatically transfer funds to your wallet when eligible."
        },
        {
          question: "How fast are payouts processed?",
          answer: "Payouts are typically processed within 60 seconds of the qualifying event being verified by our oracle network. This is significantly faster than traditional insurance, which can take days or weeks to process claims."
        },
        {
          question: "What cryptocurrencies do you support for payouts?",
          answer: "We currently support payouts in USDC, USDT, DAI, and ETH. We're continuously evaluating additional stablecoins and cryptocurrencies based on community feedback and market demand."
        }
      ]
    },
    {
      id: "technical",
      name: "Technical",
      icon: <Globe className="w-5 h-5" />,
      questions: [
        {
          question: "Which blockchain networks do you support?",
          answer: "We currently operate on Ethereum, Polygon, and BNB Chain. We chose these networks for their security, low transaction fees, and widespread adoption. We plan to expand to additional networks based on user demand and technical capabilities."
        },
        {
          question: "Do I need cryptocurrency to purchase insurance?",
          answer: "Yes, you need cryptocurrency to purchase our insurance products. We accept major stablecoins (USDC, USDT, DAI) and are working on fiat on-ramp solutions to make the onboarding process smoother for traditional users."
        },
        {
          question: "What wallets are compatible with InsureX?",
          answer: "We support all major Web3 wallets including MetaMask, WalletConnect, Coinbase Wallet, and Trust Wallet. Our platform is compatible with both browser extension wallets and mobile wallets."
        }
      ]
    },
    {
      id: "account",
      name: "Account & Support",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: "How do I create an account?",
          answer: "You don't need a traditional account with username and password. Simply connect your compatible Web3 wallet to our platform, and you can immediately browse and purchase policies. Your wallet address serves as your account identifier."
        },
        {
          question: "What customer support options are available?",
          answer: "We offer 24/7 support through our chat system, email, and community forums. For urgent travel issues, we have a dedicated support line. Most common questions can be answered through our comprehensive knowledge base and automated assistance."
        },
        {
          question: "Can I cancel my policy?",
          answer: "Yes, you can cancel most policies within 14 days of purchase for a full refund, provided no covered event has occurred. After this period or if a claim has been triggered, cancellation may not be possible or may be subject to fees. Specific terms are outlined in each policy agreement."
        }
      ]
    }
  ];

  const toggleItem = (categoryId, index) => {
    setOpenItems(prev => ({
      ...prev,
      [`${categoryId}-${index}`]: !prev[`${categoryId}-${index}`]
    }));
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
          className="text-center mb-12"
        >
          <h1 className={`text-4xl lg:text-5xl font-light mb-6 ${isDarkTheme
            ? 'text-white'
            : 'text-slate-800'}`}>
            Frequently Asked Questions
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkTheme
            ? 'text-blue-200'
            : 'text-blue-600'}`}>
            Find answers to common questions about our decentralized travel insurance platform
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkTheme ? 'text-blue-400' : 'text-blue-500'} w-5 h-5`} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                isDarkTheme 
                  ? 'bg-[#172e60]/40 border-blue-800/60 text-white placeholder-blue-300' 
                  : 'bg-white border-blue-200 text-slate-800 placeholder-blue-400'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {faqCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === category.id
                  ? isDarkTheme
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : isDarkTheme
                    ? 'bg-[#172e60]/40 text-blue-300 hover:bg-[#172e60]/80'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* FAQ Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          {filteredCategories
            .filter(category => category.id === activeCategory)
            .map(category => (
              <motion.div key={category.id} variants={itemVariants} className="space-y-4">
                {category.questions.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border backdrop-blur-sm overflow-hidden ${
                      isDarkTheme
                        ? 'bg-[#172e60]/60 border-blue-900/60'
                        : 'bg-white/70 border-blue-200/50'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(category.id, index)}
                      className={`flex items-center justify-between w-full p-6 text-left font-medium ${
                        isDarkTheme ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          openItems[`${category.id}-${index}`] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {openItems[`${category.id}-${index}`] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`border-t ${
                            isDarkTheme ? 'border-blue-900/60' : 'border-blue-200/50'
                          }`}
                        >
                          <div className={`p-6 ${isDarkTheme ? 'text-blue-200' : 'text-blue-600'}`}>
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            ))}
        </motion.div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
          className={`mt-20 rounded-2xl p-8 ${
            isDarkTheme
              ? 'bg-gradient-to-r from-blue-700 to-blue-800'
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className={`text-2xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-white'}`}>
                Still have questions?
              </h2>
              <p className={isDarkTheme ? 'text-blue-100' : 'text-blue-100'}>
                Our support team is here to help you with any questions
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${
                isDarkTheme
                  ? 'bg-white text-blue-700 hover:bg-slate-100'
                  : 'bg-white text-blue-600 hover:bg-slate-100'
              }`}>
                <MessageCircle className="w-5 h-5" />
                Live Chat
              </button>
              <button className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-medium ${
                isDarkTheme
                  ? 'border-white text-white hover:bg-white/10'
                  : 'border-white text-white hover:bg-white/20'
              }`}>
                <Mail className="w-5 h-5" />
                Email Support
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;