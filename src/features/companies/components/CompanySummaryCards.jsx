import React from 'react';
import { Building, Home, Users, DollarSign, TrendingUp } from 'lucide-react';

const CompanySummaryCards = ({ companies }) => {
  const totalCompanies = companies.length;
  const activeCompanies = companies.filter(company => company.status === 'active').length;
  const totalBuildings = companies.reduce((sum, company) => sum + (company.stats?.totalBuildings || 0), 0);
  const totalApartments = companies.reduce((sum, company) => sum + (company.stats?.totalApartments || 0), 0);
  const totalTenants = companies.reduce((sum, company) => sum + (company.stats?.totalTenants || 0), 0);
  const totalRevenue = companies.reduce((sum, company) => sum + (company.stats?.monthlyRevenue || 0), 0);

  const cards = [
    {
      title: 'Total Companies',
      value: totalCompanies,
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Companies',
      value: activeCompanies,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Buildings',
      value: totalBuildings,
      icon: Building,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Apartments',
      value: totalApartments,
      icon: Home,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Total Tenants',
      value: totalTenants,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Monthly Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
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

export default CompanySummaryCards;
