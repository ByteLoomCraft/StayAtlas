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
  villaOwner:{
    type: String,
    required:true
  },
  villaName: {
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

  isExclusive: {
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
  isDeleted:{
    type:Boolean,
    default:false
  },
  approvedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  approvedAt:{
    type: Date
  },
  rejectedReason:{
    type: String
  },
  rejectedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  }

}, {
  timestamps: true,
  versionKey:false
});

villaSchema.index({ location_coordinates: "2dsphere" });

export const Villa = mongoose.model("Villa", villaSchema);
