import React, { useMemo } from 'react';
import { Clock, Eye } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Pagination from '../../../components/ui/Pagination';

const AuditLogsTimelineView = ({ auditLogs, onViewDetails, actionColors, pagination }) => {
  const timelineData = useMemo(() => {
    return auditLogs.slice(0, 20).map(log => ({
      id: log.id,
      timestamp: log.createdAt,
      user: log.user?.name || 'System',
      action: log.action,
      entityType: log.entity,
      entityId: log.entityId,
    })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [auditLogs]);

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Activity Timeline
      </h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {timelineData.map((log, index) => (
          <div key={log.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                log.action === 'create' ? 'bg-green-500' :
                log.action === 'update' ? 'bg-blue-500' :
                'bg-red-500'
              }`} />
              {index < timelineData.length - 1 && <div className="w-px h-8 bg-gray-300 mt-2" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-text-primary">{log.user}</span>
                <Badge color={actionColors(log.action)} variant="soft" className="capitalize">
                  {log.action}
                </Badge>
                <span className="text-text-secondary text-sm">{log.entityType} #{log.entityId}</span>
              </div>
              <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={Eye}
              onClick={() => onViewDetails(log)}
            >
              Details
            </Button>
          </div>
        ))}
      </div>
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

export default AuditLogsTimelineView;
