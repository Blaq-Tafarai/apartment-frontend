import { z } from 'zod';

export const maintenanceSchema = z.object({
  tenantId: z.string().min(1, 'Tenant is required'),
  buildingId: z.string().min(1, 'Building is required'),
  apartmentId: z.string().min(1, 'Apartment is required'),
  category: z.enum(['Electrical', 'HVAC', 'Plumbing', 'Appliances', 'Structural', 'General'], {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),
  issue: z.string().min(1, 'Issue description is required').max(255, 'Issue description must be less than 255 characters'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'], {
    errorMap: () => ({ message: 'Please select a valid priority' }),
  }),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'ON_HOLD'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
  assignedTo: z.string().optional(),
  estimatedCost: z.number().min(0, 'Estimated cost must be positive').max(100000, 'Estimated cost must be less than $100,000').optional(),
  actualCost: z.number().min(0, 'Actual cost must be positive').max(100000, 'Actual cost must be less than $100,000').optional(),
  completedAt: z.date().optional(),
  notes: z.string().max(2000, 'Notes must be less than 2000 characters').optional(),
});
