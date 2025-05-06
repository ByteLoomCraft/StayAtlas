import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

//  desc    Create a new review (User must be logged in)
//  route   POST /api/v1/reviews

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, propertyId, isSiteReview } = req.body;

  // Validation: Rating required, either site review or propertyId
  if (!rating || (!propertyId && !isSiteReview)) {
    throw new ApiError(400, "Rating and either property ID or site review flag required");
  }

  const review = await Review.create({
    rating,
    comment,
    property: isSiteReview ? null : propertyId,
    isSiteReview: isSiteReview || false,
    user: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, review, "Review created"));
});

//  desc    Get reviews for a specific property
//  route   GET /api/v1/reviews/property/:propertyId

export const getReviewsByProperty = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  const reviews = await Review.find({
    property: propertyId,
    isSiteReview: false,
  })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, reviews));
});

//  desc    Get global/homepage site reviews (testimonials)
//  route   GET /api/v1/reviews/site

export const getAllSiteReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ isSiteReview: true })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 })
    .limit(10);

  res.status(200).json(new ApiResponse(200, reviews));
});
