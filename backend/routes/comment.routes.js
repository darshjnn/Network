import { Router } from "express";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import { postComment } from "../controllers/comment_controllers/postComment.js";
import { editComment } from "../controllers/comment_controllers/editComment.js";
import { getComments } from "../controllers/comment_controllers/getComments.js";
import { postReply } from "../controllers/comment_controllers/postReply.js";
import { deleteComment } from "../controllers/comment_controllers/deleteComment.js";
import { toggleLikeComment } from "../controllers/like_controllers/toggleLikeComment.js";

const router = Router();

// Get Comments along with their replies
router.route('/comments')
    .post(isLoggedIn, wrapAsync(getComments));

// Comment on a Post
router.route('/post_comment')
    .post(isLoggedIn, wrapAsync(postComment));

// Edit Comment
router.route('/edit_comment')
    .post(isLoggedIn, wrapAsync(editComment));

// Delete Comment
router.route('/delete_comment')
    .post(isLoggedIn, wrapAsync(deleteComment));

// Reply to a Comment
router.route('/reply_comment')
    .post(isLoggedIn, wrapAsync(postReply));

// Toggle Like for Comments
router.route('/toggle_comment_like')
    .post(isLoggedIn, wrapAsync(toggleLikeComment));

export default router;