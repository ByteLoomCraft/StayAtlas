import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(1),
  landmark: z.string().optional(),
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
  //ownerId:z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  address: addressSchema,
  images: z.array(z.string().url()).min(4),
  amenities: z.array(z.string()).min(4),
  villaType:z.string().min(1),
});

export const adminUpdateVillaSchema = createVillaSchema.extend({
  location_coordinates: z.array(z.number()).length(2),
  pricePerNight:z.number().min(1),
  category:z.string().min(1),
  discountPercent:z.number().optional(),
  promotionText:z.string().optional(),
  isExclusive:z.boolean(),
  approvalComment:z.string().optional()
})

export const updateVillaSchema = createVillaSchema.partial();
