import { Router } from "express";
import multer from "multer";
import { v6 as uuidv6 } from "uuid";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import * as postController from "../controllers/post.controllers.js";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/posts/')
    },
    filename: (req, file, cb) => {
        const newFileName = uuidv6() + file.originalname;
        cb(null, newFileName);
    }
});

const upload = multer({
    storage: storage
}).single('media');

// Create Post
router.route('/create_post')
    .post(upload, wrapAsync(postController.createPost));

// Get all Posts (only the post which are not archived and active are to be fetched)
router.route('/posts')
    .get(wrapAsync(postController.getAllPosts));

// Delete Post
router.route('/delete_post')
    .post(isLoggedIn, wrapAsync(postController.deletePost));

// Archive Post
router.route('/archive_post')
    .post(isLoggedIn, wrapAsync(postController.archivePost));

// Unarchive Post
router.route('/unarchive_post')
    .post(isLoggedIn, wrapAsync(postController.unarchivePost));

export default router;