import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import DatePicker from "../../../components/ui/DatePicker";
import {
    Building,
    User,
    Home,
    Wrench,
    AlertTriangle,
    Calendar,
    DollarSign,
    FileText,
    UserCheck,
} from "lucide-react";
import React from "react";
import { useTenants } from "../../tenants/hooks/useTenants";
import { useApartments } from "../../apartment/hooks/useApartments";
import { useUsers } from "../../users/hooks/useUsers";
import { maintenanceSchema } from "../validation/maintenance.schema";

const MaintenanceForm = ({ defaultValues, onSubmit, modalMode }) => {
    const tenantsQuery = useTenants({ page: 1, limit: 100 });
    const apartmentsQuery = useApartments({ page: 1, limit: 100 });
    const usersQuery = useUsers({ page: 1, limit: 100 });

    const tenants = tenantsQuery.data?.data || [];
    const apartments = apartmentsQuery.data?.data || [];
    const users = usersQuery.data?.data || [];

    const tenantOptions = tenants.map(tenant => ({
        value: tenant.id,
        label: tenant?.user?.name
    }));

    const apartmentOptions = apartments.map(apartment => ({
        value: apartment.id,
        label: apartment.unitNumber
    }));

    const userOptions = users.map(user => ({
        value: user.id,
        label: user.name
    }));

const normalizedDefaultValues = React.useMemo(() => ({
        ...defaultValues,
        assignedTo: defaultValues?.assignedManagerId || defaultValues?.assignedManager?.id || defaultValues?.assignedTo || '',
    }), [defaultValues]);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(maintenanceSchema),
        defaultValues: normalizedDefaultValues,
    });

    // Reset form when defaultValues change
    React.useEffect(() => {
        reset(normalizedDefaultValues);
    }, [normalizedDefaultValues, reset]);

    return (
        <form id="maintenance-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Location Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Location Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Tenant Select */}
                    <Controller
                        name="tenantId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Tenant"
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value || '')}
                                options={tenantOptions}
                                loading={tenantsQuery.isLoading}
                                error={errors.tenantId?.message}
                                placeholder="Select a tenant"
                                leftIcon={<User className="w-4 h-4" />}
                            />
                        )}
                    />

                    {/* Apartment Select */}
                    <Controller
                        name="apartmentId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Apartment"
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value || '')}
                                options={apartmentOptions}
                                loading={apartmentsQuery.isLoading}
                                error={errors.apartmentId?.message}
                                placeholder="Select an apartment"
                                leftIcon={<Home className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Maintenance Details */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Maintenance Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category */}
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Category"
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value || '')}
                                options={[
                                    { value: 'electrical', label: 'Electrical' },
                                    { value: 'hvac', label: 'HVAC' },
                                    { value: 'plumbing', label: 'Plumbing' },
                                    { value: 'appliances', label: 'Appliances' },
                                    { value: 'structural', label: 'Structural' },
                                    { value: 'general', label: 'General' },
                                ]}
                                error={errors.category?.message}
                            />
                        )}
                    />

                    {/* Priority */}
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Priority"
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value || '')}
                                options={[
                                    { value: 'low', label: 'Low' },
                                    { value: 'medium', label: 'Medium' },
                                    { value: 'high', label: 'High' },
                                    { value: 'urgent', label: 'Urgent' },
                                ]}
                                error={errors.priority?.message}
                                leftIcon={<AlertTriangle className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>

                {/* Status */}
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Status"
                            value={field.value || ''}
                            onChange={(value) => field.onChange(value || '')}
                            options={[
                                { value: 'open', label: 'Open' },
                                { value: 'in_progress', label: 'In Progress' },
                                { value: 'completed', label: 'Completed' },
                                { value: 'resolved', label: 'Resolved' },
                            ]}
                            error={errors.status?.message}
                        />
                    )}
                />

                {/* Assigned To */}
                <Controller
                    name="assignedTo"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Assigned Manager"
                            value={field.value || ''}
                            onChange={(value) => field.onChange(value || '')}
                            options={userOptions}
                            loading={usersQuery.isLoading}
                            error={errors.assignedTo?.message}
                            placeholder="Select manager (optional)"
                            leftIcon={<UserCheck className="w-4 h-4" />}
                        />
                    )}
                />

                {/* Description */}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextArea
                            label="Detailed Description"
                            value={field.value || ''}
                            onChange={field.onChange}
                            error={errors.description?.message}
                            rows={4}
                            placeholder="Provide detailed description of the maintenance issue..."
                        />
                    )}
                />
            </div>

            {/* Dates */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Dates
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Completed At */}
                    <Controller
                        name="completedAt"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Completed Date"
                                value={field.value ? new Date(field.value) : null}
                                onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : null)}
                                error={errors.completedAt?.message}
                                leftIcon={<Calendar className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Cost Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Estimated Cost */}
                    <Controller
                        name="estimatedCost"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Estimated Cost"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target?.value ?? e)}
                                error={errors.estimatedCost?.message}
                                leftIcon={<DollarSign className="w-4 h-4" />}
                                placeholder="e.g., 250"
                                min={0}
                                max={100000}
                                step={1}
                            />
                        )}
                    />

                    {/* Actual Cost */}
                    <Controller
                        name="actualCost"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Actual Cost"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target?.value ?? e)}
                                error={errors.actualCost?.message}
                                leftIcon={<DollarSign className="w-4 h-4" />}
                                placeholder="e.g., 200"
                                min={0}
                                max={100000}
                                step={1}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Notes */}
            <Controller
                name="note"
                control={control}
                render={({ field }) => (
                    <TextArea
                        label="Additional Notes"
                        value={field.value || ''}
                        onChange={field.onChange}
                        error={errors.notes?.message}
                        rows={3}
                        placeholder="Any additional note..."
                    />
                )}
            />
        </form>
    );
};

export default MaintenanceForm;

