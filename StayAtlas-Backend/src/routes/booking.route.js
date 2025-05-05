import express from 'express';
import {
  checkBookingAvailability,
  createBooking,
  getBookingById,
  getUserBookings,
  getBookingByIdAdmin,
  getAllBookingAdmin,
  cancelBooking,
  confirmPayment,
} from '../controllers/booking.controller.js';

import { verifyJWT } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/admin.middleware.js';

const router = express.Router();


//  Public: Check villa availability
router.get('/check-availability/:villaId',verifyJWT, checkBookingAvailability);

//  Authenticated users only
router.post('/', verifyJWT, createBooking);

//  Authenticated users only (can only see own booking)
router.get('/:id', verifyJWT, getBookingById);

//  Authenticated users can see their own bookings
router.get('/user/:userId', verifyJWT, getUserBookings);

//  Admin only: View a booking by ID
router.get('/admin/:id', verifyJWT, isAdmin, getBookingByIdAdmin);

//  Admin only: View all booking 
router.get('/admin', verifyJWT, isAdmin, getAllBookingAdmin);


//  Authenticated users can cancel
router.patch('/:id/cancel', verifyJWT, cancelBooking);

//  Authenticated users confirm payment
router.patch('/:id/pay', verifyJWT, confirmPayment);


export default router;
