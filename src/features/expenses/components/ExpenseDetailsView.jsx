import React from 'react';
import Badge from '../../../components/ui/Badge';

const ExpenseDetailsView = ({ expense }) => {
  if (!expense) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Approved':
        return 'blue';
      case 'Pending':
        return 'warning';
      case 'Overdue':
        return 'danger';
      case 'Cancelled':
        return 'gray';
      default:
        return 'gray';
    }
  };

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
              Expense Details
            </h3>
            <p className="text-secondary">
              {expense.category} - {expense.vendor}
            </p>
          </div>
          <Badge
            color={getStatusColor(expense.paymentStatus)}
            variant="soft"
            className="text-sm px-3 py-1"
          >
            {expense.paymentStatus}
          </Badge>
        </div>
      </div>

      {/* Expense Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Property Details
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Building:</span>
              <span className="text-primary">{expense.building?.name || 'Property-wide'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Category:</span>
              <span className="text-primary">{expense.category}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Vendor:</span>
              <span className="text-primary">{expense.vendor}</span>
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
              <span className="text-primary">{formatDate(expense.dueDate)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Paid At:</span>
              <span className="text-primary">{formatDate(expense.paidAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Details */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Expense Details
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-secondary font-medium">Amount:</span>
              <p className="text-success font-semibold text-lg">{formatCurrency(expense.amount)}</p>
            </div>
            <div>
              <span className="text-secondary font-medium">Payment Method:</span>
              <p className="text-primary font-medium">{expense.paymentMethod}</p>
            </div>
            <div>
              <span className="text-secondary font-medium">Recurring:</span>
              <p className={`font-medium ${expense.recurring ? 'text-blue-500' : 'text-gray-500'}`}>
                {expense.recurring ? `${expense.recurrenceFrequency}` : 'No'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Information */}
      {expense.invoiceNumber && (
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Invoice Information
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-secondary font-medium">Invoice Number:</span>
                <p className="text-primary font-mono">{expense.invoiceNumber}</p>
              </div>
              {expense.invoiceUrl && (
                <div>
                  <span className="text-secondary font-medium">Invoice:</span>
                  <a
                    href={expense.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    View Invoice
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Description
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <p className="text-secondary leading-relaxed">
            {expense.description}
          </p>
        </div>
      </div>

      {/* Notes */}
      {expense.notes && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Notes
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <p className="text-secondary leading-relaxed whitespace-pre-wrap">
              {expense.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDetailsView;
