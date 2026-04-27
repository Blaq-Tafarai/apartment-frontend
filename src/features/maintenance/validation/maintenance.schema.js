import { z } from 'zod';

export const maintenanceSchema = z.object({
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

  category: z.enum(['electrical', 'hvac', 'plumbing', 'appliance', 'structural', 'general'], {
    message: 'Category is required',
  }),
  
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),

  priority: z.enum(['low', 'medium', 'high'], {
    message: 'Priority is required',
  }),

  status:  z.string().optional(),

  assignedTo: z.string().optional(),

  estimatedCost: z.string()
  .optional()
  .refine((val) => !!val, {
    message: 'Estimated cost is required',
  })
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
    message: 'Estimated cost must be a valid number with up to 2 decimal places',
  }),

  actualCost: z.string()
  .optional()
  .refine((val) => !!val, {
    message: 'Actual cost is required',
  })
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
    message: 'Actual cost must be a valid number with up to 2 decimal places',
  }),

  completedAt: z
  .string()
  .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val || ''), {
    message: 'Invalid completion date format',
  }).optional(),

  notes: z.string().max(2000, 'Notes must be less than 2000 characters').optional(),
});
