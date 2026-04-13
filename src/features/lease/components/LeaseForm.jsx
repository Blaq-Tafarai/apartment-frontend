import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
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

import { leaseSchema } from "../validation/lease.schema";

const LeaseForm = ({ defaultValues, onSubmit, modalMode }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(leaseSchema),
        defaultValues,
    });

    return (
        <form id="lease-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Property Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Property Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Tenant Select */}
                    <Controller
                        name="tenantId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Tenant"
                                value={field.value}
                                searchable
                                onChange={field.onChange}
                                options={[
                                    { value: "1", label: "John Doe" },
                                    { value: "2", label: "Jane Smith" },
                                    { value: "3", label: "Bob Johnson" },
                                ]}
                                error={errors.tenantId?.message}
                                placeholder="Select a tenant"
                                leftIcon={<User className="w-4 h-4" />}
                            />
                        )}
                    />

                    {/* Building Select */}
                    <Controller
                        name="buildingId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Building"
                                value={field.value}
                                searchable
                                onChange={field.onChange}
                                options={[
                                    { value: "1", label: "Sunset Apartments" },
                                    { value: "2", label: "Oakwood Residences" },
                                    { value: "3", label: "Maple Grove Towers" },
                                ]}
                                error={errors.buildingId?.message}
                                placeholder="Select a building"
                                leftIcon={<Building className="w-4 h-4" />}
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
                                value={field.value}
                                searchable
                                onChange={field.onChange}
                                options={[
                                    { value: "1", label: "101" },
                                    { value: "2", label: "202" },
                                    { value: "3", label: "303" },
                                ]}
                                error={errors.apartmentId?.message}
                                placeholder="Select an apartment"
                                leftIcon={<Home className="w-4 h-4" />}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Start Date */}
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Start Date"
                                value={field.value}
                                onChange={field.onChange}
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
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.endDate?.message}
                                leftIcon={<Calendar className="w-4 h-4" />}
                            />
                        )}
                    />

                    {/* Signature Date */}
                    <Controller
                        name="signatureDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Signature Date"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.signatureDate?.message}
                                leftIcon={<PenTool className="w-4 h-4" />}
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
                    <NumberInput
                        label="Monthly Rent"
                        {...register("monthlyRent", { valueAsNumber: true })}
                        error={errors.monthlyRent?.message}
                        leftIcon={<DollarSign className="w-4 h-4" />}
                        placeholder="e.g., 2500"
                        min={1}
                        max={100000}
                    />

                    {/* Security Deposit */}
                    <NumberInput
                        label="Security Deposit"
                        {...register("securityDeposit", { valueAsNumber: true })}
                        error={errors.securityDeposit?.message}
                        leftIcon={<DollarSign className="w-4 h-4" />}
                        placeholder="e.g., 2500"
                        min={0}
                        max={50000}
                    />
                </div>
            </div>

            {/* Lease Terms */}
            <TextArea
                label="Lease Terms & Conditions"
                {...register("terms")}
                error={errors.terms?.message}
                rows={6}
                placeholder="Enter the lease terms and conditions..."
                leftIcon={<FileText className="w-4 h-4" />}
            />
        </form>
    );
};

export default LeaseForm;
