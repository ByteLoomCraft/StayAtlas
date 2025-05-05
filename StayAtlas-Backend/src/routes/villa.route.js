import express from "express";
import {
  createVilla,
  getAllApprovedVillas,
  getAllVillasAdmin,
  getVillaById,
  getVillaByIdAdmin,
  updateVilla,
  deleteVilla,
  checkVillaAvailability,
  updateApprovalStatus,
  villaExlusiveStatus
} from "../controllers/villa.controller.js";
import { mark } from "framer-motion/client";

const router = express.Router();

router.get("/", getAllApprovedVillas); // ---------- Public Routes ----------
router.post("/create", createVilla); // ---------- Public Routes ----------
router.get("/admin", getAllVillasAdmin); // ---------- Admin Routes ----------
router.get("/admin/:id", getVillaByIdAdmin); // ---------- Admin Routes ----------
router.get("/:id", getVillaById); // ---------- Public Routes ----------
router.get("/:id/availability", checkVillaAvailability); // ---------- Public Routes ----------
router.patch("/:id/approval", updateApprovalStatus); // ---------- Admin Routes ----------
router.put("/:id", updateVilla); // ---------- Admin Routes ----------
router.delete("/:id", deleteVilla); // ---------- Admin Routes ----------
router.post("/admin/:id/exlusiveStatus", villaExlusiveStatus); // ---------- Admin Routes ----------

export default router;
