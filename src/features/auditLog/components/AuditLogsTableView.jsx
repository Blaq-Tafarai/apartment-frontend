import React from 'react';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';

const AuditLogsTableView = ({ columns, data, selectedLogs, onSelectionChange, pagination, onViewDetails }) => {
  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(data.map(log => log.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectLog = (logId, checked) => {
    if (checked) {
      onSelectionChange([...selectedLogs, logId]);
    } else {
      onSelectionChange(selectedLogs.filter(id => id !== logId));
    }
  };

  const enhancedColumns = [
    {
      header: (
        <input
          type="checkbox"
          checked={selectedLogs.length === data.length && data.length > 0}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
      accessor: 'select',
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedLogs.includes(row.id)}
          onChange={(e) => handleSelectLog(row.id, e.target.checked)}
        />
      ),
    },
    ...columns.map(col => ({
      ...col,
      render: col.render || ((row) => row[col.accessor]),
    })),
  ];

  return (
    <div className="card">
      <Table
        columns={enhancedColumns}
        data={data}
      />
      <div className="mt-4 flex justify-end">
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      </div>
    </div>
  );
};

export default AuditLogsTableView;
