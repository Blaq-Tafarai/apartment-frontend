import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(1, 'Company name is required').max(100, 'Company name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required').regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format'),
  address: z.string().min(1, 'Address is required').max(255, 'Address must be less than 255 characters'),
  adminUserId: z.string().min(1, 'Admin user is required'),
  status: z.enum(['active', 'inactive'], {
    errorMap: () => ({ message: 'Status must be either active or inactive' }),
  }),
});
