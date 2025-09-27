import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  role: z.enum(['Admin', 'Dispatcher', 'Driver']),
});

export const optimalLoadSchema = z.object({
  truckDimensions: z.string().min(1, 'Truck dimensions are required.'),
  packages: z.array(z.object({
    id: z.string().min(1, 'Package ID is required.'),
    dimensions: z.string().min(1, 'Package dimensions are required.'),
    weight: z.coerce.number().min(0.1, 'Package weight is required.'),
    deliveryOrder: z.coerce.number().int().min(1, 'Delivery order must be a positive integer.'),
  })).min(1, 'At least one package is required.'),
  constraints: z.string().optional(),
});

export const deliveryPredictionSchema = z.object({
    historicalData: z.string().min(1, 'Historical data is required.'),
    realTimeTraffic: z.string().min(1, 'Real-time traffic data is required.'),
    weatherConditions: z.string().min(1, 'Weather conditions are required.'),
    deliveryAddress: z.string().min(1, 'Delivery address is required.'),
    packageDetails: z.string().min(1, 'Package details are required.'),
});

export const documentRecognitionSchema = z.object({
  documentType: z.string().min(1, 'Document type is required.'),
  photo: z.any()
    .refine((files) => files?.length === 1, 'Document photo is required.')
    .refine((files) => files?.[0]?.type.startsWith('image/'), 'Only image files are accepted.'),
});
