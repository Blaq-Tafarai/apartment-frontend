import React from 'react';
import Badge from '../../../components/ui/Badge';

const DocumentDetailsView = ({ document, getDocumentTypeColor, formatFileSize, getAssociatedEntity }) => {
  if (!document) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-surface p-4 rounded-lg border border-color">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-primary">
              {document.name}
            </h3>
            <p className="text-secondary">
              {getAssociatedEntity(document)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              color={getDocumentTypeColor(document.type)}
              variant="soft"
              className="text-sm px-3 py-1 capitalize"
            >
              {document.type}
            </Badge>
            {document.isPublic && (
              <Badge
                color="success"
                variant="soft"
                className="text-sm px-3 py-1"
              >
                Public
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Document Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            File Details
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">File Name:</span>
              <span className="text-primary">{document.originalFileName || document.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">File Size:</span>
              <span className="text-primary">{formatFileSize(document.fileSize)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">File Type:</span>
              <span className="text-primary">{document.mimeType || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Uploaded By:</span>
              <span className="text-primary">{document.uploadedByUser?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Upload Date:</span>
              <span className="text-primary">{new Date(document.id * 1000).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Association Details */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Association Details
          </h4>
          <div className="space-y-3">
            {document.tenant && (
              <div className="flex justify-between items-center py-2 border-b border-color">
                <span className="text-secondary font-medium">Tenant:</span>
                <span className="text-primary">{document.tenant.name}</span>
              </div>
            )}
            {document.building && (
              <div className="flex justify-between items-center py-2 border-b border-color">
                <span className="text-secondary font-medium">Building:</span>
                <span className="text-primary">{document.building.name}</span>
              </div>
            )}
            {document.apartment && (
              <div className="flex justify-between items-center py-2 border-b border-color">
                <span className="text-secondary font-medium">Apartment:</span>
                <span className="text-primary">{document.apartment.unitNumber}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Public Access:</span>
              <span className={`font-medium ${document.isPublic ? 'text-success' : 'text-danger'}`}>
                {document.isPublic ? 'Yes' : 'No'}
              </span>
            </div>
            {document.expiresAt && (
              <div className="flex justify-between items-center py-2 border-b border-color">
                <span className="text-secondary font-medium">Expires:</span>
                <span className="text-primary">{formatDate(document.expiresAt)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {document.description && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Description
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <p className="text-secondary leading-relaxed whitespace-pre-wrap">
              {document.description}
            </p>
          </div>
        </div>
      )}

      {/* Tags */}
      {document.tags && document.tags.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {document.tags.map((tag, index) => (
              <Badge
                key={index}
                color="primary"
                variant="outline"
                className="text-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Download Section */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
          Actions
        </h4>
        <div className="bg-surface p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary">Download this document</p>
              <p className="text-xs text-gray-500 mt-1">
                File will be downloaded to your device
              </p>
            </div>
            <a
              href={document.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailsView;
