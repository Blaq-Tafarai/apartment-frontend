import React from 'react';
import Button from '../../../components/ui/Button';

const AuditLogsViewModeToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={viewMode === 'table' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onViewModeChange('table')}
      >
        Table View
      </Button>
      <Button
        variant={viewMode === 'timeline' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => onViewModeChange('timeline')}
      >
        Timeline View
      </Button>
    </div>
  );
};

export default AuditLogsViewModeToggle;
