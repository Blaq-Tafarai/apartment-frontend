import React, { useState, useMemo } from 'react';
import { Plus, Eye, Download, EyeIcon, Edit, Trash } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input'
import { usePayments } from '../hooks/usePayments';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import PaymentForm from '../components/PaymentForm';
import { useToast } from '../../../components/ui/Toast';
import PaymentDetailsView from '../components/PaymentDetailsView';
import PaymentSummaryCards from '../components/PaymentSummaryCards';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import { useCreatePayment, useUpdatePayment, useDeletePayment } from '../hooks/usePayments';
import Tooltip from '../../../components/ui/Tooltip';

const ListPayments = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  //Modals states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentPayment, setCurrentPayment] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //Handlers for opening modals
  const handleAddPayment = () => {
    setModalMode('add');
    setCurrentPayment(null);
    setIsFormModalOpen(true);
  };
  const handleEditPayment = (payment) => {
    setModalMode('edit');
    setCurrentPayment(payment);
    setIsFormModalOpen(true);
  };
  const handleViewPayment = (payment) => {
    setModalMode('view');
    setCurrentPayment(payment);
    setIsViewModalOpen(true);
  };

  const handleDeletePayment = (payment) => {
    setModalMode('delete');
    setCurrentPayment(payment);
    setIsDeleteModalOpen(true);
  };

  //Mutation for crud
  const createPaymentMutation = useCreatePayment();
  const updatePaymentMutation = useUpdatePayment();
  const deletePaymentMutation = useDeletePayment();

  // Fetch payments via React Query
  const { data, isLoading, isError } = usePayments({
    page,
    limit,
    search: debouncedSearch,
  });

  const payments = useMemo(() => data?.data || [], [data]);

  //Handler for crud operations
  const handleFormSubmit = async (formData) => {
    try {
      
      if (modalMode === 'add') {
        await createPaymentMutation.mutateAsync(formData);
        toast.success('Payment recorded successfully');
      } else {
        await updatePaymentMutation.mutateAsync({ id: currentPayment.id, ...formData });
        toast.success('Payment updated successfully');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePaymentMutation.mutateAsync(currentPayment.id);
      toast.success('Payment deleted successfully');
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'FAILED':
        return 'danger';
      case 'REFUNDED':
        return 'info';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'gray';
    }
  };

  // Columns definition
  const columns = [
    { header: 'Tenant', accessor: 'tenant', render: row => row.tenant?.name || 'N/A' },
    { header: 'Building', accessor: 'building', render: row => row.building?.name || 'N/A' },
    { header: 'Apartment', accessor: 'apartment', render: row => row.apartment?.number || 'N/A' },
    { header: 'Amount', accessor: 'amount', render: row => `$${row.amount}` },
    { header: 'Type', accessor: 'type' },
    { header: 'Method', accessor: 'method' },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <Badge color={getStatusColor(row.status)} variant="solid" dot>
          {row.status} 
        </Badge>
      ),
    },
    { header: 'Due Date', accessor: 'dueDate', render: row => row.dueDate ? new Date(row.dueDate).toLocaleDateString() : 'N/A' },
    { header: 'Paid At', accessor: 'paidAt', render: row => row.paidAt ? new Date(row.paidAt).toLocaleDateString() : 'N/A' },
    { header: 'Invoice #', accessor: 'invoiceNumber' },
    {
      header: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <Button aria-label="View Payment" variant="primary" size="xs" leftIcon={<EyeIcon size={12}/>} onClick={() => handleViewPayment(row)}>
            View
          </Button>
          {row.receiptUrl && (
            <Button aria-label="Download Receipt" variant="outline" size="xs" leftIcon={<Download size={12}/>}>
              Receipt
            </Button>
          )}

          {/* You can add edit and delete buttons here if needed */}
          <Tooltip content="Edit Payment" position="bottom">
            <IconButton rounded={false} aria-label="Edit Payment" variant="info" size="xs" leftIcon={<Edit size={12}/>} onClick={() => handleEditPayment(row)}></IconButton>
          </Tooltip>
          <Tooltip content="Delete Payment" position="bottom">
            <IconButton rounded={false}  aria-label="Delete Payment" variant="danger" size="xs" leftIcon={<Trash size={12}/>} onClick={() => handleDeletePayment(row)}></IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading payments...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load payments.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Payments</h1>
          <p className="text-text-secondary mt-1">Manage payment records and transactions</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={16} />} onClick={handleAddPayment}>
          Record Payment
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search payments..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Summary Cards */}
      <PaymentSummaryCards payments={payments} />

      {/* Payments Table */}
      <div className="card">
        <Table
          columns={columns}
          data={payments}
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

      {/* Payment Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === "add" ? "Record Payment" : "Edit Payment"}
        size="4xl"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button form="payment-form" type="submit" variant="primary">
              {modalMode === "add" ? "Record Payment" : "Update Payment"}
            </Button>
          </>
        }
      >
        <PaymentForm
          defaultValues={ modalMode === 'edit' ? currentPayment : null }
          mode={modalMode}
          onClose={() => setIsFormModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      {/* Payment Details View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Payment Details"
        size="3xl"
      >
        <PaymentDetailsView payment={currentPayment} getStatusColor={getStatusColor} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Payment"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeletePayment} variant="danger">
              Delete
            </Button>
          </>
        }
      > 
        <p>Are you sure you want to delete this payment?</p>
      </Modal>
    </div>
  );
};

export default ListPayments;
