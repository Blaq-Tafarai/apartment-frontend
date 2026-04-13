import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
import {
    FileText,
    DollarSign,
    Calendar,
    Users,
    Building,
    Home,
    UserCheck,
    Settings,
} from "lucide-react";

import { licenseSchema } from "../validation/License.schema";

const LicenseForm = ({ defaultValues, onSubmit, modalMode }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(licenseSchema),
        defaultValues,
    });

    return (
        <form id="license-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* License Information */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <Input
                        label="Name"
                        {...register("name")}
                        error={errors.name?.message}
                        placeholder="e.g., Premium License"
                        leftIcon={<FileText className="w-4 h-4" />}
                    />

                    {/* Type */}
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Type"
                                value={field.value}
                                onChange={field.onChange}
                                options={[
                                    { value: 'Basic', label: 'Basic' },
                                    { value: 'Standard', label: 'Standard' },
                                    { value: 'Premium', label: 'Premium' },
                                    { value: 'Enterprise', label: 'Enterprise' },
                                ]}
                                error={errors.type?.message}
                                leftIcon={<Settings className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>

                {/* Description */}
                <TextArea
                    label="Description"
                    {...register("description")}
                    error={errors.description?.message}
                    rows={4}
                    placeholder="Detailed description of the license..."
                />

                {/* Features */}
                <TextArea
                    label="Features"
                    {...register("features")}
                    error={errors.features?.message}
                    rows={3}
                    placeholder="List of features (comma-separated)..."
                />
            </div>

            {/* Pricing and Duration */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Pricing and Duration
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Price */}
                    <NumberInput
                        label="Price"
                        {...register("price", { valueAsNumber: true })}
                        error={errors.price?.message}
                        leftIcon={<DollarSign className="w-4 h-4" />}
                        placeholder="e.g., 99.99"
                        min={0}
                        max={10000}
                    />

                    {/* Duration */}
                    <NumberInput
                        label="Duration (Months)"
                        {...register("duration", { valueAsNumber: true })}
                        error={errors.duration?.message}
                        leftIcon={<Calendar className="w-4 h-4" />}
                        placeholder="e.g., 12"
                        min={1}
                        max={120}
                    />
                </div>
            </div>

            {/* Limits */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Limits
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Max Buildings */}
                    <NumberInput
                        label="Max Buildings"
                        {...register("maxBuildings", { valueAsNumber: true })}
                        error={errors.maxBuildings?.message}
                        leftIcon={<Building className="w-4 h-4" />}
                        placeholder="e.g., 5"
                        min={1}
                        max={100}
                    />

                    {/* Max Tenants */}
                    <NumberInput
                        label="Max Tenants"
                        {...register("maxTenants", { valueAsNumber: true })}
                        error={errors.maxTenants?.message}
                        leftIcon={<Users className="w-4 h-4" />}
                        placeholder="e.g., 100"
                        min={1}
                        max={1000}
                    />

                    {/* Max Managers */}
                    <NumberInput
                        label="Max Managers"
                        {...register("maxManagers", { valueAsNumber: true })}
                        error={errors.maxManagers?.message}
                        leftIcon={<UserCheck className="w-4 h-4" />}
                        placeholder="e.g., 10"
                        min={1}
                        max={100}
                    />

                    {/* Max Apartments */}
                    <NumberInput
                        label="Max Apartments"
                        {...register("maxApartment", { valueAsNumber: true })}
                        error={errors.maxApartment?.message}
                        leftIcon={<Home className="w-4 h-4" />}
                        placeholder="e.g., 200"
                        min={1}
                        max={1000}
                    />
                </div>
            </div>
        </form>
    );
};

export default LicenseForm;
