import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  Shield,
  Zap,
  Wallet,
  Download,
  Eye,
  BarChart3,
  Calendar,
  ArrowRight,
  Receipt,
  Menu,
  Plus,
  Bell,
  Search,
  Globe,
  BookOpen,
} from "lucide-react";
import DashboardSidebar from "../components/DashboardSidebar";
import MyPlans from "./MyPlans";
import Policies from "./Policies";
import Store from "./Store";
import SettingsPage from "./Settings";
import WalletPage from "./Wallet";
import NotificationsPage from "./Notifications";
import globalcoverage from "../assets/globalcoverage.jpeg";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // SOFT light theme palette: bg-[#F3F6F9], cards bg-[#f8fafc], border-[#E2E8F0], text-[#293549]
  const LIGHT_PANEL_BG = "bg-[#f8fafc]";
  const LIGHT_CARD_BORDER = "border-[#E2E8F0]";
  const LIGHT_HEADER_TEXT = "text-[#293549]";
  const LIGHT_LABEL_TEXT = "text-[#6782a0]";
  const LIGHT_MAIN_TEXT = "text-[#38537a]";

  // Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dashboardTheme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem("dashboardTheme", theme);
  }, [theme]);

  const [activePolicies] = useState([
    {
      id: 1,
      type: "FLIGHT_DELAY",
      flight: "BA 249",
      route: "LHR → JFK",
      departure: "2024-03-15 14:30",
      coverage: "$250",
      premium: "$12.50",
      status: "active",
      policyNumber: "POL-001234",
      startDate: "2024-03-15",
      endDate: "2024-03-16",
      progress: 75,
    },
    {
      id: 2,
      type: "BAGGAGE",
      flight: "DL 89",
      route: "ATL → CDG",
      departure: "2024-03-20 09:15",
      coverage: "$500",
      premium: "$8.75",
      status: "active",
      policyNumber: "POL-001235",
      startDate: "2024-03-20",
      endDate: "2024-03-21",
      progress: 40,
    },
  ]);

  const [recentPayouts] = useState([
    {
      id: 1,
      type: "FLIGHT_DELAY",
      amount: "$250",
      date: "2024-02-28",
      flight: "AA 123",
      status: "completed",
      transactionHash: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
    {
      id: 2,
      type: "BAGGAGE",
      amount: "$180",
      date: "2024-02-15",
      flight: "UA 456",
      status: "completed",
      transactionHash: "0x8932a5Cc6634C0532925a3b844Bc454e4438f44e",
    },
  ]);

  const [walletBalance] = useState({
    total: 3245.8,
    usdc: 1845.3,
    usdt: 1400.5,
    busd: 0,
  });

  const [policyStats, setPolicyStats] = useState({
    active: 2,
    totalPayouts: 1430,
    avgPayoutTime: 58,
    claimsRatio: 0.12,
    totalSaved: 420,
    totalCoverage: 2750,
  });

  const [notifications] = useState([
    {
      id: 1,
      title: "New Policy Feature",
      message: "Medical coverage now available for all travel plans",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Payout Processed",
      message: "Your claim for flight DL 89 has been paid",
      time: "1 day ago",
      read: true,
    },
  ]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("my-plans")) setActiveTab("my-plans");
    else if (path.includes("policies")) setActiveTab("policies");
    else if (path.includes("store")) setActiveTab("store");
    else if (path.includes("settings")) setActiveTab("settings");
    else if (path.includes("wallet")) setActiveTab("wallet");
    else if (path.includes("notifications")) setActiveTab("notifications");
    else setActiveTab("dashboard");
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPolicyStats({
        active: 2,
        totalPayouts: 1430,
        avgPayoutTime: 58,
        claimsRatio: 0.12,
        totalSaved: 420,
        totalCoverage: 2750,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);

  const toggleSidebar = () => setSidebarOpen((o) => !o);
  const toggleNotifications = () => {
    setNotificationsOpen((o) => !o);
    setSearchOpen(false);
  };
  const toggleSearch = () => {
    setSearchOpen((o) => !o);
    setNotificationsOpen(false);
  };
  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };
  const handleThemeChange = (newTheme) => setTheme(newTheme);

  // ---- Custom Card for Filling Space in the Left Column ----
  const TravelTipsCard = () => (
    <div
      className={`
        ${theme === "light"
          ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
          : "bg-slate-800/50 border border-slate-700/50"}
        rounded-2xl p-6 h-full flex flex-col justify-between transition-all duration-300
      `}
    >
      <div className="flex items-center mb-3">
        <BookOpen
          className={`w-6 h-6 mr-2 ${
            theme === "light" ? "text-blue-400" : "text-blue-300"
          }`}
        />
        <h3 className={`text-lg font-medium ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>Travel Tips for You</h3>
      </div>
      <ul className="flex-1 list-disc ml-6 space-y-2 text-sm">
        <li className={theme === "light" ? LIGHT_MAIN_TEXT : "text-blue-200"}>Keep copies of your documents in a safe place.</li>
        <li className={theme === "light" ? LIGHT_MAIN_TEXT : "text-blue-200"}>Check the local weather before your trip.</li>
        <li className={theme === "light" ? LIGHT_MAIN_TEXT : "text-blue-200"}>Exchange some currency in advance for emergencies.</li>
        <li className={theme === "light" ? LIGHT_MAIN_TEXT : "text-blue-200"}>Enable notifications for important policy updates.</li>
      </ul>
      <div className="flex items-center mt-5">
        <Globe className={`w-5 h-5 ${theme === "light" ? "text-blue-400" : "text-blue-300"}`} />
        <span className={`ml-2 text-xs ${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"}`}>
          Safe travels from InsureX!
        </span>
      </div>
    </div>
  );

  // ---- Main Render ----
  const renderContent = () => {
    if (location.pathname !== "/dashboard") {
      return (
        <Routes>
          <Route path="/dashboard/my-plans" element={<MyPlans theme={theme} />} />
          <Route path="/dashboard/policies" element={<Policies theme={theme} />} />
          <Route path="/dashboard/store" element={<Store theme={theme} />} />
          <Route path="/dashboard/settings" element={<SettingsPage theme={theme} />} />
          <Route path="/dashboard/wallet" element={<WalletPage theme={theme} />} />
          <Route
            path="/dashboard/notifications"
            element={<NotificationsPage theme={theme} />}
          />
        </Routes>
      );
    }

    return (
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="hidden lg:block">
            <h1
              className={`text-4xl font-light mb-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 bg-clip-text text-transparent`}
            >
              Dashboard Overview
            </h1>
            <p className={theme === "light" ? `${LIGHT_LABEL_TEXT}` : "text-blue-200"}>
              Manage your travel protection policies and track payouts
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div
              className={`
                ${theme === "light"
                  ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                  : "bg-slate-800/50 border border-slate-700/30"}
                rounded-xl px-4 py-3 min-w-[200px] flex-1 lg:flex-none
              `}
            >
              <div className={`text-sm mb-1 ${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-400"}`}>Total Balance</div>
              <div className={`text-xl font-medium ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>
                {formatCurrency(walletBalance.total)}
              </div>
              <div className={`text-xs mt-1 ${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-400"}`}>
                USDC: {formatCurrency(walletBalance.usdc)} • USDT: {formatCurrency(walletBalance.usdt)}
              </div>
            </div>
            {/* Theme Switcher in header */}
            <div
              className={`grid grid-cols-2 rounded-xl border p-2 gap-2 
                ${theme === "light"
                  ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER}`
                  : "bg-slate-800/50 border-slate-700/30"}
              `}
            >
              {["dark", "light"].map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => handleThemeChange(themeOption)}
                  className={`p-2 rounded-lg text-xs capitalize transition-colors w-full ${
                    theme === themeOption
                      ? "bg-blue-600 text-white"
                      : theme === "dark"
                        ? "bg-slate-700/50 text-blue-300 hover:bg-slate-600/50"
                        : "bg-[#f8fafc] text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {themeOption}
                </button>
              ))}
            </div>
            <button
              onClick={() => handleNavigation("/dashboard/store")}
              className={`
                px-6 py-3 rounded-xl flex items-center space-x-2 w-full lg:w-auto justify-center transition-all duration-300
                ${theme === "light"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"} 
              `}
            >
              <Plus className="w-4 h-4" />
              <span>New Policy</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            {
              icon: <Shield className="w-5 h-5 text-blue-400" />,
              trailing: <Zap className="w-5 h-5 text-green-400" />,
              value: policyStats.active,
              label: "Active Policies",
            },
            {
              icon: <Wallet className="w-5 h-5 text-blue-400" />,
              trailing: <Zap className="w-5 h-5 text-green-400" />,
              value: formatCurrency(policyStats.totalPayouts),
              label: "Total Payouts",
            },
            {
              icon: <Zap className="w-5 h-5 text-blue-400" />,
              trailing: <span className="w-5 h-5"></span>,
              value: `<${policyStats.avgPayoutTime}s`,
              label: "Avg. Payout Time",
            },
            {
              icon: <BarChart3 className="w-5 h-5 text-blue-400" />,
              trailing: <span className="w-5 h-5"></span>,
              value: formatCurrency(policyStats.totalSaved),
              label: "Total Saved",
            },
            {
              icon: <BarChart3 className="w-5 h-5 text-blue-400" />,
              trailing: <span className="w-5 h-5"></span>,
              value: formatCurrency(policyStats.totalCoverage),
              label: "Total Coverage",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`
                ${theme === "light"
                  ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                  : "bg-slate-800/50 border border-slate-700/50"}
                rounded-xl p-6 backdrop-blur-sm hover:border-blue-400 transition-all duration-300 group
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                  {item.icon}
                </div>
                {item.trailing}
              </div>
              <div className={`text-2xl font-medium mb-1 ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>
                {item.value}
              </div>
              <div className={`text-sm ${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-400"}`}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Active Policies + Filler */}
          <div className="space-y-8 flex flex-col h-full lg:col-span-2">
            <div
              className={`
                ${theme === "light"
                  ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                  : "bg-slate-800/50 border border-slate-700/50"}
                rounded-2xl p-6 backdrop-blur-sm
              `}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-medium ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>Active Policies</h2>
                <div className={`${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-400"} text-sm`}>
                  {activePolicies.length} of {activePolicies.length} policies
                </div>
              </div>
              <div className="space-y-4">
                {activePolicies.map((policy) => (
                  <div
                    key={policy.id}
                    className={`
                      ${theme === "light"
                        ? "bg-[#F3F6F9] border border-[#e3e6ea]"
                        : "bg-slate-700/30 border border-slate-600/30"}
                      rounded-xl p-6 hover:border-blue-400 transition-all duration-300 group
                    `}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`text-lg font-medium ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>
                            {policy.type === "FLIGHT_DELAY"
                              ? "Flight Delay Protection"
                              : "Baggage Protection"}
                          </h3>
                          <div className="flex items-center space-x-2 bg-green-400/10 px-3 py-1 rounded-full">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-green-400 text-sm">Active</span>
                          </div>
                        </div>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"}`}>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Departs: {policy.departure}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>Flight: {policy.flight}</span>
                            <span>•</span>
                            <span>{policy.route}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>Policy: {policy.policyNumber}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>Coverage: {policy.coverage}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className={`flex justify-between text-xs mb-1 ${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"}`}>
                        <span>Policy active</span>
                        <span>{policy.progress}%</span>
                      </div>
                      <div className={`${theme === "light" ? "bg-[#e3e6ea]" : "bg-slate-600/30"} w-full rounded-full h-2`}>
                        <div
                          className={`bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${policy.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={`flex justify-between items-center pt-4 border-t ${theme === "light" ? "border-[#e3e6ea]" : "border-slate-600/30"}`}>
                      <div className={`${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-400"} text-sm`}>
                        Premium:{" "}
                        <span className={theme === "light" ? LIGHT_HEADER_TEXT : "text-white font-medium"}>
                          {policy.premium}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleNavigation("/dashboard/policies")}
                          className={`px-4 py-2 rounded-lg text-sm flex items-center space-x-2
                            ${theme === "light"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-blue-600 text-white hover:bg-blue-700"}
                          `}
                        >
                          <Eye className="w-4 h-4" />
                          <span>Details</span>
                        </button>
                        <button
                          className={`px-4 py-2 rounded-lg text-sm flex items-center space-x-2 border
                            ${theme === "light"
                              ? "bg-[#e3e6ea] border-[#d2d7dd] text-blue-600 hover:text-blue-700 hover:bg-[#dee2e6]"
                              : "bg-slate-600/50 border-slate-500/30 text-blue-300 hover:text-white hover:bg-slate-600/30"}
                          `}
                        >
                          <Download className="w-4 h-4" />
                          <span>Receipt</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Filler: If less than 3 policies, fill with travel tips */}
                {activePolicies.length < 3 && (
                  <TravelTipsCard />
                )}
              </div>
              {activePolicies.length === 0 && (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
                  <h3 className={`text-lg font-medium mb-2 ${theme === "light" ? LIGHT_HEADER_TEXT : "text-blue-300"}`}>No active policies</h3>
                  <p className={`${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-400"} mb-6`}>
                    Get protected with our travel insurance products
                  </p>
                  <button
                    onClick={() => handleNavigation("/dashboard/store")}
                    className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl transition-all
                      ${theme === "light"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"}
                    `}
                  >
                    <span>Browse Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            {/* Filler to keep left column always full height, even when few policies */}
            <div className="hidden lg:block flex-1 min-h-[242px]">
              <TravelTipsCard />
            </div>
          </div>

          {/* Right Column - Activity, More */}
          <div className="space-y-8 flex flex-col h-full">
            {/* Recent Payouts */}
            <div
              className={`
                ${theme === "light"
                  ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                  : "bg-slate-800/50 border border-slate-700/50"}
                rounded-2xl p-6 backdrop-blur-sm
              `}
            >
              <h2 className={`text-xl font-medium mb-6 ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>Recent Payouts</h2>
              <div className="space-y-4">
                {recentPayouts.map((payout) => (
                  <div
                    key={payout.id}
                    className={`
                      ${theme === "light"
                        ? "bg-[#F3F6F9] border border-[#e3e6ea]"
                        : "bg-slate-700/30 border border-slate-600/30"}
                      rounded-xl p-4 hover:border-blue-400 transition-all duration-300
                    `}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className={`text-md font-medium mb-1 ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>
                          {payout.type === "FLIGHT_DELAY" ? "Flight Delay" : "Baggage"} Payout
                        </h3>
                        <div className={`${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"} text-sm`}>
                          Flight {payout.flight} • {payout.date}
                        </div>
                      </div>
                      <div className="bg-green-400/10 px-2 py-1 rounded-full">
                        <span className="text-green-400 text-xs">Completed</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-medium text-green-400">{payout.amount}</div>
                      <button className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                        View Tx
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {recentPayouts.length === 0 && (
                <div className="text-center py-8">
                  <Receipt className="w-12 h-12 text-blue-400 mx-auto mb-3 opacity-50" />
                  <p className={`${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-400"} text-sm`}>No recent payouts</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div
              className={`
                ${theme === "light"
                  ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                  : "bg-slate-800/50 border border-slate-700/50"}
                rounded-2xl p-6
              `}
            >
              <h2 className={`text-xl font-medium mb-6 ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleNavigation("/dashboard/store")}
                  className={`
                    flex items-center space-x-3 p-3 rounded-xl border w-full transition-all duration-300
                    ${theme === "light"
                      ? "bg-[#F3F6F9] border-[#e3e6ea] text-blue-700 hover:bg-blue-100"
                      : "bg-slate-700/30 border-slate-600/30 text-blue-200 hover:text-white hover:bg-slate-700/50 hover:border-blue-400"}
                  `}
                >
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span>Buy New Policy</span>
                </button>
                <button
                  onClick={() => handleNavigation("/dashboard/wallet")}
                  className={`
                    flex items-center space-x-3 p-3 rounded-xl border w-full transition-all duration-300
                    ${theme === "light"
                      ? "bg-[#F3F6F9] border-[#e3e6ea] text-blue-700 hover:bg-blue-100"
                      : "bg-slate-700/30 border-slate-600/30 text-blue-200 hover:text-white hover:bg-slate-700/50 hover:border-blue-400"}
                  `}
                >
                  <Wallet className="w-5 h-5 text-blue-400" />
                  <span>Add Funds</span>
                </button>
                <button
                  onClick={() => handleNavigation("/dashboard/policies")}
                  className={`
                    flex items-center space-x-3 p-3 rounded-xl border w-full transition-all duration-300
                    ${theme === "light"
                      ? "bg-[#F3F6F9] border-[#e3e6ea] text-blue-700 hover:bg-blue-100"
                      : "bg-slate-700/30 border-slate-600/30 text-blue-200 hover:text-white hover:bg-slate-700/50 hover:border-blue-400"}
                  `}
                >
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span>View All Policies</span>
                </button>
              </div>
            </div>

            {/* Global Coverage Image */}
            <div
              className={`
                ${theme === "light"
                  ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                  : "bg-slate-800/50 border border-slate-700/50"}
                rounded-2xl p-4
              `}
            >
              <img
                src={globalcoverage}
                alt="Global Coverage"
                className="w-full h-32 object-cover rounded-xl mb-4"
              />
              <h3 className={`text-lg font-medium mb-2 ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>Worldwide Protection</h3>
              <p className={`${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"} text-sm`}>
                Your coverage travels with you, anywhere in the world
              </p>
            </div>
          </div>
        </div>

        {/* Additional Metrics Section */}
        <div
          className={`
            mt-12 rounded-2xl p-6
            ${theme === "light"
              ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
              : "bg-slate-800/50 border border-slate-700/50"}
          `}
        >
          <h2 className={`text-2xl font-medium mb-6 ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>Coverage Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">92%</div>
              <div className={`${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"}`}>Claim Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">58s</div>
              <div className={`${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"}`}>Average Payout Speed</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>150+</div>
              <div className={`${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"}`}>Countries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className={`${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"}`}>Support Available</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ---------- Outer Dashboard Structure ----------
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        theme === "light"
          ? "from-[#F3F6F9] via-[#e8eef3] to-[#F3F6F9] text-[#38537a]"
          : "from-slate-900 via-slate-950 to-slate-900 text-white"
      } flex`}
    >
      <DashboardSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onThemeChange={handleThemeChange}
      />
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Mobile Header */}
        <div
          className={`lg:hidden flex items-center justify-between p-6 border-b backdrop-blur-sm ${
            theme === "light" ? "bg-[#f8fafc] border-[#e3e6ea]" : "bg-slate-800/50 border-slate-700/30"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg transition-colors ${
              theme === "light"
                ? "bg-[#e6ecf3] hover:bg-[#dde7f3]"
                : "bg-slate-700/50 hover:bg-slate-600/50"
            }`}
            aria-label="Open sidebar"
          >
            <Menu className={`${theme === "light" ? "text-[#38537a]" : "text-blue-300"} w-6 h-6`} />
          </button>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
            {activeTab === "dashboard"
              ? "Dashboard"
              : activeTab === "my-plans"
              ? "My Plans"
              : activeTab === "policies"
              ? "Policies"
              : activeTab === "store"
              ? "Store"
              : activeTab === "settings"
              ? "Settings"
              : activeTab === "wallet"
              ? "Wallet"
              : activeTab === "notifications"
              ? "Notifications"
              : "Dashboard"}
          </h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSearch}
              className={`p-2 rounded-lg transition-colors ${
                theme === "light" ? "bg-[#e6ecf3] hover:bg-[#dde7f3]" : "bg-slate-700/50 hover:bg-slate-600/50"
              }`}
              aria-label="Toggle search"
            >
              <Search className={`${theme === "light" ? "text-[#38537a]" : "text-blue-300"} w-5 h-5`} />
            </button>
            <button
              onClick={toggleNotifications}
              className={`p-2 rounded-lg transition-colors relative ${
                theme === "light" ? "bg-[#e6ecf3] hover:bg-[#dde7f3]" : "bg-slate-700/50 hover:bg-slate-600/50"
              }`}
              aria-label="Toggle notifications"
            >
              <Bell className={`${theme === "light" ? "text-[#38537a]" : "text-blue-300"} w-5 h-5`} />
              {notifications.filter((n) => !n.read).length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications.filter((n) => !n.read).length}
                </div>
              )}
            </button>
          </div>
        </div>
        {/* Search Overlay */}
        {searchOpen && (
          <div
            className={`lg:hidden p-4 border-b backdrop-blur-sm ${
              theme === "light" ? "bg-[#f8fafc] border-[#e3e6ea]" : "bg-slate-800/95 border-slate-700/30"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Search className={`${theme === "light" ? "text-[#38537a]" : "text-blue-300"} w-5 h-5`} />
              <input
                type="text"
                placeholder="Search policies, transactions..."
                className={`flex-1 bg-transparent outline-none ${
                  theme === "light" ? "placeholder-[#b4c2ce] text-[#38537a]" : "placeholder-blue-300 text-white"
                }`}
              />
              <button onClick={toggleSearch} className={`${theme === "light" ? "text-[#38537a]" : "text-blue-300"}`}>✕</button>
            </div>
          </div>
        )}
        {/* Notifications Panel */}
        {notificationsOpen && (
          <div
            className={`lg:hidden border-b backdrop-blur-sm ${
              theme === "light" ? "bg-[#f8fafc] border-[#e3e6ea]" : "bg-slate-800/95 border-slate-700/30"
            }`}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className={`text-lg font-medium ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>Notifications</h3>
              <button onClick={toggleNotifications} className={`${theme === "light" ? LIGHT_HEADER_TEXT : "text-blue-300"}`}>✕</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b ${
                    !notification.read
                      ? theme === "light"
                        ? "bg-[#EDF2FA]"
                        : "bg-blue-900/20"
                      : ""
                  }`}
                >
                  <h4 className={`font-medium mb-1 ${theme === "light" ? LIGHT_HEADER_TEXT : "text-white"}`}>{notification.title}</h4>
                  <p className={`text-sm mb-2 ${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-300"}`}>{notification.message}</p>
                  <div className={`text-xs ${theme === "light" ? LIGHT_LABEL_TEXT : "text-blue-400"}`}>{notification.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Content */}
        <div className="flex-1 pt-6 pb-20 px-6 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
