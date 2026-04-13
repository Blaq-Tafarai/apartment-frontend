import { z } from 'zod';

export const licenseSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    type: z.string().min(1, 'Type is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().min(0, 'Price must be at least 0'),
    duration: z.number().min(1, 'Duration must be at least 1 month'),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
    maxBuildings: z.number().min(1, 'Max buildings must be at least 1'),
    maxTenants: z.number().min(1, 'Max tenants must be at least 1'),
    maxManagers: z.number().min(1, 'Max managers must be at least 1'),
    maxApartment: z.number().min(1, 'Max apartments must be at least 1'),
});