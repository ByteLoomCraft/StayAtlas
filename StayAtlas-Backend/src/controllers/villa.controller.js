import { Villa } from "../models/villa.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import { OwnerVillaSchema, AdminVillaSchema, UpdateAdminVillaSchema, UpdateOwnerVillaSchema } from "../validators/villa.validator.js";
import {User} from "../models/user.model.js";
import { uploadMultipleImagesParallel } from "../utils/cloudinary.js";

// Create a new villa (owners limited, admin full)
export const createVilla = asyncHandler(async (req, res) => {

  const files = req.files
  const userId = req.user?._id;
  //console.log("Request Body",req.body)
  if(!userId){
    throw new ApiError(401, "Unauthorized: User not authenticated");
  }

   const localPathArray = files.map(file => file.path)

  const cloudinaryResponse = await uploadMultipleImagesParallel(localPathArray)
  //console.log("cloudinaryResponse:",cloudinaryResponse)
  if (cloudinaryResponse.length < req.files.length) {
    return res
    .status(400)
    .json(
      new ApiResponse(
        200,
        {
          failedUploads: req.files.length - cloudinaryResponse.length, 
        },
        "Some images failed to upload. Please try again."
      )
    )
  }
  const publicUrls = cloudinaryResponse.map(res => res.secure_url);
  req.body.images = publicUrls

  const parsed = OwnerVillaSchema.safeParse(req.body);
  // console.log(req.body);
  // console.log(parsed.error)
  if (!parsed.success) {
    const errorMessage = parsed.error.issues.map(e => e.message).join(", ");

    //console.log("Error:",parsed)
    //console.log("Error:",parsed.error)
    throw new ApiError(400, errorMessage);
  }

  const validatedData = parsed.data
  // console.log("User: ",req.body)
  // console.log("files",req.files)

  //console.log(publicUrls)
  const villa = await Villa.create({
    ...validatedData,
    ownerId: req.user._id,
    images:publicUrls
  });

  return res
  .status(201)
  .json(
    new ApiResponse(
      201,
      // villa,
      "Villa successfully listed for review")
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

// Owner can see all their villas whether it is pending, rejected or approved
export const getMyVillas = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;

  const villas = await Villa.find({
    ownerId,
    isDeleted: { $ne: true }, // only show active villas
  }).sort({ createdAt: -1 }); // newest first

  res.status(200).json(
    new ApiResponse(200, villas, "Fetched all villas for current owner")
  );
});
