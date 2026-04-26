import React, { useState, useMemo } from 'react';
import { Plus, Eye, PlusIcon, Trash2, Edit } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input'
import { useMaintenance, useMaintenances } from '../hooks/useMaintenance';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import Badge from '../../../components/ui/Badge';
import { useDeleteMaintenance, useUpdateMaintenance, useCreateMaintenance } from '../hooks/useMaintenance';
import Modal from '../../../components/ui/Modal';
import MaintenanceForm from '../components/MaintenanceForm';
import { useToast } from '../../../components/ui/Toast';
import MaintenanceDetailsView from '../components/MaintenanceDetailsView';
import MaintenanceSummaryCards from '../components/MaintenanceSummaryCards';

const ListMaintenance = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  //Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentMaintenance, setCurrentMaintenance] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handlers for modal actions
  const handleAddMaintenance = () => {
    setModalMode('add');
    setCurrentMaintenance(null);
    setIsFormModalOpen(true);
  };

  const handleViewMaintenance = (maintenance) => {
    setModalMode('view');
    setCurrentMaintenance(maintenance);
    setIsViewModalOpen(true);
  };

  const handleEditMaintenance = (maintenance) => {
    setModalMode('edit');
    setCurrentMaintenance(maintenance);
    setIsFormModalOpen(true);
  };

  const handleDeleteMaintenance = (maintenance) => {
    setCurrentMaintenance(maintenance);
    setIsDeleteModalOpen(true);
  };

  //mutation for crud
  const createMaintenanceMutation = useCreateMaintenance();
  const updateMaintenanceMutation = useUpdateMaintenance();
  const deleteMaintenanceMutation = useDeleteMaintenance();

  //Handlers
  const handleSubmitForm = async (formData) => {
    try {
      if (modalMode === 'add') {
        await createMaintenanceMutation.mutateAsync(formData);
        toast.success('Maintenance request created successfully');
      } else if (modalMode === 'edit') {
        await updateMaintenanceMutation.mutateAsync({ id: currentMaintenance.id, payload: formData });
        toast.success('Maintenance request updated successfully');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMaintenanceMutation.mutateAsync(currentMaintenance.id);
      toast.success('Maintenance request deleted successfully');
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  }


  // Fetch maintenance via React Query
  const { data, isLoading, isError } = useMaintenances({
    page,
    limit,
    search: debouncedSearch,
  });

  const maintenance = useMemo(() => data?.data || [], [data]);
  

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'completed':
        return 'success';
      case 'resolved':
        return 'success';
      default:
        return 'gray';
    }
  };

  const priorityColors = (priority) => {
    switch (priority) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      default:
        return 'gray';
    }
  }

  // Columns definition
  const columns = [
    { header: 'Tenant', accessor: 'tenant.name', render: row => row.tenant?.user?.name || 'N/A' },
    { header: 'Apartment', accessor: 'apartment', render: row => row.apartment?.unitNumber || 'N/A' },
    { header: 'Category', accessor: 'category' },
    {
      header: 'Priority',
      accessor: 'priority',
      render: (row) => (
        <Badge
          color={priorityColors(row.priority)}
          variant="soft"
          dot
        >
          {row.priority}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <Badge
          color={getStatusColor(row.status)}
          variant="soft"
          dot
        >
          {row.status}
        </Badge>
      ),
    },
    { header: 'Assigned To', accessor: 'assignedManager', render: row => row.assignedManager?.name || 'N/A' },
    {
      header: 'Actions',
      render: (row) => (
        <>
          <div className="flex gap-2">
            <IconButton
              icon={<Eye size={16} />}
              size="xs"
              variant="primary"
              onClick={() => handleViewMaintenance(row)}
              aria-label="View Maintenance"
            />
            <IconButton
              icon={<Edit size={16} />}
              size="xs"
              variant="info"
              onClick={() => handleEditMaintenance(row)}
              aria-label="Edit Maintenance"
            />
            <IconButton
              icon={<Trash2 size={16} />}
              size="xs"
              variant="danger"
              onClick={() => handleDeleteMaintenance(row)}
              aria-label="Delete Maintenance"
            />
          </div>
        </>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading maintenance requests...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load maintenance requests.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Maintenance</h1>
          <p className="text-text-secondary mt-1">Manage maintenance requests and repairs</p>
        </div>
        <Button leftIcon={<PlusIcon size={16} />} variant="primary" onClick={handleAddMaintenance}>
          New Request
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

      {/* Summary Cards */}
      <MaintenanceSummaryCards maintenance={maintenance} />

      {/* Maintenance Table */}
      <div className="card">
        <Table
          columns={columns}
          data={maintenance}
          pagination={{
            currentPage: page,
            totalPages: data?.meta?.totalPages || 1,
            totalItems: data?.meta?.total || 0,
            onPageChange: setPage,
            itemsPerPage: limit,
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

      {/* Maintenance Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Add Maintenance Request' : 'Edit Maintenance Request'}
        size="3xl"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="maintenance-form" variant="primary">
              {modalMode === 'add' ? 'Create' : 'Update'}
            </Button>
          </>
        }
      >
        <MaintenanceForm
          defaultValues={ modalMode === 'edit' ? currentMaintenance : null }
          mode={modalMode}
          onSubmit={handleSubmitForm}
        />
      </Modal>

      {/* Maintenance Details View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Maintenance Details"
        size="2xl"
      >
        <MaintenanceDetailsView
          maintenance={currentMaintenance}
          priorityColors={priorityColors}
          getStatusColor={getStatusColor}
          onClose={() => setIsViewModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
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
        <div className="space-y-4">
          <p>Are you sure you want to delete this maintenance request?</p>
        </div>
      </Modal>

    </div>
  );
};

export default ListMaintenance;
