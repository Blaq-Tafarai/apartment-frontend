import { z } from 'zod';

export const licenseSchema = z.object({
  organizationId: z.string().optional().refine((val) => !!val, {
    message: 'Select an organization',
  }),

  subscriptionId: z.string().optional().refine((val) => !!val, {
    message: 'Select a subscription',
  }),

  maxUsers: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
    z.number({ required_error: 'Max users is required', invalid_type_error: 'Max users must be a valid number' })
  ),

  maxBuildings: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
    z.number({ required_error: 'Max buildings is required', invalid_type_error: 'Max buildings must be a valid number' })
      .refine((val) => {
        const decimals = (val.toString().split('.')[1] || '').length;
        return decimals <= 2;
      }, { message: 'Max buildings must be a valid number with up to 2 decimal places' })
  ),

  maxApartments: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
    z.number({ required_error: 'Max apartments is required', invalid_type_error: 'Max apartments must be a valid number' })
      .refine((val) => {
        const decimals = (val.toString().split('.')[1] || '').length;
        return decimals <= 2;
      }, { message: 'Max apartments must be a valid number with up to 2 decimal places' })
  ),

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

