import { z } from 'zod';

export const paymentSchema = z.object({
  tenantId: z.string().min(1, 'Tenant is required'),
  buildingId: z.string().min(1, 'Building is required'),
  apartmentId: z.string().min(1, 'Apartment is required'),
  amount: z.number()
    .min(0.01, 'Amount must be greater than 0')
    .max(100000, 'Amount must be less than $100,000'),
  type: z.enum(['Rent', 'Security Deposit', 'Late Fee', 'Maintenance Fee', 'Other'], {
    errorMap: () => ({ message: 'Please select a valid payment type' })
  }),
  method: z.enum(['Cash', 'Check', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Online Payment'], {
    errorMap: () => ({ message: 'Please select a valid payment method' })
  }),
  dueDate: z.date({
    required_error: 'Due date is required',
    invalid_type_error: 'Due date must be a valid date',
  }),
  paidAt: z.date().optional(),
  invoiceNumber: z.string()
    .min(1, 'Invoice number is required')
    .max(50, 'Invoice number cannot exceed 50 characters'),
  notes: z.string()
    .max(500, 'Notes cannot exceed 500 characters')
    .optional(),
  status: z.enum(['Pending', 'Completed', 'Failed', 'Refunded', 'Cancelled'], {
    errorMap: () => ({ message: 'Please select a valid status' })
  }).default('Pending'),
}).refine((data) => !data.paidAt || data.paidAt >= data.dueDate, {
  message: 'Paid date cannot be before due date',
  path: ['paidAt'],
});
