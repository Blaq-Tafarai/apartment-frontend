import React from 'react';
import Badge from '../../../components/ui/Badge';

const TenantDetailsView = ({ tenant, statusColors }) => {
  if (!tenant) return null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Hero Header */}
      <div className="bg-surface p-8 rounded-lg border border-color">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-6 flex-1">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-2xl flex-shrink-0 shadow-md">
              {tenant.user?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2 leading-tight">
                {tenant.user?.name || 'N/A'}
              </h1>
              <p className="text-secondary text-xl opacity-90">
                {tenant.apartment?.unitNumber || 'N/A'}
              </p>
            </div>
          </div>
          <Badge
            color={statusColors(tenant.user.status)}
            variant="soft"
            className="text-lg px-6 py-3 font-semibold min-w-max self-start lg:self-center"
          >
            {tenant.user.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info & Primary Emergency - Combined larger card */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-surface p-8 rounded-lg border border-color">
            <h3 className="text-2xl font-bold text-primary mb-2 border-b border-color pb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div>
                <span className="text-secondary font-semibold text-sm uppercase tracking-wide mb-3 block">Full Name</span>
                <p className="text-primary text-2xl font-bold">{tenant.user?.name || 'N/A'}</p>
              </div>
              <div>
                <span className="text-secondary font-semibold text-sm uppercase tracking-wide mb-3 block">Email</span>
                <p className="text-primary text-xl font-semibold">{tenant.user?.email || 'N/A'}</p>
              </div>
              <div>
                <span className="text-secondary font-semibold text-sm uppercase tracking-wide mb-3 block">Phone</span>
                <p className="text-primary text-xl font-semibold">{tenant.user?.phone || 'N/A'}</p>
              </div>
              <div>
                <span className="text-secondary font-semibold text-sm uppercase tracking-wide mb-3 block">Gender</span>
                <p className="text-primary text-xl font-semibold">{tenant.user?.gender || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Notes - Full width in main */}
          {tenant.notes && (
            <div className="bg-surface p-8 rounded-2xl border border-color shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-2 border-b border-color pb-4">
                Notes
              </h3>
              <div className="pt-6">
                <p className="text-secondary text-lg leading-relaxed">
                  {tenant.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Emergency + Documents */}
        <div className="space-y-6 lg:sticky lg:top-0 lg:pt-8">
          {/* Primary Emergency Contact */}
          <div className="bg-surface p-8 rounded-lg border border-color">
            <h4 className="text-xl font-bold text-primary mb-6 border-b border-color pb-2">
              Primary Emergency
            </h4>
            <div className="space-y-4">
              <div>
                <span className="text-secondary font-medium block mb-1">Name</span>
                <p className="text-primary font-semibold text-lg">{tenant.user?.emergencyName || 'N/A'}</p>
              </div>
              <div>
                <span className="text-secondary font-medium block mb-1">Relationship</span>
                <p className="text-primary font-semibold text-lg">{tenant.user?.emergencyRelationship || 'N/A'}</p>
              </div>
              <div>
                <span className="text-secondary font-medium block mb-1">Phone</span>
                <p className="text-primary font-semibold text-lg">{tenant.user?.emergencyPhone || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Additional Emergency */}
          {tenant.emergencyContact && (
            <div className="bg-surface p-6 rounded-2xl border border-color shadow-lg">
              <h5 className="text-lg font-bold text-primary mb-4 border-b border-color pb-2">
                Additional Contact
              </h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-secondary block mb-1 font-medium">Name</span>
                  <p className="text-primary font-semibold">{tenant.emergencyContact.name}</p>
                </div>
                <div>
                  <span className="text-secondary block mb-1 font-medium">Phone</span>
                  <p className="text-primary font-semibold">{tenant.emergencyContact.phone}</p>
                </div>
                <div>
                  <span className="text-secondary block mb-1 font-medium">Relationship</span>
                  <p className="text-primary font-semibold">{tenant.emergencyContact.relationship}</p>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {tenant.documents && tenant.documents.length > 0 && (
            <div className="bg-surface p-6 rounded-2xl border border-color shadow-lg">
              <h5 className="text-lg font-bold text-primary mb-4 border-b border-color pb-2">
                Documents ({tenant.documents.length})
              </h5>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2">
                {tenant.documents.map((document, index) => (
                  <Badge
                    key={index}
                    color="primary"
                    variant="outline"
                    className="text-sm justify-between w-full"
                  >
                    {document}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantDetailsView;

