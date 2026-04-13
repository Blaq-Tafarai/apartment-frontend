import React from 'react';
import Badge from '../../../components/ui/Badge';

const ApartmentDetailsView = ({ apartment, statusColors }) => {
  if (!apartment) return null;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-surface p-4 rounded-lg border border-color">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-primary">
              {apartment.unit}
            </h3>
            <p className="text-secondary">
              {apartment.building?.name || 'N/A'}
            </p>
          </div>
          <Badge
            color={statusColors(apartment.status.toLowerCase())}
            variant="soft"
            className="text-sm px-3 py-1"
          >
            {apartment.status}
          </Badge>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Basic Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Bedrooms:</span>
              <span className="text-primary">{apartment.bedrooms}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Bathrooms:</span>
              <span className="text-primary">{apartment.bathrooms}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Floor:</span>
              <span className="text-primary">{apartment.floor}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Sqft:</span>
              <span className="text-primary">{apartment.sqft} sqft</span>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Financial Information
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Monthly Rent:</span>
              <span className="text-success font-semibold">
                ${apartment.rent}/month
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-color">
              <span className="text-secondary font-medium">Tenant:</span>
              <span className="text-primary">
                {apartment.tenant?.name || 'Vacant'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      {apartment.amenities && apartment.amenities.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Amenities
          </h4>
          <div className="flex flex-wrap gap-2">
            {apartment.amenities.map((amenity, index) => (
              <Badge
                key={index}
                color="primary"
                variant="outline"
                className="text-sm"
              >
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Description Section */}
      {apartment.description && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
            Description
          </h4>
          <div className="bg-surface p-4 rounded-lg">
            <p className="text-secondary leading-relaxed">
              {apartment.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApartmentDetailsView;
