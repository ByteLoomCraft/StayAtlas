import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: phoneNumber, email
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {
        firstName,
        lastName,
        phoneNumber,
        dob,
        password,
        email
    } = req.body

    if(
        [firstName,lastName,phoneNumber,dob,password].some((field)=>{
            field?.trim() === ""
        })
    ){
        throw new ApiError(400,"All filed are required")
    }

    const existedUser = await User.findOne({phoneNumber})

    if(existedUser){
        throw new ApiError(409,"User with same phoneNumber already exits")
        
    }

    const user = await User.create({
        firstName,
        lastName,
        dob,
        phoneNumber,
        password,
        email: email || ""
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    return res
    .status(201)
    .json(
        new ApiResponse(200,createdUser,"Registration Successfull")
    )
})

export {
    registerUser
}