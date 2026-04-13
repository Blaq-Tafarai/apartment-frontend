import { z } from 'zod';

export const invoiceSchema = z.object({
  tenantId: z.string().min(1, 'Tenant is required'),
  buildingId: z.string().min(1, 'Building is required'),
  apartmentId: z.string().min(1, 'Apartment is required'),
  invoiceNumber: z.string()
    .min(1, 'Invoice number is required')
    .max(50, 'Invoice number cannot exceed 50 characters'),
  amount: z.number()
    .min(0.01, 'Amount must be greater than 0')
    .max(100000, 'Amount must be less than $100,000'),
  dueDate: z.date({
    required_error: 'Due date is required',
    invalid_type_error: 'Due date must be a valid date',
  }),
  issueDate: z.date({
    required_error: 'Issue date is required',
    invalid_type_error: 'Issue date must be a valid date',
  }),
  status: z.enum(['Pending', 'Paid', 'Overdue', 'Cancelled'], {
    errorMap: () => ({ message: 'Please select a valid status' })
  }).default('Pending'),
  description: z.string()
    .min(1, 'Description is required')
    .max(500, 'Description cannot exceed 500 characters'),
  notes: z.string()
    .max(1000, 'Notes cannot exceed 1000 characters')
    .optional(),
}).refine((data) => data.dueDate >= data.issueDate, {
  message: 'Due date cannot be before issue date',
  path: ['dueDate'],
});
