import React from 'react';
import { Shield, RefreshCw, Download } from 'lucide-react';
import Button from '../../../components/ui/Button';

const AuditLogsHeader = ({ onRefresh, onExport }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-2">
          <Shield className="w-8 h-8" />
          Audit Logs Dashboard
        </h1>
        <p className="text-text-secondary mt-1">Comprehensive audit trail and activity monitoring</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" icon={RefreshCw} onClick={onRefresh}>
          Refresh
        </Button>
        <Button variant="outline" icon={Download} onClick={onExport}>
          Export Logs
        </Button>
      </div>
    </div>
  );
};

export default AuditLogsHeader;
