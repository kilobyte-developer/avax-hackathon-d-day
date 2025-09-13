// src/components/home/HowItWorksSection.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  Award,
  Play,
  Quote,
  Star,
  Zap,
  Shield,
  Clock,
  Globe,
  CreditCard,
  PieChart,
  TrendingUp,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useInView } from "react-intersection-observer";

// Import partner logos
import binanceLogo from "../assets/binance.png";
import chainlinkLogo from "../assets/chainlink.png";
import polygonLogo from "../assets/polygon.png";
import avalancheLogo from "../assets/avalanche.png";
import solanaLogo from "../assets/solana.jpeg";

const AnimatedSection = ({ children, direction = "left", delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getTransform = () => {
    switch (direction) {
      case "left": return "translateX(-100px)";
      case "right": return "translateX(100px)";
      case "up": return "translateY(100px)";
      case "down": return "translateY(-100px)";
      default: return "translateX(-100px)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0, 0)" : getTransform(),
        transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const HowItWorksSection = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [activeAccount, setActiveAccount] = useState(0);
  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const cardInterval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 4000);

    const accountInterval = setInterval(() => {
      setActiveAccount((prev) => (prev + 1) % 3);
    }, 3500);

    return () => {
      clearInterval(cardInterval);
      clearInterval(accountInterval);
    };
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frequent Traveler",
      content:
        "I've never experienced such seamless travel insurance. The automatic payout when my flight was delayed saved me hours of paperwork.",
      rating: 5,
      avatar: "SC",
    },
    {
      name: "Michael Rodriguez",
      role: "Business Executive",
      content:
        "As someone who travels weekly, DeFi Travel Shield has been a game-changer. The transparency and speed are unmatched.",
      rating: 5,
      avatar: "MR",
    },
    {
      name: "Emily Watson",
      role: "Digital Nomad",
      content:
        "Finally, travel insurance that understands the modern traveler. The NFT-based policies are brilliant and so easy to manage.",
      rating: 5,
      avatar: "EW",
    },
  ];

  const partners = [
    { name: "Binance", logo: binanceLogo },
    { name: "Chainlink", logo: chainlinkLogo },
    { name: "Polygon", logo: polygonLogo },
    { name: "Avalanche", logo: avalancheLogo },
    { name: "Solana", logo: solanaLogo },
  ];

  const steps = [
    {
      number: "1",
      title: "Connect Your Wallet",
      description:
        "Sign up in seconds by connecting your Web3 wallet to get started with borderless coverage.",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      number: "2",
      title: "Choose Your Coverage",
      description:
        "Select from flexible plans including flight delay, baggage loss, or comprehensive travel protection.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      number: "3",
      title: "Get Instant Protection",
      description:
        "Your policy is issued instantly as an NFT, with automated payouts triggered by real-world events.",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  const cards = [
    {
      type: "Credit Card",
      number: "4878 0140 2074 0587",
      name: "John Carter",
      expiry: "07/24",
      balance: "$24,190.87",
      description:
        "Access your funds anywhere in the world with our premium travel-friendly credit card with no foreign transaction fees.",
      gradient: isDarkTheme
        ? "from-blue-600 to-blue-500"
        : "from-blue-500 to-blue-400",
    },
    {
      type: "Premium Card",
      number: "5567 8923 4512 3789",
      name: "Alex Morgan",
      expiry: "11/25",
      balance: "$32,560.45",
      description:
        "Premium benefits including travel insurance, airport lounge access, and exclusive travel rewards.",
      gradient: isDarkTheme
        ? "from-blue-700 to-blue-600"
        : "from-blue-600 to-blue-500",
    },
    {
      type: "Business Card",
      number: "3782 4635 1298 6547",
      name: "Taylor Swift",
      expiry: "03/26",
      balance: "$68,120.90",
      description:
        "Designed for business travelers with enhanced coverage limits and multi-currency support.",
      gradient: isDarkTheme
        ? "from-blue-800 to-blue-700"
        : "from-blue-700 to-blue-600",
    },
  ];

  const accounts = [
    {
      title: "Checking Account",
      description:
        "Manage your daily finances with our premium checking account offering competitive interest rates and global access.",
      balance: "$85,420.15",
      gradient: isDarkTheme
        ? "from-blue-600 to-blue-500"
        : "from-blue-500 to-blue-400",
    },
    {
      title: "Investment Account",
      description:
        "Grow your wealth with our expertly curated investment portfolios designed for long-term financial success.",
      balance: "$142,650.78",
      gradient: isDarkTheme
        ? "from-blue-700 to-blue-600"
        : "from-blue-600 to-blue-500",
    },
    {
      title: "Wealth Management",
      description:
        "Personalized wealth management services for high-net-worth individuals seeking comprehensive financial planning.",
      balance: "$325,890.42",
      gradient: isDarkTheme
        ? "from-blue-800 to-blue-700"
        : "from-blue-700 to-blue-600",
    },
  ];

  const transactions = [
    { name: "Facebook Ad", date: "Jun 28, 2023", amount: "-$1,408.89" },
    { name: "Stripe Payment", date: "Jun 22, 2023", amount: "+$58,905.69" },
    { name: "Twitter Ad", date: "Jun 16, 2023", amount: "-$54,070.09" },
    { name: "Dividend Payment", date: "Jun 18, 2023", amount: "+$52,870.99" },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "text-yellow-400 fill-current"
            : isDarkTheme
            ? "text-blue-400"
            : "text-blue-600"
        }`}
      />
    ));
  };

  // Theme-based colors
  const bgGradient = isDarkTheme
    ? "bg-gradient-to-b from-[#030B1D] to-[#030B1D]"
    : "bg-gradient-to-b from-blue-50 to-slate-100";

  const textColor = isDarkTheme ? "text-blue-300" : "text-slate-700";
  const headingGradient = isDarkTheme
    ? "bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400"
    : "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600";

  const cardBg = isDarkTheme
    ? "bg-[#172E60]/20 border-blue-500/30"
    : "bg-white/80 border-blue-400/30";

  const cardTextColor = isDarkTheme ? "text-white" : "text-blue-800";

  return (
    <section className={`relative py-20 px-6 ${bgGradient} overflow-hidden`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg6MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-10" />
      {isDarkTheme && (
        <>
          <div className="absolute top-1/4 -left-40 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-40 w-80 h-80 bg-blue-600 opacity-10 rounded-full blur-3xl" />
        </>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* How It Works Section */}
        <div className="mb-20">
          <AnimatedSection direction="down" className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-light mb-6 bg-clip-text text-transparent ${headingGradient}`}
            >
              How It Works
            </h2>
            <p className={`text-xl ${textColor} max-w-2xl mx-auto`}>
              Simple, transparent, and automated protection for your travels
              powered by DeFi
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left side - Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <AnimatedSection
                  key={index}
                  direction="left"
                  delay={index * 200}
                  className={`flex items-start space-x-6 p-6 rounded-2xl backdrop-blur-sm hover:border-blue-400/30 transition-all duration-300 ${cardBg} border`}
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                  <div>
                    <div
                      className={`text-sm ${
                        isDarkTheme ? "text-blue-400" : "text-blue-600"
                      } mb-1`}
                    >
                      Step {step.number}
                    </div>
                    <h3
                      className={`text-xl font-medium ${
                        isDarkTheme ? "text-white" : "text-slate-900"
                      } mb-2`}
                    >
                      {step.title}
                    </h3>
                    <p className={textColor}>{step.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Right side - Interactive Card Display */}
            <AnimatedSection direction="right" delay={300} className="relative h-[500px] flex items-center justify-center">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`absolute w-96 h-56 rounded-2xl p-8 transform transition-all duration-700 ease-in-out ${
                    index === activeCard
                      ? "opacity-100 scale-100 rotate-0 z-30 shadow-2xl"
                      : index < activeCard
                      ? "opacity-30 -translate-x-24 scale-90 -rotate-12 z-10 blur-sm"
                      : "opacity-30 translate-x-24 scale-90 rotate-12 z-10 blur-sm"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    backgroundImage: `linear-gradient(135deg, ${card.gradient
                      .split(" ")
                      .join(", ")})`,
                  }}
                >
                  <div className={cardTextColor}>
                    <div className="text-sm opacity-80 mb-2">{card.type}</div>
                    <div className="text-2xl font-medium mb-4">
                      {card.balance}
                    </div>
                    <div className="text-xl tracking-wider mb-6 font-mono">
                      {card.number}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs opacity-80">Card Holder</div>
                        <div className="text-base font-medium">{card.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-80">Expires</div>
                        <div className="text-base font-medium">
                          {card.expiry}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Card description below the card */}
              <div className="absolute bottom-0 left-0 right-0 text-center mt-4">
                <p
                  className={`text-lg font-medium ${
                    isDarkTheme ? "text-blue-300" : "text-blue-700"
                  }`}
                >
                  {cards[activeCard].description}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <AnimatedSection direction="down" className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-light mb-6 bg-clip-text text-transparent ${headingGradient}`}
            >
              Trusted by Travelers Worldwide
            </h2>
            <p className={`text-xl ${textColor} max-w-2xl mx-auto`}>
              Join thousands of satisfied customers who have experienced the
              future of travel insurance
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection
                key={index}
                direction="up"
                delay={index * 200}
                className={`rounded-2xl p-8 backdrop-blur-lg hover:border-blue-400/30 transition-all duration-300 group border ${cardBg}`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div
                      className={`font-medium ${
                        isDarkTheme ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className={`${
                        isDarkTheme ? "text-blue-400" : "text-blue-600"
                      } text-sm`}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <Quote
                  className={`w-6 h-6 mb-4 opacity-60 ${
                    isDarkTheme ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <p className={`${textColor} mb-6 italic`}>
                  "{testimonial.content}"
                </p>

                <div className="flex">{renderStars(testimonial.rating)}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Account Types Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Left side - Account Cards with animation */}
          <AnimatedSection direction="left" className="relative h-[600px]">
            {accounts.map((account, index) => (
              <div
                key={index}
                className={`absolute w-full p-8 rounded-2xl backdrop-blur-sm transform transition-all duration-700 ease-in-out border ${cardBg} ${
                  index === activeAccount
                    ? "opacity-100 translate-y-0 scale-100 z-30"
                    : index < activeAccount
                    ? "opacity-30 -translate-y-16 scale-90 z-10 blur-sm"
                    : "opacity-30 translate-y-16 scale-90 z-10 blur-sm"
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <h3
                    className={`text-2xl font-medium ${
                      isDarkTheme ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {account.title}
                  </h3>
                  <div
                    className={`text-3xl font-bold bg-gradient-to-r ${account.gradient} bg-clip-text text-transparent`}
                  >
                    {account.balance}
                  </div>
                </div>
                <p className={`${textColor} mb-6 text-lg`}>
                  {account.description}
                </p>
                <div
                  className={`flex items-center ${
                    isDarkTheme ? "text-blue-400" : "text-blue-600"
                  } text-lg`}
                >
                  <span className="font-medium">View details</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </div>

                {/* Additional account details to fill space */}
                <div className="mt-7.5 pt-6 pb-5.5 border-t border-blue-500/20">
                  <h4
                    className={`text-lg font-medium ${
                      isDarkTheme ? "text-blue-300" : "text-blue-700"
                    } mb-5.5`}
                  >
                    Account Features
                  </h4>

                  <div className="grid grid-cols-2 gap-4 mb-7.5">
                    <div
                      className={`p-3 rounded-xl ${
                        isDarkTheme ? "bg-blue-800/20" : "bg-blue-100/50"
                      }`}
                    >
                      <div
                        className={`text-sm ${
                          isDarkTheme ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        Interest Rate
                      </div>
                      <div
                        className={`text-xl font-bold ${
                          isDarkTheme ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {index === 0 ? "2.5%" : index === 1 ? "5.8%" : "7.2%"}
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded-xl ${
                        isDarkTheme ? "bg-blue-800/20" : "bg-blue-100/50"
                      }`}
                    >
                      <div
                        className={`text-sm ${
                          isDarkTheme ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        Monthly Growth
                      </div>
                      <div
                        className={`text-xl font-bold ${
                          isDarkTheme ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {index === 0
                          ? "+$420"
                          : index === 1
                          ? "+$1,240"
                          : "+$2,890"}
                      </div>
                    </div>
                  </div>

                  {/* Rewards & Benefits section */}
                  <h4
                    className={`text-lg font-medium ${
                      isDarkTheme ? "text-blue-300" : "text-blue-700"
                    } mb-5.5`}
                  >
                    Rewards & Benefits
                  </h4>
                  <ul className={`space-y-2 ${textColor}`}>
                    <li>✔ Cashback on global purchases</li>
                    <li>✔ Complimentary airport lounge access</li>
                    <li>✔ Free international ATM withdrawals</li>
                  </ul>

                  {/* Security & Access section */}
                  <div className="mt-7.5">
                    <h4
                      className={`text-lg font-medium ${
                        isDarkTheme ? "text-blue-300" : "text-blue-700"
                      } mb-5.5`}
                    >
                      Security & Access
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`p-3 rounded-xl ${
                          isDarkTheme ? "bg-blue-800/20" : "bg-blue-100/50"
                        }`}
                      >
                        <div
                          className={`text-sm ${
                            isDarkTheme ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          2FA Protection
                        </div>
                        <div
                          className={`text-base font-medium ${
                            isDarkTheme ? "text-white" : "text-slate-900"
                          }`}
                        >
                          Enabled
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-xl ${
                          isDarkTheme ? "bg-blue-800/20" : "bg-blue-100/50"
                        }`}
                      >
                        <div
                          className={`text-sm ${
                            isDarkTheme ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          Mobile Access
                        </div>
                        <div
                          className={`text-base font-medium ${
                            isDarkTheme ? "text-white" : "text-slate-900"
                          }`}
                        >
                          24/7
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </AnimatedSection>

          {/* Right side - Transaction History */}
          <AnimatedSection direction="right" delay={200} className={`rounded-2xl p-8 backdrop-blur-sm border ${cardBg}`}>
            <h3
              className={`text-2xl font-medium ${
                isDarkTheme ? "text-white" : "text-slate-900"
              } mb-5 flex items-center`}
            >
              <TrendingUp
                className={`w-6 h-6 mr-2 ${
                  isDarkTheme ? "text-blue-400" : "text-blue-600"
                }`}
              />
              Portfolio Overview
            </h3>

            <div className="mb-7">
              <div className="flex justify-between items-center mb-4">
                <div
                  className={isDarkTheme ? "text-blue-400" : "text-blue-600"}
                >
                  Total Balance
                </div>
                <div
                  className={`text-3xl font-bold ${
                    isDarkTheme ? "text-white" : "text-slate-900"
                  }`}
                >
                  $180,210.32
                </div>
              </div>
              <div className="flex space-x-2 mb-5">
                {["TD", "TN", "GM", "TV", "3Y"].map((item, i) => (
                  <div
                    key={i}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      isDarkTheme
                        ? "bg-blue-700/50 text-blue-400"
                        : "bg-blue-200/50 text-blue-700"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <h4
              className={`text-lg font-medium ${
                isDarkTheme ? "text-white" : "text-slate-900"
              } mb-4`}
            >
              Recent Transactions
            </h4>
            <div className="space-y-3.5">
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    isDarkTheme ? "bg-blue-800/20" : "bg-blue-100/50"
                  }`}
                >
                  <div>
                    <div
                      className={`font-medium ${
                        isDarkTheme ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {transaction.name}
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkTheme ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {transaction.date}
                    </div>
                  </div>
                  <div
                    className={`font-medium ${
                      transaction.amount.startsWith("+")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional content */}
            <div className="mt-7 pt-5 border-t border-blue-500/20">
              <h4
                className={`text-lg font-medium ${
                  isDarkTheme ? "text-white" : "text-slate-900"
                } mb-4`}
              >
                Performance Summary
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    isDarkTheme ? "bg-blue-800/20" : "bg-blue-100/50"
                  }`}
                >
                  <div
                    className={`text-sm ${
                      isDarkTheme ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    Monthly Return
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      isDarkTheme ? "text-white" : "text-slate-900"
                    }`}
                  >
                    +4.2%
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl ${
                    isDarkTheme ? "bg-blue-800/20" : "bg-blue-100/50"
                  }`}
                >
                  <div
                    className={`text-sm ${
                      isDarkTheme ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    YTD Growth
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      isDarkTheme ? "text-white" : "text-slate-900"
                    }`}
                  >
                    +18.7%
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Partners Section */}
        <div className="mb-20">
          <AnimatedSection direction="down" className="text-center mb-12">
            <h2
              className={`text-3xl font-light mb-4 bg-clip-text text-transparent ${headingGradient}`}
            >
              Trusted by Industry Leaders
            </h2>
            <p className={textColor}>
              We partner with the best in the industry
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {partners.map((partner, index) => (
              <AnimatedSection
                key={index}
                direction="up"
                delay={index * 100}
                className={`rounded-2xl p-6 border backdrop-blur-sm text-center hover:border-blue-400/30 transition-all duration-300 group flex items-center justify-center ${
                  isDarkTheme ? "bg-[#172E60]/30" : "bg-white/80"
                }`}
              >
                <img
  src={partner.logo}
  alt={partner.name}
  className={`h-10 object-contain transition-all ${
    isDarkTheme ? "invert brightness-200" : "opacity-80"
  } group-hover:opacity-100`}
/>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* CTA Section at the bottom */}
        <AnimatedSection direction="up" delay={200} className={`rounded-2xl p-12 text-center ${
          isDarkTheme ? "bg-[#172E60]/30" : "bg-white/80"
        } border ${
          isDarkTheme ? "border-blue-500/30" : "border-blue-400/30"
        }`}>
          <h2
            className={`text-3xl md:text-4xl font-light mb-6 bg-clip-text text-transparent ${headingGradient}`}
          >
            Ready to Get Started?
          </h2>
          <p className={`text-xl ${textColor} max-w-2xl mx-auto mb-8`}>
            Join thousands of travelers who have already experienced the future
            of travel insurance
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-500 overflow-hidden font-medium text-white transform hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)",
              boxShadow:
                "0 20px 40px rgba(37, 99, 235, 0.4), 0 8px 16px rgba(29, 78, 216, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(96, 165, 250, 0.4)",
            }}
          >
            <Sparkles className="w-5 h-5 relative z-10 text-blue-100" />
            <span className="relative z-10">Get Protected Now</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300 text-blue-100" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HowItWorksSection;