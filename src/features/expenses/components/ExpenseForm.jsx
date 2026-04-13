import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import DatePicker from "../../../components/ui/DatePicker";
import ToggleSwitch from "../../../components/ui/ToggleSwitch";
import {
    Building,
    Tag,
    User,
    DollarSign,
    CreditCard,
    Calendar,
    FileText,
    Hash,
    Link,
} from "lucide-react";

import { expenseSchema } from "../validation/expense.schema";

const ExpenseForm = ({ defaultValues, onSubmit, modalMode }) => {
    const {
        register,
        control,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(expenseSchema),
        defaultValues,
    });

    const recurring = watch('recurring');

    return (
        <form id="expense-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Property Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Property Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Building Select */}
                    <Controller
                        name="buildingId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Building (Optional)"
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

                    {/* Category Select */}
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Category"
                                value={field.value}
                                onChange={field.onChange}
                                options={[
                                    { value: "Maintenance", label: "Maintenance" },
                                    { value: "Utilities", label: "Utilities" },
                                    { value: "Insurance", label: "Insurance" },
                                    { value: "Taxes", label: "Taxes" },
                                    { value: "Repairs", label: "Repairs" },
                                    { value: "Supplies", label: "Supplies" },
                                    { value: "Other", label: "Other" },
                                ]}
                                error={errors.category?.message}
                                placeholder="Select category"
                                leftIcon={<Tag className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Expense Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Expense Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Vendor */}
                    <Input
                        label="Vendor"
                        {...register("vendor")}
                        error={errors.vendor?.message}
                        leftIcon={<User className="w-4 h-4" />}
                        placeholder="e.g., ABC Plumbing"
                    />

                    {/* Amount */}
                    <NumberInput
                        label="Amount"
                        {...register("amount", { valueAsNumber: true })}
                        error={errors.amount?.message}
                        leftIcon={<DollarSign className="w-4 h-4" />}
                        placeholder="e.g., 250.00"
                        min={0.01}
                        step={0.01}
                    />
                </div>

                {/* Description */}
                <TextArea
                    label="Description"
                    {...register("description")}
                    error={errors.description?.message}
                    rows={3}
                    placeholder="Enter expense description..."
                    leftIcon={<FileText className="w-4 h-4" />}
                />
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Payment Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Payment Method */}
                    <Controller
                        name="paymentMethod"
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
                                    { value: "Online", label: "Online" },
                                    { value: "Other", label: "Other" },
                                ]}
                                error={errors.paymentMethod?.message}
                                placeholder="Select payment method"
                                leftIcon={<CreditCard className="w-4 h-4" />}
                            />
                        )}
                    />

                    {/* Payment Status */}
                    <Controller
                        name="paymentStatus"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Payment Status"
                                value={field.value}
                                onChange={field.onChange}
                                options={[
                                    { value: "Pending", label: "Pending" },
                                    { value: "Approved", label: "Approved" },
                                    { value: "Paid", label: "Paid" },
                                    { value: "Overdue", label: "Overdue" },
                                    { value: "Cancelled", label: "Cancelled" },
                                ]}
                                error={errors.paymentStatus?.message}
                                placeholder="Select status"
                            />
                        )}
                    />
                </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Dates
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                label="Paid At (Optional)"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.paidAt?.message}
                                leftIcon={<Calendar className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Recurring Options */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Recurring Options
                </h4>
                <div className="space-y-4">
                    {/* Recurring Toggle */}
                    <Controller
                        name="recurring"
                        control={control}
                        render={({ field }) => (
                            <ToggleSwitch
                                label="Recurring Expense"
                                checked={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    {/* Recurrence Frequency */}
                    {recurring && (
                        <Controller
                            name="recurrenceFrequency"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Recurrence Frequency"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={[
                                        { value: "Weekly", label: "Weekly" },
                                        { value: "Monthly", label: "Monthly" },
                                        { value: "Quarterly", label: "Quarterly" },
                                        { value: "Yearly", label: "Yearly" },
                                    ]}
                                    error={errors.recurrenceFrequency?.message}
                                    placeholder="Select frequency"
                                />
                            )}
                        />
                    )}
                </div>
            </div>

            {/* Invoice Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Invoice Information (Optional)
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

                    {/* Invoice URL */}
                    <Input
                        label="Invoice URL"
                        {...register("invoiceUrl")}
                        error={errors.invoiceUrl?.message}
                        leftIcon={<Link className="w-4 h-4" />}
                        placeholder="https://..."
                    />
                </div>
            </div>

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

export default ExpenseForm;
