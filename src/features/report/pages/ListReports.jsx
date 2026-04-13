import React, { useState, useMemo } from 'react';
import { Play, Eye, Download, Filter, BarChart3, PieChart, Calendar, Users, TrendingUp, Activity, Edit } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { useReports, useRunReport } from '../hooks/useReports';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import QuickStats from '../components/QuickStats';
import ReportsCharts from '../components/ReportsCharts';
import Checkbox from '../../../components/ui/Checkbox';
import Modal from '../../../components/ui/Modal';
import Badge from '../../../components/ui/Badge';
import ReportDetailModal from '../components/ReportDetailModal';

const ListReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    schedule: '',
  });

  //Modal States
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const [selectedReports, setSelectedReports] = useState([]);

  // Fetch reports via React Query
  const { data, isLoading, isError } = useReports({
    page,
    limit,
    search: debouncedSearch,
    type: filters.type,
    status: filters.status,
    schedule: filters.schedule,
  });

  const runReportMutation = useRunReport();

  const reports = useMemo(() => data?.data || [], [data]);

  const filteredReports = useMemo(() => reports, [reports]);

  const typeChartData = useMemo(() => {
    const typeCounts = {};
    reports.forEach(report => {
      typeCounts[report.type] = (typeCounts[report.type] || 0) + 1;
    });
    return Object.entries(typeCounts).map(([name, value]) => ({ name, value }));
  }, [reports]);

  const scheduleChartData = useMemo(() => {
    const scheduleCounts = {};
    reports.forEach(report => {
      const schedule = report.schedule || 'Manual';
      scheduleCounts[schedule] = (scheduleCounts[schedule] || 0) + 1;
    });
    return Object.entries(scheduleCounts).map(([name, count]) => ({ name, count }));
  }, [reports]);

  const typeColor = (type) => {
    switch (type) {
      case 'financial':
        return 'success';
      case 'occupancy':
        return 'info';
      case 'maintenance':
        return 'warning';
      case 'tenant':
        return 'danger';
      default:
        return 'gray';
    }
  }

  // Columns definition
  const columns = [
    { header: 'Name', accessor: 'name' },
    {
      header: 'Type',
      accessor: 'type',
      render: row => (
        <Badge dot color={typeColor(row.type)}>{row.type.charAt(0).toUpperCase() + row.type.slice(1)}</Badge>
      ),
    },
    {
      header: 'Schedule',
      accessor: 'schedule',
      render: row => row.schedule ? row.schedule.charAt(0).toUpperCase() + row.schedule.slice(1) : 'Manual',
    },
    {
      header: 'Status',
      accessor: 'isActive',
      render: row => (
        <Badge variant="soft" dot color={row.isActive ? 'success' : 'danger'}>{row.isActive ? 'Active' : 'Inactive'}</Badge>
      ),
    },
    {
      header: 'Last Run',
      accessor: 'lastRunAt',
      render: row => row.lastRunAt ? new Date(row.lastRunAt).toLocaleDateString() : 'Never',
    },
    {
      header: 'Next Run',
      accessor: 'nextRunAt',
      render: row => row.nextRunAt ? new Date(row.nextRunAt).toLocaleDateString() : 'N/A',
    },
    { header: 'Created By', accessor: 'createdByUser', render: row => row.createdByUser?.name || 'Unknown' },
    {
      header: 'Actions',
      render: row => (
        <div className="flex space-x-2">
          <Button aria-label="View report" variant="outline" size="xs" leftIcon={<Eye size={12} />} onClick={() => { setSelectedReport(row); setIsViewModalOpen(true); }}>
            View
          </Button>
          <Button
            size="xs"
            aria-label="Run report"
            leftIcon={<Play size={12} />}
            onClick={() => runReportMutation.mutate(row.id)}
            disabled={runReportMutation.isLoading}
          >
            Run
          </Button>
          <Button aria-label="Download report" variant="outline" size="xs" leftIcon={<Download size={12} />}>
            Download
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading reports...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load reports.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-2">
            Reports Dashboard
          </h1>
          <p className="text-text-secondary mt-1">Manage and run automated reports with advanced analytics</p>
        </div>
      </div>

      <QuickStats reports={reports} filteredReports={filteredReports} />

      <ReportsCharts typeChartData={typeChartData} scheduleChartData={scheduleChartData} />

      {/* Filters and Search */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-secondary mb-1">Search Reports</label>
            <Input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Type</label>
            <Select
              value={filters.type}
              onChange={e => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="">All</option>
              <option value="financial">Financial</option>
              <option value="occupancy">Occupancy</option>
              <option value="maintenance">Maintenance</option>
              <option value="tenant">Tenant</option>
              <option value="custom">Custom</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
            <Select
              value={filters.status}
              onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Schedule</label>
            <Select
              value={filters.schedule}
              onChange={e => setFilters(prev => ({ ...prev, schedule: e.target.value }))}
            >
              <option value="">All</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedReports.length > 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selectedReports.length} report{selectedReports.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => selectedReports.forEach(id => runReportMutation.mutate(id))}>
                Run Selected
              </Button>
              <Button variant="outline" size="sm">
                Export Selected
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reports Table */}
      <div className="card">
        <Table
          columns={[
            {
              header: (
                <Checkbox
                  checked={selectedReports.length === filteredReports.length}
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedReports(filteredReports.map(report => report.id));
                    } else {
                      setSelectedReports([]);
                    }
                  }}
                />
              ),
              accessor: 'select',
              render: row => (
                <Checkbox
                  checked={selectedReports.includes(row.id)}
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedReports([...selectedReports, row.id]);
                    } else {
                      setSelectedReports(selectedReports.filter(id => id !== row.id));
                    }
                  }}
                />
              ),
            },
            ...columns,
          ]}
          data={filteredReports}
          pagination={{
            currentPage: page,
            totalPages: data?.totalPages || 1,
            onPageChange: setPage,
          }}
        />

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages || 1}
            onPageChange={setPage}
          />
        </div>
      </div>

      <Modal title="Report Details" size="3xl" isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <ReportDetailModal report={selectedReport} typeColor={typeColor} />
      </Modal>
    </div>
  );
};

export default ListReports;
