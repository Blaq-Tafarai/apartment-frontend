import React from 'react';
import Badge from '../../../components/ui/Badge';

const BuildingDetailsView = ({ building, getStatusColor }) => {
  if (!building) return null;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-surface p-4 rounded-lg border border-color">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-primary">
              {building.name}
            </h3>
            <p className="text-secondary">
              {building.address}
            </p>
          </div>
          <Badge
            color={getStatusColor(building.status)}
            variant="soft"
            className="text-sm px-3 py-1"
          >
            {building.status}
          </Badge>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Basic Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Units:</span>
              <span className="text-primary">{building.units}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Year Built:</span>
              <span className="text-primary">{building.yearBuilt || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Total Sqft:</span>
              <span className="text-primary">
                {building.totalSqft ? `${building.totalSqft.toLocaleString()} sqft` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">No. of Apartments:</span>
              <span className="text-primary">
                {building._count?.apartments || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Operational Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Operational Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Occupancy Rate:</span>
              <span className="text-success font-semibold">
                {building.occupancyRate}%
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Manager:</span>
              <span className="text-primary">
                {building.managers[0]?.manager?.name || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      {building.description && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Description
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <p className="text-secondary leading-relaxed">
              {building.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingDetailsView;
