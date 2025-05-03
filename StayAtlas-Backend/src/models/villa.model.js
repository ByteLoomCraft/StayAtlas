import mongoose from "mongoose";
import { type } from "os";
import { date } from "zod";

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zipcode: String,
}, { _id: false });

const availabilitySchema = new mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  isAvailable: { type: Boolean, default: true },
}, { _id: false });

const villaSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: { type: String, required: true },
  description: { type: String },
  address: addressSchema,
  location_coordinates: {
    type: [Number],
    required: true,
    validate: {
      validator: v => v.length === 2,
      message: props => `${props.value} must be [longitude, latitude]`
    }
  },
  images: [String],
  amenities: [String],
  pricePerNight: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  category: [String],
  availability: [availabilitySchema],
  discountPercent: {
    type: Number,
    default: 0
  },
  promotionText: {
    type: String
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  priceHistory: [{
    date: { type: Date, default: Date.now },
    price: mongoose.Types.Decimal128
  }],
  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  approvalComment: {
    type: String,
    default: ""
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  approvedAt: {
    type:date
  }
}, { timestamps: true });

villaSchema.pre("save", function(next) {
  this.slug = this.name.toLowerCase().replace(/ /g, "-");
  next();
});

export const Villa = mongoose.model("Villa", villaSchema);
