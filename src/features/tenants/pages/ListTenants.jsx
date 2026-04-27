import useDebounce from "../../../hooks/useDebounce";
import Table from "../../../components/ui/Table";
import Badge from "../../../components/ui/Badge";
import Tooltip from "../../../components/ui/Tooltip";
import Modal from "../../../components/ui/Modal";
import {
  useTenants,
  useCreateTenant,
  useUpdateTenant,
  useDeleteTenant,
} from "../hooks/useTenants";
import { useState, useMemo } from "react";
import { Edit2, EyeIcon, Plus, Trash } from "lucide-react";
import Button, { IconButton } from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Pagination from "../../../components/ui/Pagination";
import TenantSummaryCards from "../components/TenantSummaryCards";
import TenantForm from "../components/TenantForm";
import TenantDetailsView from "../components/TenantDetailsView";
import { useToast } from "../../../components/ui/Toast";

const ListTenants = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 10;

  //Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(null);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'

  // Handlers for modal actions
  const handleAddTenant = () => {
    setModalMode("add");
    setCurrentTenant(null);
    setIsFormModalOpen(true);
  };

  const handleEditTenant = (tenant) => {
    setModalMode("edit");
    setCurrentTenant(tenant);
    setIsFormModalOpen(true);
  };

  const handleDeleteTenant = (tenant) => {
    setCurrentTenant(tenant);
    setIsDeleteModalOpen(true);
  };

  const handleViewTenant = (tenant) => {
    setCurrentTenant(tenant);
    setIsViewModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === "add") {
        await createTenantMutation.mutateAsync(formData);
        // Show success toast
        toast.success('Success', 'Tenant created successfully!');
      } else {
        await updateTenantMutation.mutateAsync({
          id: currentTenant.id,
          payload: formData,
        });
        // Show success toast
        toast.success('Success', 'Tenant updated successfully!');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      // Show error toast
      toast.error('Error', 'Failed to save tenant. Please try again.');
      console.error("Error submitting form:", error);
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteTenantMutation.mutateAsync(currentTenant.id);
      // Show success toast
      toast.success('Success', 'Tenant deleted successfully!');
      setIsDeleteModalOpen(false);
    } catch (error) {
      // Show error toast
      toast.error('Error', 'Failed to delete tenant. Please try again.');
      console.error("Error deleting tenant:", error);
    }
  }

  //Fetch tenants using debounced search term
  const { data: tenantsData, isLoading, isError } = useTenants({
    search: debouncedSearch,
    page,
    limit,
  });

  //Mutations for crud
  const createTenantMutation = useCreateTenant();
  const updateTenantMutation = useUpdateTenant();
  const deleteTenantMutation = useDeleteTenant();

  const tenants = useMemo(() => tenantsData?.data || [], [tenantsData]);

  const statusColors = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      default:
        return "warning";
    }
  }


  const columns = [
    {
      header: "Name",
      accessor: "user.name",
      render: (row) => row.user?.name || 'N/A',
    },
    {
      header: "Email",
      accessor: "user.email",
      render: (row) => row.user?.email || 'N/A',
    },
    {
      header: "Phone",
      accessor: "user.phone",
      render: (row) => row.user?.phone || 'N/A',
    },
    {
      header: "Apartment",
      accessor: "apartment.unitNumber",
      render: (row) => row.apartment?.unitNumber || 'N/A',
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <Badge
          color={statusColors(row.user.status)}
          variant="soft"
          dot
        >
          {row.user.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex items-center gap-2">
        <Tooltip content="View Tenant" position="top">
          <IconButton icon={<EyeIcon size={16} />} variant="success" aria-label="View Tenant" size="xs" onClick={() => handleViewTenant(row)} />
        </Tooltip>
          <Tooltip content="Edit Tenant" position="top">
            <IconButton icon={<Edit2 size={16} />} variant="warning" aria-label="Edit Tenant" size="xs" onClick={() => handleEditTenant(row)} />
          </Tooltip>
          <Tooltip content="Delete Tenant" position="top">
            <IconButton icon={<Trash size={16} />} variant="danger" aria-label="Delete Tenant" size="xs" onClick={() => handleDeleteTenant(row)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">
          Loading Tenants...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load tenants.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Tenants</h1>
            <p className="text-text-secondary mt-1">
              Manage all tenants in your apartment complex.
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus size={20} />}
            onClick={handleAddTenant}
          >
            Add Tenant
          </Button>
        </div>

        {/* Search input */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full md:w-1/3"
          />
        </div>

        {/* Summary Cards */}
        <TenantSummaryCards tenants={tenants} />

        {/* Tenants Table */}
        <div className="card">
          <Table
            columns={columns}
            data={tenants}
            pagination={{
              currentPage: page,
              totalPages: tenantsData?.meta?.totalPages || 1,
              totalItems: tenantsData?.meta?.total || 0,
              itemsPerPage: limit,
              onPageChange: setPage,
            }}
          />

          {/* Pagination */}
          <div className="mt-4 flex justify-end">
            <Pagination
              currentPage={page}
              totalPages={tenantsData?.meta?.totalPages || 1}
              totalItems={tenantsData?.meta?.total || 0}
              itemsPerPage={limit}
              onPageChange={setPage}
            />
          </div>
        </div>

        {/* Add Tenant Modal */}
        <Modal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          title={modalMode === "add" ? "Add Tenant" : "Edit Tenant"}
          size="3xl"
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => setIsFormModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                form="tenant-form"
                type="submit"
              >
                {modalMode === "add" ? "Create Tenant" : "Update Tenant"}
              </Button>
            </>
          }
        >
          {/* Tenant Form Component goes here */}
          <TenantForm
            defaultValues={ modalMode === 'edit' ? currentTenant : null }
            mode={modalMode}
            onSubmit={handleFormSubmit}
          />
        </Modal>

        {/* View Tenant Modal */}
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title="Tenant Details"
          size="2xl"
        >
          {/* Tenant Details Component goes here */}
          <TenantDetailsView
            tenant={currentTenant}
            statusColors={statusColors}
          />
        </Modal>

        {/* Delete Tenant Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirm Delete"
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          loading={deleteTenantMutation.isLoading}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleteModalOpen(false)}
          confirmDisabled={deleteTenantMutation.isLoading}
          cancelDisabled={deleteTenantMutation.isLoading}
          confirmLoading={deleteTenantMutation.isLoading}
          cancelLoading={deleteTenantMutation.isLoading}
          confirmLoadingText="Deleting..."
          cancelLoadingText="Canceling..."
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={deleteTenantMutation.isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteConfirm}
                disabled={deleteTenantMutation.isLoading}
              >
                {deleteTenantMutation.isLoading ? 'Deleting...' : 'Delete'}
              </Button>
            </>
          }
        >
          <div className="p-4">
            <p>Are you sure you want to delete this {currentTenant?.name}?</p>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ListTenants;
