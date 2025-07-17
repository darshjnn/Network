import { Router } from "express";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import { getUserProfile } from "../controllers/profile_controllers/getUserProfile.js";
import { updateUserProfile } from "../controllers/profile_controllers/updateUserProfile.js";
import { downloadProfile } from "../controllers/profile_controllers/downloadProfile.js";

const router = Router();

// Update User Profile
router.route('/user_profile')
    .get(
        isLoggedIn, wrapAsync(getUserProfile)
    )
    .post(
        isLoggedIn, wrapAsync(updateUserProfile)
    );

// Download User Profile
router.route('/get_resume')
    .get(wrapAsync(downloadProfile));

export default router;