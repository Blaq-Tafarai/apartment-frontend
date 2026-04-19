import React from 'react';
import Badge from '../../../components/ui/Badge';

const LeaseDetailsView = ({ lease, statusColors }) => {
  if (!lease) return null;

  const getStatusText = (lease) => {
    if (lease.signedByTenant && lease.signedByLandlord) {
      return 'Signed';
    } else if (lease.signedByTenant || lease.signedByLandlord) {
      return 'Partially Signed';
    } else {
      return 'Draft';
    }
  };

  

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
              Lease Agreement
            </h3>
            <p className="text-secondary">
              {lease.tenant?.user?.name || 'N/A'} - {lease.apartment?.unitNumber || 'N/A'}
            </p>
          </div>
          <Badge
            color={statusColors(lease.status)}
            variant="soft"
            className="text-sm px-3 py-1"
          >
            {lease.status}
          </Badge>
        </div>
      </div>

      {/* Lease Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Property Details
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Tenant:</span>
              <span className="text-primary">{lease.tenant?.user?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Apartment:</span>
              <span className="text-primary">{lease.apartment?.unitNumber || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Lease Dates */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Lease Dates
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Start Date:</span>
              <span className="text-primary">{formatDate(lease.startDate)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">End Date:</span>
              <span className="text-primary">{formatDate(lease.endDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Financial Information
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-secondary font-medium">Monthly Rent:</span>
              <p className="text-success font-semibold text-lg">${lease.rentAmount}</p>
            </div>
            <div>
              <span className="text-secondary font-medium">Security Deposit:</span>
              <p className="text-primary font-semibold">${lease.securityDeposit}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lease Terms */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Lease Terms & Conditions
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <p className="text-secondary leading-relaxed whitespace-pre-wrap">
            {lease.terms}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaseDetailsView;
