import { Comment } from "../../models/comments.model.js";
import { Post } from "../../models/posts.model.js";
import { User } from "../../models/user.model.js";

// Archive/Unarchive Post
export const toggleArchivePost = async (req, res) => {
    const { token, postId } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "Send Valid Post!!!" });
    }

    const user = await User.findOne({ token: token, active: true, blocked: false });
    const post = await Post.findOne({ _id: postId });

    if (!post) {
        return res.status(404).json({ message: "No such Post found!!!" });
    }

    if (String(post.userId._id) !== String(user._id)) {
        return res.status(400).json({ message: "Not authorized to delete this Post!!!" });
    }

    if (post.archived) {
        post.archived = false;
        await post.save();
        // Unarchive the comments associated with the Post
        await Comment.updateMany(
            { postId: postId, active: false, blocked: false },
            { $set: { active: true } }
        );
        return res.status(200).json({ message: "Post Unarchived successfully..." });
    } else if (!post.archived) {
        post.archived = true;
        await post.save();
        // Archive the comments associated with the Post
        await Comment.updateMany(
            { postId: postId, active: true, blocked: false },
            { $set: { active: false } }
        );
        return res.status(200).json({ message: "Post Archived successfully..." });
    }

    return res.status(500).json({ message: "Something went wrong!!!" });
};
