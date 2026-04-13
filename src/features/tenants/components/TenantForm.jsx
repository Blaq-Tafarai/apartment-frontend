import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import DatePicker from "../../../components/ui/DatePicker";
import {
    User,
    DollarSign,
    Phone,
    Users2,
} from "lucide-react";

import { tenantSchema } from "../validation/tenant.schema";

const TenantForm = ({ defaultValues, onSubmit, modalMode }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(tenantSchema),
        defaultValues,
    });

    return (
        <form id="tenant-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* User Select */}
                <Controller
                    name="userId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="User"
                            value={field.value}
                            searchable
                            onChange={field.onChange}
                            options={[
                                { value: "user1", label: "John Doe" },
                                { value: "user2", label: "Jane Smith" },
                                { value: "user3", label: "Mike Johnson" },
                                { value: "user4", label: "Sarah Williams" },
                            ]}
                            error={errors.userId?.message}
                            placeholder="Select a user"
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
                                { value: "2", label: "102" },
                                { value: "3", label: "201" },
                                { value: "4", label: "202" },
                            ]}
                            error={errors.apartmentId?.message}
                            placeholder="Select an apartment"
                        />
                    )}
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
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' },
                                { value: 'Evicted', label: 'Evicted' },
                                { value: 'Pending', label: 'Pending' },
                            ]}
                            error={errors.status?.message}
                        />
                    )}
                />
            </div>

            {/* Emergency Contact */}
            <div className="space-y-6">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Emergency Contact (Optional)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Name"
                        {...register("emergencyContact.name")}
                        error={errors.emergencyContact?.name?.message}
                        placeholder="Emergency name"
                        leftIcon={<User className="w-4 h-4" />}
                    />
                    <Input
                        label="Phone"
                        type="tel"
                        {...register("emergencyContact.phone")}
                        error={errors.emergencyContact?.phone?.message}
                        leftIcon={<Phone className="w-4 h-4" />}
                        placeholder="Emergency contact phone"
                    />
                    <Input
                        label="Relationship"
                        {...register("emergencyContact.relationship")}
                        error={errors.emergencyContact?.relationship?.message}
                        placeholder="e.g., Spouse, Parent"
                        leftIcon={<Users2 className="w-4 h-4" />}
                    />
                </div>
            </div>

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

export default TenantForm;
