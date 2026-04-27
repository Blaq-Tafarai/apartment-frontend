import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Building2, Palette } from 'lucide-react';
import { authService } from '../services/authService';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Drawer } from '../../../components/ui/Modal';
import ThemeCustomizer from '../../../features/settings/components/ThemeCustomizer';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const intervalRef = useRef(null);

  // get email from previous page
  const email = location.state?.email;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResend = async () => {
    if (!email) {
      setError('Session expired. Please start again.');
      return;
    }

    setResendLoading(true);
    setResendMessage('');
    setError('');

    try {
      await authService.forgotPassword(email);
      setResendMessage('OTP resent successfully');
      setOtp('');
      setTimeLeft(300);
      setCanResend(false);
    } catch (err) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (canResend || timeLeft === 0) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [canResend, timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Session expired. Please start again.');
      return;
    }

    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await authService.verifyOtp(email, otp);

      const resetToken = res.data.resetToken;

      setMessage('OTP verified');

      // pass resetToken forward
      setTimeout(() => {
        navigate('/reset-password', {
          state: { resetToken }
        });
      }, 1000);

    } catch (err) {
      setError(err.message || 'Invalid OTP');
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
            <h1 className="text-3xl font-bold text-text-primary">Verify OTP</h1>
          </div>

          {/* Verify OTP Form */}
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

              {resendMessage && (
                  <div className="p-2 rounded bg-success bg-opacity-10 border border-success text-success text-xs">
                    {resendMessage}
                  </div>
                )}

              <Input
                label="OTP Code"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                icon={ShieldCheck}
                maxLength={6}
                required
              />

              <div className="text-xs text-text-secondary text-center space-y-1">
                Didn't receive code? 
                {!canResend && timeLeft > 0 && (
                  <div className="text-sm text-text-secondary">
                    Resend available in <span className="font-mono text-primary">{formatTime(timeLeft)}</span>
                  </div>
                )}
                <button 
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend || resendLoading || timeLeft > 0}
                  className="text-primary hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                >
                  {resendLoading ? 'Resending...' : 'Resend'}
                </button>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
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

export default VerifyOtpPage;

