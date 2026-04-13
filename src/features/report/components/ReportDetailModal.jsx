import React from 'react';
import { Calendar, Clock, User, FileText, Activity } from 'lucide-react';
import Badge from '../../../components/ui/Badge';

const ReportDetailModal = ({ report, typeColor }) => {
  if (!report) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">{report.name}</h2>
        <Badge variant="soft" dot color={report.isActive ? 'success' : 'danger'}>
          {report.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-text-secondary">Type</p>
              <Badge dot color={typeColor(report.type)}>
                {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm text-text-secondary">Schedule</p>
              <p className="text-text-primary font-medium">
                {report.schedule ? report.schedule.charAt(0).toUpperCase() + report.schedule.slice(1) : 'Manual'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-text-secondary">Created By</p>
              <p className="text-text-primary font-medium">{report.createdByUser?.name || 'Unknown'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm text-text-secondary">Last Run</p>
              <p className="text-text-primary font-medium">
                {report.lastRunAt ? new Date(report.lastRunAt).toLocaleString() : 'Never'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-sm text-text-secondary">Next Run</p>
              <p className="text-text-primary font-medium">
                {report.nextRunAt ? new Date(report.nextRunAt).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="text-sm text-text-secondary">Created At</p>
              <p className="text-text-primary font-medium">
                {report.createdAt ? new Date(report.createdAt).toLocaleString() : 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {report.description && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-text-primary">Description</h3>
          <p className="text-text-secondary">{report.description}</p>
        </div>
      )}

      {report.parameters && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-text-primary">Parameters</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm text-text-secondary whitespace-pre-wrap">
              {JSON.stringify(report.parameters, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDetailModal;
