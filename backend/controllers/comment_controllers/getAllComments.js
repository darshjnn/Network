import { Comment } from "../../models/comments.model.js";
import { Post } from "../../models/posts.model.js";

// Get Comments along with their replies
export const getAllComments = async (req, res) => {
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
        .sort({ 'createdAt': -1 }) // Sort newest comment first
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

    return res.status(200).json({ postId: postId, comments: roots});
};
