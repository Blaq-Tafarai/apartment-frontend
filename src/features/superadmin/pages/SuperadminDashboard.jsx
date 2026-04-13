import React from 'react';
import { Building2, Users, DollarSign, TrendingUp, Activity, Crown } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useSuperadminDashboard } from '../hooks/useSuperadmin';
import Badge from '../../../components/ui/Badge';

const SuperadminDashboard = () => {
  const { stats, revenueData, subscriptionTypeData, recentCompanies, recentActivities, isLoading } = useSuperadminDashboard();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'trial':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'gray';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'company':
        return <Building2 className="w-4 h-4" />;
      case 'subscription':
        return <Crown className="w-4 h-4" />;
      case 'payment':
        return <DollarSign className="w-4 h-4" />;
      case 'license':
        return <Activity className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Superadmin Dashboard</h1>
        <p className="text-text-secondary mt-1">Platform overview and analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Companies"
          value={stats.totalCompanies}
          change="+12%"
          icon={Building2}
          trend="up"
        />
        <StatsCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          change="+8%"
          icon={Crown}
          trend="up"
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change="+15%"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Monthly Revenue"
          value={formatCurrency(stats.monthlyRecurringRevenue)}
          change="+18%"
          icon={DollarSign}
          trend="up"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="rgb(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis dataKey="month" stroke="rgb(var(--text-secondary))" />
              <YAxis stroke="rgb(var(--text-secondary))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgb(var(--surface))',
                  border: '1px solid rgb(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value) => formatCurrency(value)}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="rgb(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription Types Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Subscription Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subscriptionTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {subscriptionTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgb(var(--surface))',
                  border: '1px solid rgb(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity and Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Companies */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Companies</h3>
          <div className="space-y-3">
            {recentCompanies.map((company) => (
              <div key={company.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-variant transition-colors">
                <div>
                  <p className="font-medium text-text-primary">{company.name}</p>
                  <p className="text-sm text-text-secondary">{company.plan} Plan</p>
                </div>
                <div className="text-right">
                  <Badge color={getStatusColor(company.status)} variant="soft" dot>
                    {company.status}
                  </Badge>
                  <p className="text-xs text-text-tertiary mt-1">{company.signupDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Platform Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-variant transition-colors">
                <div className="p-2 bg-primary bg-opacity-10 rounded-lg text-primary">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-text-primary text-sm">{activity.message}</p>
                  <p className="text-text-tertiary text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperadminDashboard;

