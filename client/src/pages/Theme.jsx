import React, { useState } from 'react';
import { Moon, Sun, Monitor, Palette, Check } from 'lucide-react';

const Theme = () => {
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('blue');

  const themes = [
    { id: 'dark', name: 'Dark', icon: Moon, description: 'Default dark theme for comfortable viewing' },
    { id: 'light', name: 'Light', icon: Sun, description: 'Bright theme for daytime use' },
    { id: 'system', name: 'System', icon: Monitor, description: 'Match your device theme settings' }
  ];

  const accentColors = [
    { id: 'blue', name: 'Blue', value: '#3b82f6' },
    { id: 'purple', name: 'Purple', value: '#8b5cf6' },
    { id: 'green', name: 'Green', value: '#10b981' },
    { id: 'orange', name: 'Orange', value: '#f97316' },
    { id: 'pink', name: 'Pink', value: '#ec4899' },
    { id: 'cyan', name: 'Cyan', value: '#06b6d4' }
  ];

  const applyTheme = (themeId) => {
    setSelectedTheme(themeId);
    // Here you would typically apply the theme to the entire app
    console.log(`Theme changed to: ${themeId}`);
  };

  const applyAccentColor = (colorId) => {
    setAccentColor(colorId);
    // Here you would typically apply the accent color to the entire app
    console.log(`Accent color changed to: ${colorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-light mb-2 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 bg-clip-text text-transparent">
            Theme & Appearance
          </h1>
          <p className="text-blue-200">Customize how InsureX looks and feels on your device</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Theme Selection */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Palette className="w-5 h-5 text-blue-400 mr-2" />
              Theme
            </h2>
            <div className="space-y-4">
              {themes.map((theme) => {
                const Icon = theme.icon;
                return (
                  <button
                    key={theme.id}
                    onClick={() => applyTheme(theme.id)}
                    className={`w-full text-left flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                      selectedTheme === theme.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700/30 text-blue-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <div className={`p-3 rounded-lg ${
                      selectedTheme === theme.id ? 'bg-blue-500' : 'bg-slate-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{theme.name}</div>
                      <div className="text-sm opacity-80">{theme.description}</div>
                    </div>
                    {selectedTheme === theme.id && (
                      <Check className="w-5 h-5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Color */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-6">Accent Color</h2>
            <p className="text-blue-300 mb-6">Choose your preferred accent color for buttons and highlights</p>
            
            <div className="grid grid-cols-3 gap-4">
              {accentColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => applyAccentColor(color.id)}
                  className={`aspect-square rounded-xl transition-all duration-300 flex items-center justify-center ${
                    accentColor === color.id ? 'ring-2 ring-offset-2 ring-offset-slate-800 ring-white' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                >
                  {accentColor === color.id && (
                    <Check className="w-6 h-6 text-white" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <div className="text-blue-300 text-sm mb-2">Selected: {accentColors.find(c => c.id === accentColor)?.name}</div>
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: accentColors.find(c => c.id === accentColor)?.value }}></div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-6">Preview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/30 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">Button Styles</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                    Primary Button
                  </button>
                  <button className="w-full py-3 px-4 bg-slate-600/50 border border-slate-500/30 text-blue-300 hover:text-white hover:bg-slate-600/30 rounded-xl font-medium transition-colors">
                    Secondary Button
                  </button>
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-xl p-6">
                <h3 className="text-lg font-medium text-white mb-4">UI Elements</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-600/50 rounded-lg">
                    <span className="text-blue-300">Sample Item</span>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <div className="w-full bg-slate-600/30 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-6">Advanced Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white font-medium mb-2 block">Font Size</label>
                <select className="w-full bg-slate-700/50 border border-slate-600/30 rounded-xl px-4 py-2 text-white">
                  <option>Default</option>
                  <option>Large</option>
                  <option>Larger</option>
                </select>
              </div>
              <div>
                <label className="text-white font-medium mb-2 block">Animation Level</label>
                <select className="w-full bg-slate-700/50 border border-slate-600/30 rounded-xl px-4 py-2 text-white">
                  <option>Full</option>
                  <option>Reduced</option>
                  <option>None</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Theme;