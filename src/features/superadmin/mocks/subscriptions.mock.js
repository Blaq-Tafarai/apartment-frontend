// Mock data for Subscription Management

export const subscriptions = [
  { 
    id: 1, 
    company: 'Metro Properties LLC', 
    plan: 'Professional', 
    status: 'active', 
    billingCycle: 'monthly', 
    amount: 99, 
    startDate: '2023-06-15', 
    nextBillingDate: '2024-02-15',
    paymentMethod: 'Credit Card',
    lastPayment: '2024-01-15',
    lastPaymentStatus: 'success'
  },
  { 
    id: 2, 
    company: 'Urban Living Inc', 
    plan: 'Enterprise', 
    status: 'active', 
    billingCycle: 'monthly', 
    amount: 299, 
    startDate: '2023-07-20', 
    nextBillingDate: '2024-02-20',
    paymentMethod: 'Credit Card',
    lastPayment: '2024-01-20',
    lastPaymentStatus: 'success'
  },
  { 
    id: 3, 
    company: 'Cozy Homes Co', 
    plan: 'Basic', 
    status: 'trial', 
    billingCycle: 'monthly', 
    amount: 29, 
    startDate: '2024-01-01', 
    nextBillingDate: '2024-01-15',
    paymentMethod: 'Pending',
    lastPayment: null,
    lastPaymentStatus: null
  },
  { 
    id: 4, 
    company: 'Premier Realty', 
    plan: 'Professional', 
    status: 'active', 
    billingCycle: 'yearly', 
    amount: 990, 
    startDate: '2023-09-05', 
    nextBillingDate: '2024-09-05',
    paymentMethod: 'Bank Transfer',
    lastPayment: '2023-09-05',
    lastPaymentStatus: 'success'
  },
  { 
    id: 5, 
    company: 'City Apartments', 
    plan: 'Basic', 
    status: 'trial', 
    billingCycle: 'monthly', 
    amount: 29, 
    startDate: '2024-01-11', 
    nextBillingDate: '2024-01-25',
    paymentMethod: 'Pending',
    lastPayment: null,
    lastPaymentStatus: null
  },
  { 
    id: 6, 
    company: 'Downtown Living', 
    plan: 'Professional', 
    status: 'active', 
    billingCycle: 'monthly', 
    amount: 99, 
    startDate: '2023-05-20', 
    nextBillingDate: '2024-02-20',
    paymentMethod: 'Credit Card',
    lastPayment: '2024-01-20',
    lastPaymentStatus: 'success'
  },
  { 
    id: 7, 
    company: 'Suburban Properties', 
    plan: 'Basic', 
    status: 'cancelled', 
    billingCycle: 'monthly', 
    amount: 29, 
    startDate: '2023-04-15', 
    nextBillingDate: null,
    paymentMethod: 'Credit Card',
    lastPayment: '2023-11-15',
    lastPaymentStatus: 'success'
  },
  { 
    id: 8, 
    company: 'Luxury Apartments', 
    plan: 'Enterprise', 
    status: 'active', 
    billingCycle: 'monthly', 
    amount: 299, 
    startDate: '2023-10-12', 
    nextBillingDate: '2024-02-12',
    paymentMethod: 'Credit Card',
    lastPayment: '2024-01-12',
    lastPaymentStatus: 'success'
  },
  { 
    id: 9, 
    company: 'Green Village', 
    plan: 'Professional', 
    status: 'active', 
    billingCycle: 'monthly', 
    amount: 99, 
    startDate: '2023-08-22', 
    nextBillingDate: '2024-02-22',
    paymentMethod: 'Credit Card',
    lastPayment: '2024-01-22',
    lastPaymentStatus: 'success'
  },
  { 
    id: 10, 
    company: 'Mountain View Realty', 
    plan: 'Professional', 
    status: 'active', 
    billingCycle: 'monthly', 
    amount: 99, 
    startDate: '2023-12-01', 
    nextBillingDate: '2024-02-01',
    paymentMethod: 'Credit Card',
    lastPayment: '2024-01-01',
    lastPaymentStatus: 'failed'
  },
];

export const subscriptionStats = {
  total: 48,
  active: 42,
  trial: 6,
  cancelled: 3,
  mrr: 48500,
  arr: 582000,
  churnRate: 2.5,
  growthRate: 12.3,
};

export const plans = [
  { id: 1, name: 'Basic', price: 29, features: ['5 Buildings', '50 Tenants', '2 Managers', 'Email Support'] },
  { id: 2, name: 'Professional', price: 99, features: ['20 Buildings', '200 Tenants', '10 Managers', 'Priority Support', 'Advanced Reports'] },
  { id: 3, name: 'Enterprise', price: 299, features: ['Unlimited Buildings', 'Unlimited Tenants', 'Unlimited Managers', '24/7 Support', 'Custom Integrations', 'Dedicated Account Manager'] },
];

