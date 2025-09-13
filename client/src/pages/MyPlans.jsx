import React, { useState } from 'react';
import {
  Eye,
  Download,
  Calendar,
  MapPin,
  Shield,
  Zap,
  Clock,
  Menu,
  X
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';

const MyPlans = () => {
  const [activePlans] = useState([
    {
      id: 1,
      name: 'Global Travel Pro',
      type: 'COMPREHENSIVE',
      coverage: '$10,000',
      premium: '$89.99',
      status: 'active',
      period: 'Monthly',
      renewal: '2024-04-15',
      features: ['Flight Delay', 'Baggage Loss', 'Medical', 'Trip Cancellation'],
      progress: 60,
      description: 'A comprehensive global travel insurance plan offering strong medical and trip protection.',
      provider: 'WorldSafe Insurance Ltd.',
      hotline: '+1 800 123 4567',
    },
    {
      id: 2,
      name: 'Business Traveler',
      type: 'BUSINESS',
      coverage: '$15,000',
      premium: '$129.99',
      status: 'active',
      period: 'Quarterly',
      renewal: '2024-06-20',
      features: ['Priority Support', 'Lounge Access', 'Premium Medical', 'Device Coverage'],
      progress: 30,
      description: 'Tailored for frequent business travelers with premium perks and device protection.',
      provider: 'BizProtect Assurance Inc.',
      hotline: '+44 20 7946 1234',
    }
  ]);

  // State for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('my-plans');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dashboardTheme') || 'dark';
    }
    return 'dark';
  });

  // Modal state
  const [selectedPlan, setSelectedPlan] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

  // Theme-specific classes
  const LIGHT_PANEL_BG = "bg-[#f8fafc]";
  const LIGHT_CARD_BORDER = "border-[#E2E8F0]";
  const LIGHT_HEADER_TEXT = "text-[#293549]";
  const LIGHT_LABEL_TEXT = "text-[#6782a0]";
  const LIGHT_MAIN_TEXT = "text-[#38537a]";

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
              <h1 className={`text-4xl font-light mb-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 bg-clip-text text-transparent`}>
                My Plans
              </h1>
              <p className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-200'}>
                Manage your active insurance plans and coverage
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {activePlans.map((plan) => (
              <div key={plan.id} className={`rounded-2xl p-6 border backdrop-blur-sm ${
                theme === 'light' 
                  ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
                  : 'bg-slate-800/50 border-slate-700/50'
              }`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className={`text-2xl font-medium mb-1 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>{plan.name}</h2>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        theme === 'light' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-blue-600/20 text-blue-400'
                      }`}>
                        {plan.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        theme === 'light' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-green-400/10 text-green-400'
                      }`}>
                        {plan.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>{plan.coverage}</div>
                    <div className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}>Coverage</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className={`text-sm mb-1 ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Premium</div>
                    <div className={`font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>{plan.premium}</div>
                  </div>
                  <div>
                    <div className={`text-sm mb-1 ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Billing Period</div>
                    <div className={`font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>{plan.period}</div>
                  </div>
                  <div>
                    <div className={`text-sm mb-1 ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Renewal Date</div>
                    <div className={`font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>{plan.renewal}</div>
                  </div>
                  <div>
                    <div className={`text-sm mb-1 ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Plan ID</div>
                    <div className={`font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>PLN-{plan.id.toString().padStart(4, '0')}</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className={`flex justify-between text-sm mb-2 ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>
                    <span>Plan active</span>
                    <span>{plan.progress}%</span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${
                    theme === 'light' ? 'bg-[#e3e6ea]' : 'bg-slate-600/30'
                  }`}>
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className={`text-lg font-medium mb-3 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Coverage Includes</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className={`flex items-center space-x-2 text-sm ${
                        theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'
                      }`}>
                        <Shield className={`w-4 h-4 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`flex space-x-3 pt-4 border-t ${
                  theme === 'light' ? 'border-[#e3e6ea]' : 'border-slate-600/30'
                }`}>
                  <button 
                    onClick={() => setSelectedPlan(plan)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors ${
                      theme === 'light' 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className={`flex-1 px-4 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 border transition-colors ${
                    theme === 'light' 
                      ? 'bg-[#e6ecf3] border-[#d2d7dd] text-blue-600 hover:text-blue-700 hover:bg-[#dee2e6]' 
                      : 'bg-slate-600/50 border-slate-500/30 text-blue-300 hover:text-white hover:bg-slate-600/30'
                  }`}>
                    <Download className="w-4 h-4" />
                    <span>Documents</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Features */}
          <div className={`mt-12 rounded-2xl p-6 border backdrop-blur-sm ${
            theme === 'light' 
              ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
              : 'bg-slate-800/50 border-slate-700/50'
          }`}>
            <h2 className={`text-2xl font-medium mb-6 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Plan Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  theme === 'light' ? 'bg-blue-100' : 'bg-blue-600/20'
                }`}>
                  <Zap className={`w-6 h-6 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                </div>
                <h3 className={`text-lg font-medium mb-2 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Instant Payouts</h3>
                <p className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}>
                  Automated claims processing with payouts in under 60 seconds
                </p>
              </div>
              <div className="text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  theme === 'light' ? 'bg-blue-100' : 'bg-blue-600/20'
                }`}>
                  <MapPin className={`w-6 h-6 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                </div>
                <h3 className={`text-lg font-medium mb-2 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Global Coverage</h3>
                <p className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}>
                  Protection that travels with you anywhere in the world
                </p>
              </div>
              <div className="text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                  theme === 'light' ? 'bg-blue-100' : 'bg-blue-600/20'
                }`}>
                  <Clock className={`w-6 h-6 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                </div>
                <h3 className={`text-lg font-medium mb-2 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>24/7 Support</h3>
                <p className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}>
                  Round-the-clock assistance whenever you need it
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for View Details */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-lg rounded-2xl p-6 relative ${
            theme === 'light'
              ? 'bg-white text-[#293549]'
              : 'bg-slate-800 text-white'
          }`}>
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedPlan.name}</h2>
            <p className="mb-4">{selectedPlan.description}</p>

            <div className="space-y-3">
              <p><strong>Provider:</strong> {selectedPlan.provider}</p>
              <p><strong>Hotline:</strong> {selectedPlan.hotline}</p>
              <p><strong>Coverage:</strong> {selectedPlan.coverage}</p>
              <p><strong>Premium:</strong> {selectedPlan.premium}</p>
              <p><strong>Period:</strong> {selectedPlan.period}</p>
              <p><strong>Renewal:</strong> {selectedPlan.renewal}</p>
              <p><strong>Status:</strong> {selectedPlan.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlans;
