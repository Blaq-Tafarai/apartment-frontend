import { z } from 'zod';

export const leaseSchema = z.object({
  tenantId: z
  .string()
  .optional()
  .refine((val) => !!val, {
    message: 'Select a tenant',
  }),

  apartmentId: z
  .string()
  .optional()
  .refine((val) => !!val, {
    message: 'Select an apartment',
  }),


  startDate: z.coerce.date({
    required_error: "Start date is required",
  }).optional(),

  endDate: z.coerce.date({
    required_error: "End date is required",
  }).optional(),

  rentAmount: z.string()
    .optional()
    .refine((val) => !!val, {
      message: 'Monthly rent is required',
    })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
      message: 'Monthly rent must be a valid number with up to 2 decimal places',
    }),

  securityDeposit: z.string()
    .optional()
    .refine((val) => !!val, {
      message: 'Security deposit is required',
    })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
      message: 'Security deposit must be a valid number with up to 2 decimal places',
    }).optional(),

  terms: z.string()
    .min(10, 'Terms must be at least 10 characters')
    .max(5000, 'Terms must be less than 5000 characters').optional(),

}).refine((data) => {
  if (!data.startDate || !data.endDate) return true;
  return data.endDate > data.startDate;
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
});
