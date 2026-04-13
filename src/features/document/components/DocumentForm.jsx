import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
import DatePicker from "../../../components/ui/DatePicker";
import ToggleSwitch from "../../../components/ui/ToggleSwitch";
import {
    FileText,
    User,
    Building,
    Home,
    Calendar,
    Tag,
    Upload,
    Eye,
} from "lucide-react";

import { documentSchema } from "../validation/document.schema";

const DocumentForm = ({ defaultValues, onSubmit, modalMode }) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
    } = useForm({
        resolver: zodResolver(documentSchema),
        defaultValues,
    });

    const isPublic = watch("isPublic");

    return (
        <form id="document-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Document Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Document Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Document Name */}
                    <Input
                        label="Document Name"
                        {...register("name")}
                        error={errors.name?.message}
                        leftIcon={<FileText className="w-4 h-4" />}
                        placeholder="e.g., Lease Agreement - John Doe"
                    />

                    {/* Document Type */}
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Select
                                label="Document Type"
                                value={field.value}
                                onChange={field.onChange}
                                options={[
                                    { value: "lease", label: "Lease" },
                                    { value: "invoice", label: "Invoice" },
                                    { value: "maintenance", label: "Maintenance" },
                                    { value: "contract", label: "Contract" },
                                    { value: "insurance", label: "Insurance" },
                                    { value: "permit", label: "Permit" },
                                    { value: "other", label: "Other" },
                                ]}
                                error={errors.type?.message}
                                placeholder="Select document type"
                                leftIcon={<FileText className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-primary">
                        File Upload
                    </label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setValue("file", file);
                                }
                            }}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="flex items-center px-4 py-2 border border-border-color rounded-default transition-colors"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                        </label>
                        <span className="text-sm text-secondary">
                            {watch("file")?.name || "No file selected"}
                        </span>
                    </div>
                    {errors.file && (
                        <p className="text-sm text-danger">{errors.file.message}</p>
                    )}
                    <p className="text-xs text-secondary">
                        Supported formats: PDF, DOC, DOCX, JPG, PNG, GIF (Max 10MB)
                    </p>
                </div>
            </div>

            {/* Association Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Association Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Tenant Select */}
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
                                    { value: "1", label: "John Doe" },
                                    { value: "2", label: "Jane Smith" },
                                    { value: "3", label: "Bob Johnson" },
                                ]}
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
                                label="Building (Optional)"
                                value={field.value}
                                searchable
                                onChange={field.onChange}
                                options={[
                                    { value: "1", label: "Sunset Apartments" },
                                    { value: "2", label: "Oakwood Residences" },
                                    { value: "3", label: "Maple Grove Towers" },
                                ]}
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
                                label="Apartment (Optional)"
                                value={field.value}
                                searchable
                                onChange={field.onChange}
                                options={[
                                    { value: "1", label: "101" },
                                    { value: "2", label: "202" },
                                    { value: "3", label: "303" },
                                ]}
                                placeholder="Select an apartment"
                                leftIcon={<Home className="w-4 h-4" />}
                            />
                        )}
                    />
                </div>
                {errors.tenantId && (
                    <p className="text-sm text-danger">{errors.tenantId.message}</p>
                )}
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
                <h4 className="text-lg font-medium text-primary border-b border-color pb-2">
                    Additional Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Expiration Date */}
                    <Controller
                        name="expiresAt"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Expiration Date (Optional)"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.expiresAt?.message}
                                leftIcon={<Calendar className="w-4 h-4" />}
                            />
                        )}
                    />

                    {/* Public Access Toggle */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-primary">
                            Public Access
                        </label>
                        <Controller
                            name="isPublic"
                            control={control}
                            render={({ field }) => (
                                <ToggleSwitch
                                    checked={field.value}
                                    onChange={field.onChange}
                                    label={field.value ? "Public" : "Private"}
                                />
                            )}
                        />
                        <p className="text-xs text-secondary">
                            {isPublic
                                ? "This document will be accessible to tenants"
                                : "This document is private and only accessible to staff"
                            }
                        </p>
                    </div>
                </div>

                {/* Tags */}
                <Input
                    label="Tags (Optional)"
                    {...register("tags")}
                    error={errors.tags?.message}
                    leftIcon={<Tag className="w-4 h-4" />}
                    placeholder="e.g., urgent, review, legal"
                />
            </div>

            {/* Description */}
            <TextArea
                label="Description (Optional)"
                {...register("description")}
                error={errors.description?.message}
                rows={3}
                placeholder="Enter a description for this document..."
            />
        </form>
    );
};

export default DocumentForm;
