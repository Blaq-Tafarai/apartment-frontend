import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import {
    Building,
    DollarSign,
    CreditCard,
} from "lucide-react";
import { useInvoices } from "../../billing/hooks/useInvoices";

import { paymentSchema } from "../validation/payment.schema";

const PaymentForm = ({ defaultValues, onSubmit, modalMode }) => {
    const billingsQuery = useInvoices({ page: 1, limit: 100 });

    const billings = billingsQuery.data?.data || [];

    const billingOptions = billings.map((billing) => ({
        value: billing.id,
        label: billing.amount,
    }));

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: defaultValues || {},
    });

    // Reset form when defaultValues change
    React.useEffect(() => {
        reset(defaultValues || {});
    }, [defaultValues, reset]);

    return (
        <form id="payment-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Property Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Property Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Billing Select */}
                    <Controller
                        name="billingId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Billing"
                                value={field.value || ''}
                                searchable
                                onChange={(value) => field.onChange(value || '')}
                                options={billingOptions}
                                loading={billingsQuery.isLoading}
                                error={errors.billingId?.message}
                                placeholder="Select a billing"
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
                                placeholder="e.g., 1200.00"
                                min={0.01}
                                step={0.01}
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
                                    { value: "card", label: "Credit Card" },
                                    { value: "bank_transfer", label: "Bank Transfer" }
                                ]}
                                error={errors.paymentMethod?.message}
                                placeholder="Select payment method"
                            />
                        )}
                    />
                </div>
            </div>
        </form>
    );
};

export default PaymentForm;

