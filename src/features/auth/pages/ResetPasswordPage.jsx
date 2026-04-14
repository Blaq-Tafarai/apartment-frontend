import React, { useState } from 'react';
import { authService } from '../services/authService';
import { Lock, ShieldCheck, Building2, Palette } from 'lucide-react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Drawer } from '../../../components/ui/Modal';
import ThemeCustomizer from '../../../features/settings/components/ThemeCustomizer';
import { useNavigate, useLocation, Link } from 'react-router-dom';


const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();

  // get resetToken from navigation
  const resetToken = location.state?.resetToken;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resetToken) {
      setError('Session expired. Please restart the process.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setMessage('');
    setLoading(true);

    try {
      await authService.resetPassword({
        newPassword: password,
        token: resetToken
      });

      setMessage('Password reset successful');

      setTimeout(() => navigate('/login'), 1500);

    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-3xl font-bold text-text-primary">Reset Password</h1>
            <p className="text-text-secondary mt-2">Enter your new password</p>
          </div>

          {/* Reset Password Form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-danger bg-opacity-10 border border-danger text-danger text-sm">
                  {error}
                </div>
              )}
              {message && (
                <div className="p-3 rounded-lg bg-success bg-opacity-10 border border-success text-success text-sm">
                  {message}
                </div>
              )}

              <Input
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                required
              />

              <Input
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={ShieldCheck}
                required
              />

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-text-secondary">
              <Link to="/login" className="text-primary font-medium hover:underline">
                Back to Sign In
              </Link>
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

export default ResetPasswordPage;
