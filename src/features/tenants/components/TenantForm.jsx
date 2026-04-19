import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useApartments } from "../../apartment/hooks/useApartments";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import {
    User,
    Mail,
    Phone,
    Users2,
    Home,
} from "lucide-react";

import { tenantSchema } from "../validation/tenant.schema";

const TenantForm = ({ defaultValues, onSubmit, modalMode }) => {
    const apartmentsQuery = useApartments({ page: 1, limit: 100 });
    const apartments = apartmentsQuery.data?.data || [];

    const apartmentOptions = apartments.map(apartment => ({
        value: apartment.id,
        label: apartment.unitNumber
    }));

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(tenantSchema),
        defaultValues: defaultValues || {}
    });

    // Reset form when defaultValues change
    React.useEffect(() => {
        reset(defaultValues || {});
    }, [defaultValues, reset]);

    return (
        <form id="tenant-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Input
                    label="Name"
                    {...register("user.name")}
                    error={errors.name?.message}
                    placeholder="Enter tenant name"
                    leftIcon={<User className="w-4 h-4" />}
                />

                <Input
                    label="Email"
                    {...register("user.email")}
                    error={errors.email?.message}
                    placeholder="Enter tenant email"
                    leftIcon={<Mail className="w-4 h-4" />}
                />

                <Input
                    label="Phone"
                    type="tel"
                    {...register("user.phone")}
                    error={errors.phone?.message}
                    placeholder="Enter tenant phone number"
                    leftIcon={<Phone className="w-4 h-4" />}
                />

                <Controller
                    name="apartmentId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Apartment"
                            value={field.value || ''}
                            searchable
                            onChange={(value) => field.onChange(value || '')}
                            options={apartmentOptions}
                            loading={apartmentsQuery.isLoading}
                            error={errors.apartmentId?.message}
                            leftIcon={<Home className="w-4 h-4" />}
                            placeholder="Select an apartment"
                        />
                    )}
                />

                {/* Gender Select */}
                <Controller
                    name="user.gender"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Gender"
                            value={field.value || ''}
                            onChange={(value) => field.onChange(value || '')}
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' }
                            ]}
                            error={errors.gender?.message}
                            leftIcon={<Users2 className="w-4 h-4" />}
                        />
                    )}
                />
            </div>
            <div className="pt-8">
                <p className="text-lg font-medium">Emergency Contact Information</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <Controller
                    name="user.emergencyName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Emergency Name"
                            value={field.value || ''}
                            onChange={field.onChange}
                            error={errors.emergencyName?.message}
                            placeholder="Emergency name"
                            leftIcon={<User className="w-4 h-4" />}
                        />
                    )}
                />
                <Controller
                    name="user.emergencyPhone"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Emergency Phone"
                            type="tel"
                            value={field.value || ''}
                            onChange={field.onChange}
                            error={errors.emergencyPhone?.message}
                            placeholder="Emergency contact phone"
                            leftIcon={<Phone className="w-4 h-4" />}
                        />
                    )}
                />
                <Controller
                    name="user.emergencyRelationship"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Relationship"
                            value={field.value || ''}
                            onChange={field.onChange}
                            error={errors.emergencyRelationship?.message}
                            placeholder="e.g., Spouse, Parent"
                            leftIcon={<Users2 className="w-4 h-4" />}
                        />
                    )}
                />
            </div>
        </form>
    );
};

export default TenantForm;
