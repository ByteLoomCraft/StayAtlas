import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// @desc    Create a new review (site-wide or villa-specific)
// @route   POST /api/v1/reviews
// @access  Private (Logged-in user)

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, villaId, isSiteReview } = req.body;

  // Validation for rating and either villaId or site review flag
  if (!rating || (!villaId && !isSiteReview)) {
    throw new ApiError(400, "Rating and either villa ID or site review flag required");
  }

  // Check if it's a site review
  if (isSiteReview) {
    const existingSiteReview = await Review.findOne({ user: req.user._id, isSiteReview: true });
    if (existingSiteReview) {
      throw new ApiError(400, "You have already reviewed the site.");
    }
  } else {
    // If it's a villa review, check if the villaId is provided
    if (!villaId) {
      throw new ApiError(400, "Villa ID is required for villa review.");
    }

    // Check if the user has already reviewed this villa
    const existingVillaReview = await Review.findOne({ user: req.user._id, villa: villaId });
    if (existingVillaReview) {
      throw new ApiError(400, "You have already reviewed this villa.");
    }
  }

  // Create the review based on whether it's a site or villa review
  const review = await Review.create({
    rating,
    comment,
    villa: isSiteReview ? null : villaId,
    isSiteReview: isSiteReview || false,
    user: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, review, "Review created"));
});


// @desc    Get all reviews for a specific villa (hotel/villa)
// @route   GET /api/v1/reviews/villa/:villaId
// @access  Public

export const getReviewsByVilla = asyncHandler(async (req, res) => {
  const { villaId } = req.params;

  const reviews = await Review.find({
    villa: villaId,
    isSiteReview: false,
  })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, reviews));
});


// @desc    Get global site/homepage reviews (testimonials)
// @route   GET /api/v1/reviews/site
// @access  Public

export const getAllSiteReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ isSiteReview: true })
    .populate("user", "name avatar")
    .sort({ createdAt: -1 })
    .limit(10); // You can make this dynamic later if you implement pagination

  res.status(200).json(new ApiResponse(200, reviews));
});

// @desc    Get reviews for villas owned by the logged-in villa owner
// @route   GET /api/v1/reviews/villa-owner
// @access  Private (villaOwner only)

// export const getReviewsForVillaOwner = asyncHandler(async (req, res) => {
//   // Fetch villas owned by the current user
//   const villas = await Villa.find({ ownerId: req.user._id }).select("_id");

//   const villaIds = villas.map(v => v._id);

//   // Fetch reviews for these villas
//   const reviews = await Review.find({
//     villa: { $in: villaIds },
//     isSiteReview: false,
//   })
//     .populate("user", "name avatar")
//     .populate("villa", "title")
//     .sort({ createdAt: -1 });

//   res.status(200).json(new ApiResponse(200, reviews, "Reviews for your listed villas"));
// });



// @desc    Admin - Get all reviews in the system (site + villa)
// @route   GET /api/v1/reviews/admin
// @access  Private (admin only)

export const getAllReviewsForAdmin = asyncHandler(async (req, res) => {
  const reviews = await Review.find({})
    .populate("user", "name avatar")
    .populate("villa", "title")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, reviews, "All reviews in system"));
});
