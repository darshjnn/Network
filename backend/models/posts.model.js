import mongoose from "mongoose";
import fs from "fs";

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
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
    active: {
        type: Boolean,
        default: true
    },
    archived: {
        type: Boolean,
        default: false
    },
    fileType: {
        type: String,
        default: ''
    }
});

// Deleting Post media if Post is deleted
postSchema.post('findOneAndDelete', async (doc) => {
    if (doc && doc.media) {
        const filePath = 'uploads/posts/' + doc.media;

        fs.unlink(filePath, (err) => {
            if (err) {
                console.log("Error Deleting File!!!");
                console.log(err);
            }
        });
    }
});

export const Post = mongoose.model('Post', postSchema);