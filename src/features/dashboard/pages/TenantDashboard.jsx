import React from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { FileText, DollarSign, Wrench, Calendar, Home, Users } from 'lucide-react';


const TenantDashboard = () => {
  const stats = [
    { title: 'Apartment', value: 'Apt 205', change: '', icon: Home, trend: '' },
    { title: 'Rent Due', value: '$1,250', change: 'Due in 5 days', icon: DollarSign, trend: 'neutral' },
    { title: 'Open Requests', value: '1', change: 'In Progress', icon: Wrench, trend: 'neutral' },
    { title: 'Lease Ends', value: 'Dec 2024', change: '6 months', icon: Calendar, trend: 'neutral' },
  ];

  const paymentHistory = [
    { id: 1, date: 'Jun 1, 2024', amount: '$1,250', status: 'Paid' },
    { id: 2, date: 'May 1, 2024', amount: '$1,250', status: 'Paid' },
    { id: 3, date: 'Apr 1, 2024', amount: '$1,250', status: 'Paid' },
    { id: 4, date: 'Mar 1, 2024', amount: '$1,200', status: 'Paid' },
  ];

  const maintenanceRequests = [
    { id: 1, issue: 'AC not cooling properly', date: 'Jun 10, 2024', status: 'In Progress', priority: 'High' },
    { id: 2, issue: 'Kitchen faucet leak', date: 'May 15, 2024', status: 'Completed', priority: 'Medium' },
  ];

  const documents = [
    { id: 1, name: 'Lease Agreement', type: 'PDF', date: 'Jan 1, 2024' },
    { id: 2, name: 'Rent Receipt - May', type: 'PDF', date: 'May 1, 2024' },
    { id: 3, name: 'Move-in Checklist', type: 'PDF', date: 'Jan 1, 2024' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Welcome Home!</h1>
        <p className="text-text-secondary mt-1">Your apartment living dashboard</p>
      </div>

      {/* Welcome Banner */}
      <div className="card bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Apartment 205</h2>
            <p className="text-white/80 mt-1">2 Bed • 1 Bath • Downtown View</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">$1,250</p>
            <p className="text-white/80">Monthly Rent</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Payment & Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment History */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Payment History</h3>
            <Link to="/payments" className="text-sm text-primary hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-variant transition-colors">
                <div>
                  <p className="font-medium text-text-primary">{payment.date}</p>
                  <p className="text-sm text-text-secondary">{payment.amount}</p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
            Pay Rent Now
          </button>
        </div>

        {/* Maintenance Requests */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">My Maintenance Requests</h3>
            <Link to="/maintenance" className="text-sm text-primary hover:underline">Submit new →</Link>
          </div>
          <div className="space-y-3">
            {maintenanceRequests.map((request) => (
              <div key={request.id} className="p-3 rounded-lg border border-border-color hover:bg-surface-variant transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text-primary">{request.issue}</span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    request.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{request.date}</span>
                  <span className={`${
                    request.priority === 'High' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {request.priority} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">My Documents</h3>
          <Link to="/documents" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg border border-border-color hover:bg-surface-variant transition-colors cursor-pointer">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-text-primary text-sm">{doc.name}</p>
                <p className="text-xs text-text-secondary">{doc.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 rounded-lg border border-border-color hover:bg-surface-variant transition-colors text-center">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-medium text-text-primary">Pay Rent</span>
          </button>
          <Link to="/maintenance" className="p-4 rounded-lg border border-border-color hover:bg-surface-variant transition-colors text-center">
            <Wrench className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-medium text-text-primary">Maintenance</span>
          </Link>
          <Link to="/documents" className="p-4 rounded-lg border border-border-color hover:bg-surface-variant transition-colors text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-medium text-text-primary">Documents</span>
          </Link>
          <Link to="/settings" className="p-4 rounded-lg border border-border-color hover:bg-surface-variant transition-colors text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <span className="text-sm font-medium text-text-primary">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
