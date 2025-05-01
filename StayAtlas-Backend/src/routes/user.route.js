import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { changeCurrentPassword, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";

const router = Router()

//secured routes

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/refreshToken").post(verifyJWT,refreshAccessToken)
router.route("/changePassword").post(verifyJWT,changeCurrentPassword)
export default router