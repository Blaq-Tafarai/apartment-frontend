import React from 'react';

const DocumentSummaryCards = ({ documents }) => {
  const totalDocuments = documents.length;
  const leaseDocuments = documents.filter(doc => doc.type === 'lease').length;
  const invoiceDocuments = documents.filter(doc => doc.type === 'invoice').length;
  const maintenanceDocuments = documents.filter(doc => doc.type === 'maintenance').length;
  const publicDocuments = documents.filter(doc => doc.isPublic).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Total Documents</p>
        <p className="text-3xl font-bold text-text-primary">
          {totalDocuments}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Leases</p>
        <p className="text-3xl font-bold text-blue-600">
          {leaseDocuments}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Invoices</p>
        <p className="text-3xl font-bold text-green-600">
          {invoiceDocuments}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Maintenance</p>
        <p className="text-3xl font-bold text-orange-600">
          {maintenanceDocuments}
        </p>
      </div>
      <div className="card">
        <p className="text-text-secondary text-sm mb-1">Public Access</p>
        <p className="text-3xl font-bold text-purple-600">
          {publicDocuments}
        </p>
      </div>
    </div>
  );
};

export default DocumentSummaryCards;
