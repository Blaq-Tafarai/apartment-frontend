import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, Download, Calendar } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Pagination from '../../../components/ui/Pagination';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import { useSystemAuditLogs, useAuditLogStats, useActionTypes } from '../hooks/useSystemAuditLogs';
import useDebounce from '../../../hooks/useDebounce';

const ListSystemAuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Filter states
  const [actionFilter, setActionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  // Fetch audit logs
  const { data: logsData, isLoading, totalPages, total } = useSystemAuditLogs({
    page,
    limit,
    search: debouncedSearch,
    action: actionFilter,
    status: statusFilter,
  });

  const stats = useAuditLogStats();
  const { data: actionTypes } = useActionTypes();

  const logs = useMemo(() => logsData?.data || [], [logsData]);

  // Handlers
  const handleViewLog = (log) => {
    setSelectedLog(log);
    setIsViewModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'danger';
      default:
        return 'gray';
    }
  };

  const getActionColor = (action) => {
    if (action.includes('created') || action.includes('generated') || action.includes('received') || action.includes('upgraded')) {
      return 'success';
    }
    if (action.includes('deleted') || action.includes('revoked') || action.includes('failed') || action.includes('cancelled') || action.includes('suspended')) {
      return 'danger';
    }
    if (action.includes('updated')) {
      return 'info';
    }
    return 'gray';
  };

  const formatAction = (action) => {
    return action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Columns definition
  const columns = [
    {
      header: 'Timestamp',
      accessor: 'timestamp',
      render: row => (
        <div>
          <p className="text-text-primary">{new Date(row.timestamp).toLocaleDateString()}</p>
          <p className="text-xs text-text-tertiary">{new Date(row.timestamp).toLocaleTimeString()}</p>
        </div>
      ),
    },
    {
      header: 'Action',
      accessor: 'action',
      render: row => (
        <Badge color={getActionColor(row.action)} variant="soft">
          {formatAction(row.action)}
        </Badge>
      ),
    },
    { header: 'Description', accessor: 'description', render: row => (
      <p className="max-w-md truncate">{row.description}</p>
    )},
    { header: 'Performed By', accessor: 'performedBy', render: row => row.performedBy },
    { 
      header: 'Target', 
      accessor: 'targetName', 
      render: row => (
        <div>
          <p className="text-text-primary">{row.targetName}</p>
          <p className="text-xs text-text-tertiary capitalize">{row.targetType}</p>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: row => (
        <Badge color={getStatusColor(row.status)} variant="soft" dot>
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'IP Address',
      accessor: 'ipAddress',
      render: row => (
        <span className="text-sm font-mono text-text-secondary">{row.ipAddress}</span>
      ),
    },
    {
      header: 'Actions',
      render: row => (
        <Button variant="outline" size="xs" leftIcon={<Eye size={12} />} onClick={() => handleViewLog(row)}>
          View
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading audit logs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">System Audit Logs</h1>
          <p className="text-text-secondary mt-1">Track all platform activities and changes</p>
        </div>
        <Button variant="outline" leftIcon={<Download size={16} />}>
          Export Logs
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-text-secondary text-sm">Total Logs</p>
          <p className="text-2xl font-bold text-text-primary">{stats.total.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-text-secondary text-sm">Today</p>
          <p className="text-2xl font-bold text-text-primary">{stats.today}</p>
        </div>
        <div className="card">
          <p className="text-text-secondary text-sm">This Week</p>
          <p className="text-2xl font-bold text-text-primary">{stats.thisWeek}</p>
        </div>
        <div className="card">
          <p className="text-text-secondary text-sm">This Month</p>
          <p className="text-2xl font-bold text-text-primary">{stats.thisMonth}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <Input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
          <Select
            value={actionFilter}
            onChange={e => setActionFilter(e.target.value)}
          >
            <option value="">All Actions</option>
            {actionTypes?.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </Select>
          <Select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </Select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="card">
        <Table
          columns={columns}
          data={logs}
          pagination={{
            currentPage: page,
            totalPages,
            onPageChange: setPage,
          }}
        />

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-text-secondary">
            Showing {logs.length} of {total} logs
          </p>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* View Log Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Audit Log Details"
        size="lg"
      >
        {selectedLog && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-secondary">Timestamp</p>
                <p className="font-medium text-text-primary">
                  {new Date(selectedLog.timestamp).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Status</p>
                <Badge color={getStatusColor(selectedLog.status)} variant="soft" dot>
                  {selectedLog.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Action</p>
                <Badge color={getActionColor(selectedLog.action)} variant="soft">
                  {formatAction(selectedLog.action)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Target Type</p>
                <p className="font-medium text-text-primary capitalize">{selectedLog.targetType}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-text-secondary">Description</p>
                <p className="font-medium text-text-primary">{selectedLog.description}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Performed By</p>
                <p className="font-medium text-text-primary">{selectedLog.performedBy}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Target Name</p>
                <p className="font-medium text-text-primary">{selectedLog.targetName}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">IP Address</p>
                <p className="font-mono text-text-primary">{selectedLog.ipAddress}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ListSystemAuditLogs;

