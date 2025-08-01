import { Router } from "express";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import { currUserProfile } from "../controllers/profile_controllers/currUserProfile.js";
import { updateUserProfile } from "../controllers/profile_controllers/updateUserProfile.js";
import { downloadProfile } from "../controllers/profile_controllers/downloadProfile.js";
import { usernameUserProfile } from "../controllers/profile_controllers/usernameUserProfile.js";

const router = Router();

// Update & Get current User Profile
router.route('/my_profile')
    .post(
        isLoggedIn, wrapAsync(currUserProfile)
    )
    .post(
        isLoggedIn, wrapAsync(updateUserProfile)
    );

// Download User Profile
router.route('/get_resume')
    .post(isLoggedIn, wrapAsync(downloadProfile));

// Get User profile from username
router.route('/user_profile')
    .post(wrapAsync(usernameUserProfile));

export default router;