import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property", // hotel/villa 
      required: false,
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
        default: false,
      },

      avatar: {
        type: String,
        default: "", // Optional: default avatar URL
      },
      
  },
  { timestamps: true }
);

// Allow only 1 review per user per property (but allow multiple site reviews)
reviewSchema.index({ property: 1, user: 1 }, {
  unique: true,
  partialFilterExpression: { property: { $type: "objectId" } },
});                                                             

export const Review = mongoose.model("Review", reviewSchema);


