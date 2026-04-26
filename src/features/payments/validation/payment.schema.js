import { z } from 'zod';

export const paymentSchema = z.object({
  billingId: z
  .string()
  .optional()
  .refine((val) => !!val, {
    message: 'Billing is required',
  }),
  
  amount: z.number()
    .optional()
    .refine((val) => !!val, {
      message: 'Monthly rent is required',
    })
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val || ''), {
      message: 'Monthly rent must be a valid number with up to 2 decimal places',
    }),

  paymentMethod: z.enum(['cash', 'mobile_money', 'card', 'bank_transfer'], {
    message: 'Payment method is required',
  }),
});
