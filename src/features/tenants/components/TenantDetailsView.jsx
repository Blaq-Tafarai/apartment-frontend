import React from 'react';
import Badge from '../../../components/ui/Badge';

const TenantDetailsView = ({ tenant, statusColors }) => {
  if (!tenant) return null;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-surface p-4 rounded-lg border border-color">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-primary">
              {tenant.user?.name || 'N/A'}
            </h3>
            <p className="text-secondary">
              {tenant.apartment?.number || 'N/A'} - {tenant.building?.name || 'N/A'}
            </p>
          </div>
          <Badge
            color={statusColors(tenant.status)}
            variant="soft"
            className="text-sm px-3 py-1"
          >
            {tenant.status}
          </Badge>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Personal Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Name:</span>
              <span className="text-primary">{tenant.user?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Email:</span>
              <span className="text-primary">{tenant.user?.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Phone:</span>
              <span className="text-primary">{tenant.user?.phone || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Section */}
      {tenant.emergencyContact && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Emergency Contact
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-secondary font-medium">Name:</span>
                <p className="text-primary">{tenant.emergencyContact.name}</p>
              </div>
              <div>
                <span className="text-secondary font-medium">Phone:</span>
                <p className="text-primary">{tenant.emergencyContact.phone}</p>
              </div>
              <div>
                <span className="text-secondary font-medium">Relationship:</span>
                <p className="text-primary">{tenant.emergencyContact.relationship}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Section */}
      {tenant.documents && tenant.documents.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Documents
          </h4>
          <div className="flex flex-wrap gap-2">
            {tenant.documents.map((document, index) => (
              <Badge
                key={index}
                color="primary"
                variant="outline"
                className="text-sm"
              >
                {document}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Notes Section */}
      {tenant.notes && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Notes
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <p className="text-secondary leading-relaxed">
              {tenant.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantDetailsView;
