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
    Hash,
} from "lucide-react";

import { invoiceSchema } from "../validation/invoice.schema";

const InvoiceForm = ({ defaultValues, onSubmit, modalMode }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(invoiceSchema),
        defaultValues,
    });

    return (
        <form id="invoice-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Invoice Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Invoice Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Invoice Number */}
                    <Input
                        label="Invoice Number"
                        {...register("invoiceNumber")}
                        error={errors.invoiceNumber?.message}
                        leftIcon={<Hash className="w-4 h-4" />}
                        placeholder="e.g., INV-001"
                    />

                    {/* Amount */}
                    <NumberInput
                        label="Amount"
                        {...register("amount", { valueAsNumber: true })}
                        error={errors.amount?.message}
                        leftIcon={<DollarSign className="w-4 h-4" />}
                        placeholder="e.g., 1200.00"
                        min={0.01}
                        step={0.01}
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
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.issueDate?.message}
                                leftIcon={<Calendar className="w-4 h-4" />}
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
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.dueDate?.message}
                                leftIcon={<Calendar className="w-4 h-4" />}
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
                                    { value: "Pending", label: "Pending" },
                                    { value: "Paid", label: "Paid" },
                                    { value: "Overdue", label: "Overdue" },
                                    { value: "Cancelled", label: "Cancelled" },
                                ]}
                                error={errors.status?.message}
                                placeholder="Select status"
                            />
                        )}
                    />
                </div>
            </div>

            {/* Description */}
            <TextArea
                label="Description"
                {...register("description")}
                error={errors.description?.message}
                rows={3}
                placeholder="Enter invoice description..."
            />

            {/* Notes */}
            <TextArea
                label="Notes (Optional)"
                {...register("notes")}
                error={errors.notes?.message}
                rows={3}
                placeholder="Enter any additional notes..."
            />
        </form>
    );
};

export default InvoiceForm;
