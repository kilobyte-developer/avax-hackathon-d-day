import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, Shield, ArrowRight, Menu, X } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import { useNavigate } from "react-router-dom";

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('store');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dashboardTheme') || 'dark';
    }
    return 'dark';
  });

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [insurancePackages, setInsurancePackages] = useState([]); 
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/packages');
        const result = Array.isArray(res.data) ? res.data : res.data.data || [];
        setInsurancePackages(result);
        console.log("Fetched packages:", result);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    localStorage.setItem('dashboardTheme', newTheme);
  };

  // Theme classes
  const LIGHT_PANEL_BG = "bg-[#f8fafc]";
  const LIGHT_CARD_BORDER = "border-[#E2E8F0]";
  const LIGHT_HEADER_TEXT = "text-[#293549]";
  const LIGHT_LABEL_TEXT = "text-[#6782a0]";
  const LIGHT_MAIN_TEXT = "text-[#38537a]";

  const categories = [
    { id: 'all', name: 'All Packages' },
    { id: 'flight', name: 'Flight Protection' },
    { id: 'baggage', name: 'Baggage Protection' },
    { id: 'comprehensive', name: 'Comprehensive' },
    { id: 'medical', name: 'Medical' }
  ];

  const filteredPackages =
    selectedCategory === 'all'
      ? insurancePackages
      : insurancePackages.filter(pkg => pkg.category === selectedCategory);

  return (
    <div className={`min-h-screen flex ${
      theme === 'light'
        ? 'bg-gradient-to-br from-[#F3F6F9] via-[#e8eef3] to-[#F3F6F9] text-[#38537a]'
        : 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white'
    }`}>
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Main Content */}
      <div className="flex-1 py-8 px-6 lg:ml-0">
        <div className="max-w-7xl mx-auto">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className={`lg:hidden mb-6 p-2 rounded-lg ${
              theme === 'light'
                ? 'bg-[#e6ecf3] border border-[#d2d7dd] text-[#38537a]'
                : 'bg-slate-800/50 border border-slate-700/50 text-blue-300'
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-4xl font-light mb-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 bg-clip-text text-transparent">
                Insurance Store
              </h1>
              <p className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-200'}>
                Choose the perfect protection for your travels
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : theme === 'light'
                      ? 'bg-[#e6ecf3] text-blue-600 hover:text-blue-700 hover:bg-blue-100'
                      : 'bg-slate-800/50 text-blue-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Packages Grid */}
          {loading ? (
            <p className="text-center text-gray-400">Loading packages...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <div key={pkg._id || pkg.id} className={`rounded-2xl border backdrop-blur-sm overflow-hidden hover:border-blue-500/30 transition-all duration-300 group ${
                  theme === 'light'
                    ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                    : 'bg-slate-800/50 border-slate-700/50'
                }`}>
                  {/* Card header */}
                  <div className="relative h-48 overflow-hidden bg-blue-900/20">
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      theme === 'light' ? 'from-[#f8fafc]' : 'from-slate-900'
                    } to-transparent`}></div>
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                      theme === 'light' ? 'bg-blue-600 text-white' : 'bg-blue-600/90 text-white'
                    }`}>
                      {pkg.category}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className={`text-xl font-semibold mb-1 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>{pkg.name}</h3>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className={`text-sm mb-1 ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Coverage</div>
                        <div className={`font-semibold ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>{pkg.coverage}</div>
                      </div>
                      <div>
                        <div className={`text-sm mb-1 ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Premium</div>
                        <div className="text-green-400 font-semibold">{pkg.premium}</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {pkg.features?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className={`text-sm ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Get Protected Button */}
                    <button
                      onClick={() => setSelectedPackage(pkg)}
                      className={`w-full py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 ${
                        theme === 'light'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <Shield className="w-5 h-5" />
                      <span>Get Protected</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          {selectedPackage && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
              <div className={`relative w-full max-w-lg rounded-2xl shadow-xl p-6 ${
                theme === 'light'
                  ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border`
                  : 'bg-slate-800 border border-slate-700'
              }`}>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className={`text-2xl font-semibold mb-4 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
                  {selectedPackage.name}
                </h2>

                <p className={`mb-4 ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>
                  Coverage: <span className="font-semibold">{selectedPackage.coverage}</span> | Premium: <span className="text-green-400 font-semibold">{selectedPackage.premium}</span>
                </p>

                <ul className="space-y-2 mb-6">
                  {selectedPackage.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className={`${theme === 'light' ? LIGHT_MAIN_TEXT : 'text-white'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    localStorage.setItem("selectedPackage", JSON.stringify(selectedPackage));
                    navigate(`/dashboard/store/checkout/${selectedPackage._id || selectedPackage.id}`);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Store;