import React from 'react';
import { Activity, TrendingUp, Calendar, Users, PieChart, Filter } from 'lucide-react';

const QuickStats = ({ reports, filteredReports }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="card flex items-center gap-3">
        <Activity className="w-6 h-6 text-blue-500" />
        <div>
          <p className="text-text-secondary text-sm">Total Reports</p>
          <p className="text-2xl font-bold text-text-primary">{reports.length}</p>
        </div>
      </div>
      <div className="card flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-green-500" />
        <div>
          <p className="text-text-secondary text-sm">Active</p>
          <p className="text-2xl font-bold text-success">{reports.filter(r => r.isActive).length}</p>
        </div>
      </div>
      <div className="card flex items-center gap-3">
        <Calendar className="w-6 h-6 text-purple-500" />
        <div>
          <p className="text-text-secondary text-sm">Scheduled</p>
          <p className="text-2xl font-bold text-blue-500">{reports.filter(r => r.schedule).length}</p>
        </div>
      </div>
      <div className="card flex items-center gap-3">
        <Users className="w-6 h-6 text-orange-500" />
        <div>
          <p className="text-text-secondary text-sm">Financial</p>
          <p className="text-2xl font-bold text-purple-500">{reports.filter(r => r.type === 'financial').length}</p>
        </div>
      </div>
      <div className="card flex items-center gap-3">
        <PieChart className="w-6 h-6 text-red-500" />
        <div>
          <p className="text-text-secondary text-sm">Maintenance</p>
          <p className="text-2xl font-bold text-orange-500">{reports.filter(r => r.type === 'maintenance').length}</p>
        </div>
      </div>
      <div className="card flex items-center gap-3">
        <Filter className="w-6 h-6 text-gray-500" />
        <div>
          <p className="text-text-secondary text-sm">Filtered</p>
          <p className="text-2xl font-bold text-gray-600">{filteredReports.length}</p>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
