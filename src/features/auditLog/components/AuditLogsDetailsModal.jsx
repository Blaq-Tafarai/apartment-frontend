import React from 'react';
import Modal from '../../../components/ui/Modal';
import Badge from '../../../components/ui/Badge';

const AuditLogsDetailsModal = ({ isOpen, onClose, selectedLog }) => {
  if (!selectedLog) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Audit Log Details"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary">User</label>
            <p className="text-text-primary">{selectedLog.user?.name || 'System'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Action</label>
            <Badge variant={
              selectedLog.action === 'CREATE' ? 'success' :
              selectedLog.action === 'UPDATE' ? 'primary' :
              'danger'
            }>
              {selectedLog.action}
            </Badge>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Entity Type</label>
            <p className="text-text-primary">{selectedLog.entityType}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Entity ID</label>
            <p className="text-text-primary">{selectedLog.entityId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Timestamp</label>
            <p className="text-text-primary">{new Date(selectedLog.timestamp).toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">IP Address</label>
            <p className="text-text-primary">{selectedLog.ipAddress}</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">User Agent</label>
          <p className="text-sm text-text-secondary bg-gray-50 p-2 rounded">{selectedLog.userAgent}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Notes</label>
          <p className="text-sm text-text-secondary bg-gray-50 p-2 rounded">{selectedLog.notes}</p>
        </div>
        {selectedLog.oldValues && (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Old Values</label>
            <pre className="text-xs text-text-secondary bg-red-50 p-2 rounded overflow-x-auto">
              {JSON.stringify(selectedLog.oldValues, null, 2)}
            </pre>
          </div>
        )}
        {selectedLog.newValues && (
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">New Values</label>
            <pre className="text-xs text-text-secondary bg-green-50 p-2 rounded overflow-x-auto">
              {JSON.stringify(selectedLog.newValues, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AuditLogsDetailsModal;
