import express from "express";
import {
  createReview,
  getReviewsByProperty,
  getAllSiteReviews,
} from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST /reviews - Create a review (User must be logged in)
router.post("/", verifyJWT, createReview);

// GET /reviews/property/:propertyId - Get reviews for a specific property
router.get("/property/:propertyId", getReviewsByProperty);

// GET /reviews/site - Get global/homepage reviews
router.get("/site", getAllSiteReviews);

export default router;
