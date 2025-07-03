import fs from "fs";

import { User } from "../models/user.model.js";
import { Post } from "../models/posts.model.js";
import { Comment } from "../models/comments.model.js";

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
}

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

    newPost.updatedAt = new Date();
    Object.assign(post, newPost);
    await post.save();

    return res.status(201).json({ message: "Post updated successfully..." });
}

// Get all Posts (only the post which are not archived and active are to be fetched)
export const getAllPosts = async (req, res) => {
    const posts = await Post.find({ active: true, archived: false, blocked: false })
        .populate('userId', 'username name profilePicture');

    if (!posts) {
        return res.status(400).json({ message: "Could not fetch posts..." });
    }

    return res.status(200).json(posts);
}

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
}

// Archive/Unarchive Post
export const toggleArchivePost = async (req, res) => {
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

    if (post.archived) {
        post.archived = false;
        await post.save();
        // Unarchive the comments associated with the Post
        await Comment.updateMany(
            { postId: postId, active: false, blocked: false },
            { $set: { active: true } }
        );
        return res.status(200).json({ message: "Post Unarchived successfully..." });
    } else if (!post.archived) {
        post.archived = true;
        await post.save();
        // Archive the comments associated with the Post
        await Comment.updateMany(
            { postId: postId, active: true, blocked: false },
            { $set: { active: false } }
        );
        return res.status(200).json({ message: "Post Archived successfully..." });
    }

    return res.status(500).json({ message: "Something went wrong!!!" });
}