import React from 'react';
import Badge from '../../../components/ui/Badge';

const MaintenanceDetailsView = ({ maintenance, priorityColors, getStatus, statusColors }) => {
  if (!maintenance) return null;

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
              {maintenance.tenant?.name || 'N/A'} - {maintenance.apartment?.number || 'N/A'} - {maintenance.building?.name || 'N/A'}
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
              color={statusColors(maintenance.status)}
              variant="soft"
              className="text-sm px-3 py-1"
            >
              {getStatus(maintenance.status)}
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
                color={statusColors(maintenance.status)}
                variant="soft"
                className="text-sm"
              >
                {getStatus(maintenance.status)}
              </Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Assigned To:</span>
              <span className="text-primary">{maintenance.assignedTo || 'Unassigned'}</span>
            </div>
          </div>
        </div>

        {/* Cost Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Cost Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Estimated Cost:</span>
              <span className="text-primary">
                {maintenance.estimatedCost ? `$${maintenance.estimatedCost}` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Actual Cost:</span>
              <span className="text-primary">
                {maintenance.actualCost ? `$${maintenance.actualCost}` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Completed At:</span>
              <span className="text-primary">
                {maintenance.completedAt ? new Date(maintenance.completedAt).toLocaleDateString() : 'N/A'}
              </span>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-secondary font-medium">Tenant:</span>
              <p className="text-primary">{maintenance.tenant?.name || 'N/A'}</p>
            </div>
            <div>
              <span className="text-secondary font-medium">Building:</span>
              <p className="text-primary">{maintenance.building?.name || 'N/A'}</p>
            </div>
            <div>
              <span className="text-secondary font-medium">Apartment:</span>
              <p className="text-primary">{maintenance.apartment?.number || 'N/A'}</p>
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
      {maintenance.notes && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Notes
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <p className="text-secondary leading-relaxed">
              {maintenance.notes}
            </p>
          </div>
        </div>
      )}

      {/* Photos Section */}
      {maintenance.photos && maintenance.photos.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Photos ({maintenance.photos.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {maintenance.photos.map((photo, index) => (
              <div key={index} className="bg-surface p-2 rounded-lg border border-color">
                <img
                  src={photo}
                  alt={`Maintenance photo ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceDetailsView;
