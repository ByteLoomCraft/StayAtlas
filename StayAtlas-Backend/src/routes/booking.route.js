import express from 'express';
import {
  createBooking,
  getBookingById,
  checkBookingAvailability,
  getUserBookings,
  cancelBooking,
  confirmPayment,
} from '../controllers/booking.controller.js';

// import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Check villa availability
router.get('/check-availability', checkBookingAvailability);

// Create new booking
router.post('/', createBooking);

// Get single booking by ID
router.get('/:id', getBookingById);

// Get all bookings for a user
router.get('/user/:userId',  getUserBookings);

// Cancel a booking          
router.patch('/:id/cancel', cancelBooking);

// Confirm payment
router.patch('/:id/pay', confirmPayment);


export default router;
