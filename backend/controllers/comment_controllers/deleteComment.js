import { Comment } from "../../models/comments.model.js";
import { Post } from "../../models/posts.model.js";
import { User } from "../../models/user.model.js";

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
};
