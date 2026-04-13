import React from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Home, Users, Wrench, DollarSign, Building2, TrendingUp } from 'lucide-react';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

const ManagerDashboard = () => {
  const stats = [
    { title: 'My Apartments', value: '45', change: '+3', icon: Home, trend: 'up' },
    { title: 'Active Tenants', value: '42', change: '+2', icon: Users, trend: 'up' },
    { title: 'Open Requests', value: '8', change: '-2', icon: Wrench, trend: 'down' },
    { title: 'This Month', value: '$12,450', change: '+8%', icon: DollarSign, trend: 'up' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 10500 },
    { month: 'Feb', revenue: 11200 },
    { month: 'Mar', revenue: 10800 },
    { month: 'Apr', revenue: 11500 },
    { month: 'May', revenue: 12000 },
    { month: 'Jun', revenue: 12450 },
  ];

  const maintenanceByType = [
    { name: 'Plumbing', value: 12 },
    { name: 'Electrical', value: 8 },
    { name: 'HVAC', value: 15 },
    { name: 'Appliances', value: 6 },
  ];

  const myApartments = [
    { number: '101', tenant: 'John Smith', status: 'Occupied', rent: '$1,200' },
    { number: '102', tenant: 'Jane Doe', status: 'Occupied', rent: '$1,350' },
    { name: '103', tenant: 'Vacant', status: 'Vacant', rent: '$1,400' },
    { number: '201', tenant: 'Mike Johnson', status: 'Occupied', rent: '$1,500' },
  ];

  const recentMaintenance = [
    { id: 1, unit: 'Apt 101', issue: 'Leaking faucet', status: 'In Progress', priority: 'Medium' },
    { id: 2, unit: 'Apt 205', issue: 'AC not cooling', status: 'Pending', priority: 'High' },
    { id: 3, unit: 'Apt 103', issue: 'Light fixture', status: 'Completed', priority: 'Low' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Manager Dashboard</h1>
        <p className="text-text-secondary mt-1">Your property portfolio overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{stats.map((stat, i) => (
          <StatsCard key={'stat-' + i} {...stat} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenueManager" x1="0" y1="0" x2="0" y2="1">
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
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="rgb(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorRevenueManager)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Maintenance by Type */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Maintenance by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={maintenanceByType}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {maintenanceByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgb(var(--surface))',
                  border: '1px solid rgb(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* My Apartments & Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Apartments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">My Apartments</h3>
            <Link to="/apartments" className="text-sm text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {myApartments.map((apt) => (
              <div key={apt.number} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-variant transition-colors">
                <div>
                  <p className="font-medium text-text-primary">Apt {apt.number}</p>
                  <p className="text-sm text-text-secondary">{apt.tenant}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded ${apt.status === 'Occupied' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {apt.status}
                  </span>
                  <p className="text-sm font-medium text-text-primary mt-1">{apt.rent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Maintenance */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Maintenance Requests</h3>
            <Link to="/maintenance" className="text-sm text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {recentMaintenance.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-variant transition-colors">
                <div>
                  <p className="font-medium text-text-primary">{request.unit}</p>
                  <p className="text-sm text-text-secondary">{request.issue}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded ${
                    request.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    request.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {request.status}
                  </span>
                  <p className={`text-xs mt-1 ${
                    request.priority === 'High' ? 'text-red-600' :
                    request.priority === 'Medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {request.priority}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/apartments" className="p-4 rounded-lg border border-border-color hover:bg-surface-variant transition-colors text-center">
            <Building2 className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-medium text-text-primary">Add Apartment</span>
          </Link>
          <Link to="/tenants" className="p-4 rounded-lg border border-border-color hover:bg-surface-variant transition-colors text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-medium text-text-primary">Add Tenant</span>
          </Link>
          <Link to="/maintenance" className="p-4 rounded-lg border border-border-color hover:bg-surface-variant transition-colors text-center">
            <Wrench className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-medium text-text-primary">Create Request</span>
          </Link>
          <Link to="/reports" className="p-4 rounded-lg border border-border-color hover:bg-surface-variant transition-colors text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-medium text-text-primary">View Reports</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
