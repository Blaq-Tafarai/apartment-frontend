import { z } from 'zod';

export const invoiceSchema = z.object({
  tenantId: z
  .string()
  .optional()
  .refine((val) => !!val, {
    message: 'Select a tenant',
  }),

  leaseId: z
  .string()
  .optional()
  .refine((val) => !!val, {
    message: 'Select a lease',
  }),

  amount: z.string()
  .optional()
  .refine((val) => !!val, {
    message: 'Amount is required',
  })
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
    message: 'Amount must be a valid number with up to 2 decimal places',
  }),

  issueDate: z.coerce.date({
    required_error: "Issue date is required",
  }).optional(),

  dueDate: z.coerce.date({
    required_error: "Due date is required",
  }).optional(),

  paidAt: z.coerce.date({
    required_error: "Paid date is required",
  }).optional(),

  status: z.string()
  .optional()
  .refine((val) => !!val, {
    message: 'Status is required',
  })
  .refine((val) => ['pending', 'paid', 'overdue', 'cancelled'].includes(val || ''), {
    message: 'Status must be one of: pending, paid, overdue, cancelled',  
  }),

  description: z.string()
  .max(5000, 'Description must be less than 5000 characters')
  .optional(),
});
