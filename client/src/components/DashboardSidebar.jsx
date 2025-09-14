import React from 'react';
import { 
  BarChart3, 
  Shield, 
  Package, 
  Settings, 
  LogOut, 
  Wallet,
  ChevronLeft,
  FileText,
  Bell
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardSidebar = ({ isOpen, toggleSidebar, setActiveTab, theme, onThemeChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: BarChart3, path: '/dashboard', description: 'Overview of your policies and activity' },
    { id: 'my-plans', title: 'My Plans', icon: Shield, path: '/dashboard/my-plans', description: 'Manage your active insurance plans' },
    { id: 'policies', title: 'Policies', icon: FileText, path: '/dashboard/policies', description: 'View and manage all policies' },
    { id: 'store', title: 'Store', icon: Package, path: '/dashboard/store', description: 'Browse and purchase insurance packages' },
  ];

  const settingsMenuItems = [
    { id: 'settings', title: 'Settings', icon: Settings, path: '/dashboard/settings', description: 'Account and app preferences' },
    { id: 'wallet', title: 'Wallet', icon: Wallet, path: '/dashboard/wallet', description: 'Manage connected wallets' },
    { id: 'notifications', title: 'Notifications', icon: Bell, path: '/dashboard/notifications', description: 'Manage alerts and preferences' },
  ];

  const handleNavigation = (path, tabId) => {
    setActiveTab(tabId);
    navigate(path);
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Add logout logic here
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen w-68
        bg-gradient-to-b ${theme === 'light'
          ? 'from-blue-100 to-gray-50 border-blue-200 shadow-blue-400/20'
          : 'from-slate-900 to-slate-950 border-slate-700/30 shadow-blue-900/50'
        }
        border-r transform transition-transform duration-300 z-50 shadow-2xl flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-0
      `}>
        {/* Header */}
        <div className={`
          p-3.5 border-b flex-shrink-0 flex items-center justify-between
          ${theme === 'light' ? 'border-blue-200' : 'border-slate-700/30'}
        `}>
          <div className="flex items-center space-x-3">
            <div className={`
              w-7.5 h-7.5 rounded-xl flex items-center justify-center
              ${theme === 'light'
                ? 'bg-blue-500' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700'
              }
            `}>
              <Shield className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h1 className={`text-base font-semibold ${theme === 'light' ? 'text-blue-800' : 'text-white'}`}>InsureX</h1>
              <p className={`${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} text-xs`}>DeFi Travel Protection</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className={`
              lg:hidden p-1.5 rounded-lg transition-colors
              ${theme === 'light' ? 'hover:bg-blue-100' : 'hover:bg-slate-700/50'}
            `}
            aria-label="Close sidebar"
          >
            <ChevronLeft className={theme === 'light' ? 'w-4 h-4 text-blue-600' : 'w-4 h-4 text-blue-400'} />
          </button>
        </div>
        
        {/* Navigation - Fixed height content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-2.5 space-y-2 overflow-hidden">
            {/* Main Navigation */}
            <div className="space-y-1.5">
              <p className={theme === 'light'
                ? 'text-blue-600 text-xs font-semibold uppercase tracking-wider px-2.5 mb-1'
                : 'text-blue-500 text-xs font-semibold uppercase tracking-wider px-2.5 mb-1'}>Insurance</p>
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path, item.id)}
                    className={`
                      w-full text-left flex items-center space-x-3 p-2.5 rounded-xl transition-all duration-300 group
                      ${isActive
                        ? `shadow-lg text-white ${
                            theme === 'dark' 
                              ? 'bg-blue-600 shadow-blue-600/30'
                              : 'bg-blue-500 shadow-blue-500/30'
                          }`
                        : theme === 'dark'
                          ? 'text-blue-400 hover:text-white hover:bg-slate-700/50'
                          : 'text-blue-700 hover:bg-blue-50'
                      }
                    `}
                  >
                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`} />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium block truncate text-sm">{item.title}</span>
                      <span className={`text-xs ${isActive ? 'text-blue-100' : theme === 'dark' ? 'text-blue-500' : 'text-blue-700'} block truncate`}>
                        {item.description}
                      </span>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>}
                  </button>
                );
              })}
            </div>
            
            {/* Settings Navigation */}
            <div className="space-y-1.5">
              <p className={theme === 'light'
                ? 'text-blue-600 text-xs font-semibold uppercase tracking-wider px-2.5 mb-1'
                : 'text-blue-500 text-xs font-semibold uppercase tracking-wider px-2.5 mb-1'}>Account</p>
              {settingsMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.path, item.id)}
                    className={`
                      w-full text-left flex items-center space-x-3 p-2.5 rounded-xl transition-all duration-300 group
                      ${isActive
                        ? `shadow-lg text-white ${
                            theme === 'dark' 
                              ? 'bg-blue-600 shadow-blue-600/30'
                              : 'bg-blue-500 shadow-blue-500/30'
                          }`
                        : theme === 'dark'
                          ? 'text-blue-400 hover:text-white hover:bg-slate-700/50'
                          : 'text-blue-700 hover:bg-blue-50'
                      }
                    `}
                  >
                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`} />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium block truncate text-sm">{item.title}</span>
                      <span className={`text-xs ${isActive ? 'text-blue-100' : theme === 'dark' ? 'text-blue-500' : 'text-blue-700'} block truncate`}>
                        {item.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Theme Selector */}
            <div className="mt-4">
              <div className={`
                rounded-xl p-2.5 border
                ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700/30' : 'bg-white border-blue-200'}
              `}>
                <h3 className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-blue-800'}`}>Color Theme</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['dark', 'light'].map((themeOption) => (
                    <button
                      key={themeOption}
                      onClick={() => onThemeChange(themeOption)}
                      className={`p-1.5 rounded text-xs capitalize transition-colors w-full ${
                        theme === themeOption
                          ? 'bg-blue-500 text-white'
                          : theme === 'dark'
                            ? 'bg-slate-700/50 text-blue-400 hover:bg-slate-600/50'
                            : 'bg-white text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {themeOption}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer - Fixed at bottom */}
          <div className={`
            p-2.5 border-t flex-shrink-0
            ${theme === 'dark' 
              ? 'bg-slate-900 border-slate-700/30' 
              : 'bg-blue-100 border-blue-200'
            }
          `}>
            {/* Logout Button - Keeping the same size */}
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center space-x-2.5 p-1.5 rounded-xl transition-all duration-300 mb-2
                ${theme === 'dark'
                  ? 'text-blue-400 hover:text-white hover:bg-slate-700/50'
                  : 'text-blue-700 hover:bg-blue-200'
                }
              `}
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium text-sm">Logout</span>
            </button>
            
            {/* Version Info */}
            <div className={`text-center pt-2 border-t ${theme === 'dark' ? 'border-slate-700/30' : 'border-blue-200'}`}>
              <p className={`${theme === 'dark' ? 'text-blue-500' : 'text-blue-700'} text-xs`}>InsureX v2.1.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;