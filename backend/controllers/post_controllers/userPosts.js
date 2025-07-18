import { User } from "../../models/user.model.js"
import { Post } from "../../models/posts.model.js";

// Get all the Posts posted by the current User
export const userPosts = async (req, res) => {
    const { token } = req.body;

    const user = await User.findOne({ token: token, active: true, blocked: false });
    const posts = await Post.find({ userId: user._id })
        .populate('userId', 'username name profilePicture').sort({ 'createdAt': -1 });

    if (!posts) {
        return res.status(400).json({ message: "Could not fetch Posts!!!" });
    }

    return res.status(200).json(posts);
}