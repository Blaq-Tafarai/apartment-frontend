import React from 'react';

const ApartmentSummaryCards = ({ apartments }) => {
  const totalApartments = apartments.length;
  const occupiedCount = apartments.filter(a => a.status === 'occupied').length;
  const vacantCount = apartments.filter(a => a.status === 'available').length;
  const avgRent = totalApartments > 0
    ? Math.round(apartments.reduce((sum, a) => sum + a.rent, 0) / totalApartments)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Apartments</p>
        <p className="text-3xl font-bold text-text-primary">
          {totalApartments}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Occupied</p>
        <p className="text-3xl font-bold text-success">
          {occupiedCount}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Vacant</p>
        <p className="text-3xl font-bold text-info">
          {vacantCount}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Avg Rent</p>
        <p className="text-2xl font-bold text-text-primary">
          ${avgRent}/month
        </p>
      </div>
    </div>
  );
};

export default ApartmentSummaryCards;
