import { User } from "../models/user.model.js";
import { Post } from "../models/posts.model.js";
import { Comment } from "../models/comments.model.js";

// Comment on Post
export const postComment = async (req, res) => {
    const { token, postId, body } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "Send Valid Post!!!" });
    }

    if (!body) {
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
        body: body
    });

    await comment.save();

    return res.status(201).json({ message: "Comment successfully added..." });
}

// Edit Comment
export const editComment = async (req, res) => {
    const { token, postId, commentId, ...newComment } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "Send Valid Post!!!" });
    }

    if (!commentId) {
        return res.status(400).json({ message: "Send Valid Comment!!!" });
    }

    if (!newComment || !newComment.body) {
        return res.status(400).json({ message: "Body for comment is must..." });
    }

    const post = await Post.findOne({ _id: postId, blocked: false });

    if (!post) {
        return res.status(404).json({ message: "No such Post found!!!" });
    }

    const comment = await Comment.findOne({ _id: commentId, blocked: false });

    if (!comment) {
        return res.status(404).json({ message: "No comment found!!!" });
    }

    const user = await User.findOne({ token: token });

    if (String(user._id) !== String(comment.userId) || String(comment.postId) !== postId) {
        return res.status(400).json({ message: "Not authorized to edit this Comment!!!" });
    }

    newComment.updatedAt = new Date();
    Object.assign(comment, newComment);
    await comment.save();

    return res.status(201).json({ message: "Comment updated successfully..." });
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

    const comment = await Comment.findOne({ _id: commentId, blocked: false });

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

// Get Comments along with their replies
export const getComments = async (req, res) => {
    const { postId } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "Send Valid Post!!!" });
    }

    const post = await Post.findOne(
        { _id: postId, active: true, archived: false, blocked: false });

    if (!post) {
        return res.status(404).json({ message: "No such Post found!!!" });
    }

    const comments = await Comment.find({ postId: postId, active: true, blocked: false })
        .populate('userId', 'username name profilePicture')
        .sort({ createdAt: -1 }) // Sort newest comment first
        .lean(); // use lean to return plain JS objects

    // Reconstruct comment tree to optimize for deeply nested replies
    const roots = [];
    const commentMap = {};

    // Initialize Map
    comments.forEach(comment => {
        comment.replies = [];
        commentMap[comment._id.toString()] = comment;
    });

    // Link Parent Comment to its Replies
    comments.forEach(comment => {
        if (comment.parentComment) {
            const parent = commentMap[comment.parentComment.toString()];
            if (parent) {
                parent.replies.push(comment);
            }
        } else {
            roots.push(comment);
        }
    });

    return res.status(200).json(roots);
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

    if (!parentComment) {
        return res.status(400).json({ message: "Send Valid Parent Comment!!!" });
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