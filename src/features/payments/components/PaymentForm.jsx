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
    CreditCard,
    Hash,
} from "lucide-react";

import { paymentSchema } from "../validation/payment.schema";

const PaymentForm = ({ defaultValues, onSubmit, modalMode }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues,
    });

    return (
        <form id="payment-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Payment Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Payment Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                    {/* Payment Type */}
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Payment Type"
                                value={field.value}
                                onChange={field.onChange}
                                options={[
                                    { value: "Rent", label: "Rent" },
                                    { value: "Security Deposit", label: "Security Deposit" },
                                    { value: "Late Fee", label: "Late Fee" },
                                    { value: "Maintenance Fee", label: "Maintenance Fee" },
                                    { value: "Other", label: "Other" },
                                ]}
                                error={errors.type?.message}
                                placeholder="Select payment type"
                                leftIcon={<CreditCard className="w-4 h-4" />}
                            />
                        )}
                    />

                    {/* Payment Method */}
                    <Controller
                        name="method"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Payment Method"
                                value={field.value}
                                onChange={field.onChange}
                                options={[
                                    { value: "Cash", label: "Cash" },
                                    { value: "Check", label: "Check" },
                                    { value: "Credit Card", label: "Credit Card" },
                                    { value: "Debit Card", label: "Debit Card" },
                                    { value: "Bank Transfer", label: "Bank Transfer" },
                                    { value: "Online Payment", label: "Online Payment" },
                                ]}
                                error={errors.method?.message}
                                placeholder="Select payment method"
                                leftIcon={<CreditCard className="w-4 h-4" />}
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

                    {/* Paid At */}
                    <Controller
                        name="paidAt"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Paid At"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.paidAt?.message}
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
                                    { value: "Completed", label: "Completed" },
                                    { value: "Failed", label: "Failed" },
                                    { value: "Refunded", label: "Refunded" },
                                    { value: "Cancelled", label: "Cancelled" },
                                ]}
                                error={errors.status?.message}
                                placeholder="Select status"
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
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {/* Invoice Number */}
                    <Input
                        label="Invoice Number"
                        {...register("invoiceNumber")}
                        error={errors.invoiceNumber?.message}
                        leftIcon={<Hash className="w-4 h-4" />}
                        placeholder="e.g., INV-001"
                    />
                </div>
            </div>

            {/* Notes */}
            <TextArea
                label="Notes"
                {...register("notes")}
                error={errors.notes?.message}
                rows={3}
                placeholder="Enter any additional notes..."
            />
        </form>
    );
};

export default PaymentForm;
