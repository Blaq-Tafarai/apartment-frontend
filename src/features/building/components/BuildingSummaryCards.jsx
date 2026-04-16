import React from 'react';

const BuildingSummaryCards = ({ buildings }) => {
  const totalBuildings = buildings.length;
  const activeCount = buildings.filter(b => b.status === 'active').length;
  const underConstructionCount = buildings.filter(b => b.status === 'under_construction').length;
  const averageOccupancy =
  totalBuildings > 0
    ? Math.round(
        buildings.reduce((sum, b) => {
          const rate = parseFloat(b.occupancyRate) || 0;
          return sum + rate;
        }, 0) / totalBuildings
      )
    : 0;
  const avgOccupancy = averageOccupancy.toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Buildings</p>
        <p className="text-3xl font-bold text-text-primary">
          {totalBuildings}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Active</p>
        <p className="text-3xl font-bold text-success">
          {activeCount}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Under Construction</p>
        <p className="text-3xl font-bold text-blue-500">
          {underConstructionCount}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Avg Occupancy</p>
        <p className="text-3xl font-bold text-text-primary">
          {avgOccupancy}%
        </p>
      </div>
    </div>
  );
};

export default BuildingSummaryCards;
