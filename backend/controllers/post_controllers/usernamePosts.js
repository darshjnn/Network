import { User } from "../../models/user.model.js"
import { Post } from "../../models/posts.model.js";

// Get all the Posts posted by the current User
export const usernamePosts = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "Send valid data!!!" });
    }

    const user = await User.findOne({ username: username, active: true, blocked: false });

    const posts = await Post.find({ userId: user._id })
        .populate('userId', 'username name profilePicture').sort({ 'createdAt': -1 });

    if (!posts) {
        return res.status(400).json({ message: "Could not fetch Posts!!!" });
    }

    return res.status(200).json(posts);
}