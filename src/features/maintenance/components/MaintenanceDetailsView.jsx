import React from 'react';
import Badge from '../../../components/ui/Badge';

const MaintenanceDetailsView = ({ maintenance, priorityColors, getStatusColor }) => {
  if (!maintenance) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-surface p-4 rounded-lg border border-color">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-primary">
              {maintenance.issue}
            </h3>
            <p className="text-secondary">
              {maintenance.tenant?.user?.name || 'N/A'} - {maintenance.apartment?.unitNumber || 'N/A'}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge
              color={priorityColors(maintenance.priority)}
              variant="soft"
              className="text-sm px-3 py-1"
            >
              {maintenance.priority}
            </Badge>
            <Badge
              color={getStatusColor(maintenance.status)}
              variant="soft"
              className="text-sm px-3 py-1"
            >
              {maintenance.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Request Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Request Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Category:</span>
              <span className="text-primary">{maintenance.category}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Priority:</span>
              <Badge
                color={priorityColors(maintenance.priority)}
                variant="soft"
                className="text-sm"
              >
                {maintenance.priority}
              </Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Status:</span>
              <Badge
                color={getStatusColor(maintenance.status)}
                variant="soft"
                className="text-sm"
              >
                {maintenance.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Assigned To:</span>
              <span className="text-primary">{maintenance.assignedManager?.name || 'Unassigned'}</span>
            </div>
          </div>
        </div>

        {/* Estimated Cost, Actual Cost, Completed At */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Financial & Timeline Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Estimated Cost:</span>
              <span className="text-primary">${maintenance.estimatedCost || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Actual Cost:</span>
              <span className="text-primary">${maintenance.actualCost || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Completed At:</span>
              <span className="text-primary">{formatDate(maintenance.completedAt) || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Location Information
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-secondary font-medium">Tenant:</span>
              <p className="text-primary">{maintenance.tenant?.user?.name || 'N/A'}</p>
            </div>
            <div>
              <span className="text-secondary font-medium">Apartment:</span>
              <p className="text-primary">{maintenance.apartment?.unitNumber || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Description
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <p className="text-secondary leading-relaxed">
            {maintenance.description}
          </p>
        </div>
      </div>

      {/* Notes Section */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Notes
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <p className="text-secondary leading-relaxed">{maintenance.note}</p>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetailsView;
