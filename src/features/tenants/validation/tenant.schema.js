import { z } from 'zod';

export const tenantSchema = z.object({
  userId: z.string()
    .min(1, 'Please select a user'),
  buildingId: z.string()
    .min(1, 'Please select a building'),
  apartmentId: z.string()
    .min(1, 'Please select an apartment'),
  status: z.enum(['Active', 'Inactive', 'Evicted', 'Pending'], {
    errorMap: () => ({ message: 'Please select a valid status' })
  }),
  emergencyContact: z.object({
    name: z.string().min(1, 'Emergency contact name is required'),
    phone: z.string().min(1, 'Emergency contact phone is required'),
    relationship: z.string().min(1, 'Emergency contact relationship is required'),
  }).optional(),
  notes: z.string()
    .max(1000, 'Notes cannot exceed 1000 characters')
    .optional(),
  documents: z.array(z.string()).optional(),
});
