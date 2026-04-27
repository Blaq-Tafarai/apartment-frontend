import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import DatePicker from '../../../components/ui/DatePicker';
import Button from '../../../components/ui/Button';

const AuditLogsFilters = ({ searchTerm, onSearchChange, filters, onFiltersChange, onClearFilters }) => {
  return (
    <div className="card">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-text-secondary mb-1">Search</label>
          <Input
            type="text"
            placeholder="Search audit logs..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Action</label>
          <Select
            value={filters.action}
            onChange={value => onFiltersChange(prev => ({ ...prev, action: value }))}
            options={[
              { value: "", label: "All" },
              { value: "create", label: "CREATE" },
              { value: "update", label: "UPDATE" },
              { value: "delete", label: "DELETE" },
            ]}
          >
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Entity Type</label>
          <Select
            value={filters.entity}
            onChange={value => onFiltersChange(prev => ({ ...prev, entity: value }))}
            options={[
              { value: '', label: 'All' },
              { value: 'user', label: 'User' },
              { value: 'lease', label: 'Lease' },
              { value: 'payment', label: 'Payment' },
              { value: 'maintenance', label: 'Maintenance Request' },
              { value: 'billing', label: 'Billing' },
              { value: 'company', label: 'Company' },
              { value: 'apartment', label: 'Apartment' },
            ]}
          >
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Start Date</label>
          <DatePicker
            value={filters.startDate}
            onChange={date => onFiltersChange(prev => ({ ...prev, startDate: date }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">End Date</label>
          <DatePicker
            value={filters.endDate}
            onChange={date => onFiltersChange(prev => ({ ...prev, endDate: date }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">IP Address</label>
          <Input
            type="text"
            placeholder="192.168.1.100"
            value={filters.ipAddress}
            onChange={e => onFiltersChange(prev => ({ ...prev, ipAddress: e.target.value }))}
          />
        </div>
        <Button variant="outline" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default AuditLogsFilters;
