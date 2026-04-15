import React, { useState } from 'react';
import { Menu, Bell, Search, User, LogOut, Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal, { Drawer } from '../../components/ui/Modal';
import ThemeCustomizer from '../../features/settings/components/ThemeCustomizer';

const Header = () => {
  const { toggleSidebar, sidebar, theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);

const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <header
      className={`
        bg-surface border-b border-border-color
        transition-all duration-300
        ${sidebar === 'horizontal'
          ? 'relative'
          : 'fixed top-0 right-0 left-0 lg:left-[var(--sidebar-width)] z-30'
        }
      `}
      style={{
        height: 'var(--header-height)',
      }}
    >
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-surface-variant transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-text-primary" />
          </button>

          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-background border border-border-color rounded-default text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-surface-variant transition-colors relative"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-text-primary" />
            ) : (
              <Sun className="w-5 h-5 text-text-primary" />
            )}
          </button>

          {/* Theme Customizer Button */}
          <button
            onClick={() => setIsThemeDrawerOpen(true)}
            className="p-2 rounded-lg hover:bg-surface-variant transition-colors relative"
            title="Customize Theme"
          >
            <Palette className="w-5 h-5 text-text-primary" />
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-surface-variant transition-colors relative">
            <Bell className="w-5 h-5 text-text-primary" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3 ml-2 pl-3 border-l border-border-color">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-text-primary">{user?.name}</p>
              <p className="text-xs text-text-secondary">{user?.role}</p>
            </div>
            <div className="relative group">
              <button className="p-2 rounded-lg hover:bg-surface-variant transition-colors">
                <User className="w-5 h-5 text-text-primary" />
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-surface rounded-default shadow-lg border border-border-color opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => navigate('/settings')}
                  className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-variant transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-surface-variant transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Customizer Drawer */}
      <Drawer
        isOpen={isThemeDrawerOpen}
        onClose={() => setIsThemeDrawerOpen(false)}
        title="Theme Settings"
        position="right"
        size="sm"
      >
        <div className="overflow-hidden">
          <ThemeCustomizer />
        </div>
      </Drawer>
    </header>
  );
};

export default Header;

