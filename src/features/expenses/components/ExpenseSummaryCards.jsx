import React from 'react';

const ExpenseSummaryCards = ({ expenses }) => {
  const totalExpenses = expenses.length;
  const paidCount = expenses.filter(e => e.paymentStatus === 'Paid').length;
  const pendingCount = expenses.filter(e => e.paymentStatus === 'Pending').length;
  const overdueCount = expenses.filter(e => e.paymentStatus === 'Overdue').length;
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Expenses</p>
        <p className="text-3xl font-bold text-text-primary">
          {totalExpenses}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Paid</p>
        <p className="text-3xl font-bold text-success">
          {paidCount}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Pending</p>
        <p className="text-3xl font-bold text-warning">
          {pendingCount}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Overdue</p>
        <p className="text-3xl font-bold text-danger">
          {overdueCount}
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

export default ExpenseSummaryCards;
