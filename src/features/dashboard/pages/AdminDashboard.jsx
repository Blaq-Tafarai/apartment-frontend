import React from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Building2, Users, Wrench, DollarSign, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Apartments', value: '156', change: '+12%', icon: Building2, trend: 'up' },
    { title: 'Active Tenants', value: '143', change: '+8%', icon: Users, trend: 'up' },
    { title: 'Maintenance Requests', value: '24', change: '-5%', icon: Wrench, trend: 'down' },
    { title: 'Monthly Revenue', value: '$48,590', change: '+15%', icon: DollarSign, trend: 'up' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 35000 },
    { month: 'Feb', revenue: 38000 },
    { month: 'Mar', revenue: 42000 },
    { month: 'Apr', revenue: 39000 },
    { month: 'May', revenue: 45000 },
    { month: 'Jun', revenue: 48590 },
  ];

  const occupancyData = [
    { name: 'Occupied', value: 143 },
    { name: 'Vacant', value: 13 },
  ];

  const buildingData = [
    { name: 'Building A', occupancy: 92 },
    { name: 'Building B', occupancy: 85 },
    { name: 'Building C', occupancy: 78 },
    { name: 'Building D', occupancy: 95 },
  ];

  const recentActivity = [
    { id: 1, type: 'maintenance', message: 'New maintenance request - Apt 301', time: '5 min ago' },
    { id: 2, type: 'payment', message: 'Payment received from John Doe', time: '1 hour ago' },
    { id: 3, type: 'tenant', message: 'New tenant application - Apt 205', time: '2 hours ago' },
    { id: 4, type: 'maintenance', message: 'Maintenance completed - Apt 102', time: '3 hours ago' },
  ];

  const upcomingExpirations = [
    { id: 1, type: 'lease', item: 'Lease - Apt 304', date: 'In 5 days', urgent: true },
    { id: 2, type: 'insurance', item: 'Insurance Policy', date: 'In 12 days', urgent: false },
    { id: 3, type: 'license', item: 'Business License', date: 'In 20 days', urgent: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
        <p className="text-text-secondary mt-1">Property management overview and analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{stats.map((stat, index) => (
          <StatsCard key={'stat-' + index} {...stat} />
        ))}
      </div>

      {/* Charts Row 1 */}
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

        {/* Occupancy Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Occupancy Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis dataKey="name" stroke="rgb(var(--text-secondary))" />
              <YAxis stroke="rgb(var(--text-secondary))" />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ 
                  backgroundColor: 'rgb(var(--surface))',
                  border: '1px solid rgb(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" fill="rgb(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Building Performance */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Building Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={buildingData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
              <XAxis type="number" domain={[0, 100]} stroke="rgb(var(--text-secondary))" />
              <YAxis dataKey="name" type="category" stroke="rgb(var(--text-secondary))" width={80} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ 
                  backgroundColor: 'rgb(var(--surface))',
                  border: '1px solid rgb(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value) => `${value}%`}
              />
              <Bar dataKey="occupancy" fill="rgb(var(--primary))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Expirations */}
        <div className="card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Upcoming Expirations</h3>
          <div className="space-y-3">
            {upcomingExpirations.map((item) => (
              <div key={item.id} className={`flex items-center justify-between p-3 rounded-lg ${item.urgent ? 'bg-red-200 border border-red-500' : 'hover:bg-surface-variant transition-colors'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.urgent ? 'bg-red-200 text-red-500' : 'bg-surface-variant text-text-secondary'}`}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-black">{item.item}</p>
                    <p className="text-sm text-[#666]">{item.date}</p>
                  </div>
                </div>
                {item.urgent && (
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded">Urgent</span>
                )}
              </div>
            ))}
          </div>
          <Link to="/leases" className="mt-4 inline-flex items-center text-sm text-primary hover:underline">
            View all leases →
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-variant transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="text-text-primary text-sm font-medium">{activity.message}</p>
                <p className="text-text-tertiary text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
