import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generateAccessAndRefreshToken =  async function(userId){
    try{
        const user = await User.findOne(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        //console.log(accessToken)
        //console.log(refreshToken)
        return { accessToken,refreshToken}

    }catch(err){
        throw new ApiError(500,`something went wrong while generation access and refresh token Err:${err.message}`)
    }
}

//registration
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
        // console.log(new ApiError(400,"User with same phoneNumber already exits"));
        throw new ApiError(400,"User with same phoneNumber already exits")
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

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(createdUser._id)

    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,                       // only true over HTTPS
        sameSite: isProduction ? "None" : "Lax",    // None+Secure in prod; Lax in dev
    };

    return res
    .status(201)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .json(
        new ApiResponse(
            200,
            {
                createdUser,
                accessToken,
                refreshToken
            },
            "Registration Successfull"
        )
    )
})

//login
const loginUser = asyncHandler(async(req,res) =>{
    // req body -> data
    // password or phoneNumber
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {phoneNumber,password} = req.body
    if(!phoneNumber || !password){
        throw new ApiError(400,"phoneNumber or password is required")
    }

    const user = await User.findOne({phoneNumber})
    //console.log(user)

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid Password")
    }
    
    const {accessToken,refreshToken} =  await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,                       // only true over HTTPS
        sameSite: isProduction ? "None" : "Lax",    // None+Secure in prod; Lax in dev
    };

    return res
    .status(200)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,
                accessToken,
                refreshToken
            },
            "User loggedIn successfully"
        )
    )
})


const getUser = async (req,res) => {
    try{
        res.status(200).json({
            user: req.user,
            message: "User fetched successfully",
        })
    }catch(err){
        return res.status(500).json({
            statusCode:500,
            success: false,
            message: err.message || "Internal server error"
        })

    }
}

const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used") 
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})
const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    //console.log(user.password)
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})


const updateUserName = asyncHandler(async(req,res)=>{
    const {newFirstName, newLastName} = req.body
    const user = req.user
    if(!newFirstName || !newLastName){
        throw new ApiError(400,"new field are required!!")
    }
    user.firstName = newFirstName
    user.lastName = newLastName

    await user.save()

    return res
    .status(200)
    .json(
        new ApiResponse(200,{},"Details updated successfully")
    )
})





export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getUser,
    updateUserName
}