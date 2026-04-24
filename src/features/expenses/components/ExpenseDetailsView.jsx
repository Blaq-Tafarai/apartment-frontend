import React from 'react';
import Badge from '../../../components/ui/Badge';

const ExpenseDetailsView = ({ expense, getCategoryColor }) => {
  if (!expense) return null;

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
              {expense.category} - {expense.building ? expense.building.name : 'N/A'} 
            </p>
          </div>
          <Badge
            color={getCategoryColor(expense.category)}
            variant="solid"
            className="text-sm px-3 py-1"
          >
            {expense.category}
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
          </div>
        </div>

        {/* Payment Dates */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Payment Dates
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Paid At:</span>
              <span className="text-primary">{formatDate(expense.createdAt)}</span>
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
            {expense.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetailsView;
