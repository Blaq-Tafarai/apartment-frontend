import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
import {
    Building,
    Home,
    DollarSign,
    Layers,
    Bath,
    Square,
    Users,
    Wrench,
} from "lucide-react";

import { apartmentSchema } from "../validation/apartment.schema";

const ApartmentForm = ({ defaultValues, onSubmit, modalMode }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(apartmentSchema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Unit"
                    {...register("unit")}
                    error={errors.unit?.message}
                    leftIcon={<Building className="w-4 h-4" />}
                    placeholder="e.g., A101"
                />

                {/* Building Select - assuming buildings are passed as prop or fetched */}
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
                                { value: "1", label: "Building 1" },
                                { value: "2", label: "Building 2" },
                                { value: "3", label: "Building 3" },
                                { value: "4", label: "Building 4" },
                            ]}
                            error={errors.buildingId?.message}
                            placeholder="Select a building"
                        />
                    )}
                />

                <NumberInput
                    label="Bedrooms"
                    {...register("bedrooms", { valueAsNumber: true })}
                    error={errors.bedrooms?.message}
                    min={0}
                    max={10}
                    step={1}
                    leftIcon={<Home className="w-4 h-4" />}
                    placeholder="e.g., 2"
                />

                <NumberInput
                    label="Bathrooms"
                    {...register("bathrooms", { valueAsNumber: true })}
                    error={errors.bathrooms?.message}
                    min={0.5}
                    max={10}
                    step={0.5}
                    leftIcon={<Bath className="w-4 h-4" />}
                    placeholder="e.g., 2"
                />

                <NumberInput
                    label="Sqft"
                    {...register("sqft", { valueAsNumber: true })}
                    error={errors.sqft?.message}
                    min={100}
                    max={10000}
                    step={50}
                    leftIcon={<Square className="w-4 h-4" />}
                    placeholder="e.g., 950"
                />

                <NumberInput
                    label="Rent"
                    {...register("rent", { valueAsNumber: true })}
                    error={errors.rent?.message}
                    min={0}
                    step={50}
                    leftIcon={<DollarSign className="w-4 h-4" />}
                    placeholder="e.g., 1800"
                />

                <NumberInput
                    label="Floor"
                    {...register("floor", { valueAsNumber: true })}
                    error={errors.floor?.message}
                    min={1}
                    max={100}
                    step={1}
                    leftIcon={<Layers className="w-4 h-4" />}
                    placeholder="e.g., 3"
                />

                {/* Status Select */}
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Status"
                            value={field.value}
                            onChange={field.onChange}
                            options={[
                                { value: 'Vacant', label: 'Vacant' },
                                { value: 'Occupied', label: 'Occupied' },
                                { value: 'Maintenance', label: 'Maintenance' },
                                { value: 'Reserved', label: 'Reserved' },
                            ]}
                            error={errors.status?.message}
                        />
                    )}
                />

                {/* Tenant Select - optional */}
                <Controller
                    name="tenantId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Tenant (Optional)"
                            value={field.value}
                            searchable
                            onChange={field.onChange}
                            options={[
                                { value: '1', label: 'Tenant 1' },
                                { value: '2', label: 'Tenant 2' },
                                { value: '3', label: 'Tenant 3' },
                                { value: '4', label: 'Tenant 4' },
                            ]}
                            error={errors.tenantId?.message}
                            placeholder="Select a tenant"
                        />
                    )}
                />
            </div>

            <TextArea
                label="Description"
                {...register("description")}
                error={errors.description?.message}
                rows={3}
                placeholder="Enter a description..."
            />

            <div className="pt-4 flex justify-end">
                <Button
                    disabled={isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? 'Saving...' : modalMode === 'edit' ? 'Update Apartment' : 'Create Apartment'}
                </Button>
            </div>
        </form>
    );
};

export default ApartmentForm;
