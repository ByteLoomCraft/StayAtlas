import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { changeCurrentPassword, getUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserName } from "../controllers/user.controller.js";

const router = Router()

//secured routes

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refreshToken").post(verifyJWT,refreshAccessToken)
router.route("/changePassword").post(verifyJWT,changeCurrentPassword)
router.route("/getuser").get(verifyJWT,getUser )
router.route("/change-name").post(verifyJWT,updateUserName)
export default router