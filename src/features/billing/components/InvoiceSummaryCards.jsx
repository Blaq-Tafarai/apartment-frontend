import React from 'react';

const InvoiceSummaryCards = ({ invoices }) => {
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending').length;
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingRevenue = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const overdueRevenue = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Invoices</p>
        <p className="text-3xl font-bold text-text-primary">
          {totalInvoices}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Paid</p>
        <p className="text-3xl font-bold text-success">
          {paidInvoices}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Pending</p>
        <p className="text-3xl font-bold text-warning">
          {pendingInvoices}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Overdue</p>
        <p className="text-3xl font-bold text-danger">
          {overdueInvoices}
        </p>
      </div>
    </div>
  );
};

export default InvoiceSummaryCards;
