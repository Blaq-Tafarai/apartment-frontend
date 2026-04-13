import React from 'react';
import Button from '../../../components/ui/Button';

const AuditLogsBulkActions = ({ selectedLogs, onExportSelected, onMarkAsReviewed }) => {
  if (selectedLogs.length === 0) return null;

  return (
    <div className="card bg-blue-50 border-blue-200">
      <div className="flex items-center justify-between">
        <span className="text-sm text-blue-700">
          {selectedLogs.length} log{selectedLogs.length > 1 ? 's' : ''} selected
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onExportSelected}>
            Export Selected
          </Button>
          <Button variant="outline" size="sm" onClick={onMarkAsReviewed}>
            Mark as Reviewed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsBulkActions;
