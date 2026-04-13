import React from 'react';
import Badge from '../../../components/ui/Badge';

const LeaseDetailsView = ({ lease }) => {
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

  const getStatusColor = (lease) => {
    if (lease.signedByTenant && lease.signedByLandlord) {
      return 'success';
    } else if (lease.signedByTenant || lease.signedByLandlord) {
      return 'warning';
    } else {
      return 'gray';
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
              {lease.tenant?.name || 'N/A'} - {lease.apartment?.unitNumber || 'N/A'} - {lease.building?.name || 'N/A'}
            </p>
          </div>
          <Badge
            color={getStatusColor(lease)}
            variant="soft"
            className="text-sm px-3 py-1"
          >
            {getStatusText(lease)}
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
              <span className="text-primary">{lease.tenant?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Building:</span>
              <span className="text-primary">{lease.building?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Apartment:</span>
              <span className="text-primary">{lease.apartment?.unitNumber || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Landlord:</span>
              <span className="text-primary">{lease.landlord?.name || 'N/A'}</span>
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
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Signature Date:</span>
              <span className="text-primary">{formatDate(lease.signatureDate)}</span>
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
              <p className="text-success font-semibold text-lg">${lease.monthlyRent}</p>
            </div>
            <div>
              <span className="text-secondary font-medium">Security Deposit:</span>
              <p className="text-primary font-semibold">${lease.securityDeposit}</p>
            </div>
            <div>
              <span className="text-secondary font-medium">Deposit Status:</span>
              <p className={`font-medium ${lease.depositPaid ? 'text-success' : 'text-danger'}`}>
                {lease.depositPaid ? 'Paid' : 'Pending'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Status */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Signature Status
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${lease.signedByTenant ? 'bg-success' : 'bg-gray-300'}`}></div>
              <span className="text-primary">Signed by Tenant</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${lease.signedByLandlord ? 'bg-success' : 'bg-gray-300'}`}></div>
              <span className="text-primary">Signed by Landlord</span>
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

      {/* Documents Section */}
      {lease.documents && lease.documents.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Documents ({lease.documents.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {lease.documents.map((document, index) => (
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

      {/* Deposit Information */}
      {lease.depositReturned !== null && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Deposit Information
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-secondary font-medium">Deposit Returned:</span>
                <p className={`font-medium ${lease.depositReturned ? 'text-success' : 'text-danger'}`}>
                  {lease.depositReturned ? 'Yes' : 'No'}
                </p>
              </div>
              {lease.depositReturnDate && (
                <div>
                  <span className="text-secondary font-medium">Return Date:</span>
                  <p className="text-primary">{formatDate(lease.depositReturnDate)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaseDetailsView;
