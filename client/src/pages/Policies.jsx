import React, { useState, useEffect } from 'react';
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
  const [userPolicies, setUserPolicies] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Load policies from localStorage on component mount
  useEffect(() => {
    loadUserPolicies();
  }, []);



  const loadUserPolicies = () => {
    try {
      // Get policies from localStorage
      const checkoutHistory = JSON.parse(localStorage.getItem('checkoutHistory') || '[]');
      const latestCheckout = JSON.parse(localStorage.getItem('latestCheckout') || 'null');
      
      // Combine all policies (history + latest)
      let allPolicies = [...checkoutHistory];
      if (latestCheckout && !checkoutHistory.some(policy => 
        policy.policyNumber === latestCheckout.policyNumber)) {
        allPolicies.push(latestCheckout);
      }
      
      // Transform checkout data into policy format
      const policies = allPolicies.map((checkout, index) => {
        // Determine status based on dates
        const today = new Date();
        const endDate = new Date(checkout.returnDate);
        const isExpired = today > endDate;
        const status = isExpired ? 'expired' : 'active';
        
        // Generate a policy number if not exists
        const policyNumber = checkout.policyNumber || `POL-${Date.now().toString().slice(-6)}-${index}`;
        
        // Extract flight info from flightNumber (assuming format like "BA 249")
        const flightParts = checkout.flightNumber ? checkout.flightNumber.split(' ') : ['', ''];
        const airline = flightParts[0] || 'Unknown';
        const flightNum = flightParts[1] || '000';

        // make random route for demo purposes random 2 cities from the list of cities
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'San Francisco', 'Seattle', 'Boston', 'Denver', 'Atlanta'];
        const route = `${cities[Math.floor(Math.random() * cities.length)]} → ${cities[Math.floor(Math.random() * cities.length)]}`;
        
        return {
          id: index + 1,
          type: checkout.selectedPackage?.type || 'FLIGHT_DELAY',
          flight: checkout.flightNumber || 'N/A',
          route: route,
          departure: checkout.bookingDate ? new Date(checkout.bookingDate).toLocaleString() : 'Unknown',
          coverage: `$${checkout.selectedPackage?.coverage || '0'}`,
          premium: `${checkout.selectedPackage?.premium || '0'} AVAX`,
          status: status,
          policyNumber: policyNumber,
          startDate: checkout.bookingDate || 'Unknown',
          endDate: checkout.returnDate || 'Unknown',
          // Include all checkout data for details view
          checkoutData: checkout
        };
      });
      
      setUserPolicies(policies);
    } catch (error) {
      console.error('Error loading policies from localStorage:', error);
      setUserPolicies([]);
    }
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

  // Theme constants
  const LIGHT_PANEL_BG = "bg-[#f8fafc]";
  const LIGHT_CARD_BORDER = "border-[#E2E8F0]";
  const LIGHT_HEADER_TEXT = "text-[#293549]";
  const LIGHT_LABEL_TEXT = "text-[#6782a0]";
  const LIGHT_MAIN_TEXT = "text-[#38537a]";

  const filteredPolicies = userPolicies.filter((p) => activeFilter === 'all' || p.status === activeFilter);

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

  const downloadCertificate = (policy) => {
    // Create a simple PDF certificate content
    const certificateContent = `
      INSURANCE POLICY CERTIFICATE
      =============================
      
      Policy Number: ${policy.policyNumber}
      Type: ${policy.type.replace('_', ' ')}
      Flight: ${policy.flight}
      Coverage: ${policy.coverage}
      Premium: ${policy.premium}
      Period: ${policy.startDate} to ${policy.endDate}
      Status: ${policy.status}
      
      Insured Person:
      Name: ${policy.checkoutData.name}
      Email: ${policy.checkoutData.email}
      Phone: ${policy.checkoutData.phone}
      
      Terms and Conditions:
      This policy provides coverage according to the terms specified
      during purchase. Please refer to your policy documents for
      complete details.
      
      Issued on: ${new Date().toLocaleDateString()}
    `;
    
    // Create a blob and download link
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `policy-certificate-${policy.policyNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            <button
              onClick={loadUserPolicies}
              className="mt-4 lg:mt-0 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Refresh Policies
            </button>
          </div>

          {/* Empty state */}
          {userPolicies.length === 0 && (
            <div className={`rounded-2xl p-8 text-center border backdrop-blur-sm ${
              theme === 'light'
                ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER}`
                : 'bg-slate-800/50 border-slate-700/50'
            }`}>
              <Shield className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold mb-2">No Policies Found</h3>
              <p className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}>
                You haven't purchased any insurance policies yet.
              </p>
              <button
                onClick={() => window.location.href = '/dashboard/store'}
                className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Browse Insurance Plans
              </button>
            </div>
          )}

          {/* Filter Tabs (only show if there are policies) */}
          {userPolicies.length > 0 && (
            <>
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
                        onClick={() => downloadCertificate(policy)}
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
            </>
          )}

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
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div><strong>Policy Number:</strong></div>
                        <div>{selectedPolicy.policyNumber}</div>
                        
                        <div><strong>Type:</strong></div>
                        <div>{selectedPolicy.type.replace('_', ' ')}</div>
                        
                        <div><strong>Flight:</strong></div>
                        <div>{selectedPolicy.flight}</div>
                        
                        <div><strong>Route:</strong></div>
                        <div>{selectedPolicy.route}</div>
                        
                        <div><strong>Departure:</strong></div>
                        <div>{selectedPolicy.departure}</div>
                        
                        <div><strong>Coverage:</strong></div>
                        <div>{selectedPolicy.coverage}</div>
                        
                        <div><strong>Premium:</strong></div>
                        <div>{selectedPolicy.premium}</div>
                        
                        <div><strong>Duration:</strong></div>
                        <div>{selectedPolicy.startDate} → {selectedPolicy.endDate}</div>
                        
                        <div><strong>Status:</strong></div>
                        <div className="capitalize">{selectedPolicy.status}</div>
                      </div>
                      
                      <div className="pt-4 mt-4 border-t">
                        <h3 className="font-semibold mb-2">Insured Person</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div><strong>Name:</strong></div>
                          <div>{selectedPolicy.checkoutData.name}</div>
                          
                          <div><strong>Email:</strong></div>
                          <div>{selectedPolicy.checkoutData.email}</div>
                          
                          <div><strong>Phone:</strong></div>
                          <div>{selectedPolicy.checkoutData.phone}</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold mb-4">Policy Certificate</h2>
                    <p className="mb-4">Download the certificate for <strong>{selectedPolicy.policyNumber}</strong>.</p>
                    <button
                      onClick={() => downloadCertificate(selectedPolicy)}
                      className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    > Download Certificate</button>
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