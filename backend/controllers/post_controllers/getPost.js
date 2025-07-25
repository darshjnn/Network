import { Post } from "../../models/posts.model.js";

// Get the Post (only the post which is not archived and active is to be fetched)
export const getPost = async (req, res) => {
    const { postId } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "Send Valid Post!!!" });
    }

    const post = await Post.findOne({_id: postId, active: true, archived: false, blocked: false })
        .populate('userId', 'username name profilePicture');

    if (!post) {
        return res.status(400).json({ message: "Could not fetch Post..." });
    }

    return res.status(200).json(post);
};
