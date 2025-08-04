import fs from "fs";

import { Post } from "../../models/posts.model.js";
import { User } from "../../models/user.model.js";

// Edit Post
export const editPost = async (req, res) => {
    const { token, postId, ...newPost } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Incorrect Credentials" });
    }

    if (!newPost || !newPost.body) {
        return res.status(400).json({ message: "Body for post is must..." });
    }

    const user = await User.findOne({ token: token, active: true, blocked: false });

    if (!user) {
        return res.status(404).json({ message: "Fuck Off! No such User Exists..." });
    }

    const post = await Post.findOne({ _id: postId, blocked: false });

    if (!post) {
        return res.status(404).json({ message: "No such Post found!!!" });
    }

    if (String(post.userId._id) !== String(user._id)) {
        return res.status(400).json({ message: "Not authorized to delete this Post!!!" });
    }

    // Unlinking the old file of the Post if new file is there
    if (req.file) {
        if (post.media !== "") {
            const filePath = 'uploads/posts/' + post.media;

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log("Error Deleting File!!!");
                    console.log(err);
                }
            });
        }

        newPost.media = req.file.filename;
        newPost.fileType = req.file.mimetype.split("/")[1];
    }

    // Check if the post is actually edited
    if (post.body !== newPost.body && post.media !== newPost.media) {
        newPost.edited = true;
        newPost.updatedAt = new Date();
        Object.assign(post, newPost);
        await post.save();
    }

    return res.status(201).json({ message: "Post updated successfully..." });
};
