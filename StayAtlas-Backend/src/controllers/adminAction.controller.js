import { User } from "../models/user.model.js";
import { Villa } from "../models/villa.model.js";
import Booking  from "../models/booking.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPagination } from "../utils/paginate.js";
import { AdminVillaSchema } from "../validators/villa.validator.js";

const getAllPendingVillas = asyncHandler(async(req,res)=>{
    const {page, limit, skip} = getPagination(req)

    const pendingVillas = await Villa.find(
        {approvalStatus:"pending",isDeleted:false}
    )
    .populate("ownerId","firstName lastName phoneNumber email")
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
     
    //console.log(pendingVillas)
    if(!pendingVillas.length){
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    count:pendingVillas.length
                },
                "NO PENDING VILLAS PRESENT"
            )
        )
    }

    const totalCount = await Villa.countDocuments(
        {
            approvalStatus:"pending",isDeleted:false
        }
    )
    //console.log(totalCount)
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
        {approvalStatus:"approved",
            // isDeleted:false
        }
    )
    .populate("ownerId","firstName lastName phoneNumber email")
    .sort({ createdAt: -1 })
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
            approvalStatus:"approved",isDeleted:false
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
        {approvalStatus:"rejected",isDeleted:true}
    )
    .populate("ownerId","firstName lastName phoneNumber email")
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    
    //console.log(rejectedVillas)
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
    const { id:villaId } = req.params;

    if (!villaId) {
        throw new ApiError(400,"Villa id is required")
    }

    const villa = await Villa.findOne({
        _id: villaId,
        isDeleted: false,
        approvalStatus:"pending"
    }).select("-_id -ownerId");

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
    const { id:villaId } = req.params;
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

    // console.log("villa:",req.body)

    //review and edit the details before approve
    const parsed = AdminVillaSchema.safeParse(req.body)
    if (!parsed.success) {
        const errorMessage = parsed.error.issues.map(e => e.message).join(", ");
        throw new ApiError(400, errorMessage);
    }

    const validParsedData = parsed.data

    console.log("validatedData:",validParsedData)
    Object.assign(villa,validParsedData)
    // Approve the villa
    villa.approvalStatus = "approved";
    villa.approvedAt = new Date();
    villa.approvedBy = req.user._id;
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
    const {id:villaId} = req.params; 
    if (!villaId) {
      throw new ApiError(400, "villaId is required!");
    }
  
    const villa = await Villa.findById(villaId);
  
    if (!villa) {
      throw new ApiError(404, "Villa not found!");
    }
  
    // Update the villa details
    const parsed = AdminVillaSchema.safeParse(req.body)
    if(!parsed.success){
        const errorMessage = parsed.error.issues.map(e=>e.message).join(',')
        throw new ApiError(400,errorMessage)
    }
    const villaUpdatedData = parsed.data
    const restrictedFields = [
        "approvalStatus",
        "approvalComment",
        "ownerId",
        "villaOwner",
        "_id",
        "isDeleted",
        "updatedBy",
        "phoneNumber",
        "email"
      ];
      
      restrictedFields.forEach(field => {
        if (field in villaUpdatedData) {
          delete villaUpdatedData[field];
        }
      });
    Object.assign(villa, villaUpdatedData)
    villa.updatedBy = req.user._id
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
  
const deleteVillaById = asyncHandler(async(req,res)=>{
    const {id:villaId} = req.params; 

    // Find the villa by its ID
    const villa = await Villa.findById(villaId);
  
    if (!villa) {
        throw new ApiError(400,"villaId is required!")
    }
  
    // Soft Delete: Set the villa as deleted
    // villa.isDeleted = true;
    villa.approvalStatus = "rejected"
    villa.rejectedReason = req.body.rejectedReason || "Deleted by admin"
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
const totalCountOfVillasByApprovalStatus = asyncHandler(async(req,res)=>{
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
  
      const totalVillaOnStayAtlas = approvedCount+pendingCount+rejectedCount
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
                totalVillas: totalVillaOnStayAtlas
            },
            "success"
        )
      );
})

const getUserCount = asyncHandler(async (req, res) => {
    const count = await User.countDocuments();

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            { 
                userCount: count 
            },
            count === 0 ? "No users found." : "User count fetched successfully."
        )
    );
});


const approvePendingBookingById = asyncHandler(async (req, res) => {
    try{
        const { id: bookingId } = req.params;
        if (!bookingId) {
            throw new ApiError(400, "Booking ID is required!");
        }
    
        // Find the booking by its ID
        const booking = await Booking.findById(bookingId);
    
        if (!booking) {
            throw new ApiError(404, "Booking not found!");
        }
    
        // Update the booking status to "approved"
        booking.status = "Confirmed";
        booking.isPaid = true; // Assuming the booking is paid upon approval
        await booking.save();
    
        return res.status(200).json({
            message: "Booking approved successfully!",
            statusCode:200,
            booking
        });

    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Error in approving booking",
            error: err.message
        })
    }
})

const rejectPendingBookingById = asyncHandler(async (req, res) => {
    try{
        const { id: bookingId } = req.params;
        if (!bookingId) {
            throw new ApiError(400, "Booking ID is required!");
        }
    
        // Find the booking by its ID
        const booking = await Booking.findById(bookingId);
    
        if (!booking) {
            throw new ApiError(404, "Booking not found!");
        }
    
        // Update the booking status to "rejected"
        booking.status = "Cancelled";
        await booking.save();
    
        return res.status(200).json({
            message: "Booking rejected successfully!",
            statusCode:200,
            booking
        });

    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Error in Rejecting booking",
            error: err.message
        })
    }
})


export {
    getAllPendingVillas,
    getAllApprovedVillas,
    getAllRejectedVillas,
    reviewPendingVillas,
    ApprovePendingVillas,
    editVillaDetailsById,
    deleteVillaById,
    totalCountOfVillasByApprovalStatus,
    getUserCount,
    approvePendingBookingById,
    rejectPendingBookingById
}