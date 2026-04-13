import { z } from 'zod';

export const apartmentSchema = z.object({
  unit: z.string()
    .min(1, 'Unit must be at least 1 character')
    .max(20, 'Unit cannot exceed 20 characters'),
  buildingId: z.string()
    .min(1, 'Please select a building'),
  bedrooms: z.number()
    .min(0, 'Bedrooms must be 0 or more')
    .max(10, 'Bedrooms cannot exceed 10'),
  bathrooms: z.number()
    .min(0.5, 'Bathrooms must be at least 0.5')
    .max(10, 'Bathrooms cannot exceed 10'),
  sqft: z.number()
    .min(100, 'Sqft must be at least 100')
    .max(10000, 'Sqft cannot exceed 10000'),
  rent: z.number()
    .min(0, 'Rent must be 0 or more'),
  status: z.enum(['Vacant', 'Occupied', 'Maintenance', 'Reserved'], {
    errorMap: () => ({ message: 'Please select a valid status' })
  }),
  floor: z.number()
    .min(1, 'Floor must be at least 1')
    .max(100, 'Floor cannot exceed 100'),
  amenities: z.array(z.string()).optional(),
  description: z.string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  tenantId: z.string().optional(),
});
