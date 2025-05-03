import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    villa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Villa',
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      adults: { type: Number, default: 1, min: 1 },
      pets: { type: Number, default: 0 },
      children: { type: Number, default: 0 },
    },
    
    pricePerNightAtBooking: {
      type: mongoose.Types.Decimal128,
      required: true,
    },

    nights: {
      type: Number,
      required: true,
    },

    discountPercentApplied: {
      type: Number,
      default: 0,
    },

    couponCode: {
      type: String,
    },

    totalAmount: {
      type: mongoose.Types.Decimal128,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'UPI', 'Paypal', 'Cash'],
      default: 'Credit Card',
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
    versionKey:false
  }
);

// Virtual to populate villa details
bookingSchema.virtual('villaDetails', {
  ref: 'Villa',
  localField: 'villa',
  foreignField: '_id',
  justOne: true,
});

// Indexes
bookingSchema.index({ villa: 1, checkIn: 1 });
bookingSchema.index({ user: 1, status: 1 });

export default mongoose.model('Booking', bookingSchema);
