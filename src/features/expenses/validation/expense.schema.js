import { z } from 'zod';

export const expenseSchema = z.object({
  buildingId: z.string().optional(),
  category: z.enum(['Maintenance', 'Utilities', 'Insurance', 'Taxes', 'Repairs', 'Supplies', 'Other'], {
    errorMap: () => ({ message: 'Please select a valid category' })
  }),
  vendor: z.string()
    .min(1, 'Vendor is required')
    .max(100, 'Vendor name cannot exceed 100 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .max(500, 'Description cannot exceed 500 characters'),
  amount: z.number()
    .min(0.01, 'Amount must be greater than 0')
    .max(100000, 'Amount must be less than $100,000'),
  paymentMethod: z.enum(['Cash', 'Check', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Online', 'Other'], {
    errorMap: () => ({ message: 'Please select a valid payment method' })
  }),
  paymentStatus: z.enum(['Pending', 'Approved', 'Paid', 'Overdue', 'Cancelled'], {
    errorMap: () => ({ message: 'Please select a valid payment status' })
  }).default('Pending'),
  dueDate: z.date({
    required_error: 'Due date is required',
    invalid_type_error: 'Due date must be a valid date',
  }),
  paidAt: z.date().optional(),
  recurring: z.boolean().default(false),
  recurrenceFrequency: z.enum(['Weekly', 'Monthly', 'Quarterly', 'Yearly']).optional(),
  invoiceNumber: z.string()
    .max(50, 'Invoice number cannot exceed 50 characters')
    .optional(),
  invoiceUrl: z.string()
    .url('Please enter a valid URL')
    .optional(),
  notes: z.string()
    .max(1000, 'Notes cannot exceed 1000 characters')
    .optional(),
}).refine((data) => {
  if (data.recurring && !data.recurrenceFrequency) {
    return false;
  }
  return true;
}, {
  message: 'Recurrence frequency is required for recurring expenses',
  path: ['recurrenceFrequency'],
});
