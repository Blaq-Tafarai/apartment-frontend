import { z } from 'zod';

export const subscriptionSchema = z.object({
organizationId: z
  .string()
  .optional()
  .refine((val) => !!val, {
    message: 'Select an organization/company',
  }),
  planName: z.string().min(1, 'Plan name is required').max(100, 'Plan name must be less than 100 characters'),

  billingCycle: z.enum(['monthly', 'quarterly', 'yearly'], {
    message: 'Billing cycle is required',
  }),

  price: z.string()
  .optional()
  .refine((val) => !!val, {
    message: 'Price is required',
  })
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
    message: 'Price must be a valid number with up to 2 decimal places',
  }),

  startDate: z
  .string()
  .optional()
  .refine((val) => !!val, {
    message: 'Start date is required',
  })
  .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val || ''), {
    message: 'Invalid start date format',
  }),

  endDate: z
    .string()
    .optional()
    .refine((val) => !!val, {
      message: 'End date is required',
    })
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val || ''), {
      message: 'Invalid end date format',
    }),
    status: z.enum(['active', 'inactive', 'cancelled', 'expired'], {
      message: 'Status is required',
    }).optional(),
  });

