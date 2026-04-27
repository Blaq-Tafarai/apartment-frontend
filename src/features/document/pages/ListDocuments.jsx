import React, { useState, useMemo } from 'react';
import { Plus, Download, Eye, Grid, List, Trash2, Edit, Trash, Upload } from 'lucide-react';
import Button, { IconButton } from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Input from '../../../components/ui/Input'
import Badge from '../../../components/ui/Badge';
import { useDocuments } from '../hooks/useDocuments';
import useDebounce from '../../../hooks/useDebounce';
import Pagination from '../../../components/ui/Pagination';
import DocumentSummaryCards from '../components/DocumentSummaryCards';
import DocumentGridView from '../components/DocumentGridView';
import Modal from '../../../components/ui/Modal';
import DocumentForm from '../components/DocumentForm';
import { useToast } from '../../../components/ui/Toast';
import DocumentDetailsView from '../components/DocumentDetailsView';
import { useCreateDocument, useUpdateDocument, useDeleteDocument } from '../hooks/useDocuments';
import Tooltip from '../../../components/ui/Tooltip';



const ListDocuments = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const limit = 10;

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Handlers for modal actions
  const handleAddDocument = () => {
    setModalMode('create');
    setCurrentDocument(null);
    setIsFormModalOpen(true);
  };

  const handleEditDocument = (document) => {
    setModalMode('edit');
    setCurrentDocument(document);
    setIsFormModalOpen(true);
  };

  const handleViewDocument = (document) => {
    setCurrentDocument(document);
    setIsViewModalOpen(true);
  };

  const handleDeleteDocument = (document) => {
    setCurrentDocument(document);
    setIsDeleteModalOpen(true);
  };

  //Mutations for crud
  const createDocumentMutation = useCreateDocument()
  const updateDocumentMutation = useUpdateDocument()
  const deleteDocumentMutation = useDeleteDocument()

  //Handlers
  const handleFormSubmit = async (formData) => {
    try {
      if (modalMode === 'create') {
        await createDocumentMutation.mutateAsync(formData);
        toast.success('Success', 'Document created successfully!');
      } else {
        await updateDocumentMutation.mutateAsync({ id: currentDocument.id, payload: formData });
        toast.success('Success', 'Document updated successfully!');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error', 'There was an error processing your request.');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDocumentMutation.mutateAsync(currentDocument.id);
      toast.success('Success', 'Document deleted successfully!');
      setIsDeleteModalOpen(false);
      setCurrentDocument(null);
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Error', 'There was an error deleting the document.');
    }
  };

  // Fetch documents via React Query
  const { data, isLoading, isError } = useDocuments({
    page,
    limit,
    search: debouncedSearch,
  });

  const documents = useMemo(() => data?.data || [], [data]);

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Helper function to get associated entity
  const getAssociatedEntity = (doc) => {
    if (doc.tenant) return `Tenant: ${doc.tenant.name}`;
    if (doc.building) return `Building: ${doc.building.name}`;
    if (doc.apartment) return `Apartment: ${doc.apartment.unitNumber}`;
    return 'N/A';
  };

  const getDocumentTypeColor = (type) => {
    switch (type) {
      case 'lease':
        return 'primary';
      case 'invoice':
        return 'success';
      case 'maintenance':
        return 'warning';
      case 'contract':
        return 'info';
      case 'insurance':
        return 'danger';
      case 'receipt':
        return 'info';
      default:
        return 'gray';
    }
  };

  // Columns definition
  const columns = [
    { header: 'Name', accessor: 'name' },
    {
      header: 'Type',
      accessor: 'type',
      render: row => (
        <Badge
          color={getDocumentTypeColor(row.type)}
          variant="soft"
        >
          {row.type}
        </Badge>
      ),
    },
    {
      header: 'Size',
      accessor: 'fileSize',
      render: row => formatFileSize(row.fileSize),
    },
    {
      header: 'Associated Entity',
      render: row => getAssociatedEntity(row),
    },
    {
      header: 'Uploaded By',
      accessor: 'uploadedByUser.name',
      render: row => row.uploadedByUser?.name || 'N/A',
    },
    {
      header: 'Upload Date',
      render: row => new Date(row.id * 1000).toLocaleDateString(), // Mock date based on ID
    },
    {
      header: 'Actions',
      render: row => (
        <div className="flex space-x-2">
          <Button variant="primary" size="xs" leftIcon={<Download size={12} />} aria-label="Download">
            Download
          </Button>

          <Tooltip content="View Details" position="top">
            <IconButton icon={<Eye size={16} />} variant="success" aria-label="View Details" size="xs" onClick={() => handleViewDocument(row)} />
          </Tooltip>

          <Tooltip content="Edit Document" position="top">
            <IconButton icon={<Edit size={16} />} variant="warning" aria-label="Edit Document" size="xs" onClick={() => handleEditDocument(row)} />
          </Tooltip>

          <Tooltip content="Delete Document" position="top">
            <IconButton icon={<Trash size={16} />} variant="danger" aria-label="Delete Document" size="xs" onClick={() => handleDeleteDocument(row)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-primary">Loading documents...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load documents.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Documents</h1>
          <p className="text-text-secondary mt-1">Manage property documents and files</p>
        </div>
        <Button variant="primary" leftIcon={<Upload size={16} />} aria-label="Upload Document" onClick={handleAddDocument}>
          Upload Document
        </Button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />
      </div>

      {/* Summary Cards */}
      <DocumentSummaryCards documents={documents} />

      {/* View Toggle Buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'table' ? 'primary' : 'outline'}
            size="sm"
            leftIcon={<List size={16} />}
            onClick={() => setViewMode('table')}
          >
            Table View
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            leftIcon={<Grid size={16} />}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </Button>
        </div>
      </div>

      {/* Documents Display */}
      <div className="card">
        {viewMode === 'table' ? (
          <>
            <Table
              columns={columns}
              data={documents}
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
          </>
        ) : (
          <>
            <DocumentGridView
              documents={documents}
              formatFileSize={formatFileSize}
              getAssociatedEntity={getAssociatedEntity}
              getDocumentTypeColor={getDocumentTypeColor}
              handleEditDocument={handleEditDocument}
              handleViewDocument={handleViewDocument}
              handleDeleteDocument={handleDeleteDocument}
            />

            {/* Pagination for Grid View */}
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={data?.totalPages || 1}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>

      {/* Modals for Create/Edit/View/Delete */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={modalMode === 'create' ? 'Create Document' : 'Edit Document'}
        size="3xl"
        footer={
          <>
            <Button aria-label="Cancel" variant="secondary" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button aria-label="Submit" type="submit" form="document-form" variant="primary" onClick={handleFormSubmit}>
              {modalMode === 'create' ? 'Create' : 'Update'}
            </Button>
          </>
        }
      >
        <DocumentForm
          defaultValues={ modalMode === 'edit' ? currentDocument : null }
          mode={modalMode}
          onClose={() => setIsFormModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="View Document"
        size="3xl"
      >
        <DocumentDetailsView
          document={currentDocument}
          formatFileSize={formatFileSize}
          getAssociatedEntity={getAssociatedEntity}
          getDocumentTypeColor={getDocumentTypeColor}
          onClose={() => setIsViewModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Document"
        size="sm"
        footer={
          <>
            <Button aria-label="Cancel" variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button aria-label="Delete" variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this document?</p>
      </Modal>
    
    </div>
  );
};

export default ListDocuments;
