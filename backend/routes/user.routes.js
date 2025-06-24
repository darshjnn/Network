import { Router } from "express";
import multer from "multer";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import * as userController from '../controllers/user.controller.js';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './profile_pictures');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Register User
router.route('/signup')
    .post(wrapAsync(userController.signup));

// Login
router.route('/login')
    .post(wrapAsync(userController.login));

// Upload/Update Profile Picture
router.route('/update_profile_picture')
    .post(upload.single('profile_picture'), wrapAsync(userController.uploadProfilePic));

// Update User Details(name, username, email)
router.route('/update_user')
    .post(isLoggedIn, wrapAsync(userController.updateUser));

export default router;