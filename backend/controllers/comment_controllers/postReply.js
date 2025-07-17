import { Comment } from "../../models/comments.model.js";
import { Post } from "../../models/posts.model.js";
import { User } from "../../models/user.model.js";

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
};
