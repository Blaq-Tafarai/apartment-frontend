import React, { useState, useMemo } from 'react';
import { Plus, Eye, Edit2, Trash2, Search, Filter } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Pagination from '../../../components/ui/Pagination';
import Badge from '../../../components/ui/Badge';
import Modal from '../../../components/ui/Modal';
import Tooltip from '../../../components/ui/Tooltip';
import { useAllUsers, useUserStats, useCreateUser, useUpdateUser, useDeleteUser } from '../hooks/useUsers';
import useDebounce from '../../../hooks/useDebounce';
import UserForm from '../components/UserForm';
import { useToast } from '../../../components/ui/Toast';

const ListAllUsers = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentUser, setCurrentUser] = useState(null);

  // Filter states
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch users
  const { data: usersData, isLoading } = useAllUsers({
    page,
    limit,
    search: debouncedSearch,
  });

  const stats = useUserStats();

  // Mutations
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const users = useMemo(() => usersData?.data?.data || [], [usersData]);
  const totalPages = usersData?.data?.totalPages || 1;

  // Handlers
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
    setCurrentUser(user);
    setIsViewModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setCurrentUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === 'add') {
        await createUserMutation.mutateAsync(formData);
        toast.success('User created successfully');
      } else {
        await updateUserMutation.mutateAsync({ id: currentUser.id, ...formData });
        toast.success('User updated successfully');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUserMutation.mutateAsync(currentUser.id);
      toast.success('User deleted successfully');
      setIsDeleteModalOpen(false);
      setCurrentUser(null);
    } catch (error) {
      toast.error('Failed to delete user. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      case 'trial':
        return 'warning';
      default:
        return 'gray';
    }
  };

  const getRoleColor = (role) => {
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

  // Columns definition
  const columns = [
    { header: 'Name', accessor: 'name', render: row => row.name },
    { header: 'Email', accessor: 'email', render: row => row.email },
    { header: 'Company', accessor: 'company', render: row => row.company },
    {
      header: 'Role',
      accessor: 'role',
      render: row => (
        <Badge color={getRoleColor(row.role)} variant="soft" capitalize>
          {row.role}
        </Badge>
      ),
    },
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
      header: 'Last Login', 
      accessor: 'lastLogin', 
      render: row => row.lastLogin ? new Date(row.lastLogin).toLocaleDateString() : 'Never' 
    },
    {
      header: 'Actions',
      render: row => (
        <div className="flex gap-2">
          <Tooltip content="View User" position="top">
            <IconButton icon={<Eye size={14} />} variant="primary" size="xs" onClick={() => handleViewUser(row)} />
          </Tooltip>
          <Tooltip content="Edit User" position="top">
            <IconButton icon={<Edit2 size={14} />} variant="info" size="xs" onClick={() => handleEditUser(row)} />
          </Tooltip>
          <Tooltip content="Delete User" position="top">
            <IconButton icon={<Trash2 size={14} />} variant="danger" size="xs" onClick={() => handleDeleteUser(row)} />
          </Tooltip>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">User Management</h1>
          <p className="text-text-secondary mt-1">Manage users across all companies</p>
        </div>
        <Button variant="primary" leftIcon={<Plus size={16} />} onClick={handleAddUser}>
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-text-secondary text-sm">Total Users</p>
          <p className="text-2xl font-bold text-text-primary">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-text-secondary text-sm">Active</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="card">
          <p className="text-text-secondary text-sm">Inactive</p>
          <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
        </div>
        <div className="card">
          <p className="text-text-secondary text-sm">Trial</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.trial}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
          <Select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="tenant">Tenant</option>
          </Select>
          <Select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="trial">Trial</option>
          </Select>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <Table
          columns={columns}
          data={users}
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

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'add' ? 'Add New User' : 'Edit User'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" form="user-form" type="submit">
              {modalMode === 'add' ? 'Create User' : 'Update User'}
            </Button>
          </>
        }
      >
        <UserForm
          defaultValues={currentUser}
          mode={modalMode}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      {/* View User Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="User Details"
        size="lg"
      >
        {currentUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-secondary">Name</p>
                <p className="font-medium text-text-primary">{currentUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Email</p>
                <p className="font-medium text-text-primary">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Company</p>
                <p className="font-medium text-text-primary">{currentUser.company}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Role</p>
                <Badge color={getRoleColor(currentUser.role)} variant="soft" capitalize>
                  {currentUser.role}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Status</p>
                <Badge color={getStatusColor(currentUser.status)} variant="soft" dot>
                  {currentUser.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Created At</p>
                <p className="font-medium text-text-primary">{new Date(currentUser.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Last Login</p>
                <p className="font-medium text-text-primary">
                  {currentUser.lastLogin ? new Date(currentUser.lastLogin).toLocaleString() : 'Never'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
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
        <p>Are you sure you want to delete user <strong>{currentUser?.name}</strong>?</p>
      </Modal>
    </div>
  );
};

export default ListAllUsers;

