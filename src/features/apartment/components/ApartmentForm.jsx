import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import {
    Building,
    Home,
    DollarSign,
    Layers,
    Bath,
    Square,
} from "lucide-react";

import { apartmentSchema } from "../validation/apartment.schema";
import { useBuildings } from "../../building/hooks/useBuildings";


const ApartmentForm = ({ defaultValues, onSubmit, modalMode }) => {
    const buildingsQuery = useBuildings({ page: 1, limit: 100 });
    const buildings = buildingsQuery.data?.data || [];

    const buildingOptions = buildings.map(building => ({
        value: building.id,
        label: building.name
    }));

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(apartmentSchema),
        defaultValues: defaultValues || {}
    });

    // Reset form when defaultValues change
    React.useEffect(() => {
        reset(defaultValues || {});
    }, [defaultValues, reset]);

    return (
        <form id="apartment-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Unit"
                        {...register('unitNumber')}
                        error={errors.unitNumber?.message}
                        leftIcon={<Building className="w-4 h-4" />}
                        placeholder="e.g., A101"
                    />

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
                            leftIcon={<Building className="w-4 h-4" />}
                            placeholder="Select a building"
                        />
                    )}
                />

                <Controller
                    name="bedrooms"
                    control={control}
                    render={({ field }) => (
                        <NumberInput
                            label="Bedrooms"
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target?.value ? Number(e.target.value) : null)}
                            error={errors.bedrooms?.message}
                            min={0}
                            max={10}
                            step={1}
                            leftIcon={<Home className="w-4 h-4" />}
                            placeholder="e.g., 2"
                        />
                    )}
                />

                <Controller
                    name="bathrooms"
                    control={control}
                    render={({ field }) => (
                        <NumberInput
                            label="Bathrooms"
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target?.value ? Number(e.target.value) : null)}
                            error={errors.bathrooms?.message}
                            min={1}
                            max={10}
                            step={1}
                            leftIcon={<Bath className="w-4 h-4" />}
                            placeholder="e.g., 2"
                        />
                    )}
                />

                <Controller
                    name="sqft"
                    control={control}
                    render={({ field }) => (
                        <NumberInput
                            label="Sqft"
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target?.value ? Number(e.target.value) : null)}
                            error={errors.sqft?.message}
                            min={100}
                            max={10000}
                            step={50}
                            leftIcon={<Square className="w-4 h-4" />}
                            placeholder="e.g., 950"
                        />
                    )}
                />

                <Controller
                    name="rent"
                    control={control}
                    render={({ field }) => (
                        <NumberInput
                            label="Rent"
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target?.value ? Number(e.target.value) : null)}
                            error={errors.rent?.message}
                            min={0}
                            step={50}
                            leftIcon={<DollarSign className="w-4 h-4" />}
                            placeholder="e.g., 1800"
                        />
                    )}
                />

                <Controller
                    name="floor"
                    control={control}
                    render={({ field }) => (
                        <NumberInput
                            label="Floor"
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target?.value ? Number(e.target.value) : null)}
                            error={errors.floor?.message}
                            min={1}
                            max={100}
                            step={1}
                            leftIcon={<Layers className="w-4 h-4" />}
                            placeholder="e.g., 3"
                        />
                    )}
                />

                <Controller
                    name="amenities"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Amenities"
                            multiple
                            value={field.value || []}
                            onChange={field.onChange}
                            options={[
                                { value: 'parking', label: 'Parking' },
                                { value: 'balcony', label: 'Balcony' },
                                { value: 'pool_access', label: 'Pool Access' },
                                { value: 'gym', label: 'Gym' },
                                { value: 'elevator', label: 'Elevator' },
                                { value: 'security', label: '24h Security' },
                                { value: 'laundry', label: 'Laundry' },
                                { value: 'ac', label: 'AC' },
                                { value: 'furnished', label: 'Furnished' },
                            ]}
                            error={errors.amenities?.message}
                            searchable
                        />
                    )}
                />

                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Status"
                            value={field.value}
                            onChange={field.onChange}
                            options={[
                                { value: 'available', label: 'Available' },
                                { value: 'occupied', label: 'Occupied' },
                                { value: 'under_maintenance', label: 'Under Maintenance' },
                                { value: 'inactive', label: 'Inactive' },
                            ]}
                            error={errors.status?.message}
                        />
                    )}
                />

            </div>

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
                        placeholder="Enter a description..."
                    />
                )}
            />

        </form>
    );
};

export default ApartmentForm;
