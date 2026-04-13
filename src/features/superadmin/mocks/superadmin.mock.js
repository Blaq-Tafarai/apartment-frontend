// Mock data for Superadmin Dashboard

export const platformStats = {
  totalCompanies: 48,
  activeSubscriptions: 42,
  trialCompanies: 6,
  churnedCompanies: 3,
  totalUsers: 1247,
  activeUsers: 892,
  totalRevenue: 284500,
  monthlyRecurringRevenue: 48500,
  averageRevenuePerUser: 38.90,
};

export const revenueData = [
  { month: 'Jan', revenue: 32000, subscriptions: 35 },
  { month: 'Feb', revenue: 34500, subscriptions: 37 },
  { month: 'Mar', revenue: 36200, subscriptions: 38 },
  { month: 'Apr', revenue: 38900, subscriptions: 39 },
  { month: 'May', revenue: 42100, subscriptions: 40 },
  { month: 'Jun', revenue: 48500, subscriptions: 42 },
];

export const subscriptionTypeData = [
  { name: 'Enterprise', value: 12, color: '#8B5CF6' },
  { name: 'Professional', value: 18, color: '#3B82F6' },
  { name: 'Basic', value: 12, color: '#6B7280' },
];

export const recentCompanies = [
  { id: 1, name: 'Metro Properties LLC', plan: 'Professional', signupDate: '2024-01-15', status: 'active' },
  { id: 2, name: 'Urban Living Inc', plan: 'Enterprise', signupDate: '2024-01-14', status: 'active' },
  { id: 3, name: 'Cozy Homes Co', plan: 'Basic', signupDate: '2024-01-13', status: 'trial' },
  { id: 4, name: 'Premier Realty', plan: 'Professional', signupDate: '2024-01-12', status: 'active' },
  { id: 5, name: 'City Apartments', plan: 'Basic', signupDate: '2024-01-11', status: 'trial' },
];

export const recentActivities = [
  { id: 1, type: 'company', message: 'New company registered: Metro Properties LLC', time: '5 min ago' },
  { id: 2, type: 'subscription', message: 'Urban Living Inc upgraded to Enterprise plan', time: '1 hour ago' },
  { id: 3, type: 'payment', message: 'Payment received from Premier Realty - $499/mo', time: '2 hours ago' },
  { id: 4, type: 'license', message: 'License key generated for Cozy Homes Co', time: '3 hours ago' },
  { id: 5, type: 'company', message: 'Company deleted: Old Town Properties', time: '5 hours ago' },
];

