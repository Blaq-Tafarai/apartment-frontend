import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input, { NumberInput } from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
import DatePicker from "../../../components/ui/DatePicker";
import {
    User,
    Building,
    Home,
    Wrench,
    AlertTriangle,
    FileText,
    DollarSign,
    Calendar,
    UserCheck,
} from "lucide-react";

import { maintenanceSchema } from "../validation/maintenance.schema";

const MaintenanceForm = ({ defaultValues, onSubmit, modalMode }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(maintenanceSchema),
        defaultValues,
    });

    return (
        <form id="maintenance-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Location Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Location Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Tenant Select */}
                    <Controller
                        name="tenantId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Tenant"
                                value={field.value}
                                searchable
                                onChange={field.onChange}
                                options={[
                                    { value: "1", label: "John Doe" },
                                    { value: "2", label: "Jane Smith" },
                                    { value: "3", label: "Mike Johnson" },
                                    { value: "4", label: "Sarah Williams" },
                                    { value: "5", label: "Bob Brown" },
                                    { value: "6", label: "Alice Green" },
                                    { value: "7", label: "Charlie Wilson" },
                                    { value: "8", label: "Diana Prince" },
                                    { value: "9", label: "Eve Adams" },
                                    { value: "10", label: "Frank Miller" },
                                ]}
                                error={errors.tenantId?.message}
                                placeholder="Select a tenant"
                                leftIcon={<User className="w-4 h-4" />}
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
                                leftIcon={<Building className="w-4 h-4" />}
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
                                    { value: "5", label: "301" },
                                    { value: "6", label: "302" },
                                    { value: "7", label: "401" },
                                    { value: "8", label: "402" },
                                    { value: "9", label: "501" },
                                    { value: "10", label: "502" },
                                ]}
                                error={errors.apartmentId?.message}
                                placeholder="Select an apartment"
                                leftIcon={<Home className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Maintenance Details */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Maintenance Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Select */}
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Category"
                                value={field.value}
                                onChange={field.onChange}
                                options={[
                                    { value: 'Electrical', label: 'Electrical' },
                                    { value: 'HVAC', label: 'HVAC' },
                                    { value: 'Plumbing', label: 'Plumbing' },
                                    { value: 'Appliances', label: 'Appliances' },
                                    { value: 'Structural', label: 'Structural' },
                                    { value: 'General', label: 'General' },
                                ]}
                                error={errors.category?.message}
                                leftIcon={<Wrench className="w-4 h-4" />}
                            />
                        )}
                    />

                    {/* Priority Select */}
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Priority"
                                value={field.value}
                                onChange={field.onChange}
                                options={[
                                    { value: 'LOW', label: 'Low' },
                                    { value: 'MEDIUM', label: 'Medium' },
                                    { value: 'HIGH', label: 'High' },
                                    { value: 'URGENT', label: 'Urgent' },
                                ]}
                                error={errors.priority?.message}
                                leftIcon={<AlertTriangle className="w-4 h-4" />}
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
                                    { value: 'OPEN', label: 'Open' },
                                    { value: 'IN_PROGRESS', label: 'In Progress' },
                                    { value: 'COMPLETED', label: 'Completed' },
                                    { value: 'CANCELLED', label: 'Cancelled' },
                                    { value: 'ON_HOLD', label: 'On Hold' },
                                ]}
                                error={errors.status?.message}
                            />
                        )}
                    />

                    {/* Assigned To */}
                    <Input
                        label="Assigned To"
                        {...register("assignedTo")}
                        error={errors.assignedTo?.message}
                        placeholder="e.g., John Technician"
                        leftIcon={<UserCheck className="w-4 h-4" />}
                    />
                </div>

                {/* Issue */}
                <Input
                    label="Issue"
                    {...register("issue")}
                    error={errors.issue?.message}
                    placeholder="Brief description of the issue"
                    leftIcon={<FileText className="w-4 h-4" />}
                />

                {/* Description */}
                <TextArea
                    label="Description"
                    {...register("description")}
                    error={errors.description?.message}
                    rows={4}
                    placeholder="Detailed description of the maintenance request..."
                />
            </div>

            {/* Cost Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Cost Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Estimated Cost */}
                    <NumberInput
                        label="Estimated Cost"
                        {...register("estimatedCost", { valueAsNumber: true })}
                        error={errors.estimatedCost?.message}
                        leftIcon={<DollarSign className="w-4 h-4" />}
                        placeholder="e.g., 150"
                        min={0}
                        max={100000}
                    />

                    {/* Actual Cost */}
                    <NumberInput
                        label="Actual Cost"
                        {...register("actualCost", { valueAsNumber: true })}
                        error={errors.actualCost?.message}
                        leftIcon={<DollarSign className="w-4 h-4" />}
                        placeholder="e.g., 125"
                        min={0}
                        max={100000}
                    />

                    {/* Completed At */}
                    <Controller
                        name="completedAt"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Completed At"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.completedAt?.message}
                                leftIcon={<Calendar className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>
            </div>

            {/* Notes */}
            <TextArea
                label="Notes"
                {...register("notes")}
                error={errors.notes?.message}
                rows={3}
                placeholder="Additional notes or comments..."
            />
        </form>
    );
};

export default MaintenanceForm;
