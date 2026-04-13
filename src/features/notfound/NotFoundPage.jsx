import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, ArrowLeft, Palette } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Drawer } from '../../components/ui/Modal';
import ThemeCustomizer from '../../features/settings/components/ThemeCustomizer';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Theme Customizer Button */}
      <button
        onClick={() => setIsThemeDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] p-3 rounded-full bg-primary shadow-lg hover:bg-primary/90 transition-colors pointer-events-auto"
        title="Customize Theme"
      >
        <Palette className="w-5 h-5 text-white" />
      </button>

      {/* Background decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full pointer-events-none" />
      
      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          {/* 404 Text */}
          <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
        
          {/* Message */}
          <div className="-mt-16 mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-2">Page Not Found</h2>
            <p className="text-text-secondary max-w-md">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Go Back
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/dashboard')}
              leftIcon={<Home className="w-4 h-4" />}
            >
              Go to Dashboard
            </Button>
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
    </div>
  );
};

export default NotFoundPage;

