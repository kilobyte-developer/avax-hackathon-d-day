import React, { useState } from 'react';
import { Eye, Download, Calendar, FileText, Shield, Menu, X } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';

const Policies = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('policies');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dashboardTheme') || 'dark';
    }
    return 'dark';
  });

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [modalType, setModalType] = useState(null); // "details" or "certificate"

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

  // Theme constants
  const LIGHT_PANEL_BG = "bg-[#f8fafc]";
  const LIGHT_CARD_BORDER = "border-[#E2E8F0]";
  const LIGHT_HEADER_TEXT = "text-[#293549]";
  const LIGHT_LABEL_TEXT = "text-[#6782a0]";
  const LIGHT_MAIN_TEXT = "text-[#38537a]";

  const policies = [
    {
      id: 1,
      type: 'FLIGHT_DELAY',
      flight: 'BA 249',
      route: 'LHR → JFK',
      departure: '2024-03-15 14:30',
      coverage: '$250',
      premium: '$12.50',
      status: 'active',
      policyNumber: 'POL-001234',
      startDate: '2024-03-15',
      endDate: '2024-03-16'
    },
    {
      id: 2,
      type: 'BAGGAGE',
      flight: 'DL 89',
      route: 'ATL → CDG',
      departure: '2024-03-20 09:15',
      coverage: '$500',
      premium: '$8.75',
      status: 'active',
      policyNumber: 'POL-001235',
      startDate: '2024-03-20',
      endDate: '2024-03-21'
    },
    {
      id: 3,
      type: 'MEDICAL',
      flight: 'UA 456',
      route: 'SFO → LHR',
      departure: '2024-02-10 16:45',
      coverage: '$2,000',
      premium: '$25.00',
      status: 'expired',
      policyNumber: 'POL-001236',
      startDate: '2024-02-10',
      endDate: '2024-02-17'
    },
    {
      id: 4,
      type: 'TRIP_CANCELLATION',
      flight: 'AA 789',
      route: 'DFW → CDG',
      departure: '2024-01-05 11:20',
      coverage: '$1,500',
      premium: '$18.50',
      status: 'claimed',
      policyNumber: 'POL-001237',
      startDate: '2024-01-05',
      endDate: '2024-01-06'
    }
  ];

  const filteredPolicies = policies.filter((p) => activeFilter === 'all' || p.status === activeFilter);

  const getStatusIcon = (status) => {
    const colors = {
      active: 'bg-green-400',
      expired: 'bg-gray-400',
      claimed: 'bg-blue-400'
    };
    return <div className={`w-2 h-2 rounded-full ${colors[status] || 'bg-gray-400'}`} />;
  };

  const getStatusColor = (status) => {
    const map = {
      active: theme === 'light' ? 'text-green-700 bg-green-100' : 'text-green-400 bg-green-400/10',
      expired: theme === 'light' ? 'text-gray-700 bg-gray-100' : 'text-gray-400 bg-gray-400/10',
      claimed: theme === 'light' ? 'text-blue-700 bg-blue-100' : 'text-blue-400 bg-blue-400/10',
    };
    return map[status] || (theme === 'light' ? 'text-gray-700 bg-gray-100' : 'text-gray-400 bg-gray-400/10');
  };

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

          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-4xl font-light mb-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 bg-clip-text text-transparent">
                Policies
              </h1>
              <p className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-200'}>
                View and manage all your insurance policies
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className={`flex space-x-1 rounded-xl p-1 border backdrop-blur-sm mb-8 ${
            theme === 'light'
              ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER}`
              : 'bg-slate-800/50 border-slate-700/30'
          }`}>
            {['all', 'active', 'expired', 'claimed'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 capitalize ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white'
                    : theme === 'light'
                      ? 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                      : 'text-blue-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Policies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredPolicies.map((policy) => (
              <div key={policy.id} className={`rounded-2xl p-6 border backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 ${
                theme === 'light'
                  ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER}`
                  : 'bg-slate-800/50 border-slate-700/50'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      theme === 'light' ? 'bg-blue-100' : 'bg-blue-600/20'
                    }`}>
                      <Shield className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
                        {policy.type.replace('_', ' ')}
                      </h3>
                      <p className={`text-sm ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>{policy.policyNumber}</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(policy.status)}`}>
                    {getStatusIcon(policy.status)}
                    <span className="text-sm capitalize">{policy.status}</span>
                  </div>
                </div>

                {/* Policy details */}
                <div className={`space-y-3 text-sm mb-6 ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>
                  <div className="flex justify-between"><span>Flight</span><span>{policy.flight}</span></div>
                  <div className="flex justify-between"><span>Route</span><span>{policy.route}</span></div>
                  <div className="flex justify-between"><span>Departure</span><span>{policy.departure}</span></div>
                  <div className="flex justify-between"><span>Coverage</span><span>{policy.coverage}</span></div>
                  <div className="flex justify-between"><span>Premium</span><span>{policy.premium}</span></div>
                  <div className="flex justify-between"><span>Duration</span><span>{policy.startDate} → {policy.endDate}</span></div>
                </div>

                {/* Buttons */}
                <div className={`flex space-x-2 pt-4 border-t ${theme === 'light' ? 'border-[#e3e6ea]' : 'border-slate-600/30'}`}>
                  <button
                    onClick={() => { setSelectedPolicy(policy); setModalType('details'); }}
                    className="flex-1 px-4 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Eye className="w-4 h-4" /><span>Details</span>
                  </button>
                  <button
                    onClick={() => { setSelectedPolicy(policy); setModalType('certificate'); }}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 border ${
                      theme === 'light'
                        ? 'bg-[#e6ecf3] border-[#d2d7dd] text-blue-600 hover:text-blue-700 hover:bg-[#dee2e6]'
                        : 'bg-slate-600/50 border-slate-500/30 text-blue-300 hover:text-white hover:bg-slate-600/30'
                    }`}
                  >
                    <Download className="w-4 h-4" /><span>Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selectedPolicy && modalType && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
              <div className={`w-full max-w-lg rounded-2xl shadow-xl p-6 relative ${
                theme === 'light' ? 'bg-white text-[#293549]' : 'bg-slate-900 text-white'
              }`}>
                <button onClick={() => { setSelectedPolicy(null); setModalType(null); }}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-700/30">
                  <X className="w-5 h-5" />
                </button>

                {modalType === 'details' ? (
                  <>
                    <h2 className="text-2xl font-semibold mb-4">Policy Details</h2>
                    <ul className="space-y-2">
                      <li><strong>Policy Number:</strong> {selectedPolicy.policyNumber}</li>
                      <li><strong>Type:</strong> {selectedPolicy.type.replace('_', ' ')}</li>
                      <li><strong>Flight:</strong> {selectedPolicy.flight}</li>
                      <li><strong>Route:</strong> {selectedPolicy.route}</li>
                      <li><strong>Departure:</strong> {selectedPolicy.departure}</li>
                      <li><strong>Coverage:</strong> {selectedPolicy.coverage}</li>
                      <li><strong>Premium:</strong> {selectedPolicy.premium}</li>
                      <li><strong>Duration:</strong> {selectedPolicy.startDate} → {selectedPolicy.endDate}</li>
                      <li><strong>Status:</strong> {selectedPolicy.status}</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold mb-4">Policy Certificate</h2>
                    <p className="mb-4">Download the certificate for <strong>{selectedPolicy.policyNumber}</strong>.</p>
                    <button
                      onClick={() => alert(`Downloading certificate for ${selectedPolicy.policyNumber}`)}
                      className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Download PDF
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Policies;
