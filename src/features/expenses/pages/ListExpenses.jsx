import React, { useState, useMemo } from 'react';
import { Plus, Eye, Edit, Trash, Pencil } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input'
import { useExpenses } from '../hooks/useExpenses';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import ExpenseSummaryCards from '../components/ExpenseSummaryCards';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseDetailsView from '../components/ExpenseDetailsView';
import Tooltip from '../../../components/ui/Tooltip';
import { useCreateExpense, useUpdateExpense, useDeleteExpense } from '../hooks/useExpenses';
import { useToast } from '../../../components/ui/Toast';

const ListExpenses = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  //Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [currentExpense, setCurrentExpense] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //Handlers for modal actions
  const handleAddExpense = () => {
    setModalMode('create');
    setCurrentExpense(null);
    setIsFormModalOpen(true);
  };

  const handleEditExpense = (expense) => {
    setModalMode('edit');
    setCurrentExpense(expense);
    setIsFormModalOpen(true);
  };

  const handleViewExpense = (expense) => {
    setCurrentExpense(expense);
    setIsViewModalOpen(true);
  };

  const handleDeleteExpense = (expense) => {
    setCurrentExpense(expense);
    setIsDeleteModalOpen(true);
  };

  //Mutations for crud
  const createExpenseMutation = useCreateExpense();
  const updateExpenseMutation = useUpdateExpense();
  const deleteExpenseMutation = useDeleteExpense();

  //Handlers
  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === 'create') {
        await createExpenseMutation.mutateAsync(formData);
        toast.success('Success', 'Expense created successfully!');
      } else {
        await updateExpenseMutation.mutateAsync({ id: currentExpense.id, payload: formData });
        toast.success('Success', 'Expense updated successfully!');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error', 'There was an error processing your request.');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteExpenseMutation.mutateAsync(currentExpense.id);
      toast.success('Success', 'Expense deleted successfully!');
      setIsDeleteModalOpen(false);
      setCurrentExpense(null);
    } catch (error) {
      console.error('Error deleting expense:', error);
      toast.error('Error', 'There was an error deleting the expense.');
    }
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setCurrentExpense(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setCurrentExpense(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentExpense(null);
  };

  // Fetch expenses via React Query
  const { data, isLoading, isError } = useExpenses({
    page,
    limit,
    search: debouncedSearch,
  });

  const expenses = useMemo(() => data?.data || [], [data]);

  const getStatusColor = (paymentStatus) => {
    switch (paymentStatus) {
      case 'PAID':
        return 'success';
      case 'APPROVED':
        return 'info';
      case 'PENDING':
        return 'warning';
      case 'OVERDUE':
        return 'danger';
      case 'CANCELLED':
        return 'gray';
      default:
        return 'gray';
    }
  };

  // Columns definition
  const columns = [
    { header: 'Building', accessor: 'building', render: row => row.building?.name || 'Property-wide' },
    { header: 'Category', accessor: 'category' },
    { header: 'Description', accessor: 'description' },
    { header: 'Vendor', accessor: 'vendor' },
    { header: 'Amount', accessor: 'amount', render: row => `$${row.amount}` },
    { header: 'Payment Method', accessor: 'paymentMethod' },
    {
      header: 'Status',
      accessor: 'paymentStatus',
      render: row => (
        <Badge color={getStatusColor(row.paymentStatus)} variant="soft">
          {row.paymentStatus}
        </Badge>
      ),
    },
    { header: 'Due Date', accessor: 'dueDate', render: row => row.dueDate ? new Date(row.dueDate).toLocaleDateString() : 'N/A' },
    { header: 'Paid At', accessor: 'paidAt', render: row => row.paidAt ? new Date(row.paidAt).toLocaleDateString() : 'N/A' },
    { header: 'Recurring', accessor: 'recurring', render: row => row.recurring ? `${row.recurrenceFrequency}` : 'No' },
    { header: 'Invoice #', accessor: 'invoiceNumber' },
    {
      header: 'Actions',
      render: row => (
        <div className="flex items-center gap-2">
          <Tooltip content="View Details" position="top">
            <IconButton
              aria-label="View Expense"
              variant="primary"
              size="xs"
              onClick={() => handleViewExpense(row)}
              icon={<Eye size={12} />}
              rounded={false}
            />
          </Tooltip>

          <Tooltip content="Edit Expense" position="top">
            <IconButton
              aria-label="Edit Expense"
              variant="info"
              size="xs"
              onClick={() => handleEditExpense(row)}
              icon={<Pencil size={12} />}
              rounded={false}
            />
          </Tooltip>

          <Tooltip content="Delete Expense" position="top">
            <IconButton
              aria-label="Delete Expense"
              variant="danger"
              size="xs"
              onClick={() => handleDeleteExpense(row)}
              icon={<Trash size={12} />}
              rounded={false}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading expenses...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load expenses.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Expenses</h1>
          <p className="text-text-secondary mt-1">Manage property expenses and payments</p>
        </div>
        <Button aria-label="Add Expense" variant="primary" leftIcon={<Plus size={16} />} onClick={handleAddExpense}>
          Record Expense
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Summary Cards */}
      <ExpenseSummaryCards expenses={expenses} />

      {/* Expenses Table */}
      <div className="card">
        <Table
          columns={columns}
          data={expenses}
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

      {/* Expense Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={modalMode === 'edit' ? 'Edit Expense' : 'Add New Expense'}
        size="3xl"
        footer={
          <>
            <Button aria-label="Cancel" variant="secondary" onClick={handleCloseFormModal}>Cancel</Button>
            <Button aria-label="{modelMode === 'edit' ? 'Update Expense' : 'Create Expense'}" form="expense-form" type="submit" variant="primary">
              {modalMode === 'edit' ? 'Update Expense' : 'Create Expense'}
            </Button>
          </>
        }
      >
        <ExpenseForm
          defaultValues={ modalMode === 'edit' ? currentExpense : {}}
          modalMode={modalMode}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        title="Expense Details"
        size="3xl"
      >
        <ExpenseDetailsView expense={currentExpense} getStatusColor={getStatusColor} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Delete Expense"
        size="md"
        footer={
          <>
            <Button aria-label="Cancel" variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button aria-label="Confirm Delete" variant="danger" onClick={handleConfirmDelete}>Delete</Button>
          </>
        }
      >
        <p>Are you sure you want to delete this expense?</p>
      </Modal>
      
    </div>
  );
};

export default ListExpenses;
