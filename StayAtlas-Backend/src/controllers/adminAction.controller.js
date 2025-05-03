import { Villa } from "../models/villa.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { getPagination } from "../utils/paginate";
import { createVillaSchema } from "../validators/villa.validator";

const getAllPendingVillas = asyncHandler(async(req,res)=>{
    const {page, limit, skip} = getPagination(req)

    const pendingVillas = await Villa.find(
        {approvalStatus:"pending",isDeleted:false}
    )
    .populate("ownerId","firstName lastName phoneNumber email")
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)

    if(!pendingVillas.length){
        return res
        .status(200)
        .json(
            pendingVillas.length,
            new ApiResponse(
                200,
                {},
                "NO PENDING VILLAS PRESENT"
            )
        )
    }

    const totalCount = await Villa.countDocuments(
        {
            approvalStatus:"pending",isDeleted:false
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                villas:pendingVillas,
                page,
                totalpage:Math.ceil(totalCount/limit),
                totalCount
            },
            "Pending Villas"
        )
    )
})

const getAllApprovedVillas = asyncHandler(async(req,res)=>{
    const {page, limit, skip} = getPagination(req)

    const approvedVillas = await Villa.find(
        {approvalStatus:"approved",isDeleted:false}
    )
    .populate("ownerId","firstName lastName phoneNumber email")
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)

    if(!approvedVillas.length){
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "NO APPROVED VILLAS PRESENT"
            )
        )
    }

    const totalCount = await Villa.countDocuments(
        {
            approvalStatus:"pending",isDeleted:false
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                villas:approvedVillas,
                page,
                totalpage:Math.ceil(totalCount/limit),
                totalCount
            },
            "Approved Villas"
        )
    )
})

const getAllRejectedVillas = asyncHandler(async(req,res)=>{
    const {page, limit, skip} = getPagination(req)

    const rejectedVillas = await Villa.find(
        {approvalStatus:"rejected",isDeleted:false}
    )
    .populate("ownerId","firstName lastName phoneNumber email")
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)

    if(!rejectedVillas.length){
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "NO VILLAS ARE REJECTED"
            )
        )
    }

    const totalCount = await Villa.countDocuments(
        {
            approvalStatus:"pending",isDeleted:false
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                villas:rejectedVillas,
                page,
                totalpage:Math.ceil(totalCount/limit),
                totalCount
            },
            "Rejected Villas"
        )
    )
})

const reviewPendingVillas = asyncHandler(async(req,res)=>{
    const { villaId } = req.params;

    if (!villaId) {
        throw new ApiError(400,"Villa id is required")
    }

    const villa = await Villa.findOne({
        _id: villaId,
        isDeleted: false,
        approvalStatus:"pending"
    });

    if (!villa) {
        throw new ApiError(404,"Villa not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            villa,
            "Villa for review"
        )
    )
})

const ApprovePendingVillas = asyncHandler(async(req,res)=>{
    const { villaId } = req.params;
    if (!villaId) {
        throw new ApiError(400,"Villa id is required")
    }
    const villa = await Villa.findOne({
        _id: villaId,
        isDeleted: false
    });

    if (!villa) {
        throw new ApiError(404,"Villa not found")
    }

    if (villa.approvalStatus === "approved") {
        throw new ApiError(400,"Villa is already approved")
    }
    //review and edit the details before approve
    try {
        validatedData = createVillaSchema.parse(req.body);
    } catch (error) {
        throw new ApiError(400, "Validation failed", error.errors);
    }
    console.log("validatedData:",validatedData)
    // Approve the villa
    villa.approvalStatus = "approved";
    villa.approvedAt = new Date();
    await villa.save();

    // Check if it's the user's first approved villa
    const approvedCount = await Villa.countDocuments({
        ownerId: villa.ownerId,
        approvalStatus: "approved"
    });

    if (approvedCount === 1) {
        // First approved villa — upgrade user role
        await User.findByIdAndUpdate(villa.ownerId, { role: "villaOwner" });
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            villa, 
            "Villa approved successfully"
        )
    );
})


//for modification of prise discount prise images etc
const editVillaDetailsById = asyncHandler(async (req, res) => {
    const villaId = req.params.id; 
    const { description, pricePerNight, discountPercent, promotionText, images } = req.body;
  
    if (!villaId) {
      throw new ApiError(400, "villaId is required!");
    }
  
    const villa = await Villa.findById(villaId);
  
    if (!villa) {
      throw new ApiError(404, "Villa not found!");
    }
  
    // Update the villa details
    if (description) villa.description = description;
    if (pricePerNight) villa.pricePerNight = pricePerNight; 
    if (discountPercent) villa.discountPercent = discountPercent;
    if (promotionText) villa.promotionText = promotionText; 
    if (images && Array.isArray(images)) villa.images = images; 
    await villa.save();
  
    // Return the updated villa details in the response
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            villa,
            "villa details updated successfully"
        )
    );
  });
  
const deleteVilla = asyncHandler(async(req,res)=>{
    const villaId = req.params.id; // Assuming the villa ID is passed as a URL parameter

    // Find the villa by its ID
    const villa = await Villa.findById(villaId);
  
    if (!villa) {
        throw new ApiError(400,"villaId is required!")
    }
  
    // Soft Delete: Set the villa as deleted
    villa.isDeleted = true;
    await villa.save();
  
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "villa deleted successfully"
        )
    );
})

//totalvilla approved pending rejected
const totalCountOfVillas = asyncHandler(async(req,res)=>{
    // Get total count of villas for each status
    const approvedCount = await Villa.countDocuments({
        approvalStatus: "approved",
        isDeleted: false,
      });
  
      const pendingCount = await Villa.countDocuments({
        approvalStatus: "pending",
        isDeleted: false,
      });
  
      const rejectedCount = await Villa.countDocuments({
        approvalStatus: "rejected",
        isDeleted: false,
      });
  
      // Return the counts as a response
      return res
      .status(200)
      .json(
        new ApiResponse(
            200,
            {
                approved: approvedCount,
                pending: pendingCount,
                rejected: rejectedCount,
            },
            "success"
        )
      );
})

const getUserCount = asyncHandler(async(req,res)=>{

})


export {
    getAllPendingVillas,
    getAllApprovedVillas,
    getAllRejectedVillas,
    reviewPendingVillas,
    ApprovePendingVillas
    

}