import { z } from 'zod';

export const expenseSchema = z.object({
  buildingId: z
  .string()
  .optional()
  .refine((val) => !!val, {
    message: 'Building is required',
  }),

  category: z.enum(['security', 'cleaning', 'utilities', 'repairs'], {
    message: 'Category is required',
  }),

  description: z.string()
  .optional()
  .refine((val) => !!val, {
    message: 'Description is required',
  }),
    
  amount: z.number()
  .optional()
  .refine((val) => !!val, {
    message: 'Amount is required',
  })
  .refine((val) => /^\d+$/.test(val || ''), {
    message: 'Amount must be a valid number with up to no decimal places',
  }),

  paymentMethod: z.enum(['cash', 'card', 'bank_transfer', 'mobile_money'], {
    message: 'Payment method is required',
  }),
});
