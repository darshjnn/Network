import { Comment } from "../../models/comments.model.js";
import { User } from "../../models/user.model.js";

// Toggle Like for Comment
export const toggleLikeComment = async (req, res) => {
    const { token, commentId } = req.body;

    if (!commentId) {
        return res.status(404).json({ message: "No such Comment found!!!" });
    }

    const user = await User.findOne({ token: token, active: true, blocked: false });
    const comment = await Comment.findOne(
        { _id: commentId, active: true, blocked: false });

    if (!comment) {
        return res.status(404).json({ message: "No such Post found!!!" });
    }

    if (!comment.likedBy.includes(user._id)) {
        // User liked the Comment
        await Comment.updateOne(
            { _id: commentId, likedBy: { $ne: user._id } },
            {
                $addToSet: { likedBy: user._id },
                $inc: { likes: 1 }
            }
        );
        return res.status(201).json({ message: "Comment Liked..." });
    } else if (comment.likedBy.includes(user._id)) {
        // User unliked the Comment
        await Comment.updateOne(
            { _id: commentId, likedBy: user._id },
            {
                $pull: { likedBy: user._id },
                $inc: { likes: -1 }
            }
        );
        return res.status(201).json({ message: "Comment Unliked..." });
    }

    return res.status(500).json({ message: "Something went wrong..." });
};
