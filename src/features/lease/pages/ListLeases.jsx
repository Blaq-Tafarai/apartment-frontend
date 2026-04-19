import React, { useState, useMemo } from 'react';
import { Plus, Edit, Trash, Download, EyeIcon } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input'
import { useLeases } from '../hooks/useLeases';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import LeaseForm from '../components/LeaseForm';
import { useToast } from '../../../components/ui/Toast';
import LeaseDetailsView from '../components/LeaseDetailsView';
import LeaseSummaryCards from '../components/LeaseSummaryCards';
import Modal from '../../../components/ui/Modal';
import { useCreateLease, useUpdateLease, useDeleteLease } from '../hooks/useLeases';
import Badge from '../../../components/ui/Badge';
import Tooltip from '../../../components/ui/Tooltip'


const ListLeases = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  //Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentLease, setCurrentLease] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch leases via React Query
  const { data, isLoading, isError } = useLeases({
    page,
    limit,
    search: debouncedSearch,
  });

  const leases = useMemo(() => data?.data || [], [data]);

  const { mutateAsync: createLease } = useCreateLease();
  const { mutateAsync: updateLease } = useUpdateLease();
  const { mutateAsync: deleteLease } = useDeleteLease();

  //Handlers for opening modals
  const handleAddLease = () => {
    setModalMode('add');
    setCurrentLease(null);
    setIsFormModalOpen(true);
  };

  const handleEditLease = (lease) => {
    setModalMode('edit');
    setCurrentLease(lease);
    setIsFormModalOpen(true);
  }

  const handleViewLease = (lease) => {
    setCurrentLease(lease);
    setIsViewModalOpen(true);
  }

  const handleDeleteLease = (lease) => {
    setCurrentLease(lease);
    setIsDeleteModalOpen(true);
  }

  //Handlers
  const handleSubmitForm = async (formData) => {
    try {
      if (modalMode === 'add') {
        await createLease(formData);
        toast.success('Lease created successfully');
      } else if (modalMode === 'edit' && currentLease) {
        await updateLease({ id: currentLease.id, payload: formData });
        toast.success('Lease updated successfully');
      } else {
        toast.error('An error occurred. Please try again.');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      if (currentLease) {
        await deleteLease(currentLease.id);
        toast.success('Lease deleted successfully');
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const statusColors = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      default:
        return 'default';
    }
  };
  // Columns definition
  const columns = [
    { header: 'Tenant', accessor: 'tenant', render: row => row.tenant?.user?.name || 'N/A' },
    { header: 'Apartment', accessor: 'apartment', render: row => row.apartment?.unitNumber || 'N/A' },
    { header: 'Monthly Rent', accessor: 'rentAmount', render: row => `$${row.rentAmount}` },
    { header: 'Security Deposit', accessor: 'securityDeposit', render: row => `$${row.securityDeposit}` },
    {
      header: 'Deposit Paid',
      accessor: 'status',
      render: (row) => (
        <>
          <Badge color={statusColors(row.status)} variant="soft" dot>
            {row.status}
          </Badge>
        </>
      ),
    },
    { header: 'Start Date', accessor: 'startDate', render: row => new Date(row.startDate).toLocaleDateString() },
    { header: 'End Date', accessor: 'endDate', render: row => new Date(row.endDate).toLocaleDateString() },
    {
      header: 'Actions',
      render: row => (
        <div className='flex gap-2'>
          <Tooltip content="View Lease" position="top">
            <IconButton icon={<EyeIcon size={16}/>} aria-label={'View Lease'} variant="primary" size={'xs'} onClick={() => handleViewLease(row)} />
          </Tooltip>

          <Tooltip content="Edit Lease" position="top">
            <IconButton icon={<Edit size={16}/>} size={'xs'} variant='info' aria-label={'Edit Lease'} onClick={() => handleEditLease(row)} />
          </Tooltip>  

          <Tooltip content="Delete Lease" position="top">
            <IconButton icon={<Trash size={16}/>} size={'xs'} variant='danger' aria-label={'Delete Lease'} color="danger" onClick={() => handleDeleteLease(row)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading leases...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load leases.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Leases</h1>
          <p className="text-text-secondary mt-1">Manage tenant lease agreements</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={16} />} onClick={handleAddLease}>
          Create Lease
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search leases..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Summary Cards */}
      <LeaseSummaryCards leases={leases} />

      {/* Leases Table */}
      <div className="card">
        <Table
          columns={columns}
          data={leases}
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

      {/* Lease Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Add Lease' : 'Edit Lease'}
        size="3xl"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button form='lease-form' type='submit' variant="primary">
              {modalMode === 'add' ? 'Create Lease' : 'Update Lease'}
            </Button>
          </>
        }
      >
        <LeaseForm
          defaultValues={ modalMode === 'edit' ? currentLease : null }
          mode={modalMode}
          onSubmit={handleSubmitForm}
        />
      </Modal>

      {/* Lease Details Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Lease Details"
        size='3xl'
      >
        <LeaseDetailsView lease={currentLease}
          statusColors={statusColors}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Lease"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this lease?</p>
      </Modal>
    </div>
  );
};

export default ListLeases;
