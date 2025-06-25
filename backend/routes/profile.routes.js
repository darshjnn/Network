import { Router } from "express";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import * as profileController from "../controllers/profile.controller.js";

const router = Router();

// Update User Profile
router.route('/user_profile')
    .get(
        isLoggedIn, wrapAsync(profileController.getUserProfile)
    )
    .post(
        isLoggedIn, wrapAsync(profileController.updateUserProfile)
);

export default router;