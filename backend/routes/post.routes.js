import { Router } from "express";
import multer from "multer";
import { v6 as uuidv6 } from "uuid";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import { createPost } from "../controllers/post_controllers/createPost.js";
import { editPost } from "../controllers/post_controllers/editPost.js";
import { getAllPosts } from "../controllers/post_controllers/getAllPosts.js";
import { userPosts } from "../controllers/post_controllers/userPosts.js";
import { deletePost } from "../controllers/post_controllers/deletePost.js";
import { toggleArchivePost } from "../controllers/post_controllers/toggleArchivePost.js";
import { toggleLikePost } from "../controllers/like_controllers/toggleLikePost.js";

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

// Get all Posts (only the post which are not archived and not active are to be fetched)
router.route('/')
    .post(isLoggedIn, wrapAsync(getAllPosts));

// Create Post
router.route('/create_post')
    .post(upload, wrapAsync(createPost));

// Edit Post
router.route('/edit_post')
    .post(upload, wrapAsync(editPost));

// Get all the Posts posted by the current user
router.route('/user_posts')
    .post(isLoggedIn, wrapAsync(userPosts));

// Delete Post
router.route('/delete_post')
    .post(isLoggedIn, wrapAsync(deletePost));

// Archive/Unarchive Post
router.route('/toggle_archive_post')
    .post(isLoggedIn, wrapAsync(toggleArchivePost));

// Toggle Like for Post
router.route('/toggle_post_like')
    .post(isLoggedIn, wrapAsync(toggleLikePost));

export default router;