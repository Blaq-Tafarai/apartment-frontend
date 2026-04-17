import { z } from 'zod';

export const apartmentSchema = z.object({
  unitNumber: z.string()
    .min(1, 'Unit is required')
    .max(20, 'Unit cannot exceed 20 characters'),

  buildingId: z
  .string()
  .optional()
  .refine((val) => !!val, {
    message: 'Select a building',
  }),

  bedrooms: z.number()
  .optional()
  .refine((val) => !!val, {
    message: 'Max bedrooms is required',
  })
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
    message: 'Max bedrooms must be a valid number with up to 2 decimal places',
  }),

  bathrooms: z.number()
    .optional()
    .refine((val) => !!val, {
      message: 'Max bathrooms is required',
    })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
      message: 'Max bathrooms must be a valid number with up to 2 decimal places',
    }),

  sqft: z.number()
    .optional()
    .refine((val) => !!val, {
      message: 'Sqft is required',
    })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
      message: 'Sqft must be a valid number with up to 2 decimal places',
    }),

  rent: z.number()
    .optional()
    .refine((val) => !!val, {
      message: 'Rent is required',
    })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
      message: 'Rent must be a valid number with up to 2 decimal places',
    }),

  status: z.enum(['available', 'occupied', 'under_maintenance', 'inactive'], {
      message: 'Status is required',
    }),

  floor: z.number()
    .optional()
    .refine((val) => !!val, {
      message: 'Floor is required',
    })
    .refine((val) => /^\d+$/.test(val || ''), {
      message: 'Floor must be a valid number',
    }),

  description: z.string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),

  amenities: z.array(z.string()).max(10, 'Max 10 amenities').optional(),
});

