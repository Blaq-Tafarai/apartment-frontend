import React, { useState, useMemo } from 'react';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input'
import { useCompanies } from '../hooks/useCompanies';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import CompanyForm from '../components/CompanyForm';
import { useToast } from '../../../components/ui/Toast';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import { useDeleteCompany, useUpdateCompany, useCreateCompany } from '../hooks/useCompanies';
import CompanyDetailsView from '../components/CompanyDetailsView';
import CompanySummaryCards from '../components/CompanySummaryCards';

const ListCompanies = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  //Modal States
const [isFormModalOpen, setIsFormModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [isViewModalOpen, setIsViewModalOpen] = useState(false);
const [currentCompany, setCurrentCompany] = useState(null);
const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit' | 'view'

// Handlers for modal actions
const handleAddCompany = () => {
  setModalMode('add');
  setCurrentCompany(null);
  setIsFormModalOpen(true);
};

const handleEditCompany = (company) => {
  setModalMode('edit');
  setCurrentCompany(company);
  setIsFormModalOpen(true);
}
const handleViewCompany = (company) => {
  setModalMode('view');
  setCurrentCompany(company);
  setIsViewModalOpen(true);
}

const handleDeleteCompany = (company) => {
  setCurrentCompany(company);
  setIsDeleteModalOpen(true);
}

const handleSubmit = async (formData) => {
  try {
    if (modalMode === 'add') {
      await createCompanyMutation.mutateAsync(formData);
      toast.success('Company created successfully');
    } else {
      await updateCompanyMutation.mutateAsync({ id: currentCompany.id, ...formData });
      toast.success('Company updated successfully');
    }
    setIsFormModalOpen(false);
  } catch (error) {
    toast.error('An error occurred. Please try again.');
  }
}

const handleDelete = async () => {
  try {
    await deleteCompanyMutation.mutateAsync(currentCompany.id);
    toast.success('Company deleted successfully');
    setIsDeleteModalOpen(false);
    setCurrentCompany(null);
  } catch (error) {
    toast.error('Failed to delete company. Please try again.');
  }
}

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
}

  // Fetch companies via React Query
  const { data, isLoading, isError } = useCompanies({
    page,
    limit,
    search: debouncedSearch,
  });

  const companies = useMemo(() => data?.data || [], [data]);

  //Mutations for crud
  const deleteCompanyMutation = useDeleteCompany();
  const updateCompanyMutation = useUpdateCompany();
  const createCompanyMutation = useCreateCompany();

  // Columns definition
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Admin User', accessor: 'adminUser', render: row => row.adminUser?.name || 'N/A' },
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
      header: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <IconButton
            icon={<Eye size={16} />}
            aria-label="View"
            variant="primary"
            size='xs'
            onClick={() => handleViewCompany(row)}
          />
          <IconButton
            icon={<Edit2 size={16} />}
            aria-label="Edit"
            variant="info"
            size='xs'
            onClick={() => handleEditCompany(row)}
          />
          <IconButton
            icon={<Trash2 size={16} />}
            aria-label="Delete"
            variant="danger"
            size='xs'
            onClick={() => handleDeleteCompany(row)}
          />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading companies...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load companies.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Companies</h1>
          <p className="text-text-secondary mt-1">Manage property management companies</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={16} />} onClick={handleAddCompany}>
          Add Company
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Summary Cards */}
      <CompanySummaryCards companies={companies} />

      {/* Companies Table */}
      <div className="card">
        <Table
          columns={columns}
          data={companies}
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
        title={modalMode === 'add' ? 'Add Company' : 'Edit Company'}
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
              form="company-form"
            >
              {modalMode === 'add' ? 'Create' : 'Update'}
            </Button>
          </>
        }
      >
        <CompanyForm
          defaultValues={currentCompany}
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
        <p>Are you sure you want to delete company {currentCompany?.name}?</p>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Company Details"
        size="3xl"
      >
        <CompanyDetailsView
          company={currentCompany}
          statusColors={statusColors}
        />
      </Modal>
    </div>
  );
};

export default ListCompanies;
