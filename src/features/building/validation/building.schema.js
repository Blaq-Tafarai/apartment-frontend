import { z } from 'zod';

export const buildingSchema = z.object({
  name: z.string()
    .min(1, 'Building name is required')
    .max(100, 'Building name cannot exceed 100 characters'),

  address: z.string()
    .min(1, 'Address is required')
    .max(200, 'Address cannot exceed 200 characters'),

  units: z.number()
  .optional()
  .refine((val) => !!val, {
    message: 'Units is required',
  })
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
    message: 'Units must be a valid number',
  }),

  status: z.enum(['active', 'under_construction', 'maintenance', 'inactive'], {
    message: 'Status is required',
  }),

  yearBuilt: z.number()
  .optional()
  .refine((val) => !!val, {
    message: 'Year built is required',
  })
  .refine((val) => !val || (parseInt(val, 10) >= 1800 && parseInt(val, 10) <= new Date().getFullYear()), {
    message: 'Must be a valid year',
  }),

  totalSqft: z.number()
  .optional()
  .refine((val) => !!val, {
    message: 'Total sqft is required',
  })
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
    message: 'Total sqft must be a valid number',
  }),

  description: z.string()
  .min(1, 'Description is required')
  .max(500, 'Description cannot exceed 500 characters'),
});

