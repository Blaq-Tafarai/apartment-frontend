import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
import {
    Building,
    Mail,
    Phone,
    MapPin,
    User,
} from "lucide-react";

import { companySchema } from "../validation/company.schema";

const CompanyForm = ({ defaultValues, onSubmit, modalMode }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(companySchema),
        defaultValues,
    });

    return (
        <form id="company-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Company Name"
                    {...register("name")}
                    error={errors.name?.message}
                    leftIcon={<Building className="w-4 h-4" />}
                    placeholder="e.g., ABC Realty Group"
                />

                <Input
                    label="Email"
                    {...register("email")}
                    error={errors.email?.message}
                    leftIcon={<Mail className="w-4 h-4" />}
                    placeholder="e.g., contact@company.com"
                />

                <Input
                    label="Phone"
                    {...register("phone")}
                    error={errors.phone?.message}
                    leftIcon={<Phone className="w-4 h-4" />}
                    placeholder="e.g., +1-555-0123"
                />

                {/* Admin User Select - assuming users are passed as prop or fetched */}
                <Controller
                    name="adminUserId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Admin User"
                            value={field.value}
                            searchable
                            onChange={field.onChange}
                            options={[
                                { value: '1', label: 'John Admin' },
                                { value: '2', label: 'Jane Manager' },
                                { value: '3', label: 'Bob Analyst' },
                            ]}
                            error={errors.adminUserId?.message}
                            placeholder="Select an admin user"
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
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ]}
                            error={errors.status?.message}
                        />
                    )}
                />
            </div>

            <TextArea
                label="Address"
                {...register("address")}
                error={errors.address?.message}
                rows={3}
                placeholder="Enter the company address..."
            />
        </form>
    );
};

export default CompanyForm;
