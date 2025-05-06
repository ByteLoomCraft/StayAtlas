import { Router } from "express";
import { ApprovePendingVillas, deleteVillaById, editVillaDetailsById, getAllApprovedVillas, getAllPendingVillas, getAllRejectedVillas, getUserCount, reviewPendingVillas, totalCountOfVillasByApprovalStatus } from "../controllers/adminAction.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";



const router = Router()

router.use(verifyJWT)
// router.use(isAdmin)

router.route("/get-all-pending-villa").get(getAllPendingVillas)
router.route("/get-all-approved-villa").get(getAllApprovedVillas)
router.route("/get-all-rejected-villa").get(getAllRejectedVillas)
router.route("/review-pending-villa/:id").get(reviewPendingVillas)
router.route("/approve-pending-villa/:id").post(ApprovePendingVillas)
router.route("/edit-villaById/:id").post(editVillaDetailsById)
router.route("/delete-villaById/:id").post(deleteVillaById)
router.route("/villa-count").get(totalCountOfVillasByApprovalStatus)
router.route("/user-count").get(getUserCount)


export default router