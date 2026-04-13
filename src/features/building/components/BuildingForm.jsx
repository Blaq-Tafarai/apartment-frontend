import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input, { NumberInput } from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import TextArea from '../../../components/ui/TextArea';
import Button from '../../../components/ui/Button';
import {
  Building,
  LocateIcon,
  Stamp,
  Timer,
  UnfoldVerticalIcon,
} from 'lucide-react';

import { buildingSchema } from '../validation/building.schema';

const BuildingForm = ({ defaultValues, onSubmit, modalMode }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(buildingSchema),
    defaultValues,
  });

  return (
    <form
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

        <NumberInput
          label="Units"
          {...register('units', { valueAsNumber: true })}
          error={errors.units?.message}
          min={1}
          max={120}
          step={1}
          leftIcon={<UnfoldVerticalIcon className="w-4 h-4" />}
          placeholder="e.g., 10"
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
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
                {
                  value: 'Under Construction',
                  label: 'Under Construction',
                },
                { value: 'Maintenance', label: 'Maintenance' },
              ]}
              error={errors.status?.message}
            />
          )}
        />

        <NumberInput
          label="Year Built"
          {...register('yearBuilt', { valueAsNumber: true })}
          error={errors.yearBuilt?.message}
          min={1800}
          max={new Date().getFullYear()}
          leftIcon={<Timer className="w-4 h-4" />}
          placeholder="e.g., 1990"
        />

        <NumberInput
          label="Total Sqft"
          {...register('totalSqft', { valueAsNumber: true })}
          error={errors.totalSqft?.message}
          min={100}
          step={50}
          leftIcon={<Stamp className="w-4 h-4" />}
          placeholder="e.g., 1500"
        />
      </div>

      <TextArea
        label="Description"
        {...register('description')}
        error={errors.description?.message}
        rows={3}
        placeholder="Enter a description..."
      />

      <div className="pt-4 flex justify-end">
        <Button
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Saving...' : modalMode === 'edit' ? 'Update Building' : 'Create Building'}
        </Button>
      </div>
    </form>
  );
};

export default BuildingForm;
