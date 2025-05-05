import { Villa } from "../models/villa.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";


const isVillaOwner = asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(401, "Unauthorized: User not authenticated");
    }

    if (user.role !== "villaOwner") {
        throw new ApiError(403, "Forbidden: villaOwner access only");
    }
    next();
});

const canListVilla = asyncHandler(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(401, "Unauthorized: User not authenticated");
    }

    const count = await Villa.countDocuments({ ownerId: user._id });

    if (user.role === "user" && count === 0) {
        return next();
    }

    if (user.role === "villaOwner") {
        return next();
    }

    throw new ApiError(403, "Forbidden: You are not allowed to list a villa");
});

export{
    canListVilla,
    isVillaOwner
}
