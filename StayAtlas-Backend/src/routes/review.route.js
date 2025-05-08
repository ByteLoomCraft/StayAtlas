import express from "express";
import {
  createReview,
  getReviewsByVilla,
  getAllSiteReviews,
  // getReviewsForVillaOwner,
  getAllReviewsForAdmin
} from "../controllers/review.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { isVillaOwner } from "../middlewares/villaOwner.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js"; 

const router = express.Router();

// ✅ Create Review for  (villa)
router.post("/villa", verifyJWT, createReview);

// ✅ Create Review for site (homepage/testimonial)
router.post("/site", verifyJWT, createReview);

// ✅ Get villa-specific reviews
router.get("/villa/:villaId", getReviewsByVilla);

// ✅ Get site reviews for homepage
router.get("/site", getAllSiteReviews);

// ✅ Get all reviews for villaOwner (their listed villa)
// router.get("/owner", verifyJWT, isVillaOwner, getReviewsForVillaOwner);

// ✅ Get all reviews for admin (site + villa)
router.get("/admin", verifyJWT, isAdmin, getAllReviewsForAdmin); // isAdmin middleware hona chahiye

export default router;
