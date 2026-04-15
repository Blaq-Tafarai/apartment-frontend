import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import DatePicker from "../../../components/ui/DatePicker";
import { useCompanies } from "../../companies/hooks/useCompanies";
import {
    DollarSign,
    Building2
} from "lucide-react";
import React from "react";

import { subscriptionSchema } from "../validation/subscription.schema";

const SubscriptionForm = ({ defaultValues, onSubmit, modalMode }) => {
    const companiesQuery = useCompanies({ page: 1, limit: 100 });
    const companies = companiesQuery.data?.data || [];

    const organizationOptions = companies.map(company => ({
        value: company.id,
        label: company.name
    }));

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        resolver: zodResolver(subscriptionSchema),
        defaultValues: defaultValues || {}
    });

    // Reset form when defaultValues change
    React.useEffect(() => {
        reset(defaultValues || {});
    }, [defaultValues, reset]);

    return (
        <form id="subscription-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            leftIcon={<Building2 className="w-4 h-4" />}
                        />
                    )}
                />

                <Input
                    label="Plan Name"
                    {...register("planName")}
                    error={errors.planName?.message}
                    placeholder="e.g., Professional"
                />

                <Controller
                    name="billingCycle"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Billing Cycle"
                            value={field.value || ''}
                            onChange={(value) => field.onChange(value || '')}
                            options={[
                                { value: 'monthly', label: 'Monthly' },
                                { value: 'quarterly', label: 'Quarterly' },
                                { value: 'yearly', label: 'Yearly' },
                            ]}
                            error={errors.billingCycle?.message}
                        />
                    )}
                />

                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                        <NumberInput
                            label="Price"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target?.value ?? e)}
                            error={errors.price?.message}
                            leftIcon={<DollarSign className="w-4 h-4" />}
                            placeholder="e.g., 299.00"
                            step={0.1}
                            min={0}
                        />
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            label="Start Date"
                            value={field.value || null}
                            onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                            error={errors.startDate?.message}
                        />
                    )}
                />

                <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            label="End Date"
                            value={field.value || null}
                            onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                            error={errors.endDate?.message}
                        />
                    )}
                />
            </div>
        </form>
    );
};

export default SubscriptionForm;

