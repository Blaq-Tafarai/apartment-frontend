import React, { useState, useMemo } from 'react';
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input'
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../hooks/useUsers';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import UserForm from '../components/UserForm';
import { useToast } from '../../../components/ui/Toast';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import UserDetailsView from '../components/UserDetailsView';
import UserSummaryCards from '../components/UserSummaryCards';

const ListUsers = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit' | 'view'

  // Handlers for modal actions
  const handleAddUser = () => {
    setModalMode('add');
    setCurrentUser(null);
    setIsFormModalOpen(true);
  };

  const handleEditUser = (user) => {
    setModalMode('edit');
    setCurrentUser(user);
    setIsFormModalOpen(true);
  };

  const handleViewUser = (user) => {
    setModalMode('view');
    setCurrentUser(user);
    setIsViewModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await createUserMutation.mutateAsync(formData);
        toast.success('User created successfully');
      } else {
        await updateUserMutation.mutateAsync({ id: currentUser.id, payload: formData });
        toast.success('User updated successfully');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserMutation.mutateAsync(currentUser.id);
      toast.success('User deleted successfully');
      setIsDeleteModalOpen(false);
      setCurrentUser(null);
    } catch (error) {
      toast.error('Failed to delete user. Please try again.');
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

  // Role badge colors - use supported colors only
  const roleColors = (role) => {
    switch (role) {
      case 'admin':
        return 'primary';
      case 'manager':
        return 'info';
      case 'tenant':
        return 'success';
      default:
        return 'gray';
    }
  };

  // Fetch users via React Query
  const { data, isLoading, isError } = useUsers({
    page,
    limit,
    search: debouncedSearch,
  });

  const users = useMemo(() => data?.data || [], [data]);

  // Mutations for CRUD
  const deleteUserMutation = useDeleteUser();
  const updateUserMutation = useUpdateUser();
  const createUserMutation = useCreateUser();

  // Columns definition
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Organization', accessor: 'organization.name', render: row => row.organization?.name || 'N/A' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Role',
      accessor: 'role',
      render: row => (
        <Badge color={roleColors(row.role)} variant="soft">
          {row.role}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: row => (
        <Badge color={statusColors(row.status)} variant="outline" dot>
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
            onClick={() => handleViewUser(row)}
          />
          <IconButton
            icon={<Edit2 size={16} />}
            aria-label="Edit"
            variant="info"
            size='xs'
            onClick={() => handleEditUser(row)}
          />
          <IconButton
            icon={<Trash2 size={16} />}
            aria-label="Delete"
            variant="danger"
            size='xs'
            onClick={() => handleDeleteUser(row)}
          />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading users...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load users.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Users</h1>
          <p className="text-text-secondary mt-1">Manage application users and permissions</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={16} />} onClick={handleAddUser}>
          Add User
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Summary Cards */}
      <UserSummaryCards users={users} />

      {/* Users Table */}
      <div className="card">
        <Table
          columns={columns}
          data={users}
          pagination={{
            currentPage: page,
            totalPages: data?.meta?.totalPages || 1,
            onPageChange: setPage,
            totalItems: data?.meta?.total || 0,
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

      {/* Modals */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Add User' : 'Edit User'}
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
              form="user-form"
            >
              {modalMode === 'add' ? 'Create' : 'Update'}
            </Button>
          </>
        }
      >
        <UserForm
          defaultValues={currentUser}
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
        <p>Are you sure you want to delete user <strong>{currentUser?.name}</strong>?</p>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="User Details"
        size="3xl"
      >
        <UserDetailsView
          user={currentUser}
          statusColors={statusColors}
        />
      </Modal>
    </div>
  );
};

export default ListUsers;

