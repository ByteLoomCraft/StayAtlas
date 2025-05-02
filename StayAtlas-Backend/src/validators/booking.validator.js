import { z } from 'zod';

export const createBookingSchema = z.object({
  villa: z.string({ required_error: "Villa ID is required" }).min(1, "Villa ID is required"),

  checkIn: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Check-in date must be valid",
  }),

  checkOut: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Check-out date must be valid",
  }),

  guests: z.object({
    adults: z.number().min(1, "At least 1 adult is required"),
    children: z.number().optional().default(0),
  }),

  pricePerNightAtBooking: z.number({ required_error: "Price per night is required" }),

  nights: z.number().min(1, "Number of nights must be at least 1"),

  discountPercentApplied: z.number().min(0).max(100).optional(),

  couponCode: z.string().optional(),

  totalAmount: z.number({ required_error: "Total amount is required" }),

  paymentMethod: z.enum(["Card", "UPI", "NetBanking", "Cash"]).optional()
}).refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
  message: "Check-out must be after check-in",
  path: ["checkOut"],
});
