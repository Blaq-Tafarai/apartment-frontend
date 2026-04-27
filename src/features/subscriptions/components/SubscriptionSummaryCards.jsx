import React from 'react';
import { CreditCard, TrendingUp, DollarSign } from 'lucide-react';

const SubscriptionSummaryCards = ({ subscriptions }) => {
  const totalSubscriptions = subscriptions.length;
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;
  const totalRevenue = subscriptions.reduce((sum, sub) => sum + parseFloat(sub.price || 0), 0);
  const monthlyRevenue = subscriptions
    .filter(sub => sub.billingCycle === 'monthly' && sub.status === 'active')
    .reduce((sum, sub) => sum + parseFloat(sub.price || 0), 0);
  const quarterlyRevenue = subscriptions
    .filter(sub => sub.billingCycle === 'quarterly' && sub.status === 'active')
    .reduce((sum, sub) => sum + parseFloat(sub.price || 0), 0);
  const yearlyRevenue = subscriptions
    .filter(sub => sub.billingCycle === 'yearly' && sub.status === 'active')
    .reduce((sum, sub) => sum + parseFloat(sub.price || 0), 0);

  const cards = [
    {
      title: 'Total Subscriptions',
      value: totalSubscriptions,
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Subscriptions',
      value: activeSubscriptions,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Monthly Revenue',
      value: `$${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Quarterly Revenue',
      value: `$${quarterlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Yearly Revenue',
      value: `$${yearlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">{card.title}</p>
              <p className="text-2xl font-bold text-text-primary mt-1">{card.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionSummaryCards;

