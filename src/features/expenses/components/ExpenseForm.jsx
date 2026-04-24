import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { useBuildings } from "../../building/hooks/useBuildings";

import { expenseSchema } from "../validation/expense.schema";

const ExpenseForm = ({ defaultValues, onSubmit, modalMode }) => {
    const buildingsQuery = useBuildings({ page: 1, limit: 100 });

    const buildings = buildingsQuery.data?.data || [];

    const buildingOptions = buildings.map((building) => ({
        value: building.id,
        label: building.name,
    }));

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(expenseSchema),
        defaultValues: defaultValues || {},
    });

    // Reset form when defaultValues change
    React.useEffect(() => {
        reset(defaultValues || {});
    }, [defaultValues, reset]);

    return (
        <form id="expense-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Property Information */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Building Select */}
                    <Controller
                        name="buildingId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Building"
                                value={field.value || ''}
                                searchable
                                onChange={(value) => field.onChange(value || '')}
                                options={buildingOptions}
                                loading={buildingsQuery.isLoading}
                                error={errors.buildingId?.message}
                                placeholder="Select a building"
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
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value || '')}
                                options={[
                                    { value: "utilities", label: "Utilities" },
                                    { value: "security", label: "Security" },
                                    { value: "repairs", label: "Repairs" },
                                    { value: "cleaning", label: "Cleaning" },
                                ]}
                                error={errors.category?.message}
                                placeholder="Select category"
                            />
                        )}
                    />
                </div>
            </div>

            {/* Expense Information */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Amount */}
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                label="Amount"
                                value={field.value}
                                onChange={(e) => {
                                    const val = e.target?.value ?? e;
                                    field.onChange(val === '' ? undefined : parseFloat(val));
                                }}
                                error={errors.amount?.message}
                                leftIcon={<DollarSign className="w-4 h-4" />}
                                placeholder="e.g., 250.00"
                                min={1}
                                step={1}
                            />
                        )}
                    />

                    {/* Payment Method */}
                    <Controller
                        name="paymentMethod"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Payment Method"
                                value={field.value || ''}
                                onChange={(value) => field.onChange(value || '')}
                                options={[
                                    { value: "cash", label: "Cash" },
                                    { value: "mobile_money", label: "Mobile Money" },
                                    { value: "card", label: "Credit Card" },,
                                    { value: "bank_transfer", label: "Bank Transfer" }
                                ]}
                                error={errors.paymentMethod?.message}
                                placeholder="Select payment method"
                            />
                        )}
                    />
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
                            placeholder="Enter expense description..."
                        />
                    )}
                />
            </div>
        </form>
    );
};

export default ExpenseForm;

