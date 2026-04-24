import React from 'react';

const ExpenseSummaryCards = ({ expenses }) => {
  const totalExpenses = expenses.length;
  const totalCategories = [...new Set(expenses.map(e => e.category))].length;
  const totalAmount = expenses.reduce((sum, expense) => {
  return sum + (Number(expense.amount) || 0);
}, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Expenses</p>
        <p className="text-3xl font-bold text-text-primary">
          {totalExpenses}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Categories</p>
        <p className="text-3xl font-bold text-info">
          {totalCategories}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Amount</p>
        <p className="text-2xl font-bold text-text-primary">
          ${totalAmount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ExpenseSummaryCards;
