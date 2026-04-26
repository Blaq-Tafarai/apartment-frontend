import React, { useState, useMemo } from 'react';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input';
import { useSubscriptions, useCreateSubscription, useUpdateSubscription, useDeleteSubscription } from '../hooks/useSubscriptions';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import { useToast } from '../../../components/ui/Toast';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import SubscriptionForm from '../components/SubscriptionForm';
import SubscriptionDetailsView from '../components/SubscriptionDetailsView';
import SubscriptionSummaryCards from '../components/SubscriptionSummaryCards';

const ListSubscriptions = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit' | 'view'

  // Handlers for modal actions
  const handleAddSubscription = () => {
    setModalMode('add');
    setCurrentSubscription(null);
    setIsFormModalOpen(true);
  };

  const handleEditSubscription = (subscription) => {
    setModalMode('edit');
    setCurrentSubscription(subscription);
    setIsFormModalOpen(true);
  };

  const handleViewSubscription = (subscription) => {
    setModalMode('view');
    setCurrentSubscription(subscription);
    setIsViewModalOpen(true);
  };

  const handleDeleteSubscription = (subscription) => {
    setCurrentSubscription(subscription);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await createSubscriptionMutation.mutateAsync(formData);
        toast.success('Subscription created successfully');
      } else {
        await updateSubscriptionMutation.mutateAsync({ id: currentSubscription.id, payload: formData });
        toast.success('Subscription updated successfully');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSubscriptionMutation.mutateAsync(currentSubscription.id);
      toast.success('Subscription deleted successfully');
      setIsDeleteModalOpen(false);
      setCurrentSubscription(null);
    } catch (error) {
      toast.error('Failed to delete subscription. Please try again.');
    }
  };

  // Status color mapping
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

  // Fetch subscriptions via React Query
  const { data, isLoading, isError } = useSubscriptions({
    page,
    limit,
    search: debouncedSearch,
  });

  const subscriptions = useMemo(() => data?.data || [], [data]);

  // Mutations for CRUD
  const deleteSubscriptionMutation = useDeleteSubscription();
  const updateSubscriptionMutation = useUpdateSubscription();
  const createSubscriptionMutation = useCreateSubscription();

  // Columns definition
  const columns = [
    { header: 'Plan', accessor: 'planName' },
    { header: 'Organization', accessor: 'organization.name', render: row => row.organization?.name || 'N/A' },
    { header: 'Price', accessor: 'price', render: row => `$${row.price}` },
    { header: 'Cycle', accessor: 'billingCycle' },
    {
      header: 'Status',
      accessor: 'status',
      render: row => (
        <Badge color={statusColors(row.status)} variant="soft" dot>
          {row.status}
        </Badge>
      ),
    },
    {
        header: 'Start Date',
        accessor: 'startDate',
        render: row => (
            <span>{new Date(row.startDate).toLocaleDateString()}</span>
        )
    },
    {
        header: 'End Date',
        accessor: 'endDate',
        render: row => (
            <span>{new Date(row.endDate).toLocaleDateString()}</span>
        )
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
            onClick={() => handleViewSubscription(row)}
          />
          <IconButton
            icon={<Edit2 size={16} />}
            aria-label="Edit"
            variant="info"
            size='xs'
            onClick={() => handleEditSubscription(row)}
          />
          <IconButton
            icon={<Trash2 size={16} />}
            aria-label="Delete"
            variant="danger"
            size='xs'
            onClick={() => handleDeleteSubscription(row)}
          />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading subscriptions...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load subscriptions.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Subscriptions</h1>
          <p className="text-text-secondary mt-1">Manage organization subscriptions</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={16} />} onClick={handleAddSubscription}>
          Add Subscription
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search subscriptions..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Summary Cards */}
      <SubscriptionSummaryCards subscriptions={subscriptions} />

      {/* Subscriptions Table */}
      <div className="card">
        <Table
          columns={columns}
          data={subscriptions}
          pagination={{
            currentPage: page,
            totalPages: data?.meta?.totalPages || 1,
            totalItems: data?.meta?.total || 0,
            itemsPerPage: limit,
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

      {/* Modals */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Add Subscription' : 'Edit Subscription'}
        size="3xl"
        footer={
          <>
            <Button
              variant="danger"
              onClick={() => setIsFormModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="subscription-form"
            >
              {modalMode === 'add' ? 'Create' : 'Update'}
            </Button>
          </>
        }
      >
        <SubscriptionForm
          defaultValues={currentSubscription}
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
        <p>Are you sure you want to delete subscription for plan "{currentSubscription?.planName}"?</p>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Subscription Details"
        size="3xl"
      >
        <SubscriptionDetailsView
          subscription={currentSubscription}
          statusColors={statusColors}
        />
      </Modal>
    </div>
  );
};

export default ListSubscriptions;

