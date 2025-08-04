import mongoose from "mongoose";
import fs from "fs";

import { Comment } from "./comments.model.js";
import { type } from "os";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    media: {
        type: String,
        default: ''
    },
    fileType: {
        type: String,
        default: ''
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    active: {
        type: Boolean,
        default: true
    },
    archived: {
        type: Boolean,
        default: false
    },
    edited: {
        type: Boolean,
        default: false
    },
    blocked: {
        type: Boolean,
        default: false
    }
});

// Deleting Post media and associated Comments if Post is deleted
postSchema.post('findOneAndDelete', async (post) => {
    // Deleting Post media
    if (post && post.media) {
        const filePath = 'uploads/posts/' + post.media;

        fs.unlink(filePath, (err) => {
            if (err) {
                console.log("Error Deleting File!!!");
                console.log(err);
            }
        });
    }

    // Deleting Comments
    if (post) {
        await Comment.deleteMany(({ postId: post._id }));
    }
});

export const Post = mongoose.model('Post', postSchema);