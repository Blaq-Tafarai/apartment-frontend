import { z } from 'zod';

export const tenantSchema = z.object({
  user: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    gender: z.string().optional(),
    emergencyName: z.string().optional(),
    emergencyPhone: z.string().optional(),
    emergencyRelationship: z.string().optional(),
  }),
  apartmentId: z.string(),
}).transform((data) => ({
  ...data.user,
  apartmentId: data.apartmentId,
}));
