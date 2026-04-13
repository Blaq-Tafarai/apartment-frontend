import React, { useState, useMemo } from 'react';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import { useBuildings, useCreateBuilding, useUpdateBuilding, useDeleteBuilding } from '../hooks/useBuildings';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import BuildingForm from '../components/BuildingForm';
import { useToast } from '../../../components/ui/Toast';
import BuildingDetailsView from '../components/BuildingDetailsView';
import BuildingSummaryCards from '../components/BuildingSummaryCards';


const ListBuildings = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  // Handler functions
  const handleAddBuilding = () => {
    setModalMode('add');
    setCurrentBuilding(null);
    setIsFormModalOpen(true);
  };

  const handleEditBuilding = (building) => {
    setModalMode('edit');
    setCurrentBuilding(building);
    setIsFormModalOpen(true);
  };

  const handleDeleteBuilding = (building) => {
    setCurrentBuilding(building);
    setIsDeleteModalOpen(true);
  };

  const handleViewBuilding = (building) => {
    setCurrentBuilding(building);
    setIsViewModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await createBuildingMutation.mutateAsync(formData);
        toast.success('Success', 'Building created successfully!');
      } else {
        await updateBuildingMutation.mutateAsync({ id: currentBuilding.id, payload: formData });
        toast.success('Success', 'Building updated successfully!');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error('Error', 'Failed to save building. Please try again.');
      console.error('Error submitting form:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBuildingMutation.mutateAsync(currentBuilding.id);
      toast.success('Success', 'Building deleted successfully!');
      setIsDeleteModalOpen(false);
      setCurrentBuilding(null);
    } catch (error) {
      toast.error('Error', 'Failed to delete building. Please try again.');
      console.error('Error deleting building:', error);
    }
  };

  // Fetch buildings via React Query
  const { data, isLoading, isError } = useBuildings({
    page,
    limit,
    search: debouncedSearch,
  });

  // Mutations for CRUD operations
  const createBuildingMutation = useCreateBuilding();
  const updateBuildingMutation = useUpdateBuilding();
  const deleteBuildingMutation = useDeleteBuilding();

  const buildings = useMemo(() => data?.data || [], [data]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'danger';
      case 'Under Construction':
        return 'info';
      default:
        return 'warning';
    }
  };

  // Columns definition
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Address', accessor: 'address' },
    { header: 'Units', accessor: 'units' },
    { header: 'Occupancy Rate', accessor: 'occupancyRate', render: row => `${row.occupancyRate}%` },
    {
      header: 'Status',
      accessor: 'status',
      render: row => (
        <Badge color={getStatusColor(row.status)} variant="soft" dot>
          {row.status}
        </Badge>
      ),
    },
    { header: 'Year Built', accessor: 'yearBuilt' },
    { header: 'Total Sqft', accessor: 'totalSqft', render: row => row.totalSqft ? `${row.totalSqft.toLocaleString()} sqft` : 'N/A' },
    { header: 'Manager', accessor: 'manager', render: row => row.manager ? row.manager.name : 'N/A' },
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
            icon={<Edit size={16} />}
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
        <div className="animate-pulse text-text-primary">Loading buildings...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load buildings.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Buildings</h1>
          <p className="text-text-secondary mt-1">Manage apartment buildings and properties</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={20} />} onClick={handleAddBuilding}>
          Add Building
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search buildings..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Summary Cards */}
      <BuildingSummaryCards buildings={buildings} />

      {/* Buildings Table */}
      <div className="card">
        <Table
          columns={columns}
          data={buildings}
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

      {/* Building Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Building' : 'Edit Building'}
        size="2xl"
      >
        <BuildingForm
          defaultValues= {modalMode === 'edit' ? currentBuilding : {}}
          onSubmit={handleFormSubmit}
          modalMode={modalMode}
        />
      </Modal>

      {/* View Building Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Building Details"
        size="2xl"
      >
        <BuildingDetailsView
          building={currentBuilding}
          getStatusColor={getStatusColor}
        />
      </Modal>

      {/* Delete Building Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Building"
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
            Are you sure you want to delete "{currentBuilding?.name}"? This action cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ListBuildings;
