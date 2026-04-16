import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 30 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required').max(20, 'Phone number must be less than 20 characters'),
  role: z.enum(['admin', 'manager', 'tenant'], {
    message: 'Role is required',
  }),
  status: z.enum(['active', 'inactive'], {
    message: 'Status is required',
  }),
});

export const createUserSchema = userSchema;
export const updateUserSchema = userSchema.partial().refine(data => data.name || data.email || data.role || data.status, {
  message: 'At least one field must be provided for update'
});

