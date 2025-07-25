import { Post } from "../../models/posts.model.js";

// Get all Posts (only the post which are not archived and active are to be fetched)
export const getAllPosts = async (req, res) => {
    const posts = await Post.find({ active: true, archived: false, blocked: false })
        .populate('userId', 'username name profilePicture').sort({ 'updatedAt': -1 });

    if (!posts) {
        return res.status(400).json({ message: "Could not fetch Posts..." });
    }

    return res.status(200).json(posts);
};
