import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  landmark: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipcode: { type: String, required: true },
}, { _id: false });

const availabilitySchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  isAvailable: { type: Boolean, default: true }
}, { _id: false });

const villaSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
  },

  phoneNumber: {
    type: String,
  },

  email: {
    type: String,
  },

  numberOfRooms: {
    type: Number,
  },

  images: [{
    type: String,
  }],

  address: {
    type: addressSchema,
    required: true,
  },

  amenities: [{
    type: String,
  }],

  propertyType: {
    type: String,
  },

  pricePerNight: {
    type: Number,
  },

  category: [{
    type: String,
  }],

  availability: [availabilitySchema],

  discountPercent: {
    type: Number,
    min: 0,
    max: 100,
  },

  promotionText: {
    type: String,
  },

  isTrending: {
    type: Boolean,
    default: false,
  },

  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  approvalComment: {
    type: String,
  },

}, {
  timestamps: true,
});

villaSchema.index({ location_coordinates: "2dsphere" });

export const Villa = mongoose.model("Villa", villaSchema);
