import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Checkbox from "../../../components/ui/Checkbox";
import DatePicker from "../../../components/ui/DatePicker";
import Button from "../../../components/ui/Button";
import {
    Users,
    Building,
    Home,
    FileCheck,
    Database,
    Code,
    Calendar,
    Building2,
} from "lucide-react";
import { useCompanies } from "../../companies/hooks/useCompanies";
import { useSubscriptions } from "../../subscriptions/hooks/useSubscriptions";

import { licenseSchema } from "../validation/license.schema.js";

const LicenseForm = ({ defaultValues, onSubmit, modalMode }) => {
    const companiesQuery = useCompanies({ page: 1, limit: 100 });
    const subscriptionsQuery = useSubscriptions({ page: 1, limit: 100 });

    const companies = companiesQuery.data?.data || [];
    const subscriptions = subscriptionsQuery.data?.data || [];

    const organizationOptions = companies.map(company => ({
        value: company.id,
        label: company.name
    }));

    const subscriptionOptions = subscriptions.map(subscription => ({
        value: subscription.id,
        label: subscription.planName || subscription.id
    }));

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(licenseSchema),
        defaultValues,
    });

    return (
        <form id="license-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* License Assignment */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Assignment
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Controller
                        name="organizationId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Organization"
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value || '')}
                                options={organizationOptions}
                                placeholder="Select organization"
                                loading={companiesQuery.isLoading}
                                error={errors.organizationId?.message}
                                leftIcon={<FileCheck className="w-4 h-4" />}
                            />
                        )}
                    />
                    <Controller
                        name="subscriptionId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Subscription"
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value || '')}
                                options={subscriptionOptions}
                                placeholder="Select subscription"
                                loading={subscriptionsQuery.isLoading}
                                error={errors.subscriptionId?.message}
                                leftIcon={<FileCheck className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Limits */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Usage Limits (-1 = unlimited)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Controller
                        name="maxUsers"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Max Users"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target?.value ?? e)}
                                error={errors.maxUsers?.message}
                                leftIcon={<Users className="w-4 h-4" />}
                                placeholder="1"
                                min={1}
                            />
                        )}
                    />
                    <Controller
                        name="maxBuildings"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Max Buildings"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target?.value ?? e)}
                                error={errors.maxBuildings?.message}
                                leftIcon={<Building className="w-4 h-4" />}
                                placeholder="1"
                                min={1}
                            />
                        )}
                    />
                    <Controller
                        name="maxApartments"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Max Apartments"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target?.value ?? e)}
                                error={errors.maxApartments?.message}
                                leftIcon={<Home className="w-4 h-4" />}
                                placeholder="1"
                                min={1}
                                step={1}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Features
                </h4>
                <div className="space-y-3">
                    <Controller
                        name="features.reportExports"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                label="Report Exports"
                                checked={field.value}
                                onChange={(checked) => field.onChange(checked)}
                                leftIcon={<FileCheck className="w-4 h-4" />}
                            />
                        )}
                    />
                    <Controller
                        name="features.cloudStorage"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                label="Cloud Storage"
                                checked={field.value}
                                onChange={(checked) => field.onChange(checked)}
                                leftIcon={<FileCheck className="w-4 h-4" />}
                            />
                        )}
                    />
                    <Controller
                        name="features.apiAccess"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                label="API Access"
                                checked={field.value}
                                onChange={(checked) => field.onChange(checked)}
                                leftIcon={<Code className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Expiration */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Expiration
                </h4>
                <Controller
                    name="expiresAt"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            label="Expires At"
                            value={field.value}
                            onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                            error={errors.expiresAt?.message}
                            leftIcon={<Calendar className="w-4 h-4" />}
                        />
                    )}
                />
            </div>
        </form>
    );
};

export default LicenseForm;
