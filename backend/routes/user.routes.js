import { Router } from "express";
import path from "path";
import multer from "multer";
import { v6 as uuidv6 } from "uuid";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import { signup } from "../controllers/user_controllers/signup.js";
import { login } from "../controllers/user_controllers/login.js";
import { logout } from '../controllers/user_controllers/logout.js';
import { updateUser } from '../controllers/user_controllers/updateUser.js';
import { getCurrentUser } from '../controllers/user_controllers/getCurrentUser.js';
import { uploadProfilePic } from '../controllers/user_controllers/uploadProfilePic.js';
import { getUser } from "../controllers/user_controllers/getUser.js";

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
    .post(wrapAsync(signup));

// Login
router.route('/login')
    .post(wrapAsync(login));

// Get Current User
router.route('/current_user')
    .post(isLoggedIn, wrapAsync(getCurrentUser));

// Log Out
router.route('/logout')
    .post(isLoggedIn, wrapAsync(logout));

// Upload/Update Profile Picture
router.route('/update_profile_picture')
    .post(upload, wrapAsync(uploadProfilePic));

// Update User Details(name, username, email)
router.route('/update_user')
    .post(isLoggedIn, wrapAsync(updateUser));

// Fetch User from username
router.route('/user')
    .post(isLoggedIn, wrapAsync(getUser));

export default router;