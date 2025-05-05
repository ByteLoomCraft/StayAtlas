import { Villa } from "../models/villa.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { OwnerVillaSchema, AdminVillaSchema, UpdateAdminVillaSchema, UpdateOwnerVillaSchema } from "../validators/villa.validator.js";
import {User} from "../models/user.model.js";

// Create a new villa (owners limited, admin full)
export const createVilla = asyncHandler(async (req, res) => {
  const isAdmin = req.user.role === "ADMIN";
  const schema = isAdmin ? AdminVillaSchema : OwnerVillaSchema;
  const validatedData = schema.parse(req.body);
  const userId = req.user?._id;

  const villa = await Villa.create({
    ...validatedData,
    ownerId: req.user._id,
    approvalStatus: isAdmin ? "approved" : "pending",
  });

const user = await User.findById(userId);
if (user && user.role === "defaultUser") {
  user.role = "villaOwner";
  await user.save();
}


  res.status(201).json(
    new ApiResponse(201, villa, "Villa created successfully")
  );
});

// Update villa by ID
export const updateVilla = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isAdmin = req.user.role === "ADMIN";

  const existingVilla = await Villa.findById(id);
  if (!existingVilla || existingVilla.isDeleted) {
    throw new ApiError(404, "Villa not found");
  }

  const isOwner = existingVilla.ownerId.toString() === req.user._id.toString();
  if (!isAdmin && !isOwner) {
    throw new ApiError(403, "You are not authorized to update this villa");
  }

  const schema = isAdmin ? UpdateAdminVillaSchema : UpdateOwnerVillaSchema;
  const validatedData = schema.parse(req.body);

  // Owners' updates reset approval status
  if (!isAdmin) {
    validatedData.approvalStatus = "pending";
    validatedData.approvalComment = "";
  }

  const updatedVilla = await Villa.findByIdAndUpdate(id, validatedData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(
    new ApiResponse(200, updatedVilla, "Villa updated successfully")
  );
});

// Soft delete a villa
export const deleteVilla = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const villa = await Villa.findById(id);

  if (!villa || villa.isDeleted) {
    throw new ApiError(404, "Villa not found");
  }

  const isOwner = villa.ownerId.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "You are not authorized to delete this villa");
  }

  villa.isDeleted = true;
  await villa.save();

  res.status(200).json(
    new ApiResponse(200, null, "Villa deleted successfully")
  );
});

// Get all approved, non-deleted villas
export const getAllApprovedVillas = asyncHandler(async (req, res) => {
  const villas = await Villa.find({
    approvalStatus: "approved",
    isDeleted: { $ne: true },
  });

  res.status(200).json(
    new ApiResponse(200, villas, "Approved villas fetched successfully")
  );
});

// Get one approved, non-deleted villa by ID
export const getApprovedVillaById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const villa = await Villa.findOne({
    _id: id,
    approvalStatus: "approved",
    isDeleted: { $ne: true },
  });

  if (!villa) {
    throw new ApiError(404, "Villa not found or not approved");
  }

  res.status(200).json(
    new ApiResponse(200, villa, "Approved villa fetched successfully")
  );
});
