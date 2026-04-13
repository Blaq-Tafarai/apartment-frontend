import React, { useState, useMemo } from 'react';
import { Plus, Eye, Edit2, Trash2, Search, CreditCard, XCircle, CheckCircle, Clock } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Pagination from '../../../components/ui/Pagination';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import Tooltip from '../../../components/ui/Tooltip';
import { useSubscriptions, useSubscriptionStats, usePlans, useCreateSubscription, useUpdateSubscription, useCancelSubscription } from '../hooks/useSubscriptions';
import useDebounce from '../../../hooks/useDebounce';
import SubscriptionForm from '../components/SubscriptionForm';
import { useToast } from '../../../components/ui/Toast';

const ListSubscriptions = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentSubscription, setCurrentSubscription] = useState(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('');

  // Fetch subscriptions
  const { data: subscriptionsData, isLoading } = useSubscriptions({
    page,
    limit,
    search: debouncedSearch,
    status: statusFilter,
    plan: planFilter,
  });

  const stats = useSubscriptionStats();
  const { data: plans } = usePlans();

  // Mutations
  const createSubscriptionMutation = useCreateSubscription();
  const updateSubscriptionMutation = useUpdateSubscription();
  const cancelSubscriptionMutation = useCancelSubscription();

  const subscriptions = useMemo(() => subscriptionsData?.data?.data || [], [subscriptionsData]);
  const totalPages = subscriptionsData?.data?.totalPages || 1;

  // Handlers
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
    setCurrentSubscription(subscription);
    setIsViewModalOpen(true);
  };

  const handleCancelSubscription = (subscription) => {
    setCurrentSubscription(subscription);
    setIsCancelModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await createSubscriptionMutation.mutateAsync(formData);
        toast.success('Subscription created successfully');
      } else {
        await updateSubscriptionMutation.mutateAsync({ id: currentSubscription.id, ...formData });
        toast.success('Subscription updated successfully');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleCancelConfirm = async () => {
    try {
      await cancelSubscriptionMutation.mutateAsync(currentSubscription.id);
      toast.success('Subscription cancelled successfully');
      setIsCancelModalOpen(false);
      setCurrentSubscription(null);
    } catch (error) {
      toast.error('Failed to cancel subscription. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'trial':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'trial':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'danger';
      default:
        return 'gray';
    }
  };

  // Columns definition
  const columns = [
    { header: 'Company', accessor: 'company', render: row => row.company },
    { header: 'Plan', accessor: 'plan', render: row => row.plan },
    {
      header: 'Status',
      accessor: 'status',
      render: row => (
        <Badge color={getStatusColor(row.status)} variant="soft" dot>
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Billing',
      accessor: 'billingCycle',
      render: row => (
        <span className="capitalize">{row.billingCycle}</span>
      ),
    },
    {
      header: 'Amount',
      accessor: 'amount',
      render: row => (
        <span className="font-medium">${row.amount}/mo</span>
      ),
    },
    {
      header: 'Next Billing',
      accessor: 'nextBillingDate',
      render: row => row.nextBillingDate ? new Date(row.nextBillingDate).toLocaleDateString() : 'N/A'
    },
    {
      header: 'Last Payment',
      accessor: 'lastPayment',
      render: row => (
        <div className="flex items-center gap-2">
          {row.lastPayment ? (
            <>
              <span>{new Date(row.lastPayment).toLocaleDateString()}</span>
              <Badge color={getPaymentStatusColor(row.lastPaymentStatus)} variant="soft" className="text-xs">
                {row.lastPaymentStatus}
              </Badge>
            </>
          ) : (
            <span className="text-text-tertiary">-</span>
          )}
        </div>
      ),
    },
    {
      header: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <Tooltip content="View Details" position="top">
            <IconButton icon={<Eye size={14} />} variant="primary" size="xs" onClick={() => handleViewSubscription(row)} />
          </Tooltip>
          <Tooltip content="Edit Subscription" position="top">
            <IconButton icon={<Edit2 size={14} />} variant="info" size="xs" onClick={() => handleEditSubscription(row)} />
          </Tooltip>
          {row.status === 'active' && (
            <Tooltip content="Cancel Subscription" position="top">
              <IconButton icon={<XCircle size={14} />} variant="danger" size="xs" onClick={() => handleCancelSubscription(row)} />
            </Tooltip>
          )}
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Subscription Management</h1>
          <p className="text-text-secondary mt-1">Manage company subscriptions and billing</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={16} />} onClick={handleAddSubscription}>
          Create Subscription
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-text-secondary text-sm">Monthly Recurring Revenue</p>
          <p className="text-2xl font-bold text-text-primary">${stats.mrr.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-text-secondary text-sm">Annual Recurring Revenue</p>
          <p className="text-2xl font-bold text-text-primary">${stats.arr.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-text-secondary text-sm">Churn Rate</p>
          <p className="text-2xl font-bold text-red-600">{stats.churnRate}%</p>
        </div>
        <div className="card">
          <p className="text-text-secondary text-sm">Growth Rate</p>
          <p className="text-2xl font-bold text-green-600">+{stats.growthRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <Input
              type="text"
              placeholder="Search by company..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
          <Select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="cancelled">Cancelled</option>
          </Select>
          <Select
            value={planFilter}
            onChange={e => setPlanFilter(e.target.value)}
          >
            <option value="">All Plans</option>
            <option value="Basic">Basic</option>
            <option value="Professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
          </Select>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="card">
        <Table
          columns={columns}
          data={subscriptions}
          pagination={{
            currentPage: page,
            totalPages,
            onPageChange: setPage,
          }}
        />

        <div className="mt-4 flex justify-end">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Add/Edit Subscription Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Create Subscription' : 'Edit Subscription'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" form="subscription-form" type="submit">
              {modalMode === 'add' ? 'Create' : 'Update'}
            </Button>
          </>
        }
      >
        <SubscriptionForm
          defaultValues={currentSubscription}
          mode={modalMode}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      {/* View Subscription Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Subscription Details"
        size="lg"
      >
        {currentSubscription && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-secondary">Company</p>
                <p className="font-medium text-text-primary">{currentSubscription.company}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Plan</p>
                <p className="font-medium text-text-primary">{currentSubscription.plan}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Status</p>
                <Badge color={getStatusColor(currentSubscription.status)} variant="soft" dot>
                  {currentSubscription.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Billing Cycle</p>
                <p className="font-medium text-text-primary capitalize">{currentSubscription.billingCycle}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Amount</p>
                <p className="font-medium text-text-primary">${currentSubscription.amount}/month</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Start Date</p>
                <p className="font-medium text-text-primary">{new Date(currentSubscription.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Next Billing Date</p>
                <p className="font-medium text-text-primary">
                  {currentSubscription.nextBillingDate ? new Date(currentSubscription.nextBillingDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Payment Method</p>
                <p className="font-medium text-text-primary">{currentSubscription.paymentMethod}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Cancel Subscription"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsCancelModalOpen(false)}>
              Keep Subscription
            </Button>
            <Button variant="danger" onClick={handleCancelConfirm}>
              Cancel Subscription
            </Button>
          </>
        }
      >
        <p>Are you sure you want to cancel the subscription for <strong>{currentSubscription?.company}</strong>?</p>
        <p className="text-sm text-text-secondary mt-2">This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ListSubscriptions;

