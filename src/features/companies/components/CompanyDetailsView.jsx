import React from 'react';
import Badge from '../../../components/ui/Badge';
import { Building, Mail, Phone, MapPin, User, Calendar, DollarSign } from 'lucide-react';

const CompanyDetailsView = ({ company }) => {
  if (!company) return null;

  const statusColors = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-text-primary">{company.name}</h3>
          <Badge color={statusColors(company.status)} variant="soft" className="mt-2">
            {company.status}
          </Badge>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Contact Information</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-text-secondary" />
              <span className="text-text-primary">{company.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-text-secondary" />
              <span className="text-text-primary">{company.phone}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-text-secondary mt-0.5" />
              <span className="text-text-primary">{company.address}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Admin User</h4>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-text-secondary" />
            <span className="text-text-primary">{company.adminUser?.name || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      {company.stats && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card p-4">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                <span className="text-sm text-text-secondary">Buildings</span>
              </div>
              <p className="text-2xl font-bold text-text-primary mt-2">{company.stats.totalBuildings}</p>
            </div>
            <div className="card p-4">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                <span className="text-sm text-text-secondary">Apartments</span>
              </div>
              <p className="text-2xl font-bold text-text-primary mt-2">{company.stats.totalApartments}</p>
            </div>
            <div className="card p-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                <span className="text-sm text-text-secondary">Tenants</span>
              </div>
              <p className="text-2xl font-bold text-text-primary mt-2">{company.stats.totalTenants}</p>
            </div>
            <div className="card p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-sm text-text-secondary">Revenue</span>
              </div>
              <p className="text-2xl font-bold text-text-primary mt-2">${company.stats.monthlyRevenue?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Timestamps */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-text-primary">Timestamps</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-text-secondary" />
            <div>
              <p className="text-sm text-text-secondary">Created</p>
              <p className="text-text-primary">{new Date(company.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-text-secondary" />
            <div>
              <p className="text-sm text-text-secondary">Updated</p>
              <p className="text-text-primary">{new Date(company.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsView;
