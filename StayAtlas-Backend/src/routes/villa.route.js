import express from "express";
import {
  createVilla,
  updateVilla,
  deleteVilla,
  getAllApprovedVillas,
  getApprovedVillaById,
} from "../controllers/villa.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();




// PROTECTED ROUTES
router.post("/", verifyJWT, createVilla); // Owner or Admin can create
router.put("/:id", verifyJWT, updateVilla); // Owner or Admin can update
router.delete("/:id", verifyJWT, deleteVilla); // Owner or Admin can delete
router.get("/", verifyJWT, getAllApprovedVillas); // All approved and non-deleted villas
router.get("/:id", verifyJWT, getApprovedVillaById); // Approved villa by ID

export default router;
