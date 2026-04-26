import React, { useState, useMemo } from 'react';
import { Eye } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { useAuditLogs } from '../hooks/useAuditLogs';
import useDebounce from '../../../hooks/useDebounce';
import AuditLogsHeader from '../components/AuditLogsHeader';
import AuditLogsSummaryCards from '../components/AuditLogsSummaryCards';
import AuditLogsFilters from '../components/AuditLogsFilters';
import AuditLogsCharts from '../components/AuditLogsCharts';
import AuditLogsBulkActions from '../components/AuditLogsBulkActions';
import AuditLogsTableView from '../components/AuditLogsTableView';
import AuditLogsTimelineView from '../components/AuditLogsTimelineView';
import AuditLogsDetailsModal from '../components/AuditLogsDetailsModal';
import AuditLogsViewModeToggle from '../components/AuditLogsViewModeToggle';
import Badge from '../../../components/ui/Badge';

const ListAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [filters, setFilters] = useState({
    action: '',
    entityType: '',
    userId: '',
    startDate: '',
    endDate: '',
    ipAddress: '',
  });
  const [viewMode, setViewMode] = useState('table');
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  // Fetch audit logs via React Query with server-side filtering
  const { data, isLoading, isError, refetch } = useAuditLogs({
    page,
    limit,
    search: debouncedSearch,
    ...filters,
  });

  const auditLogs = useMemo(() => data?.data || [], [data]);

  const actionColors = (action) => {
    switch (action) {
      case 'create':
        return 'success';
      case 'update':
        return 'info';
      case 'delete':
        return 'danger';
      default:
        return 'default';
    }
  };

  // Columns definition
  const columns = [
    { header: 'User', accessor: 'user', render: row => row.user?.name || 'System' },
    { header: 'Action', accessor: 'action', render: row => <Badge className="capitalize" color={actionColors(row.action)}>{row.action}</Badge> },
    { header: 'Entity Type', accessor: 'entity' },
    { header: 'Entity ID', accessor: 'entityId' },
    { header: 'Timestamp', accessor: 'createdAt', render: row => new Date(row.createdAt).toLocaleString() },
    { header: 'IP Address', accessor: 'ipAddress' },
    { header: 'User Agent', accessor: 'userAgent', render: row => row.userAgent ? row.userAgent.substring(0, 50) + '...' : 'N/A' },
    {
      header: 'Actions',
      render: row => (
        <Button onClick={() => handleViewDetails(row)} size="xs" leftIcon={<Eye size={12} />}>
          View Details
        </Button>
      ),
    },
  ];

  const handleViewDetails = log => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  const handleClearFilters = () => {
    setFilters({
      action: '',
      entityType: '',
      userId: '',
      startDate: '',
      endDate: '',
      ipAddress: '',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading audit logs...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load audit logs.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AuditLogsHeader onRefresh={() => refetch()} onExport={() => {}} />

      <AuditLogsSummaryCards auditLogs={auditLogs} />

      <AuditLogsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />

      <AuditLogsCharts auditLogs={auditLogs} />

      <AuditLogsBulkActions
        selectedLogs={selectedLogs}
        onExportSelected={() => {}}
        onMarkAsReviewed={() => {}}
      />

      <AuditLogsViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />

      {viewMode === 'table' ? (
        <AuditLogsTableView
          columns={columns}
          data={auditLogs}
          selectedLogs={selectedLogs}
          onSelectionChange={setSelectedLogs}
          pagination={{
            currentPage: page,
            totalPages: data?.meta?.totalPages || 1,
            onPageChange: setPage,
          }}
          onViewDetails={handleViewDetails}
        />
      ) : (
        <AuditLogsTimelineView
          auditLogs={auditLogs}
          onViewDetails={handleViewDetails}
          actionColors={actionColors}
          pagination={{
            currentPage: page,
            totalPages: data?.meta?.totalPages || 1,
            onPageChange: setPage,
          }}
        />
      )}

      <AuditLogsDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} selectedLog={selectedLog} actionColor={actionColors} />
    </div>
  );
};

export default ListAuditLogs;
