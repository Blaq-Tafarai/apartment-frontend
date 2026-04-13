import { z } from 'zod';

export const buildingSchema = z.object({
  name: z.string()
    .min(2, 'Building name must be at least 2 characters')
    .max(100, 'Building name cannot exceed 100 characters'),
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address cannot exceed 200 characters'),
  units: z.number()
    .min(1, 'Units must be at least 1')
    .max(120, 'Units cannot exceed 120'),
  status: z.enum(['Active', 'Inactive', 'Under Construction'], {
    errorMap: () => ({ message: 'Please select a valid status' })
  }),
  yearBuilt: z.number()
    .min(1800, 'Year built must be 1800 or later')
    .max(new Date().getFullYear(), 'Year built cannot be in the future')
    .optional(),
  totalSqft: z.number()
    .min(100, 'Total sqft must be at least 100')
    .optional(),
  description: z.string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
});
