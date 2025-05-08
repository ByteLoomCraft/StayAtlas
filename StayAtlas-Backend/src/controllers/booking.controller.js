import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createBookingSchema } from "../validators/booking.validator.js";
import Booking from "../models/booking.model.js";
import {Villa} from '../models/villa.model.js';
import {User} from '../models/user.model.js';

//  desc    Create a new booking
//  route   POST /api/v1/bookings
//  access  Private

export const createBooking = asyncHandler(async (req, res) => {
  const {
    villa,
    checkIn,
    checkOut,
    guests,
    pricePerNightAtBooking,
    nights,
    discountPercentApplied = 0,
    couponCode,
    paymentMethod,
  } = req.body;

  // ✅ Step 1: Validate input using Zod schema
  const parsedData = createBookingSchema.safeParse({
    villa,
    checkIn,
    checkOut,
    guests,
    pricePerNightAtBooking,
    nights,
    discountPercentApplied,
    couponCode,
    paymentMethod,
  });

  if (!parsedData.success) {
    throw new ApiError(400, parsedData.error.errors[0].message);
  }

  // ✅ Step 2: Date conversion and logic check
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkOutDate <= checkInDate) {
    throw new ApiError(400, "Check-out date must be after check-in date");
  }

 // ✅ Step 3: Overlapping booking check
const existingBooking = await Booking.findOne({
  villa,
  status: { $ne: "Cancelled" },
  $or: [
    {
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate }
    }
  ]
});

if (existingBooking) {
  return res.status(400).json({
    success: false,
    message: "Villa is already booked in the selected date range. Please select a different date.",
  });
}


  // ✅ Step 4: Calculate total amount
  const price = parseFloat(pricePerNightAtBooking);
  // const subTotal = price * nights * guests;
  const subTotal = price * nights ;
  const discount = subTotal * (discountPercentApplied / 100);
  const gst = (subTotal - discount) * 0.18;
  const totalAmount = subTotal - discount + gst;

  // Fetch villa details
const villaDetails = await Villa.findById(villa);

// Fetch user details
const userDetails = await User.findById(req.user._id);


  // ✅ Step 5: Create booking
  const booking = await Booking.create({
    villa,
    user: req.user._id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests,
    pricePerNightAtBooking,
    nights,
    discountPercentApplied,
    couponCode,
    totalAmount,
    paymentMethod,
  });

  // ✅ Step 6: Send response
  res.status(201).json(
    new ApiResponse(201, {
      booking,
      calculation: {
        subTotal,
        discount,
        gst,
        totalAmount
      },
      villaDetails, // Villa details response mein add karna
      userDetails, // User details response mein add karna
    }, "Booking created successfully")
  );
});




//  desc    Get a single booking by ID
//  route   GET /api/v1/bookings/:id

export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email')
    .populate('villa', 'name location images');

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  res.status(200).json(new ApiResponse(200, booking));
});

//  desc    Get all bookings for a specific user
//  route   GET /api/v1/bookings/user/:userId

export const getUserBookings = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const bookings = await Booking.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate('villa', 'name location images');

  res.status(200).json(new ApiResponse(200, bookings));
});

//  desc    Get a single booking by ID (Admin)
//  route   GET /api/v1/bookings/admin/:id

export const getBookingByIdAdmin = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email')
    .populate('villa', 'name location images');

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  res.status(200).json(new ApiResponse(200, booking));
});

//  desc    Get all bookings for admin
//  route   GET /api/v1/bookings/admin

export const getAllBookingAdmin = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate('user', 'name email')
    .populate('villa', 'name location images')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, bookings));
});


//  desc    Cancel a booking
//  route   PATCH /api/v1/bookings/:id/cancel

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  if (booking.status === 'Cancelled') {
    throw new ApiError(400, 'Booking already cancelled');
  }

  booking.status = 'Cancelled';
  await booking.save();

  res.status(200).json(new ApiResponse(200, booking, 'Booking cancelled successfully'));
});

//  desc    Confirm payment for a booking
//  route   PATCH /api/v1/bookings/:id/pay

export const confirmPayment = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  if (booking.isPaid) {
    throw new ApiError(400, 'Payment already confirmed');
  }

  booking.isPaid = true;
  booking.paidAt = new Date();
  booking.status = 'Confirmed';
  await booking.save();

  res.status(200).json(new ApiResponse(200, booking, 'Payment confirmed successfully'));
});

//  desc    Check villa availability between given dates
//  route   GET /api/v1/bookings/check-availability

export const checkBookingAvailability = asyncHandler(async (req, res) => {
  // console.log("Checking booking availability...", req.params, req.query);
  const { villaId } = req.params;
  const { checkIn, checkOut } = req.query;

  if (!checkIn || !checkOut) {
    throw new ApiError(400, "Check-in and check-out dates are required");
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  // Check for overlapping bookings
  const existingBooking = await Booking.findOne({
    villa: villaId,
    status: { $ne: "Cancelled" },
    $or: [
      {
        checkIn: { $lt: checkOutDate },
        checkOut: { $gt: checkInDate }
      }
    ]
  });

  const isAvailable = !existingBooking;

  return res.status(200).json(
    new ApiResponse(
      200,
      { isAvailable },
      isAvailable
        ? "Villa is available for booking"
        : "Villa is already booked in the selected date range"
    )
  );
});

