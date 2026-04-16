import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input, { NumberInput } from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import TextArea from '../../../components/ui/TextArea';
import {
  Building,
  LocateIcon,
  Stamp,
  Timer,
  UnfoldVerticalIcon,
} from 'lucide-react';
import React from 'react';

import { buildingSchema } from '../validation/building.schema';

const BuildingForm = ({ defaultValues, onSubmit, modalMode }) => {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(buildingSchema),
    defaultValues: defaultValues || {},
  });

  // Reset form when defaultValues change
  React.useEffect(() => {
    reset(defaultValues || {});
  }, [defaultValues, reset]);

  return (
    <form
      id="building-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Building Name"
          {...register('name')}
          error={errors.name?.message}
          leftIcon={<Building className="w-4 h-4" />}
          placeholder="e.g., Sunset Apartments"
        />

        <Input
          label="Address"
          {...register('address')}
          error={errors.address?.message}
          leftIcon={<LocateIcon className="w-4 h-4" />}
          placeholder="e.g., 123 Main St, City, State"
        />

        <Controller
          name="units"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Units"
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target?.value ? Number(e.target.value) : null)}
              error={errors.units?.message}
              min={1}
              max={120}
              step={1}
              leftIcon={<UnfoldVerticalIcon className="w-4 h-4" />}
              placeholder="e.g., 10"
            />
          )}
        />

        {/* Custom Select → Controller */}
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
                {
                  value: 'under_construction',
                  label: 'Under Construction',
                },
                { value: 'maintenance', label: 'Maintenance' },
              ]}
              error={errors.status?.message}
            />
          )}
        />

        <Controller
          name="yearBuilt"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Year Built"
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target?.value ? Number(e.target.value) : null)}
              error={errors.yearBuilt?.message}
              min={1800}
              max={new Date().getFullYear()}
              leftIcon={<Timer className="w-4 h-4" />}
              placeholder="e.g., 1990"
            />
          )}
        />

        <Controller
          name="totalSqft"
          control={control}
          render={({ field }) => (
            <NumberInput
              label="Total Sqft"
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target?.value ? Number(e.target.value) : null)}
              error={errors.totalSqft?.message}
              min={100}
              step={50}
              leftIcon={<Stamp className="w-4 h-4" />}
              placeholder="e.g., 1500"
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

export default BuildingForm;
