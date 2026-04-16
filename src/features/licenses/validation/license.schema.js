import { z } from 'zod';

export const licenseSchema = z.object({
  organizationId: z.string().optional().refine((val) => !!val, {
    message: 'Select an organization',
  }),

  subscriptionId: z.string().optional().refine((val) => !!val, {
    message: 'Select a subscription',
  }),

  maxUsers: z.string()
  .optional()
  .refine((val) => !!val, {
    message: 'Max users is required',
  }),

  maxBuildings: z.string()
  .optional()
  .refine((val) => !!val, {
    message: 'Max buildings is required',
  })
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
    message: 'Max buildings must be a valid number with up to 2 decimal places',
  }),
  
  maxApartments: z.string()
  .optional()
  .refine((val) => !!val, {
    message: 'Max apartments is required',
  })
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
    message: 'Max apartments must be a valid number with up to 2 decimal places',
  }),

  features: z.object({
    reportExports: z.boolean(),
    cloudStorage: z.boolean(),
    apiAccess: z.boolean(),
  }),

  expiresAt: z.string()
  .optional()
  .refine((val) => !!val, {
    message: 'Start date is required',
  })
  .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val || ''), {
    message: 'Invalid start date format',
  }),
});

