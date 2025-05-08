import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    villa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Villa",
      required: function() { return !this.isSiteReview },  // Only required if it's not a site review
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    isSiteReview: {
      type: Boolean,
      default: false,  // Default to false, if not provided will be considered as villa review
    },

    avatar: {
      type: String,
      default: "", // Optional: default avatar URL
    },
  },
  { timestamps: true }
);

// For villa reviews (1 per user per villa)
reviewSchema.index(
  { villa: 1, user: 1 },
  {
    unique: true,
    partialFilterExpression: { villa: { $type: "objectId" } },
  }
);

// For site reviews (1 per user)
reviewSchema.index(
  { user: 1 },
  {
    unique: true,
    partialFilterExpression: { isSiteReview: true },
  }
);

export const Review = mongoose.model("Review", reviewSchema);
