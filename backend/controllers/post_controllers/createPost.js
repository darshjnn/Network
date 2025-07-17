import { Post } from "../../models/posts.model.js";
import { User } from "../../models/user.model.js";

// Create Post
export const createPost = async (req, res) => {
    const { token, body } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Incorrect Credentials" });
    }

    if (!body) {
        return res.status(400).json({ message: "Body for post is must..." });
    }

    const user = await User.findOne({ token: token, active: true, blocked: false });

    if (!user) {
        return res.status(404).json({ message: "Fuck Off! No such User Exists..." });
    }

    const post = new Post({
        userId: user._id,
        body: body,
        media: req.file !== undefined ? req.file.filename : "",
        fileType: req.file !== undefined ? req.file.mimetype.split("/")[1] : ""
    });

    await post.save();

    return res.status(201).json({ message: "Post created successfully..." });
};
