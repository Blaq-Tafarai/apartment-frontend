import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import DatePicker from "../../../components/ui/DatePicker";
import {
    User,
    Building,
    Home,
    Calendar,
    DollarSign,
    FileText,
    Hash,
} from "lucide-react";

import { invoiceSchema } from "../validation/invoice.schema";
import { useTenants } from "../../tenants/hooks/index";
import { useLeases } from "../../lease/hooks/useLeases";

const InvoiceForm = ({ defaultValues, onSubmit, modalMode }) => {
    const tenantsQuery = useTenants({ page: 1, limit: 100 });
    const leasesQuery = useLeases({ page: 1, limit: 100 });

    const tenants = tenantsQuery.data?.data || [];
    const leases = leasesQuery.data?.data || [];

    const tenantOptions = tenants.map((tenant) => ({
        value: tenant.id,
        label: tenant?.user?.name || "Unknown Tenant",
    }));

    const leaseOptions = leases.map((lease) => ({
        value: lease.id,
        label: lease?.apartment?.unitNumber || "Unknown Lease",
    }));

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(invoiceSchema),
        defaultValues,
    });

    // Reset form when defaultValues change
    React.useEffect(() => {
        reset(defaultValues || {});
    }, [defaultValues, reset]);

    return (
        <form id="invoice-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Property Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Property Information
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
                                searchable
                                onChange={(value) => field.onChange(value || '')}
                                options={tenantOptions}
                                loading={tenantsQuery.isLoading}
                                error={errors.tenantId?.message}
                                placeholder="Select a tenant"
                                leftIcon={<User className="w-4 h-4" />}
                            />
                        )}
                    />

                    {/* Lease Select */}
                    <Controller
                        name="leaseId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Lease"
                                value={field.value || ''}
                                searchable
                                onChange={(value) => field.onChange(value || '')}
                                options={leaseOptions}
                                loading={leasesQuery.isLoading}
                                error={errors.leaseId?.message}
                                placeholder="Select a lease"
                            />
                        )}
                    />
                </div>
            </div>

            {/* Invoice Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Invoice Information
                </h4>
                <div className="grid grid-cols-1 gap-4">

                    {/* Amount */}
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Amount"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target?.value ?? e)}
                                error={errors.amount?.message}
                                leftIcon={<DollarSign className="w-4 h-4" />}
                                placeholder="e.g., 1200.00"
                                min={0.01}
                                step={0.01}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Dates and Status */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Dates & Status
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Issue Date */}
                    <Controller
                        name="issueDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Issue Date"
                                value={field.value ? new Date(field.value) : null}
                                onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : null)}
                                error={errors.issueDate?.message}
                                placeholder="Select issue date"
                                clearable
                            />
                        )}
                    />

                    {/* Due Date */}
                    <Controller
                        name="dueDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Due Date"
                                value={field.value ? new Date(field.value) : null}
                                onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : null)}
                                error={errors.dueDate?.message}
                                placeholder="Select due date"
                                clearable
                            />
                        )}
                    />

                    {/* Status */}
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Status"
                                value={field.value}
                                onChange={field.onChange}
                                options={[
                                    { value: "pending", label: "Pending" },
                                    { value: "paid", label: "Paid" },
                                    { value: "overdue", label: "Overdue" },
                                    { value: "cancelled", label: "Cancelled" },
                                ]}
                                error={errors.status?.message}
                                placeholder="Select status"
                                leftIcon={<FileText className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Description */}
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextArea
                        label="Description"
                        value={field.value || ''}
                        onChange={field.onChange}
                        error={errors.description?.message}
                        rows={3}
                        placeholder="Enter invoice description..."
                    />
                )}
            />
        </form>
    );
};

export default InvoiceForm;

