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
  updateApprovalStatus
} from "../controllers/villa.controller.js";

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

export default router;
