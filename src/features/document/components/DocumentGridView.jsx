import React from 'react';
import { Download, Eye, Edit, Trash2 } from 'lucide-react';
import { IconButton } from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Tooltip from '../../../components/ui/Tooltip';

const DocumentGridView = ({
  documents,
  formatFileSize,
  getAssociatedEntity,
  getDocumentTypeColor,
  onDownloadDocument,
  handleEditDocument,
  handleViewDocument,
  handleDeleteDocument
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {documents.map((doc) => (
        <div key={doc.id} className="bg-surface p-4 rounded-lg border border-color hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-primary truncate" title={doc.name}>
                {doc.name}
              </h3>
              <p className="text-xs text-secondary mt-1">
                {formatFileSize(doc.fileSize)}
              </p>
            </div>
            <Badge
              color={getDocumentTypeColor(doc.type)}
              variant="soft"
              className="text-xs px-2 py-1 ml-2 flex-shrink-0"
            >
              {doc.type}
            </Badge>
          </div>

          <div className="space-y-2 mb-4">
            <div className="text-xs text-secondary">
              <span className="font-medium">Associated:</span>
              <p className="truncate" title={getAssociatedEntity(doc)}>
                {getAssociatedEntity(doc)}
              </p>
            </div>
            <div className="text-xs text-secondary">
              <span className="font-medium">Uploaded:</span>
              <p>{new Date(doc.createdAt || doc.id * 1000).toLocaleDateString()}</p>
            </div>
            {doc.isPublic && (
              <Badge color="green" variant="outline" className="text-xs">
                Public
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              <Tooltip content="View Details" position="top">
                <IconButton
                  icon={<Eye size={16} />}
                  variant="success"
                  aria-label="View Details"
                  size="xs"
                  onClick={() => handleViewDocument(doc)}
                />
              </Tooltip>

              <Tooltip content="Download" position="top">
                <IconButton
                  icon={<Download size={16} />}
                  variant="primary"
                  aria-label="Download"
                  size="xs"
                  onClick={() => onDownloadDocument(doc)}
                />
              </Tooltip>

              <Tooltip content="Edit Document" position="top">
                <IconButton
                  icon={<Edit size={16} />}
                  variant="warning"
                  aria-label="Edit Document"
                  size="xs"
                  onClick={() => handleEditDocument(doc)}
                />
              </Tooltip>

              <Tooltip content="Delete Document" position="top">
                <IconButton
                  icon={<Trash2 size={16} />}
                  variant="danger"
                  aria-label="Delete Document"
                  size="xs"
                  onClick={() => handleDeleteDocument(doc)}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentGridView;
