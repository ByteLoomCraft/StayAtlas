import { z } from "zod";

const AddressSchema = z.object({
  street: z.string().min(1),
  landmark: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  zipcode: z.string().min(1),
});

export const OwnerVillaSchema = z.object({
  villaOwner:z.string().min(1),
  villaName: z.string().min(1),
  description: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional(),
  email: z.string().email().optional(),
  numberOfRooms: z.string().optional(),
  images: z.array(z.string()).optional(),
  address: AddressSchema,
  amenities: z.array(z.string()).optional(),
  propertyType: z.string().optional(),
});

// For owner update — all fields optional
export const UpdateOwnerVillaSchema = OwnerVillaSchema.partial();

export const AdminVillaSchema = OwnerVillaSchema.extend({
  pricePerNight: z.number().min(0),
  category: z.array(z.string()).optional(),
  availability: z.array(
    z.object({
      start: z.string().or(z.date()),
      end: z.string().or(z.date()),
      isAvailable: z.boolean().optional(),
    })
  ).optional(),
  discountPercent: z.number().min(0).max(100).optional(),
  promotionText: z.string().optional(),
  isExclusive: z.boolean().optional(),
  approvalStatus: z.enum(["pending", "approved", "rejected"]).optional(),
  approvalComment: z.string().optional(),
});

// For admin update — all fields optional
export const UpdateAdminVillaSchema = AdminVillaSchema.partial();