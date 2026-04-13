import React, { useState, useMemo } from 'react';
import {
  Key,
  Plus,
  EyeIcon,
  Edit,
  Trash2,
  Crown,
  Star
} from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import { useLicenses, useCompanies, useCreateLicense, useUpdateLicense, useDeleteLicense } from '../hooks/useLicenses';
import useDebounce from '../../../hooks/useDebounce';
import { useToast } from '../../../components/ui/Toast';
import Pagination from '../../../components/ui/Pagination';
import Badge from '../../../components/ui/Badge';
import LicenseForm from '../components/LicenseForm';
import LicenseDetailsView from '../components/LicenseDetailsView';
import Tooltip from '../../../components/ui/Tooltip';
// import LicenseSummaryCards from '../components/LicenseSummaryCards';

const ListLicenses = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  //Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentLicense, setCurrentLicense] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handlers for modal actions
  const handleAddLicense = () => {
    setModalMode('add');
    setCurrentLicense(null);
    setIsFormModalOpen(true);
  };

  const handleViewLicense = (license) => {
    setModalMode('view');
    setCurrentLicense(license);
    setIsViewModalOpen(true);
  };

  const handleEditLicense = (license) => {
    setModalMode('edit');
    setCurrentLicense(license);
    setIsFormModalOpen(true);
  }

  const handleDeleteLicense = (license) => {
    setCurrentLicense(license);
    setIsDeleteModalOpen(true);
  }

  // Fetch data
  const { data, isLoading, isError } = useLicenses({
      search: debouncedSearch,
      page,
      limit,
    }
  )

  const licenses = useMemo(() => data?.data || [], [data]);

  const createLicenseMutation = useCreateLicense();
  const updateLicenseMutation = useUpdateLicense();
  const deleteLicenseMutation = useDeleteLicense();

  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await createLicenseMutation.mutateAsync(formData);
        toast({ title: 'License created successfully', variant: 'success' });
      } else if (modalMode === 'edit') {
        await updateLicenseMutation.mutateAsync({ id: currentLicense.id, ...formData });
        toast({ title: 'License updated successfully', variant: 'success' });
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast({ title: 'An error occurred. Please try again.', variant: 'destructive' });
    }
  };

  const handleDeleteLicenseConfirm = async () => {
    try {
      await deleteLicenseMutation.mutateAsync(currentLicense.id);
      toast({ title: 'License deleted successfully', variant: 'success' });
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast({ title: 'An error occurred. Please try again.', variant: 'destructive' });
    }
  };

  const featureColor = (type) => {
    switch (type) {
      case 'enterprise':
        return 'primary';
      case 'professional':
        return 'info';
      case 'basic':
        return 'gray';
      default:
        return 'gray';
    }
  }


  // Columns definition
  const columns = [
    {
      header: 'License',
      accessor: 'name',
      render: row => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            row.type === 'enterprise' ? 'bg-purple-100 text-purple-600' :
            row.type === 'professional' ? 'bg-blue-100 text-blue-600' :
            'bg-gray-100 text-gray-600'
          }`}>
            {row.type === 'enterprise' && <Crown className="w-4 h-4" />}
            {row.type === 'professional' && <Star className="w-4 h-4" />}
            {row.type === 'basic' && <Key className="w-4 h-4" />}
          </div>

          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-text-secondary capitalize">{row.type}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Limits',
      render: row => (
        <div className="text-sm">
          <div>Buildings: {row.maxBuildings === -1 ? '∞' : row.maxBuildings}</div>
          <div>Tenants: {row.maxTenants === -1 ? '∞' : row.maxTenants}</div>
          <div>Managers: {row.maxManagers === -1 ? '∞' : row.maxManagers}</div>
        </div>
      ),
    },
    {
      header: 'Usage',
      render: row => {
        const stats = row.stats;
        return (
          <div className="text-sm">
            <div className="font-medium">{stats?.used || 0} companies</div>
            <div className="text-text-secondary">
              {stats?.available === 'Unlimited' ? 'No limit' : `${stats?.available} available`}
            </div>
          </div>
        );
      },
    },
    {
      header: 'Price',
      accessor: 'price',
      render: row => (
        <div className="font-medium text-green-600">
          ${row.price}/month
        </div>
      ),
    },
    {
      header: 'Features',
      accessor: 'features',
      render: row => (
        <div className="flex flex-wrap gap-1">
          {row.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} color={featureColor(row.type)} variant="soft">
              {feature}
            </Badge>
          ))}
          {row.features.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{row.features.length - 2} more
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <Tooltip content="View Details" position="top">
            <IconButton rounded={false} variant="primary" size='xs' icon={<EyeIcon size={12} />} aria-label="View Details" onClick={() => handleViewLicense(row)}/>
          </Tooltip>

          <Tooltip content="Edit License" position="top">
            <IconButton rounded={false} variant="info" size='xs' icon={<Edit size={12} />} aria-label="Edit License" onClick={() => handleEditLicense(row)}/>
          </Tooltip>

          <Tooltip content="Delete License" position="top">
            <IconButton rounded={false} variant="danger" size='xs' icon={<Trash2 size={12} />} aria-label="Delete License" onClick={() => handleDeleteLicense(row)}/>
          </Tooltip>
        </div>
      ),
    },
  ];


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading licenses...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load licenses.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Licenses</h1>
          <p className="text-text-secondary mt-1">Manage your licenses and subscriptions</p>
        </div>
        <Button leftIcon={<Plus size={16} />} variant="primary" onClick={handleAddLicense} aria-label="Create License">
          Create License
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search maintenance requests..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Licenses Table */}
      <div className="card">
        <Table
          columns={columns}
          data={licenses}
          loading={isLoading}
        />

        <div className="p-4 flex justify-end">
          <Pagination
            currentPage={page}
            totalCount={data?.total || 0}
            pageSize={limit}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Create License Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Create License' : 'Edit License'}
        size="3xl"
        footer={
          <>
            <Button aria-label="Cancel" variant="outline" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleFormSubmit()} aria-label="Submit" form="license-form" type="submit" disabled={createLicenseMutation.isLoading || updateLicenseMutation.isLoading}>
              {modalMode === 'add' ? 'Create' : 'Update'}
            </Button>
          </>
        }
      >
        <LicenseForm
          defaultValues={modalMode === 'edit' ? currentLicense : undefined}
          mode={modalMode}
          onClose={() => setIsFormModalOpen(false)}
        />
      </Modal>

      {/* View License Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="License Details"
        size="3xl"
      >
        <LicenseDetailsView license={currentLicense} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete License"
        size="sm"
        footer={
          <>
            <Button aria-label="Cancel" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button aria-label="Delete" variant="danger" onClick={handleDeleteLicenseConfirm}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this license?</p>
      </Modal>
        
    </div>
  );
};

export default ListLicenses;
