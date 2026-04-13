import React, { useState, useMemo } from 'react';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input'
import { useApartments } from '../hooks/useApartments';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import ApartmentForm from '../components/ApartmentForm';
import { useToast } from '../../../components/ui/Toast';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import { useDeleteApartment, useUpdateApartment, useCreateApartment } from '../hooks/useApartments';
import ApartmentDetailsView from '../components/ApartmentDetailsView';
import ApartmentSummaryCards from '../components/ApartmentSummaryCards';



const ListApartments = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  //Modal States
const [isFormModalOpen, setIsFormModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [isViewModalOpen, setIsViewModalOpen] = useState(false);
const [currentApartment, setCurrentApartment] = useState(null);
const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit' | 'view'

// Handlers for modal actions
const handleAddApartment = () => {
  setModalMode('add');
  setCurrentApartment(null);
  setIsFormModalOpen(true);
};

const handleEditBuilding = (apartment) => {
  setModalMode('edit');
  setCurrentApartment(apartment);
  setIsFormModalOpen(true);
}
const handleViewBuilding = (apartment) => {
  setModalMode('view');
  setCurrentApartment(apartment);
  setIsViewModalOpen(true);
}

const handleDeleteBuilding = (apartment) => {
  setCurrentApartment(apartment);
  setIsDeleteModalOpen(true);
}

const handleSubmit = async (formData) => {
  try {
    if (modalMode === 'add') {
      await createApartmentMutation.mutateAsync(formData);
      toast.success('Apartment created successfully');
    } else {
      await updateApartmentMutation.mutateAsync({ id: currentApartment.id, ...formData });
      toast.success('Apartment updated successfully');
    }
    setIsFormModalOpen(false);
  } catch (error) {
    toast.error('An error occurred. Please try again.');
  }
}

const handleDelete = async () => {
  try {
    await deleteApartmentMutation.mutateAsync(currentApartment.id);
    toast.success('Apartment deleted successfully');
    setIsDeleteModalOpen(false);
    setCurrentApartment(null);
  } catch (error) {
    toast.error('Failed to delete apartment. Please try again.');
  }
}

// Status color mapping
const statusColors = (status) => {
  switch (status) {
    case 'occupied':
      return 'success';
    case 'vacant':
      return 'info';
    case 'maintenance':
      return 'warning';
    default:
      return 'default';
  }
}

  // Fetch apartments via React Query
  const { data, isLoading, isError } = useApartments({
    page,
    limit,
    search: debouncedSearch,
  });

  const apartments = useMemo(() => data?.data || [], [data]);

  //Mutations for crud
  const deleteApartmentMutation = useDeleteApartment();
  const updateApartmentMutation = useUpdateApartment();
  const createApartmentMutation = useCreateApartment();

  // Columns definition
  const columns = [
    { header: 'Unit', accessor: 'unit' },
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
        <Badge color={statusColors(row.status.toLowerCase())} variant="soft" dot>
          {row.status}
        </Badge>
      ),
    },
    { header: 'Tenant', accessor: 'tenant', render: row => row.tenant?.name || 'N/A' },
    {
      header: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <IconButton
            icon={<Eye size={16} />}
            aria-label="View"
            variant="primary"
            size='xs'
            onClick={() => handleViewBuilding(row)}
          />
          <IconButton
            icon={<Edit2 size={16} />}
            aria-label="Edit"
            variant="info"
            size='xs'
            onClick={() => handleEditBuilding(row)}
          />
          <IconButton
            icon={<Trash2 size={16} />}
            aria-label="Delete"
            variant="danger"
            size='xs'
            onClick={() => handleDeleteBuilding(row)}
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
        <Button variant="primary" leftIcon={<Plus size={16} />} onClick={handleAddApartment}>
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

      {/* Modals */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Add Apartment' : 'Edit Apartment'}
        size="2xl"
      >
        <ApartmentForm
          defaultValues={currentApartment}
          modalMode={modalMode}
          onSubmit={handleSubmit}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="default"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to delete apartment {currentApartment?.unit}?</p>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Apartment Details"
        size="2xl"
      >
        <ApartmentDetailsView
          apartment={currentApartment}
          statusColors={statusColors}
        />
      </Modal>
    </div>
  );
};

export default ListApartments;
