import { Post } from "../../models/posts.model.js";
import { User } from "../../models/user.model.js";

// Delete Post
export const deletePost = async (req, res) => {
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

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: "Post and Comments deleted successfully..." });
};
