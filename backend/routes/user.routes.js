import { Router } from "express";
import path from "path";
import multer from "multer";
import { v6 as uuidv6 } from "uuid";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import * as userController from '../controllers/user.controllers.js';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile_pictures');
    },
    filename: (req, file, cb) => {
        const newFileName = uuidv6() + file.originalname;
        cb(null, newFileName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('profile_picture');

const checkFileType = (file, cb) => {
    // Check mime
    const mimetype = /^image\/(jpeg|jpg|png)$/.test(file.mimetype);

    // Check Extension
    const isValidExtension = /\.(jpeg|jpg|png)$/.test(path.extname(file.originalname).toLowerCase());

    if (isValidExtension && mimetype) {
        return cb(null, true);
    } else {
        return cb(null, false);
    }
}

// Register User
router.route('/signup')
    .post(wrapAsync(userController.signup));

// Login
router.route('/login')
    .post(wrapAsync(userController.login));

// Get Current User
router.route('/current_user')
    .post(isLoggedIn, wrapAsync(userController.getCurrentUser));

// Log Out
router.route('/logout')
    .post(isLoggedIn, wrapAsync(userController.logout));

// Upload/Update Profile Picture
router.route('/update_profile_picture')
    .post(upload, wrapAsync(userController.uploadProfilePic));

// Update User Details(name, username, email)
router.route('/update_user')
    .post(isLoggedIn, wrapAsync(userController.updateUser));

export default router;