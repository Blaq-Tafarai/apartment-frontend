import React, { useState } from 'react';
import { Save, Mail, CreditCard, Bell, Shield, Database, Globe } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ToggleSwitch from '../../../components/ui/ToggleSwitch';
import Tabs from '../../../components/ui/Tabs';
import { useToast } from '../../../components/ui/Toast';

const PlatformSettings = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState(0);

  // Tab configuration with id, label, and icon
  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'ApartHub',
    platformEmail: 'support@aparthub.com',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.aparthub.com',
    smtpPort: '587',
    smtpUser: 'noreply@aparthub.com',
    smtpPassword: '',
    emailFromName: 'ApartHub',
    emailFromEmail: 'noreply@aparthub.com',
    enableEmailNotifications: true,
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    paymentGateway: 'stripe',
    stripePublicKey: 'pk_test_xxxxx',
    stripeSecretKey: '',
    paypalClientId: '',
    paypalSecret: '',
    enableAutoBilling: true,
    enableRefund: true,
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNewCompany: true,
    emailNewSubscription: true,
    emailPaymentReceived: true,
    emailPaymentFailed: true,
    emailSubscriptionCancelled: true,
    emailTrialExpiring: true,
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    enableTwoFactor: true,
    passwordMinLength: '8',
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    sessionTimeout: '30',
    enableIPRestriction: false,
  });

  const handleSave = async (section) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Platform Settings</h1>
        <p className="text-text-secondary mt-1">Configure global platform settings</p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* General Settings */}
      {activeTab === 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">General Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Platform Name"
              value={generalSettings.platformName}
              onChange={e => setGeneralSettings({ ...generalSettings, platformName: e.target.value })}
            />
            <Input
              label="Support Email"
              type="email"
              value={generalSettings.platformEmail}
              onChange={e => setGeneralSettings({ ...generalSettings, platformEmail: e.target.value })}
            />
            <Select
              label="Timezone"
              value={generalSettings.timezone}
              onChange={e => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">GMT</option>
            </Select>
            <Select
              label="Date Format"
              value={generalSettings.dateFormat}
              onChange={e => setGeneralSettings({ ...generalSettings, dateFormat: e.target.value })}
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </Select>
            <Select
              label="Currency"
              value={generalSettings.currency}
              onChange={e => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD ($)</option>
            </Select>
          </div>
          <div className="mt-4">
            <Button variant="primary" leftIcon={<Save size={16} />} onClick={() => handleSave('general')}>
              Save General Settings
            </Button>
          </div>
        </div>
      )}

      {/* Email Settings */}
      {activeTab === 1 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">SMTP Email Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="SMTP Host"
              value={emailSettings.smtpHost}
              onChange={e => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
            />
            <Input
              label="SMTP Port"
              value={emailSettings.smtpPort}
              onChange={e => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
            />
            <Input
              label="SMTP Username"
              value={emailSettings.smtpUser}
              onChange={e => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
            />
            <Input
              label="SMTP Password"
              type="password"
              value={emailSettings.smtpPassword}
              onChange={e => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
              placeholder="Leave blank to keep current"
            />
            <Input
              label="From Name"
              value={emailSettings.emailFromName}
              onChange={e => setEmailSettings({ ...emailSettings, emailFromName: e.target.value })}
            />
            <Input
              label="From Email"
              type="email"
              value={emailSettings.emailFromEmail}
              onChange={e => setEmailSettings({ ...emailSettings, emailFromEmail: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <ToggleSwitch
              label="Enable Email Notifications"
              checked={emailSettings.enableEmailNotifications}
              onChange={e => setEmailSettings({ ...emailSettings, enableEmailNotifications: e.target.checked })}
            />
          </div>
          <div className="mt-4">
            <Button variant="primary" leftIcon={<Save size={16} />} onClick={() => handleSave('email')}>
              Save Email Settings
            </Button>
          </div>
        </div>
      )}

      {/* Payment Settings */}
      {activeTab === 2 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Gateway Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Payment Gateway"
              value={paymentSettings.paymentGateway}
              onChange={e => setPaymentSettings({ ...paymentSettings, paymentGateway: e.target.value })}
            >
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
              <option value="both">Both</option>
            </Select>
            <div />
            <Input
              label="Stripe Public Key"
              value={paymentSettings.stripePublicKey}
              onChange={e => setPaymentSettings({ ...paymentSettings, stripePublicKey: e.target.value })}
            />
            <Input
              label="Stripe Secret Key"
              type="password"
              value={paymentSettings.stripeSecretKey}
              onChange={e => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
              placeholder="Leave blank to keep current"
            />
            <Input
              label="PayPal Client ID"
              value={paymentSettings.paypalClientId}
              onChange={e => setPaymentSettings({ ...paymentSettings, paypalClientId: e.target.value })}
            />
            <Input
              label="PayPal Secret"
              type="password"
              value={paymentSettings.paypalSecret}
              onChange={e => setPaymentSettings({ ...paymentSettings, paypalSecret: e.target.value })}
              placeholder="Leave blank to keep current"
            />
          </div>
          <div className="mt-4 space-y-3">
            <ToggleSwitch
              label="Enable Auto-Billing"
              checked={paymentSettings.enableAutoBilling}
              onChange={e => setPaymentSettings({ ...paymentSettings, enableAutoBilling: e.target.checked })}
            />
            <ToggleSwitch
              label="Enable Refunds"
              checked={paymentSettings.enableRefund}
              onChange={e => setPaymentSettings({ ...paymentSettings, enableRefund: e.target.checked })}
            />
          </div>
          <div className="mt-4">
            <Button variant="primary" leftIcon={<Save size={16} />} onClick={() => handleSave('payment')}>
              Save Payment Settings
            </Button>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === 3 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Email Notification Settings</h3>
          <div className="space-y-4">
            <ToggleSwitch
              label="New Company Registration"
              checked={notificationSettings.emailNewCompany}
              onChange={e => setNotificationSettings({ ...notificationSettings, emailNewCompany: e.target.checked })}
            />
            <ToggleSwitch
              label="New Subscription"
              checked={notificationSettings.emailNewSubscription}
              onChange={e => setNotificationSettings({ ...notificationSettings, emailNewSubscription: e.target.checked })}
            />
            <ToggleSwitch
              label="Payment Received"
              checked={notificationSettings.emailPaymentReceived}
              onChange={e => setNotificationSettings({ ...notificationSettings, emailPaymentReceived: e.target.checked })}
            />
            <ToggleSwitch
              label="Payment Failed"
              checked={notificationSettings.emailPaymentFailed}
              onChange={e => setNotificationSettings({ ...notificationSettings, emailPaymentFailed: e.target.checked })}
            />
            <ToggleSwitch
              label="Subscription Cancelled"
              checked={notificationSettings.emailSubscriptionCancelled}
              onChange={e => setNotificationSettings({ ...notificationSettings, emailSubscriptionCancelled: e.target.checked })}
            />
            <ToggleSwitch
              label="Trial Period Expiring"
              checked={notificationSettings.emailTrialExpiring}
              onChange={e => setNotificationSettings({ ...notificationSettings, emailTrialExpiring: e.target.checked })}
            />
          </div>
          <div className="mt-4">
            <Button variant="primary" leftIcon={<Save size={16} />} onClick={() => handleSave('notifications')}>
              Save Notification Settings
            </Button>
          </div>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === 4 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Security Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ToggleSwitch
              label="Enable Two-Factor Authentication"
              checked={securitySettings.enableTwoFactor}
              onChange={e => setSecuritySettings({ ...securitySettings, enableTwoFactor: e.target.checked })}
            />
            <Input
              label="Minimum Password Length"
              type="number"
              value={securitySettings.passwordMinLength}
              onChange={e => setSecuritySettings({ ...securitySettings, passwordMinLength: e.target.value })}
            />
            <ToggleSwitch
              label="Require Uppercase Letters"
              checked={securitySettings.passwordRequireUppercase}
              onChange={e => setSecuritySettings({ ...securitySettings, passwordRequireUppercase: e.target.checked })}
            />
            <ToggleSwitch
              label="Require Numbers"
              checked={securitySettings.passwordRequireNumbers}
              onChange={e => setSecuritySettings({ ...securitySettings, passwordRequireNumbers: e.target.checked })}
            />
            <ToggleSwitch
              label="Require Special Symbols"
              checked={securitySettings.passwordRequireSymbols}
              onChange={e => setSecuritySettings({ ...securitySettings, passwordRequireSymbols: e.target.checked })}
            />
            <Input
              label="Session Timeout (minutes)"
              type="number"
              value={securitySettings.sessionTimeout}
              onChange={e => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
            />
          </div>
          <div className="mt-4">
            <ToggleSwitch
              label="Enable IP Restriction"
              checked={securitySettings.enableIPRestriction}
              onChange={e => setSecuritySettings({ ...securitySettings, enableIPRestriction: e.target.checked })}
            />
          </div>
          <div className="mt-4">
            <Button variant="primary" leftIcon={<Save size={16} />} onClick={() => handleSave('security')}>
              Save Security Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformSettings;

