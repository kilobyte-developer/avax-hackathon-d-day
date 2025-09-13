import React, { useState } from 'react';
import { Bell, Check, Settings, Trash2, Filter, Clock, Mail, MessageSquare, Menu } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Policy Purchase Successful',
      message: 'Your flight delay protection for BA 249 has been activated',
      type: 'purchase',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Payout Processed',
      message: 'Your claim for $250 has been paid to your wallet',
      type: 'payout',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      title: 'New Feature Available',
      message: 'Medical coverage is now available for all travel plans',
      type: 'system',
      time: '2 days ago',
      read: true
    },
    {
      id: 4,
      title: 'Policy Expiring Soon',
      message: 'Your baggage protection for DL 89 expires in 3 days',
      type: 'reminder',
      time: '3 days ago',
      read: false
    },
    {
      id: 5,
      title: 'Wallet Connected',
      message: 'MetaMask wallet has been successfully connected',
      type: 'wallet',
      time: '1 week ago',
      read: true
    }
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('notifications');
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

  const filters = [
    { id: 'all', name: 'All Notifications' },
    { id: 'unread', name: 'Unread' },
    { id: 'purchase', name: 'Purchases' },
    { id: 'payout', name: 'Payouts' },
    { id: 'system', name: 'System' }
  ];

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : activeFilter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === activeFilter);

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'purchase': return '🛒';
      case 'payout': return '💰';
      case 'system': return '⚙️';
      case 'reminder': return '⏰';
      case 'wallet': return '💳';
      default: return '🔔';
    }
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

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-4xl font-light mb-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 bg-clip-text text-transparent">
                Notifications
              </h1>
              <p className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-200'}>Manage your alerts and notification preferences</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={markAllAsRead}
                className={`px-4 py-2 rounded-xl text-sm flex items-center space-x-2 transition-colors border ${
                  theme === 'light' 
                    ? 'bg-[#e6ecf3] border-[#d2d7dd] text-blue-600 hover:text-blue-700 hover:bg-[#dee2e6]' 
                    : 'bg-slate-700/50 border-slate-600/30 text-blue-300 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>Mark all as read</span>
              </button>
              <button
                onClick={clearAll}
                className={`px-4 py-2 rounded-xl text-sm flex items-center space-x-2 transition-colors border ${
                  theme === 'light' 
                    ? 'bg-red-100 border-red-200 text-red-600 hover:bg-red-200' 
                    : 'bg-red-600/20 border-red-600/30 text-red-400 hover:text-red-300 hover:bg-red-600/30'
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear all</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : theme === 'light'
                      ? 'bg-[#e6ecf3] text-blue-600 hover:text-blue-700 hover:bg-blue-100'
                      : 'bg-slate-800/50 text-blue-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className={`rounded-2xl border backdrop-blur-sm overflow-hidden ${
            theme === 'light' 
              ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
              : 'bg-slate-800/50 border-slate-700/50'
          }`}>
            {filteredNotifications.length > 0 ? (
              <div className={`divide-y ${
                theme === 'light' ? 'divide-[#e3e6ea]' : 'divide-slate-700/30'
              }`}>
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-6 transition-all duration-300 ${
                      notification.read 
                        ? theme === 'light' ? 'bg-[#F3F6F9]' : 'bg-slate-800/30'
                        : theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className={`text-lg font-medium mb-1 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>{notification.title}</h3>
                          <div className={`text-sm flex items-center ${
                            theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                          }`}>
                            <Clock className="w-4 h-4 mr-1" />
                            {notification.time}
                          </div>
                        </div>
                        <p className={`mb-4 ${theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-300'}`}>{notification.message}</p>
                        <div className="flex items-center space-x-3">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className={`text-sm flex items-center space-x-1 ${
                                theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
                              }`}
                            >
                              <Check className="w-4 h-4" />
                              <span>Mark as read</span>
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className={`text-sm flex items-center space-x-1 ${
                              theme === 'light' ? 'text-red-600 hover:text-red-700' : 'text-red-400 hover:text-red-300'
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className={`w-16 h-16 mx-auto mb-4 opacity-50 ${
                  theme === 'light' ? 'text-blue-500' : 'text-blue-400'
                }`} />
                <h3 className={`text-lg font-medium mb-2 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-blue-300'}`}>No notifications</h3>
                <p className={theme === 'light' ? LIGHT_LABEL_TEXT : 'text-blue-400'}>You're all caught up!</p>
              </div>
            )}
          </div>

          {/* Notification Settings */}
          <div className={`mt-8 rounded-2xl p-6 border backdrop-blur-sm ${
            theme === 'light' 
              ? `${LIGHT_PANEL_BG} ${LIGHT_CARD_BORDER} border` 
              : 'bg-slate-800/50 border-slate-700/50'
          }`}>
            <h2 className={`text-xl font-semibold mb-6 flex items-center ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>
              <Settings className={`w-5 h-5 mr-2 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
              Notification Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                      <span className={theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}>Email Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        theme === 'light' 
                          ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                          : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                      }`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                      <span className={theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}>Push Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        theme === 'light' 
                          ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                          : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                      }`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className={`w-5 h-5 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`} />
                      <span className={theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}>SMS Alerts</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        theme === 'light' 
                          ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                          : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                      }`}></div>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}`}>Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}>Policy Updates</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        theme === 'light' 
                          ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                          : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                      }`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}>Payout Alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        theme === 'light' 
                          ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                          : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                      }`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}>Promotional Offers</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        theme === 'light' 
                          ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                          : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                      }`}></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={theme === 'light' ? LIGHT_HEADER_TEXT : 'text-white'}>Security Alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        theme === 'light' 
                          ? 'bg-gray-300 peer-checked:bg-blue-600 after:bg-white after:border-gray-300' 
                          : 'bg-slate-600 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
                      }`}></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;