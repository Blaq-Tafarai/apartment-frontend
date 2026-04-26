import React from 'react';

const PaymentSummaryCards = ({ payments }) => {
  const totalPayments = payments.length;
  const completedPayments = payments.filter(p => p.status === 'completed').length;
  const pendingPayments = payments.filter(p => p.status === 'pending').length;
  const totalAmount = payments.reduce(
  (sum, p) => sum + Number(p.amount || 0),
  0);
  const completedAmount = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Payments</p>
        <p className="text-3xl font-bold text-text-primary">
          {totalPayments}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Completed</p>
        <p className="text-3xl font-bold text-success">
          {completedPayments}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Pending</p>
        <p className="text-3xl font-bold text-warning">
          {pendingPayments}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Amount</p>
        <p className="text-3xl font-bold text-text-primary">
          ${totalAmount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PaymentSummaryCards;
