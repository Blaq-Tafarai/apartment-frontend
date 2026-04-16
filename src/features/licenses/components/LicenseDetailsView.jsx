import React from 'react';
import Badge from '../../../components/ui/Badge';
import {
    Users,
    Building,
    Home,
    FileCheck,
    Database,
    Code,
    Calendar,
} from 'lucide-react';

const LicenseDetailsView = ({ license }) => {
    if (!license) return null;

    const isExpired = new Date(license.expiresAt) < new Date();
    const formatUnlimited = (num) => num === -1 ? '∞' : num;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-surface p-6 rounded-xl border border-color shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-primary">
                            License Details
                        </h3>
                        <div className="mt-1 space-y-1">
                            <div className="text-sm text-secondary">
                                Organization: {license.organization.name}
                            </div>
                            <div className="text-sm text-secondary">
                                Subscription: {license.subscription.planName}
                            </div>
                            <div className="text-sm text-secondary">
                                Billing Cycle: {license.subscription.billingCycle}
                            </div>
                            <div className="text-sm text-secondary">
                                Created: {new Date(license.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                    <Badge
                        color={isExpired ? "danger" : "success"}
                        variant="solid"
                        className="px-4 py-2 font-medium"
                    >
                        {isExpired ? "Expired" : "Active"}
                    </Badge>
                </div>
            </div>

            {/* Limits Section */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Usage Limits
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-surface p-6 rounded-lg border border-color hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-secondary font-medium">Max Users</p>
                                <p className="text-2xl font-bold text-primary">{formatUnlimited(license.maxUsers)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-surface p-6 rounded-lg border border-color hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <Building className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-secondary font-medium">Max Buildings</p>
                                <p className="text-2xl font-bold text-primary">{formatUnlimited(license.maxBuildings)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-surface p-6 rounded-lg border border-color hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Home className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-secondary font-medium">Max Apartments</p>
                                <p className="text-2xl font-bold text-primary">{formatUnlimited(license.maxApartments)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-lg border ${license.features.reportExports ? 'border-success bg-success/5' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${license.features.reportExports ? 'bg-success text-white' : 'bg-gray-200 text-gray-500'}`}>
                                <FileCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium text-primary">Report Exports</p>
                                <p className={`text-sm font-medium ${license.features.reportExports ? 'text-success' : 'text-gray-500'}`}>
                                    {license.features.reportExports ? 'Enabled' : 'Disabled'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={`p-4 rounded-lg border ${license.features.cloudStorage ? 'border-info bg-info/5' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${license.features.cloudStorage ? 'bg-info text-white' : 'bg-gray-200 text-gray-500'}`}>
                                <Database className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium text-primary">Cloud Storage</p>
                                <p className={`text-sm font-medium ${license.features.cloudStorage ? 'text-info' : 'text-gray-500'}`}>
                                    {license.features.cloudStorage ? 'Enabled' : 'Disabled'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={`p-4 rounded-lg border ${license.features.apiAccess ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${license.features.apiAccess ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                                <Code className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium text-primary">API Access</p>
                                <p className={`text-sm font-medium ${license.features.apiAccess ? 'text-primary' : 'text-gray-500'}`}>
                                    {license.features.apiAccess ? 'Enabled' : 'Disabled'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expiration Section */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Expiration
                </h4>
                <div className="bg-surface p-6 rounded-lg border border-color">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="text-sm text-secondary mb-1">Expires At</p>
                            <p className="text-2xl font-bold text-primary">
                                {new Date(license.expiresAt).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </p>
                            <p className="text-sm text-secondary mt-1">
                                {new Date(license.expiresAt).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <div className="flex-1 md:w-auto md:flex-shrink-0">
                            <div className="flex items-center justify-center h-20">
                                <div className={`px-6 py-3 rounded-full text-lg font-semibold ${
                                    isExpired 
                                        ? 'bg-danger/10 text-danger border border-danger/20' 
                                        : 'bg-success/10 text-success border border-success/20'
                                }`}>
                                    {isExpired ? 'Expired' : `${Math.ceil((new Date(license.expiresAt) - new Date()) / (1000 * 60 * 60 * 24))} days left`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LicenseDetailsView;
