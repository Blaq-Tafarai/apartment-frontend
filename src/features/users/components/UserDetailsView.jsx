import React from 'react';
import Badge from '../../../components/ui/Badge';
import { User, Mail, Phone, Shield, Calendar, Building2 } from 'lucide-react';

const UserDetailsView = ({ user, statusColors }) => {
  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-text-primary">{user.name}</h3>
          <Badge color={statusColors(user.status)} variant="solid" className="mt-2">
            {user.status}
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
              <span className="text-text-primary">{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-text-secondary" />
              <span className="text-text-primary">{user.phone || 'N/A'}</span>
            </div>
            {user.organization && (
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-text-secondary" />
                <span className="text-text-primary">{user.organization.name || 'N/A'}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Role Information</h4>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-text-secondary" />
          <Badge color="primary" variant="soft">
            {user.role}
          </Badge>
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-text-primary">Timestamps</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-text-secondary" />
            <div>
              <p className="text-sm text-text-secondary">Created</p>
              <p className="text-text-primary">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-text-secondary" />
            <div>
              <p className="text-sm text-text-secondary">Updated</p>
              <p className="text-text-primary">{new Date(user.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsView;

