import React from 'react';
import Modal from '../../../components/ui/Modal';
import Badge from '../../../components/ui/Badge';

const AuditLogsDetailsModal = ({ isOpen, onClose, selectedLog, actionColor }) => {
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
            <Badge color={actionColor(selectedLog.action)} variant="soft" className="capitalize">
              {selectedLog.action}
            </Badge>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Entity Type</label>
            <p className="text-text-primary">{selectedLog.entity}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Entity ID</label>
            <p className="text-text-primary">{selectedLog.entityId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Timestamp</label>
            <p className="text-text-primary">{new Date(selectedLog.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">IP Address</label>
            <p className="text-text-primary">{selectedLog.ipAddress}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuditLogsDetailsModal;
