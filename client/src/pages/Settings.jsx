import React, { useState } from 'react';
import { Save, Bell, Shield, User, CreditCard, Download, Trash2, Menu } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsAlerts: false,
    twoFactorAuth: true,
    autoRenewal: true,
    currency: 'USD',
    language: 'English'
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dashboardTheme') || 'dark';
    }
    return 'dark';
  });

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

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
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
        <div className="max-w-4xl mx-auto">
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

          <div className="mb-8">
            <h1 className="text-4xl font-light mb-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-200'}>Manage your account preferences and security settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Notification Settings */}
            <div className={`rounded-2xl p-6 border backdrop-blur-sm ${
              theme === 'light' 
                ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
                : 'bg-slate-800/50 border-slate-700/50'
            }`}>
              <h2 className={`text-xl font-semibold mb-6 flex items-center ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
                <Bell className={`w-5 h-5 mr-2 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                Notifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Email Notifications</div>
                    <div className={`text-sm ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Receive important updates via email</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      theme === 'light' 
                        ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                        : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                    }`}></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Push Notifications</div>
                    <div className={`text-sm ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Get alerts on your device</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      theme === 'light' 
                        ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                        : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                    }`}></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>SMS Alerts</div>
                    <div className={`text-sm ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Receive text message alerts</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smsAlerts}
                      onChange={(e) => handleSettingChange('smsAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      theme === 'light' 
                        ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                        : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                    }`}></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className={`rounded-2xl p-6 border backdrop-blur-sm ${
              theme === 'light' 
                ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
                : 'bg-slate-800/50 border-slate-700/50'
            }`}>
              <h2 className={`text-xl font-semibold mb-6 flex items-center ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
                <Shield className={`w-5 h-5 mr-2 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                Security
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Two-Factor Authentication</div>
                    <div className={`text-sm ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Add an extra layer of security</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      theme === 'light' 
                        ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                        : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                    }`}></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Auto Policy Renewal</div>
                    <div className={`text-sm ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>Automatically renew active policies</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoRenewal}
                      onChange={(e) => handleSettingChange('autoRenewal', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                      theme === 'light' 
                        ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                        : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                    }`}></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className={`rounded-2xl p-6 border backdrop-blur-sm ${
              theme === 'light' 
                ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
                : 'bg-slate-800/50 border-slate-700/50'
            }`}>
              <h2 className={`text-xl font-semibold mb-6 flex items-center ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
                <User className={`w-5 h-5 mr-2 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                Preferences
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={`font-medium mb-2 block ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                    className={`w-full rounded-xl px-4 py-2 border ${
                      theme === 'light' 
                        ? 'bg-white border-[#E2E8F0] text-[#38537a]' 
                        : 'bg-slate-700/50 border-slate-600/30 text-white'
                    }`}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>

                <div>
                  <label className={`font-medium mb-2 block ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className={`w-full rounded-xl px-4 py-2 border ${
                      theme === 'light' 
                        ? 'bg-white border-[#E2E8F0] text-[#38537a]' 
                        : 'bg-slate-700/50 border-slate-600/30 text-white'
                    }`}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className={`rounded-2xl p-6 border backdrop-blur-sm ${
              theme === 'light' 
                ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
                : 'bg-slate-800/50 border-slate-700/50'
            }`}>
              <h2 className={`text-xl font-semibold mb-6 flex items-center ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
                <CreditCard className={`w-5 h-5 mr-2 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                Account Actions
              </h2>
              <div className="space-y-3">
                <button className={`w-full flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-[#e6ecf3] border-[#d2d7dd] text-blue-600 hover:text-blue-700 hover:bg-[#dee2e6]' 
                    : 'bg-slate-700/30 border-slate-600/30 text-blue-300 hover:text-white hover:bg-slate-700/50 hover:border-blue-400'
                }`}>
                  <Download className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                  <span>Export Data</span>
                </button>
                
                <button className={`w-full flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-[#e6ecf3] border-[#d2d7dd] text-blue-600 hover:text-blue-700 hover:bg-[#dee2e6]' 
                    : 'bg-slate-700/30 border-slate-600/30 text-blue-300 hover:text-white hover:bg-slate-700/50 hover:border-blue-400'
                }`}>
                  <span className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}>📋</span>
                  <span>Request Data Report</span>
                </button>
                
                <button className={`w-full flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 ${
                  theme === 'light' 
                    ? 'bg-red-100 border-red-200 text-red-600 hover:bg-red-200' 
                    : 'bg-red-600/20 border-red-600/30 text-red-400 hover:text-red-300 hover:bg-red-600/30'
                }`}>
                  <Trash2 className="w-5 h-5" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2 ${
              theme === 'light' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}>
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;