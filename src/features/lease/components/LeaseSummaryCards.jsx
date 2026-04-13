import React from 'react';

const LeaseSummaryCards = ({ leases }) => {
  const totalLeases = leases.length;
  const activeLeases = leases.filter(l => new Date(l.endDate) > new Date()).length;
  const expiredLeases = leases.filter(l => new Date(l.endDate) <= new Date()).length;
  const signedByTenant = leases.filter(l => l.signedByTenant).length;
  const totalMonthlyRent = leases.reduce((sum, l) => sum + l.monthlyRent, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Leases</p>
        <p className="text-3xl font-bold text-text-primary">
          {totalLeases}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Active Leases</p>
        <p className="text-3xl font-bold text-success">
          {activeLeases}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Expired Leases</p>
        <p className="text-3xl font-bold text-danger">
          {expiredLeases}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Signed by Tenant</p>
        <p className="text-3xl font-bold text-blue-500">
          {signedByTenant}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Monthly Rent</p>
        <p className="text-3xl font-bold text-text-primary">
          ${totalMonthlyRent}
        </p>
      </div>
    </div>
  );
};

export default LeaseSummaryCards;
