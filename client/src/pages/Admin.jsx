// src/components/admin/Admin.js
import React, { useState } from 'react';
import { Shield, Users, TrendingUp, Settings, Bell, BarChart3 } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [systemHealth] = useState({
    oracles: 'Operational',
    contracts: 'Operational',
    liquidity: 'Healthy',
    api: 'Operational'
  });

  const recentActivities = [
    { action: 'Policy Created', user: '0x742d...f44e', time: '2 mins ago' },
    { action: 'Payout Processed', user: '0x8a3B...a3F1', time: '5 mins ago' },
    { action: 'Liquidity Added', user: '0x3B7C...2B3C', time: '15 mins ago' }
  ];

  const stats = {
    dailyPolicies: 142,
    dailyPayouts: '$28,500',
    activeUsers: 894,
    poolUtilization: '42%'
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white pt-32 pb-20 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-950 to-blue-900 opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-light mb-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-blue-200">Protocol management and monitoring</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-900/50 rounded-xl px-4 py-2 border border-blue-600/30">
              <div className="text-sm text-blue-400">System Status</div>
              <div className="text-green-400 font-medium">All Systems Operational</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-12">
          {['DASHBOARD', 'POLICIES', 'LIQUIDITY', 'ORACLES', 'SETTINGS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl border transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-transparent'
                  : 'text-blue-200 border-blue-600/30 hover:border-blue-400/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="lg:col-span-2">
            <div className="bg-blue-900/20 rounded-2xl p-8 border border-blue-600/30 backdrop-blur-sm mb-8">
              <h2 className="text-2xl font-medium text-white mb-6">Protocol Overview</h2>
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(stats).map(([key, value]) => (
                  <div key={key} className="bg-blue-800/20 rounded-xl p-6 border border-blue-600/20">
                    <div className="text-2xl font-medium text-white mb-2">{value}</div>
                    <div className="text-sm text-blue-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-blue-900/20 rounded-2xl p-8 border border-blue-600/30 backdrop-blur-sm">
              <h2 className="text-2xl font-medium text-white mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="bg-blue-800/20 rounded-xl p-4 border border-blue-600/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium">{activity.action}</div>
                        <div className="text-blue-300 text-sm">{activity.user}</div>
                      </div>
                      <div className="text-blue-400 text-sm">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - System Health */}
          <div className="lg:col-span-1">
            <div className="bg-blue-900/20 rounded-2xl p-8 border border-blue-600/30 backdrop-blur-sm mb-8">
              <h2 className="text-2xl font-medium text-white mb-6">System Health</h2>
              <div className="space-y-4">
                {Object.entries(systemHealth).map(([system, status]) => (
                  <div key={system} className="flex justify-between items-center py-3 border-b border-blue-600/20 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        status === 'Operational' || status === 'Healthy' 
                          ? 'bg-green-400' 
                          : 'bg-red-400'
                      }`}></div>
                      <span className="text-blue-200 capitalize">{system}</span>
                    </div>
                    <span className={`text-sm ${
                      status === 'Operational' || status === 'Healthy' 
                        ? 'text-green-400' 
                        : 'text-red-400'
                    }`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-900/20 rounded-2xl p-8 border border-blue-600/30 backdrop-blur-sm">
              <h2 className="text-2xl font-medium text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center space-x-3">
                  <Settings className="w-5 h-5" />
                  <span>Protocol Settings</span>
                </button>
                <button className="w-full px-4 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center space-x-3">
                  <Users className="w-5 h-5" />
                  <span>User Management</span>
                </button>
                <button className="w-full px-4 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5" />
                  <span>View Analytics</span>
                </button>
                <button className="w-full px-4 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors flex items-center space-x-3">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;