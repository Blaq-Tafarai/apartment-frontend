import React from 'react';

const MaintenanceSummaryCards = ({ maintenance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Requests</p>
        <p className="text-3xl font-bold text-text-primary">
          {maintenance.length}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Open</p>
        <p className="text-3xl font-bold text-blue-500">
          {maintenance.filter(m => m.status === 'open').length}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">In Progress</p>
        <p className="text-3xl font-bold text-warning">
          {maintenance.filter(m => m.status === 'in_progress').length}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Completed</p>
        <p className="text-3xl font-bold text-success">
          {maintenance.filter(m => m.status === 'resolved').length}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Cost</p>
        <p className="text-2xl font-bold text-text-primary">
          ${maintenance.reduce((sum, m) => sum + (Number(m.actualCost) || 0), 0)}
        </p>
      </div>
    </div>
  );
};

export default MaintenanceSummaryCards;
