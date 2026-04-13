import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Building2, Palette } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Drawer } from '../../../components/ui/Modal';
import ThemeCustomizer from '../../../features/settings/components/ThemeCustomizer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      const user = result.user || JSON.parse(localStorage.getItem('user'));
      

      if (user?.role === 'superadmin') {
        navigate('/superadmin-dashboard');
      } else {
        navigate('/dashboard');
      }

    } else {
      setError(result.error || 'Invalid credentials');
    }
    
    setLoading(false);
  };

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
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary">ApartHub</h1>
            <p className="text-text-secondary mt-2">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-danger bg-opacity-10 border border-danger text-danger text-sm">
                  {error}
                </div>
              )}

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                required
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-text-secondary">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 p-4 bg-surface rounded-lg border border-border-color">
            <p className="text-xs text-text-secondary text-center mb-3">
              Quick Login (Demo):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                type="button"
                onClick={() => { setEmail('superadmin@example.com'); setPassword('demo'); }}
                className="text-xs px-2 py-1.5 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
              >
                Superadmin
              </button>
              <button 
                type="button"
                onClick={() => { setEmail('admin@example.com'); setPassword('demo'); }}
                className="text-xs px-2 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                Admin
              </button>
              <button 
                type="button"
                onClick={() => { setEmail('manager@example.com'); setPassword('demo'); }}
                className="text-xs px-2 py-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                Manager
              </button>
              <button 
                type="button"
                onClick={() => { setEmail('tenant@example.com'); setPassword('demo'); }}
                className="text-xs px-2 py-1.5 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
              >
                Tenant
              </button>
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
    </div>
  );
};

export default LoginPage;

