import React from 'react';
import Badge from '../../../components/ui/Badge';
import {
    FileText,
    DollarSign,
    Calendar,
    Users,
    Building,
    Home,
    UserCheck,
    Settings,
} from 'lucide-react';

const LicenseDetailsView = ({ license }) => {
    if (!license) return null;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-surface p-4 rounded-lg border border-color">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-primary">
                            {license.name}
                        </h3>
                        <p className="text-secondary">
                            {license.type} License
                        </p>
                    </div>
                    <Badge
                        color="primary"
                        variant="soft"
                        className="text-sm px-3 py-1"
                    >
                        <Settings className="w-4 h-4 mr-1" />
                        {license.type}
                    </Badge>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* License Information */}
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                        License Information
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-color">
                            <span className="text-secondary font-medium flex items-center">
                                <FileText className="w-4 h-4 mr-2" />
                                Name:
                            </span>
                            <span className="text-primary">{license.name}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-color">
                            <span className="text-secondary font-medium flex items-center">
                                <Settings className="w-4 h-4 mr-2" />
                                Type:
                            </span>
                            <span className="text-primary">{license.type}</span>
                        </div>
                    </div>
                </div>

                {/* Pricing and Duration */}
                <div className="space-y-4">
                    <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                        Pricing and Duration
                    </h4>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-color">
                            <span className="text-secondary font-medium flex items-center">
                                <DollarSign className="w-4 h-4 mr-2" />
                                Price:
                            </span>
                            <span className="text-success font-semibold">
                                ${license.price}
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-color">
                            <span className="text-secondary font-medium flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Duration:
                            </span>
                            <span className="text-primary">
                                {license.duration} months
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Limits Section */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Limits
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-surface p-4 rounded-lg border border-color">
                        <div className="flex items-center space-x-2">
                            <Building className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-secondary">Max Buildings</p>
                                <p className="text-lg font-semibold text-primary">{license.maxBuildings}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-surface p-4 rounded-lg border border-color">
                        <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-secondary">Max Tenants</p>
                                <p className="text-lg font-semibold text-primary">{license.maxTenants}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-surface p-4 rounded-lg border border-color">
                        <div className="flex items-center space-x-2">
                            <UserCheck className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-secondary">Max Managers</p>
                                <p className="text-lg font-semibold text-primary">{license.maxManagers}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-surface p-4 rounded-lg border border-color">
                        <div className="flex items-center space-x-2">
                            <Home className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-secondary">Max Apartments</p>
                                <p className="text-lg font-semibold text-primary">{license.maxApartment}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            {license.features && license.features.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                        Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(license.features)
                            ? license.features.map((feature, index) => (
                                <Badge
                                    key={index}
                                    color="primary"
                                    variant="outline"
                                    className="text-sm"
                                >
                                    {feature}
                                </Badge>
                            ))
                            : license.features.split(',').map((feature, index) => (
                                <Badge
                                    key={index}
                                    color="primary"
                                    variant="outline"
                                    className="text-sm"
                                >
                                    {feature.trim()}
                                </Badge>
                            ))
                        }
                    </div>
                </div>
            )}

            {/* Description Section */}
            {license.description && (
                <div className="space-y-3">
                    <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                        Description
                    </h4>
                    <div className="bg-surface p-4 rounded-lg">
                        <p className="text-secondary leading-relaxed">
                            {license.description}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LicenseDetailsView;
