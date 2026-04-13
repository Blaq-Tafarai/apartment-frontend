import React, { useState, useMemo } from 'react';
import { Plus, Download, Edit, Trash, Eye } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input'
import { useInvoices } from '../hooks/useInvoices';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import InvoiceSummaryCards from '../components/InvoiceSummaryCards';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import InvoiceForm from '../components/InvoiceForm';
import { useToast } from '../../../components/ui/Toast';
import InvoiceDetailsView from '../components/InvoiceDetailsView';
import { useCreateInvoice, useUpdateInvoice, useDeleteInvoice } from '../hooks/useInvoices';
import Tooltip from '../../../components/ui/Tooltip';

const ListInvoices = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  const handleAddInvoice = () => {
    setModalMode('add');
    setCurrentInvoice(null);
    setIsFormModalOpen(true);
  };

  const handleViewInvoice = (invoice) => {
    setCurrentInvoice(invoice);
    setIsViewModalOpen(true);
  }

  const handleEditInvoice = (invoice) => {
    setModalMode('edit');
    setCurrentInvoice(invoice);
    setIsFormModalOpen(true);
  }

  const handleDeleteInvoice = (invoice) => {
    setCurrentInvoice(invoice);
    setIsDeleteModalOpen(true);
  }

  //Mutation for Crud
  const createInvoiceMutation = useCreateInvoice();
  const updateInvoiceMutation = useUpdateInvoice();
  const deleteInvoiceMutation = useDeleteInvoice();

  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await createInvoiceMutation.mutateAsync(formData);
        toast.success('Success', 'Invoice created successfully!');
      } else {
        await updateInvoiceMutation.mutateAsync({ id: currentInvoice.id, payload: formData });
        toast.success('Success', 'Invoice updated successfully!');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteInvoiceMutation.mutateAsync(currentInvoice.id);
      toast.success('Success', 'Invoice deleted successfully!');
      setIsDeleteModalOpen(false);
      setCurrentInvoice(null);
    } catch (error) {
      toast.error('Error', 'Failed to delete invoice. Please try again.');
    }
  };



  // Fetch invoices via React Query
  const { data, isLoading, isError } = useInvoices({
    page,
    limit,
    search: debouncedSearch,
  });

  const invoices = useMemo(() => data?.data || [], [data]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Overdue':
        return 'danger';
      case 'Cancelled':
        return 'gray';
      default:
        return 'gray';
    }
  }

  // Columns definition
  const columns = [
    { header: 'Invoice #', accessor: 'invoiceNumber' },
    { header: 'Tenant', accessor: 'tenant' },
    { header: 'Amount', accessor: 'amount', render: row => `$${row.amount}` },
    {
      header: 'Status',
      accessor: 'status',
      render: row => (
        <Badge color={getStatusColor(row.status)} variant="solid" dot className="text-sm px-3 py-1">
          {row.status}
        </Badge>
      ),
    },
    { header: 'Due Date', accessor: 'dueDate' },
    { header: 'Issue Date', accessor: 'issueDate' },
    {
      header: 'Actions',
      render: row => (
        <div className="flex items-center gap-2">
          <Button aria-label="Download Invoice" variant="outline" size="xs" leftIcon={<Download size={12} />}>
            Download
          </Button>
          <Tooltip content="View Details" placement="top">
            <IconButton
              rounded={false}
              aria-label="View Invoice"
              variant="primary"
              size="xs"
              onClick={() => handleViewInvoice(row)}
              icon={<Eye size={12}/>}
            >
            </IconButton>
          </Tooltip>

          <Tooltip content="Edit Invoice" placement="top">
            <IconButton
              rounded={false}
              aria-label="Edit Invoice"
              variant="info"
              size="xs"
              onClick={() => handleEditInvoice(row)}
              icon={<Edit size={12}/>}
            >
            </IconButton>
          </Tooltip>

          <Tooltip content="Delete Invoice" placement="top">
            <IconButton
              rounded={false}
              aria-label="Delete Invoice"
              variant="danger"
              size="xs"
              onClick={() => handleDeleteInvoice(row)}
              icon={<Trash size={12}/>}
            >
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading invoices...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load invoices.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Billing</h1>
          <p className="text-text-secondary mt-1">Manage invoices and payments</p>
        </div>
        <Button aria-label="Create Invoice" variant="primary" leftIcon={<Plus size={16} />} onClick={handleAddInvoice}>
          Create Invoice
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Summary Cards */}
      <InvoiceSummaryCards invoices={invoices} />

      {/* Invoice Table */}
      <div className="card">
        <Table
          columns={columns}
          data={invoices}
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

      {/* Invoice Form Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Create Invoice' : 'Edit Invoice'}
        size="3xl"
        footer={
          <>
            <Button aria-label="Cancel" variant="secondary" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>

            <Button aria-label="{modalMode === 'add' ? 'Create Invoice' : 'Update Invoice'}" form="invoice-form" type="submit" variant="primary">
              {modalMode === 'add' ? 'Create' : 'Update'}
            </Button>
          </>
        }
      >
        <InvoiceForm
          defaultValues={modalMode === 'edit' ? currentInvoice : {}}
          onSubmit={handleFormSubmit}
          modalMode={modalMode}
        />
      </Modal>

      {/* View Invoice Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Invoice Details"
        size="3xl"
      >
        <InvoiceDetailsView invoice={currentInvoice} getStatusColor={getStatusColor} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        size="md"
        footer={
          <>
            <Button aria-label="Cancel" variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button aria-label="Delete Invoice" variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete invoice #{currentInvoice?.invoiceNumber}?</p>
      </Modal>
    </div>
  );
};

export default ListInvoices;
