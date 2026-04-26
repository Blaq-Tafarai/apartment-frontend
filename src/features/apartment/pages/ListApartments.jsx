import React, { useState, useMemo } from 'react';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import { useApartments, useCreateApartment, useUpdateApartment, useDeleteApartment } from '../hooks/useApartments';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import ApartmentForm from '../components/ApartmentForm';
import { useToast } from '../../../components/ui/Toast';
import ApartmentDetailsView from '../components/ApartmentDetailsView';
import ApartmentSummaryCards from '../components/ApartmentSummaryCards';

const ListApartments = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentApartment, setCurrentApartment] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  // Handler functions
  const handleAddApartment = () => {
    setModalMode('add');
    setCurrentApartment(null);
    setIsFormModalOpen(true);
  };

  const handleEditApartment = (apartment) => {
    setModalMode('edit');
    setCurrentApartment(apartment);
    setIsFormModalOpen(true);
  };

  const handleDeleteApartment = (apartment) => {
    setCurrentApartment(apartment);
    setIsDeleteModalOpen(true);
  };

  const handleViewApartment = (apartment) => {
    setCurrentApartment(apartment);
    setIsViewModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await createApartmentMutation.mutateAsync(formData);
        toast.success('Success', 'Apartment created successfully!');
      } else {
        await updateApartmentMutation.mutateAsync({ id: currentApartment.id, payload: formData });
        toast.success('Success', 'Apartment updated successfully!');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error('Error', 'Failed to save apartment. Please try again.');
    }
    console.log('Form Data:', formData)
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteApartmentMutation.mutateAsync(currentApartment.id);
      toast.success('Success', 'Apartment deleted successfully!');
      setIsDeleteModalOpen(false);
      setCurrentApartment(null);
    } catch (error) {
      toast.error('Error', 'Failed to delete apartment. Please try again.');
    }
  };

  // Fetch apartments via React Query
  const { data, isLoading, isError } = useApartments({
    page,
    limit,
    search: debouncedSearch,
  });

  // Mutations for CRUD operations
  const createApartmentMutation = useCreateApartment();
  const updateApartmentMutation = useUpdateApartment();
  const deleteApartmentMutation = useDeleteApartment();

  const apartments = useMemo(() => data?.data || [], [data]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'occupied':
        return 'success';
      case 'available':
        return 'info';
      case 'under_maintenance':
        return 'warning';
      case 'inactive':
        return 'danger';
      default:
        return 'default';
    }
  };

  // Columns definition
  const columns = [
    { header: 'Unit', accessor: 'unitNumber' },
    { header: 'Building', accessor: 'building', render: row => row.building?.name || 'N/A' },
    { header: 'Bedrooms', accessor: 'bedrooms' },
    { header: 'Bathrooms', accessor: 'bathrooms' },
    { header: 'Sqft', accessor: 'sqft', render: row => `${row.sqft} sqft` },
    { header: 'Rent', accessor: 'rent', render: row => `$${row.rent}/month` },
    { header: 'Floor', accessor: 'floor' },
    {
      header: 'Status',
      accessor: 'status',
      render: row => (
        <Badge className="capitalize" color={getStatusColor(row.status)} variant="soft" dot>
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <IconButton
            icon={<Eye size={16} />}
            aria-label="View"
            variant="primary"
            size='xs'
            onClick={() => handleViewApartment(row)}
          />
          <IconButton
            icon={<Edit size={16} />}
            aria-label="Edit"
            variant="info"
            size='xs'
            onClick={() => handleEditApartment(row)}
          />
          <IconButton
            icon={<Trash2 size={16} />}
            aria-label="Delete"
            variant="danger"
            size='xs'
            onClick={() => handleDeleteApartment(row)}
          />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading apartments...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load apartments.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Apartments</h1>
          <p className="text-text-secondary mt-1">Manage apartment units and rentals</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={20} />} onClick={handleAddApartment}>
          Add Apartment
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search apartments..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Summary Cards */}
      <ApartmentSummaryCards apartments={apartments} />

      {/* Apartments Table */}
      <div className="card">
        <Table
          columns={columns}
          data={apartments}
          pagination={{
            currentPage: page,
            totalPages: data?.meta?.totalPages || 1,
            onPageChange: setPage,
          }}
        />

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <Pagination
            currentPage={page}
            totalPages={data?.meta?.totalPages || 1}
            totalItems={data?.meta?.total || 0}
            itemsPerPage={limit}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Apartment Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Apartment' : 'Edit Apartment'}
        size="3xl"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="apartment-form">
              {modalMode === 'add' ? 'Create Apartment' : 'Update Apartment'}
            </Button>
          </>
        }
      >
        <ApartmentForm
          defaultValues={modalMode === 'edit' ? currentApartment : {}}
          onSubmit={handleFormSubmit}
          modalMode={modalMode}
        />
      </Modal>

      {/* View Apartment Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Apartment Details"
        size="2xl"
      >
        <ApartmentDetailsView
          apartment={currentApartment}
          getStatusColor={getStatusColor}
        />
      </Modal>

      {/* Delete Apartment Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Apartment"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </>
        }
      >
        <div className="text-center">
          <p className="text-text-secondary mb-4">
            Are you sure you want to delete apartment "{currentApartment?.unit}"? This action cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ListApartments;
