import React, { useState, useMemo } from 'react';
import {
  Key,
  Plus,
  EyeIcon,
  Edit,
  Trash2,
} from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import { useLicenses, useCreateLicense, useUpdateLicense, useDeleteLicense } from '../hooks/useLicenses';
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
        const response = await createLicenseMutation.mutateAsync(formData);
        toast.success('Success', response?.message || 'License created successfully!');
      } else if (modalMode === 'edit') {
        const response = await updateLicenseMutation.mutateAsync({ id: currentLicense.id, payload: formData });
        toast.success('Success', response?.message || 'License updated successfully!');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error('Error', error?.message || 'An error occurred. Please try again.');
    }
  };

  const handleDeleteLicenseConfirm = async () => {
    try {
      await deleteLicenseMutation.mutateAsync(currentLicense.id);
      toast.success('Success', Response?.message || 'License deleted successfully!');
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error('Error', error?.message || 'An error occurred. Please try again.');
    }
  };

  // Columns definition
  const columns = [
    {
      header: 'Assignment',
      accessor: 'organizationId',
      render: row => (
        <div className="space-y-1">
          <div className="font-medium truncate max-w-[200px]">
            {row.organization.name}
          </div>
          <div className="text-sm text-text-secondary truncate max-w-[200px]">
            {row.subscription.planName}
          </div>
        </div>
      ),
    },
    {
      header: 'Limits',
      render: row => (
        <div className="text-sm space-y-1">
          <div>Users: {row.maxUsers === -1 ? '∞' : row.maxUsers}</div>
          <div>Buildings: {row.maxBuildings === -1 ? '∞' : row.maxBuildings}</div>
          <div>Apts: {row.maxApartments === -1 ? '∞' : row.maxApartments}</div>
        </div>
      ),
    },
    {
      header: 'Features',
      render: row => (
        <div className="flex flex-wrap gap-1">
          {row.features.reportExports && (
            <Badge color="success" variant="soft" size="sm">
              Reports
            </Badge>
          )}
          {row.features.cloudStorage && (
            <Badge color="info" variant="soft" size="sm">
              Storage
            </Badge>
          )}
          {row.features.apiAccess && (
            <Badge color="primary" variant="soft" size="sm">
              API
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Created',
      accessor: 'createdAt',
      render: row => (
        <div className="text-sm font-medium">
          {new Date(row.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      header: 'Expires',
      accessor: 'expiresAt',
      render: row => (
        <div className="text-sm font-medium">
          {new Date(row.expiresAt).toLocaleDateString()}
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
          <p className="text-text-secondary mt-1">Manage organization licenses and subscriptions</p>
        </div>
        <Button leftIcon={<Plus size={16} />} variant="primary" onClick={handleAddLicense} aria-label="Create License">
          Create License
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search licenses by organization or subscription..."
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
          Pagination = {{
            currentPage: page,
            totalPages: data?.meta?.totalPages || 1,
            totalItems: data?.meta?.total || 0,
            itemsPerPage: limit,
            onPageChange: setPage
          }}
        />

        <div className="p-4 flex justify-end">
          <Pagination
            currentPage={page}
            totalPages={data?.meta?.totalPages || 1}
            totalItems={data?.meta?.total || 0}
            itemsPerPage={limit}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Create License Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Create License' : 'Edit License'}
        size="4xl"
        footer={
          <>
            <Button aria-label="Cancel" variant="outline" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" aria-label="Submit" form="license-form" type="submit" disabled={createLicenseMutation.isLoading || updateLicenseMutation.isLoading}>
              {modalMode === 'add' ? 'Create' : 'Update'}
            </Button>
          </>
        }
      >
        <LicenseForm
          defaultValues={modalMode === 'edit' ? currentLicense : undefined}
          mode={modalMode}
          onSubmit={handleFormSubmit}
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
