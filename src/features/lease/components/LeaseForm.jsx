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
    PenTool,
} from "lucide-react";
import React from "react";
import { useTenants } from "../../tenants/hooks/useTenants/";
import { useApartments } from "../../apartment/hooks/useApartments";

import { leaseSchema } from "../validation/lease.schema";

const LeaseForm = ({ defaultValues, onSubmit, modalMode }) => {
    const tenantsQuery = useTenants({ page: 1, limit: 100 });
    const apartmentsQuery = useApartments({ page: 1, limit: 100 });

    const tenants = tenantsQuery.data?.data || [];
    const apartments = apartmentsQuery.data?.data || [];

    const tenantOptions = tenants.map(tenant => ({
        value: tenant.id,
        label: tenant?.user?.name
    }));

    const apartmentOptions = apartments.map(apartment => ({
        value: apartment.id,
        label: apartment.unitNumber
    }));

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(leaseSchema),
        defaultValues: defaultValues || {},
    })

    // Reset form when defaultValues change
    React.useEffect(() => {
        reset(defaultValues || {});
    }, [defaultValues, reset]);

    return (
        <form id="lease-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                                
                                onChange={(value) => field.onChange(value || '')}
                                options={tenantOptions}
                                loading={tenantsQuery.isLoading}
                                error={errors.tenantId?.message}
                                placeholder="Select a tenant"
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
                            />
                        )}
                    />
                </div>
            </div>

            {/* Lease Dates */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Lease Dates
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Start Date */}
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Start Date"
                                value={field.value ? new Date(field.value) : null}
                                onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : null)}
                                error={errors.startDate?.message}
                                leftIcon={<Calendar className="w-4 h-4" />}
                            />
                        )}
                    />

                    {/* End Date */}
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="End Date"
                                value={field.value ? new Date(field.value) : null}
                                onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : null)}
                                error={errors.endDate?.message}
                                leftIcon={<Calendar className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Financial Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Monthly Rent */}
                    <Controller
                        name="rentAmount"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Monthly Rent"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target?.value ?? e)}
                                error={errors.rentAmount?.message}
                                leftIcon={<DollarSign className="w-4 h-4" />}
                                placeholder="e.g., 2500"
                                min={1}
                                max={100000}
                                step={1}
                            />
                        )}
                    />

                    {/* Security Deposit */}
                    <Controller
                        name="securityDeposit"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Security Deposit"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target?.value ?? e)}
                                error={errors.securityDeposit?.message}
                                leftIcon={<DollarSign className="w-4 h-4" />}
                                placeholder="e.g., 2500"
                                min={0}
                                max={50000}
                                step={1}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Lease Terms */}
            <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                    <TextArea
                        label="Lease Terms & Conditions"
                        value={field.value || ''}
                        onChange={field.onChange}
                        error={errors.terms?.message}
                        rows={3}
                        placeholder="Enter the lease terms and conditions..."
                    />
                )}
            />
        </form>
    );
};

export default LeaseForm;
