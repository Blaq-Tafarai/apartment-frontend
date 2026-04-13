// Mock data for System Audit Logs

export const systemAuditLogs = [
  { id: 1, action: 'company_created', description: 'Created new company: Metro Properties LLC', performedBy: 'Super Admin', targetType: 'company', targetName: 'Metro Properties LLC', ipAddress: '192.168.1.100', timestamp: '2024-01-15T14:30:00', status: 'success' },
  { id: 2, action: 'license_generated', description: 'Generated Enterprise license key for Urban Living Inc', performedBy: 'Super Admin', targetType: 'license', targetName: 'ENT-2024-001', ipAddress: '192.168.1.100', timestamp: '2024-01-15T13:45:00', status: 'success' },
  { id: 3, action: 'user_created', description: 'Created admin user for Cozy Homes Co', performedBy: 'Super Admin', targetType: 'user', targetName: 'michael@cozyhomes.com', ipAddress: '192.168.1.100', timestamp: '2024-01-15T12:20:00', status: 'success' },
  { id: 4, action: 'subscription_upgraded', description: 'Upgraded Premier Realty from Basic to Professional', performedBy: 'System', targetType: 'subscription', targetName: 'Premier Realty', ipAddress: 'System', timestamp: '2024-01-15T11:15:00', status: 'success' },
  { id: 5, action: 'payment_received', description: 'Received payment of $299 from Urban Living Inc', performedBy: 'System', targetType: 'payment', targetName: 'INV-2024-0156', ipAddress: 'System', timestamp: '2024-01-15T10:30:00', status: 'success' },
  { id: 6, action: 'company_deleted', description: 'Deleted company: Old Town Properties', performedBy: 'Super Admin', targetType: 'company', targetName: 'Old Town Properties', ipAddress: '192.168.1.100', timestamp: '2024-01-14T16:45:00', status: 'success' },
  { id: 7, action: 'settings_updated', description: 'Updated platform email settings', performedBy: 'Super Admin', targetType: 'settings', targetName: 'Email Configuration', ipAddress: '192.168.1.100', timestamp: '2024-01-14T15:30:00', status: 'success' },
  { id: 8, action: 'user_suspended', description: 'Suspended user: robert@suburban.com', performedBy: 'Super Admin', targetType: 'user', targetName: 'Robert Taylor', ipAddress: '192.168.1.100', timestamp: '2024-01-14T14:20:00', status: 'success' },
  { id: 9, action: 'plan_created', description: 'Created new pricing plan: Enterprise Plus', performedBy: 'Super Admin', targetType: 'plan', targetName: 'Enterprise Plus', ipAddress: '192.168.1.100', timestamp: '2024-01-14T12:00:00', status: 'success' },
  { id: 10, action: 'payment_failed', description: 'Payment failed for Mountain View Realty', performedBy: 'System', targetType: 'payment', targetName: 'INV-2024-0145', ipAddress: 'System', timestamp: '2024-01-14T10:15:00', status: 'failed' },
  { id: 11, action: 'company_created', description: 'Created new company: Waterfront Homes', performedBy: 'Super Admin', targetType: 'company', targetName: 'Waterfront Homes', ipAddress: '192.168.1.105', timestamp: '2024-01-13T16:30:00', status: 'success' },
  { id: 12, action: 'license_revoked', description: 'Revoked license for inactive company', performedBy: 'System', targetType: 'license', targetName: 'Suburban Properties', ipAddress: 'System', timestamp: '2024-01-13T09:00:00', status: 'success' },
];

export const auditLogStats = {
  total: 1547,
  today: 24,
  thisWeek: 156,
  thisMonth: 623,
};

export const actionTypes = [
  { value: 'company_created', label: 'Company Created' },
  { value: 'company_deleted', label: 'Company Deleted' },
  { value: 'company_updated', label: 'Company Updated' },
  { value: 'license_generated', label: 'License Generated' },
  { value: 'license_revoked', label: 'License Revoked' },
  { value: 'user_created', label: 'User Created' },
  { value: 'user_deleted', label: 'User Deleted' },
  { value: 'user_suspended', label: 'User Suspended' },
  { value: 'subscription_upgraded', label: 'Subscription Upgraded' },
  { value: 'subscription_cancelled', label: 'Subscription Cancelled' },
  { value: 'payment_received', label: 'Payment Received' },
  { value: 'payment_failed', label: 'Payment Failed' },
  { value: 'settings_updated', label: 'Settings Updated' },
  { value: 'plan_created', label: 'Plan Created' },
];

