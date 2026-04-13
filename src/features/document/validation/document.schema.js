import { z } from 'zod';

export const documentSchema = z.object({
  name: z.string()
    .min(1, 'Document name is required')
    .max(100, 'Document name cannot exceed 100 characters'),
  type: z.enum(['lease', 'invoice', 'maintenance', 'contract', 'insurance', 'permit', 'other'], {
    errorMap: () => ({ message: 'Please select a valid document type' })
  }),
  description: z.string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),
  tenantId: z.string().optional(),
  buildingId: z.string().optional(),
  apartmentId: z.string().optional(),
  file: z.any()
    .refine((file) => file instanceof File, 'Please select a file')
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB')
    .refine(
      (file) => ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type),
      'File must be a PDF, image, or Word document'
    ),
  tags: z.array(z.string()).optional(),
  isPublic: z.boolean().default(false),
  expiresAt: z.date().optional(),
}).refine((data) => {
  // At least one association (tenant, building, or apartment) must be selected
  return data.tenantId || data.buildingId || data.apartmentId;
}, {
  message: 'Please associate this document with at least one tenant, building, or apartment',
  path: ['tenantId'],
});
