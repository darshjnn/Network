import { Post } from "../../models/posts.model.js";
import { User } from "../../models/user.model.js";

// Toggle Like for Post
export const toggleLikePost = async (req, res) => {
    const { token, postId } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "Send Valid Post!!!" });
    }

    const user = await User.findOne({ token: token, active: true, blocked: false });
    const post = await Post.findOne(
        { _id: postId, active: true, archived: false, blocked: false });;

    if (!post) {
        return res.status(404).json({ message: "No such Post found!!!" });
    }

    if (!post.likedBy.includes(user._id)) {
        // User liked the Post
        await Post.updateOne(
            { _id: postId, likedBy: { $ne: user._id } },
            {
                $addToSet: { likedBy: user._id },
                $inc: { likes: 1 }
            }
        );
        return res.status(201).json({ message: "Post Liked..." });
    } else if (post.likedBy.includes(user._id)) {
        // User unliked the Post and Post like count must be >= 0
        await Post.updateOne(
            { _id: postId, likedBy: user._id },
            {
                $pull: { likedBy: user._id },
                $inc: { likes: -1 }
            }
        );
        return res.status(201).json({ message: "Post Unliked..." });
    }

    return res.status(500).json({ message: "Something went wrong..." });
};
