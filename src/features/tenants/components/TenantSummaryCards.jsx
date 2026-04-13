import React from 'react';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

const TenantSummaryCards = ({ tenants = [] }) => {
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(tenant => tenant.status === 'Active').length;
  const inactiveTenants = tenants.filter(tenant => tenant.status === 'Inactive').length;
  const pendingTenants = tenants.filter(tenant => tenant.status === 'Pending').length;

  const colors = {
    total: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    active: {
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    inactive: {
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    pending: {
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  };

  const cards = [
    {
      title: 'Total Tenants',
      value: totalTenants,
      icon: Users,
      ...colors.total,
    },
    {
      title: 'Active Tenants',
      value: activeTenants,
      icon: UserCheck,
      ...colors.active,
    },
    {
      title: 'Inactive Tenants',
      value: inactiveTenants,
      icon: UserX,
      ...colors.inactive,
    },
    {
      title: 'Pending Tenants',
      value: pendingTenants,
      icon: Clock,
      ...colors.pending,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary">{card.title}</p>
              <p className="text-3xl font-bold text-primary">{card.value}</p>
            </div>
            <div className={`p-3 rounded-full ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TenantSummaryCards;
