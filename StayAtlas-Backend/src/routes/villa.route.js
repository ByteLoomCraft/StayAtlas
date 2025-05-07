import express from "express";
import {
  createVilla,
  updateVilla,
  deleteVilla,
  getAllApprovedVillas,
  getApprovedVillaById,
  getMyVillas
} from "../controllers/villa.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { canListVilla } from "../middlewares/villaOwner.middleware.js";
import { parseAddressBody } from "../middlewares/parse.address.middleware.js";

const router = express.Router();

// PROTECTED ROUTES
router.post("/create-villa", verifyJWT, canListVilla, upload.array('images',10),createVilla); // Owner can create
router.get("/my-villas", verifyJWT, getMyVillas);
router.put("/:id", verifyJWT, updateVilla); // Owner  can update
router.delete("/:id", verifyJWT, deleteVilla); // Owner can delete
router.get("/", verifyJWT, getAllApprovedVillas); // All approved and non-deleted villas
router.get("/:id", verifyJWT, getApprovedVillaById); // Approved villa by ID

export default router;
