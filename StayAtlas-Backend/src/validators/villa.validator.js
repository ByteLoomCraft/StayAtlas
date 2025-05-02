import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  zipcode: z.string().min(4)
});

export const availabilitySchema = z.object({
  start: z.coerce.date(),
  end: z.coerce.date(),
  isAvailable: z.boolean()
});

export const createVillaSchema = z.object({
  ownerId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  address: addressSchema,
  location_coordinates: z.array(z.number()).length(2),
  images: z.array(z.string().url()).optional(),
  amenities: z.array(z.string()).optional(),
  pricePerNight: z.coerce.number().positive(),
  category: z.array(z.string()).optional(),
  availability: z.array(availabilitySchema).optional(),
  discountPercent: z.number().min(0).max(100).optional(),
  promotionText: z.string().optional()
});

export const updateVillaSchema = createVillaSchema.partial();
