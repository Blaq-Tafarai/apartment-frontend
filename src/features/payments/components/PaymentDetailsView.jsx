import React from 'react';
import Badge from '../../../components/ui/Badge';

const PaymentDetailsView = ({ payment, getStatusColor }) => {
  if (!payment) return null;

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
              Payment Details
            </h3>
            <p className="text-secondary">
              Invoice #{payment.invoiceNumber} - {payment.tenant?.name || 'N/A'}
            </p>
          </div>
          <Badge
            color={getStatusColor(payment.status)}
            variant="soft"
            className="text-sm px-3 py-1"
          >
            {payment.status}
          </Badge>
        </div>
      </div>

      {/* Payment Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Property Details
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Tenant:</span>
              <span className="text-primary">{payment.tenant?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Building:</span>
              <span className="text-primary">{payment.building?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Apartment:</span>
              <span className="text-primary">{payment.apartment?.number || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Payment Dates */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Payment Dates
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Due Date:</span>
              <span className="text-primary">{formatDate(payment.dueDate)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Paid At:</span>
              <span className="text-primary">{formatDate(payment.paidAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Payment Details
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-secondary font-medium">Amount:</span>
              <p className="text-success font-semibold text-lg">{formatCurrency(payment.amount)}</p>
            </div>
            <div>
              <span className="text-secondary font-medium">Type:</span>
              <p className="text-primary font-medium">{payment.type}</p>
            </div>
            <div>
              <span className="text-secondary font-medium">Method:</span>
              <p className="text-primary font-medium">{payment.method}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Information */}
      {payment.transactionId && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Transaction Information
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-secondary font-medium">Transaction ID:</span>
                <p className="text-primary font-mono text-sm">{payment.transactionId}</p>
              </div>
              {payment.receiptUrl && (
                <div>
                  <span className="text-secondary font-medium">Receipt:</span>
                  <a
                    href={payment.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    View Receipt
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      {payment.notes && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Notes
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <p className="text-secondary leading-relaxed whitespace-pre-wrap">
              {payment.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsView;
