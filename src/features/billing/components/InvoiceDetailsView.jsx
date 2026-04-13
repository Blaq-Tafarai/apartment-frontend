import React from 'react';
import Badge from '../../../components/ui/Badge';

const InvoiceDetailsView = ({ invoice, getStatusColor }) => {
  if (!invoice) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-surface p-4 rounded-lg border border-color">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-primary">
              Invoice Details
            </h3>
            <p className="text-secondary">
              {invoice.invoiceNumber} - {invoice.tenant?.name || 'N/A'}
            </p>
          </div>
          <Badge
            color={getStatusColor(invoice.status)}
            variant="soft"
            className="text-sm px-3 py-1"
          >
            {invoice.status}
          </Badge>
        </div>
      </div>

      {/* Invoice Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Property Details
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Tenant:</span>
              <span className="text-primary">{invoice.tenant?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Building:</span>
              <span className="text-primary">{invoice.building?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Apartment:</span>
              <span className="text-primary">{invoice.apartment?.number || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Invoice Dates */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Invoice Dates
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Issue Date:</span>
              <span className="text-primary">{formatDate(invoice.issueDate)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Due Date:</span>
              <span className="text-primary">{formatDate(invoice.dueDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Invoice Details
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-secondary font-medium">Amount:</span>
              <p className="text-success font-semibold text-lg">{formatCurrency(invoice.amount)}</p>
            </div>
            <div>
              <span className="text-secondary font-medium">Invoice Number:</span>
              <p className="text-primary font-mono">{invoice.invoiceNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Description
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <p className="text-secondary leading-relaxed">
            {invoice.description}
          </p>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Notes
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <p className="text-secondary leading-relaxed whitespace-pre-wrap">
              {invoice.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetailsView;
