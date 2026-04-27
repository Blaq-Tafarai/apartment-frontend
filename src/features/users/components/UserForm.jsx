import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import {
    User,
    Mail,
    Phone,
    Shield
} from "lucide-react";

import { userSchema } from "../validation/user.schema";

const UserForm = ({ defaultValues, onSubmit, modalMode = 'add' }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues,
    });

    return (
        <form id="user-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Name"
                    {...register("name")}
                    error={errors.name?.message}
                    leftIcon={<User className="w-4 h-4" />}
                    placeholder="e.g., Alice Johnson"
                />

                <Input
                    label="Email"
                    {...register("email")}
                    error={errors.email?.message}
                    leftIcon={<Mail className="w-4 h-4" />}
                    placeholder="e.g., alice@company.com"
                />

                <Input
                    label="Phone"
                    {...register("phone")}
                    error={errors.phone?.message}
                    leftIcon={<Phone className="w-4 h-4" />}
                    placeholder="e.g., +1-555-0123"
                />

                {/* Role Select */}
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <Select
                            label="Role"
                            value={field.value}
                            onChange={field.onChange}
                            options={[
                                { value: 'admin', label: 'Admin' },
                                { value: 'manager', label: 'Manager' },
                                { value: 'tenant', label: 'Tenant' },
                            ]}
                            error={errors.role?.message}
                            leftIcon={<Shield className="w-4 h-4" />}
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
        </form>
    );
};

export default UserForm;

