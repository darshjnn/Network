import { Router } from "express";
import multer from "multer";
import { v6 as uuidv6 } from "uuid";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import * as postController from "../controllers/post.controllers.js";
import { toggleLikePost } from "../controllers/like.controller.js";

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

// Edit Post
router.route('/edit_post')
    .post(upload, wrapAsync(postController.editPost));

// Get all Posts (only the post which are not archived and not active are to be fetched)
router.route('/')
    .post(isLoggedIn, wrapAsync(postController.getAllPosts));

// Delete Post
router.route('/delete_post')
    .post(isLoggedIn, wrapAsync(postController.deletePost));

// Archive/Unarchive Post
router.route('/toggle_archive_post')
    .post(isLoggedIn, wrapAsync(postController.toggleArchivePost));

// Toggle Like for Post
router.route('/toggle_post_like')
    .post(isLoggedIn, wrapAsync(toggleLikePost));

export default router;