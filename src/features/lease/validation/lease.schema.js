import { z } from 'zod';

export const leaseSchema = z.object({
  tenantId: z.string().min(1, 'Tenant is required'),
  apartmentId: z.string().min(1, 'Apartment is required'),
  buildingId: z.string().min(1, 'Building is required'),
  startDate: z.date({
    required_error: 'Start date is required',
    invalid_type_error: 'Start date must be a valid date',
  }),
  endDate: z.date({
    required_error: 'End date is required',
    invalid_type_error: 'End date must be a valid date',
  }),
  monthlyRent: z.number()
    .min(1, 'Monthly rent must be greater than 0')
    .max(100000, 'Monthly rent must be less than $100,000'),
  securityDeposit: z.number()
    .min(0, 'Security deposit cannot be negative')
    .max(50000, 'Security deposit must be less than $50,000'),
  terms: z.string()
    .min(10, 'Terms must be at least 10 characters')
    .max(5000, 'Terms must be less than 5000 characters'),
  signatureDate: z.date().optional(),
  signedByTenant: z.boolean().default(false),
  signedByLandlord: z.boolean().default(false),
  landlordId: z.string().optional(),
}).refine((data) => data.endDate > data.startDate, {
  message: 'End date must be after start date',
  path: ['endDate'],
});
