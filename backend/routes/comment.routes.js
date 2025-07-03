import { Router } from "express";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import * as commentController from "../controllers/comment.controllers.js";
import { toggleLikeComment } from "../controllers/like.controller.js";

const router = Router();

// Comment on a Post
router.route('/post_comment')
    .post(isLoggedIn, wrapAsync(commentController.postComment));

// Edit Comment
router.route('/edit_comment')
    .post(isLoggedIn, wrapAsync(commentController.editComment));

// Delete Comment
router.route('/delete_comment')
    .post(isLoggedIn, wrapAsync(commentController.deleteComment));

// Get Comments along with their replies
router.route('/comments')
    .get(wrapAsync(commentController.getComments));

// Reply to a Comment
router.route('/reply_comment')
    .post(isLoggedIn, wrapAsync(commentController.postReply));

// Toggle Like for Comments
router.route('/toggle_comment_like')
    .post(isLoggedIn, wrapAsync(toggleLikeComment));

export default router;