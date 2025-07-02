import { User } from "../models/user.model.js";
import { Post } from "../models/posts.model.js";
import { Comment } from "../models/comments.model.js";

// Comment on Post
export const postComment = async (req, res) => {
    const { token, postId, commentBody } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "Send Valid Post!!!" });
    }

    if (!commentBody) {
        return res.status(400).json({ message: "Body for comment is must..." });
    }

    const user = await User.findOne({ token: token, active: true, blocked: false });
    const post = await Post.findOne(
        { _id: postId, active: true, archived: false, blocked: false });

    if (!post) {
        return res.status(404).json({ message: "No such Post found!!!" });
    }

    const comment = new Comment({
        userId: user._id,
        postId: post._id,
        body: commentBody
    });

    await comment.save();

    return res.status(201).json({ message: "Comment successfully added..." });
}

// Edit Comment
export const editComment = async (req, res) => {

}

// Delete Comment
export const deleteComment = async (req, res) => {
    const { token, postId, commentId } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "Send Valid Post!!!" });
    }

    if (!commentId) {
        return res.status(400).json({ message: "Send Valid Comment!!!" });
    }

    const comment = await Comment.findOne({ _id: commentId });

    if (!comment) {
        return res.status(404).json({ message: "No comment found!!!" });
    }

    const post = await Post.findOne({ _id: postId });

    if (!post) {
        return res.status(404).json({ message: "No such Post found!!!" });
    }

    const user = await User.findOne({ token: token, active: true, blocked: false });

    if (String(user._id) !== String(comment.userId) || String(comment.postId) !== postId) {
        return res.status(400).json({ message: "Not authorized to delete this Comment!!!" });
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: "Comment and Replies deleted successfully..." });
}

// Get Comments
export const getComments = async (req, res) => {
    // See form Copilot
}

// Reply to a Comment
export const postReply = async (req, res) => {
    const { token, postId, parentComment, replyBody } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "Send Valid Post!!!" });
    }

    if (!replyBody) {
        return res.status(400).json({ message: "Body for reply is must..." });
    }

    const post = await Post.findOne(
        { _id: postId, active: true, archived: false, blocked: false });

    if (!post) {
        return res.status(404).json({ message: "No such Post found!!!" });
    }

    const commentToReply = await Comment.findOne(
        { _id: parentComment, postId: postId, active: true, blocked: false });

    if (!commentToReply) {
        return res.status(404).json({ message: "No comment found!!!" });
    }

    const user = await User.findOne({ token: token, active: true, blocked: false });

    const reply = new Comment({
        userId: user._id,
        postId: postId,
        body: replyBody,
        parentComment: parentComment
    });

    await reply.save();

    return res.status(201).json({ message: "Reply added successfully..." });
}

// Get Comment Replies
export const getReplies = async (req, res) => {
    // See form Copilot
}