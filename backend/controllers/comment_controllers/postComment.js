import { Comment } from "../../models/comments.model.js";
import { Post } from "../../models/posts.model.js";
import { User } from "../../models/user.model.js";

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
};
