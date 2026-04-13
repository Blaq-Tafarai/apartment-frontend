import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Palette } from 'lucide-react';
import Modal, { Drawer } from '../../components/ui/Modal';
import ThemeCustomizer from '../../features/settings/components/ThemeCustomizer';

const BlankLayout = () => {
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Theme Customizer Button */}
      <button
        onClick={() => setIsThemeDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] p-3 rounded-full bg-primary shadow-lg hover:bg-primary/90 transition-colors pointer-events-auto"
        title="Customize Theme"
      >
        <Palette className="w-5 h-5 text-white" />
      </button>

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

      <Outlet />
    </div>
  );
};

export default BlankLayout;

