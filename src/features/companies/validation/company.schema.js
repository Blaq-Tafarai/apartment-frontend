import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(1, 'Company name is required').max(100, 'Company name must be less than 100 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  phone: z.string().min(1, 'Phone number is required').regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format'),
  address: z.string().min(1, 'Address is required').max(255, 'Address must be less than 255 characters'),
  status: z.enum(['active', 'inactive', 'suspended'], {
    message: 'Status is required',
  }),
});
