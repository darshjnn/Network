import { Comment } from "../../models/comments.model.js";
import { Post } from "../../models/posts.model.js";
import { User } from "../../models/user.model.js";

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

    if (comment.body !== newComment.body) {
        newComment.edited = true;
        newComment.updatedAt = new Date();
        Object.assign(comment, newComment);
        await comment.save();
    }

    return res.status(201).json({ message: "Comment updated successfully..." });
};
