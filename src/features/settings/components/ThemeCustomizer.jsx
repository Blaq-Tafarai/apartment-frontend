import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Palette, 
  Type, 
  Layout, 
  Sidebar as SidebarIcon,
  Check,
  Eye,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const ThemeCustomizer = () => {
  const { 
    theme, 
    color, 
    font, 
    layout, 
    sidebar,
    toggleTheme, 
    changeColor, 
    changeFont, 
    changeLayout,
    changeSidebar 
  } = useTheme();

  const [activeTab, setActiveTab] = useState('theme');

  const colors = [
    { name: 'Blue', value: 'blue', color: 'rgb(59 130 246)', gradient: 'from-blue-500 to-blue-600' },
    { name: 'Yellow', value: 'yellow', color: 'rgb(234 179 8)', gradient: 'from-yellow-500 to-yellow-600' },
    { name: 'Red', value: 'red', color: 'rgb(239 68 68)', gradient: 'from-red-500 to-red-600' },
    { name: 'Green', value: 'green', color: 'rgb(34 197 94)', gradient: 'from-green-500 to-green-600' },
    { name: 'Purple', value: 'purple', color: 'rgb(168 85 247)', gradient: 'from-purple-500 to-purple-600' },
    { name: 'Pink', value: 'pink', color: 'rgb(236 72 153)', gradient: 'from-pink-500 to-pink-600' },
    { name: 'Indigo', value: 'indigo', color: 'rgb(99 102 241)', gradient: 'from-indigo-500 to-indigo-600' },
  ];

  const fonts = [
    { name: 'Inter', value: 'inter', preview: 'Inter', style: 'font-sans' },
    { name: 'Lato', value: 'lato', preview: 'Lato', style: 'font-lato' },
    { name: 'Roboto', value: 'roboto', preview: 'Roboto', style: 'font-roboto' },
    { name: 'Playfair Display', value: 'playfair', preview: 'Playfair Display', style: 'font-serif' },
    { name: 'Space Mono', value: 'spacemono', preview: 'Space Mono', style: 'font-mono' },
  ];

  const layouts = [
    { name: 'Shadow', value: 'shadow', description: 'Cards with shadow effect', icon: '⬛' },
    { name: 'Bordered', value: 'bordered', description: 'Cards with borders', icon: '🔲' },
    { name: 'Skin', value: 'skin', description: 'Cards with gradient background', icon: '🎨' },
  ];

  const sidebarOptions = [
    { name: 'Vertical', value: 'vertical', description: 'Classic sidebar on the left', icon: '📱' },
    { name: 'Horizontal', value: 'horizontal', description: 'Modern top navigation', icon: '💻' },
  ];

  const tabs = [
    { id: 'theme', label: 'Theme', icon: theme === 'light' ? Sun : Moon },
    { id: 'color', label: 'Colors', icon: Palette },
    { id: 'font', label: 'Typography', icon: Type },
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'sidebar', label: 'Sidebar', icon: SidebarIcon },
  ];

  const getCurrentColor = () => colors.find(c => c.value === color) || colors[0];

  return (
    <div className="space-y-4">
      {/* Compact Horizontal Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 bg-surface-variant rounded-lg p-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-md transition-all whitespace-nowrap text-sm flex-1 justify-center
                ${activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {/* Theme Toggle */}
        {activeTab === 'theme' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                {theme === 'light' ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
              </div>
              <span className="text-sm font-medium text-text-primary">Appearance</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => theme === 'dark' && toggleTheme()}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-300
                  ${theme === 'light'
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : 'border-border-color hover:border-primary/50'
                  }
                `}
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center shadow-inner">
                  <Sun className="w-6 h-6 text-amber-600" />
                </div>
                <p className="font-semibold text-text-primary text-center text-sm">Light</p>
                <p className="text-xs text-text-secondary text-center">Bright & Clean</p>
                {theme === 'light' && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
              
              <button
                onClick={() => theme === 'light' && toggleTheme()}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-300
                  ${theme === 'dark'
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : 'border-border-color hover:border-primary/50'
                  }
                `}
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-inner">
                  <Moon className="w-6 h-6 text-slate-300" />
                </div>
                <p className="font-semibold text-text-primary text-center text-sm">Dark</p>
                <p className="text-xs text-text-secondary text-center">Easy on Eyes</p>
                {theme === 'dark' && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            </div>

            {/* Quick Preview */}
            <div className="flex items-center gap-2 p-2 bg-surface-variant rounded-lg">
              <Eye className="w-4 h-4 text-text-secondary" />
              <span className="text-xs text-text-secondary">Live Preview:</span>
              <div className="flex gap-1">
                <Monitor className="w-4 h-4 text-text-secondary" />
                <Tablet className="w-4 h-4 text-text-secondary opacity-50" />
                <Smartphone className="w-4 h-4 text-text-secondary opacity-50" />
              </div>
            </div>
          </div>
        )}

        {/* Color Customizer */}
        {activeTab === 'color' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Palette className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-text-primary">Color Scheme</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {colors.map((colorOption) => (
                <button
                  key={colorOption.value}
                  onClick={() => changeColor(colorOption.value)}
                  className={`
                    relative p-2 rounded-lg border-2 transition-all duration-200
                    ${color === colorOption.value
                      ? 'border-primary shadow-md'
                      : 'border-border-color hover:border-primary/50'
                    }
                  `}
                >
                  <div
                    className={`w-8 h-8 mx-auto rounded-full bg-gradient-to-br ${colorOption.gradient} shadow-md`}
                  />
                  <p className="text-xs font-medium text-text-primary text-center mt-1">{colorOption.name}</p>
                  {color === colorOption.value && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Active Color Display */}
            <div className="flex items-center gap-3 p-2 bg-surface-variant rounded-lg">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getCurrentColor().gradient} shadow`} />
              <div>
                <p className="text-xs font-medium text-text-primary">Active: {getCurrentColor().name}</p>
                <p className="text-[10px] text-text-secondary">{getCurrentColor().color}</p>
              </div>
            </div>
          </div>
        )}

        {/* Font Customizer */}
        {activeTab === 'font' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Type className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-text-primary">Typography</span>
            </div>

            <div className="space-y-2">
              {fonts.map((fontOption) => (
                <button
                  key={fontOption.value}
                  onClick={() => changeFont(fontOption.value)}
                  className={`
                    w-full p-3 rounded-lg border-2 text-left transition-all duration-200
                    ${font === fontOption.value
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border-color hover:border-primary/50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-text-primary text-sm">{fontOption.name}</p>
                    {font === fontOption.value && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <p 
                    className="text-lg text-text-secondary mt-1 truncate"
                    style={{ fontFamily: fontOption.preview }}
                  >
                    The quick brown fox
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Layout Customizer */}
        {activeTab === 'layout' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Layout className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-text-primary">Card Style</span>
            </div>

            <div className="space-y-2">
              {layouts.map((layoutOption) => (
                <button
                  key={layoutOption.value}
                  onClick={() => changeLayout(layoutOption.value)}
                  className={`
                    w-full p-3 rounded-lg border-2 text-left transition-all duration-200
                    ${layout === layoutOption.value
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border-color hover:border-primary/50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{layoutOption.icon}</span>
                      <div>
                        <p className="font-medium text-text-primary text-sm">{layoutOption.name}</p>
                        <p className="text-xs text-text-secondary">{layoutOption.description}</p>
                      </div>
                    </div>
                    {layout === layoutOption.value && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Layout Preview */}
            <div className="p-2 bg-surface-variant rounded-lg">
              <p className="text-xs text-text-secondary mb-2">Card Preview</p>
              <div className={`
                p-2 bg-surface rounded border
                ${layout === 'shadow' ? 'shadow-md' : ''}
                ${layout === 'bordered' ? 'border border-border-color' : ''}
                ${layout === 'skin' ? 'bg-gradient-to-br from-surface to-surface-variant' : ''}
              `}>
                <p className="text-xs text-text-primary">Sample Card</p>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Customizer */}
        {activeTab === 'sidebar' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <SidebarIcon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-text-primary">Navigation</span>
            </div>

            <div className="space-y-2">
              {sidebarOptions.map((sidebarOption) => (
                <button
                  key={sidebarOption.value}
                  onClick={() => changeSidebar(sidebarOption.value)}
                  className={`
                    w-full p-3 rounded-lg border-2 text-left transition-all duration-200
                    ${sidebar === sidebarOption.value
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border-color hover:border-primary/50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{sidebarOption.icon}</span>
                      <div>
                        <p className="font-medium text-text-primary text-sm">{sidebarOption.name}</p>
                        <p className="text-xs text-text-secondary">{sidebarOption.description}</p>
                      </div>
                    </div>
                    {sidebar === sidebarOption.value && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Sidebar Preview */}
            <div className="p-2 bg-surface-variant rounded-lg">
              <p className="text-xs text-text-secondary mb-2">Navigation Preview</p>
              <div className="flex h-12 rounded-lg overflow-hidden border border-border-color">
                {sidebar === 'vertical' ? (
                  <>
                    <div className="w-8 bg-surface border-r border-border-color flex items-center justify-center">
                      <div className="w-4 h-4 bg-primary/20 rounded" />
                    </div>
                    <div className="flex-1 bg-surface p-1">
                      <div className="h-1.5 w-10 bg-surface-variant rounded mb-1" />
                      <div className="h-1.5 w-8 bg-surface-variant rounded" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full bg-surface border-b border-border-color flex items-center px-2 gap-2">
                      <div className="w-4 h-4 bg-primary/20 rounded" />
                      <div className="flex gap-1">
                        <div className="h-1.5 w-6 bg-surface-variant rounded" />
                        <div className="h-1.5 w-6 bg-surface-variant rounded" />
                      </div>
                    </div>
                    <div className="flex-1 bg-surface p-1 mt-auto">
                      <div className="h-1.5 w-10 bg-surface-variant rounded" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Summary Section */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
          <div>
            <p className="text-xs font-medium text-text-primary">Current: {theme.charAt(0).toUpperCase() + theme.slice(1)} • {getCurrentColor().name}</p>
            <p className="text-[10px] text-text-secondary">{font} font</p>
          </div>
          <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;