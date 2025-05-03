import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Villa } from "../models/villa.model.js";
import { User } from "../models/user.model.js";
import { createVillaSchema, updateVillaSchema } from "../validators/villa.validator.js";

// =======================================================
// @desc   Create a new Villa
// @route  POST /api/v1/villas
// =======================================================

const createVilla = asyncHandler(async (req, res) => {
  console.log("hello")
  let validatedData;
  try {
    console.log("hello2")
    validatedData = createVillaSchema.parse(req.body);
  } catch (error) {
    throw new ApiError(400, "Validation failed", error.errors);
  }

  // Check if ownerId exists in User collection
  // const userExists = await User.findById(validatedData.ownerId);
  // if (!userExists) {
  //   throw new ApiError(404, "Owner ID does not exist");
  // }

  const villa = await Villa.create(validatedData);

  return res.status(201).json(
    new ApiResponse(201, villa, "Villa created successfully")
  );
});

// =======================================================
// @desc   Get all Approved Villas (Public)
// @route  GET /api/v1/villas
// =======================================================

const getAllApprovedVillas = asyncHandler(async (req, res) => {
  const villas = await Villa.find({ isDeleted: { $ne: true }, approvalStatus: "approved" });

  return res.status(200).json(
    new ApiResponse(200, villas, "List of approved Villas")
  );
});

// =======================================================
// @desc   Get all Villas (Admin)
// @route  GET /api/v1/villas/admin
// =======================================================

const getAllVillasAdmin = asyncHandler(async (req, res) => {
  const villas = await Villa.find({ isDeleted: { $ne: true } });

  return res.status(200).json(
    new ApiResponse(200, villas, "List of all Villas for admin")
  );
});

// =======================================================
// @desc   Get Villa by ID (Public - Approved only)
// @route  GET /api/v1/villas/:id
// =======================================================

const getVillaById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const villa = await Villa.findById(id);

  if (!villa || villa.isDeleted || villa.approvalStatus !== "approved") {
    throw new ApiError(404, "Villa not found");
  }

  return res.status(200).json(
    new ApiResponse(200, villa, "Villa details fetched")
  );
});

// =======================================================
// @desc   Get Villa by ID (Admin)
// @route  GET /api/v1/villas/admin/:id
// =======================================================

const getVillaByIdAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const villa = await Villa.findById(id);

  if (!villa || villa.isDeleted) {
    throw new ApiError(404, "Villa not found");
  }

  return res.status(200).json(
    new ApiResponse(200, villa, "Villa details fetched for admin")
  );
});

// =======================================================
// @desc   Update Villa
// @route  PUT /api/v1/villas/:id
// =======================================================

const updateVilla = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let validatedData;
  try {
    validatedData = updateVillaSchema.parse(req.body);
  } catch (error) {
    throw new ApiError(400, "Validation failed", error.errors);
  }

  const updatedVilla = await Villa.findByIdAndUpdate(id, validatedData, {
    new: true,
    runValidators: true,
  });

  if (!updatedVilla || updatedVilla.isDeleted) {
    throw new ApiError(404, "Villa not found or already deleted");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedVilla, "Villa updated successfully")
  );
});

// =======================================================
// @desc   Delete Villa (Soft Delete)
// @route  DELETE /api/v1/villas/:id
// =======================================================

const deleteVilla = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const villa = await Villa.findById(id);

  if (!villa || villa.isDeleted) {
    throw new ApiError(404, "Villa not found");
  }

  villa.isDeleted = true;
  await villa.save();

  return res.status(200).json(
    new ApiResponse(200, null, "Villa deleted successfully")
  );
});

// =======================================================
// @desc   Check Availability for a Villa
// @route  GET /api/v1/villas/:id/availability
// =======================================================

const checkVillaAvailability = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    throw new ApiError(400, "Start date and end date are required");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new ApiError(400, "Invalid date format. Use YYYY-MM-DD.");
  }

  const villa = await Villa.findOne({
    _id: id,
    isDeleted: false,
    approvalStatus: "approved",
    availability: {
      $elemMatch: {
        isAvailable: true,
        start: { $lte: start },
        end: { $gte: end },
      },
    },
  });

  if (!villa) {
    return res.status(404).json(
      new ApiResponse(404, null, "Villa not available for selected dates")
    );
  }

  return res.status(200).json(
    new ApiResponse(200, villa, "Villa available for selected dates")
  );
});

// =======================================================
// @desc   Update Villa Approval Status (Admin)
// @route  PATCH /api/v1/villas/:id/approval
// =======================================================

const updateApprovalStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, comment } = req.body;

  const allowedStatuses = ["approved", "pending", "rejected"];
  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid approval status");
  }

  const updatedVilla = await Villa.findByIdAndUpdate(
    id,
    {
      approvalStatus: status,
      approvalComment: comment || ""
    },
    { new: true, runValidators: true }
  );

  if (!updatedVilla) {
    throw new ApiError(404, "Villa not found");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedVilla, `Villa marked as ${status}`)
  );
});

export {
  createVilla,
  getAllApprovedVillas,
  getAllVillasAdmin,
  getVillaById,
  getVillaByIdAdmin,
  updateVilla,
  deleteVilla,
  checkVillaAvailability,
  updateApprovalStatus
};
