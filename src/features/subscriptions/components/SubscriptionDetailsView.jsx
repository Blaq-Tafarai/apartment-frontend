import React from 'react';
import Badge from '../../../components/ui/Badge';
import { CreditCard, DollarSign, Calendar, Building2, Users, Rotate3DIcon } from 'lucide-react';

const SubscriptionDetailsView = ({ subscription }) => {
  if (!subscription) return null;

  const statusColors = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      case 'suspended':
        return 'warning';
      default:
        return 'default';
    }
  };

  const billingLabels = {
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-text-primary">{subscription.planName}</h3>
          <Badge color={statusColors(subscription.status)} variant="soft" className="mt-2">
            {subscription.status?.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Subscription Details</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-text-secondary" />
              <span className="text-text-primary font-mono text-sm">{subscription.organization.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-text-secondary" />
              <span className="text-text-primary">{subscription.planName}</span>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-text-secondary" />
              <span className="text-text-primary font-semibold">${subscription.price}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Billing Information</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 text-text-secondary">
                <Rotate3DIcon className="w-5 h-5 text-text-secondary" />
              </span>
              <span className="text-text-primary font-medium">{billingLabels[subscription.billingCycle]}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-text-secondary" />
              <div>
                <span className="text-sm text-text-secondary block">Start Date</span>
                <span className="text-text-primary">{(new Date(subscription.startDate)).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-text-secondary" />
              <div>
                <span className="text-sm text-text-secondary block">End Date</span>
                <span className="text-text-primary">{new Date(subscription.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timestamps if available */}
      {subscription.createdAt && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-text-primary">Timestamps</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-text-secondary" />
              <div>
                <p className="text-sm text-text-secondary">Created</p>
                <p className="text-text-primary">{new Date(subscription.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-text-secondary" />
              <div>
                <p className="text-sm text-text-secondary">Updated</p>
                <p className="text-text-primary">{new Date(subscription.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionDetailsView;

