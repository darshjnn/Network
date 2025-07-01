import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
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
        parentComment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

commentSchema.virtual('replies', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'parentComment'
});

export const Comment = mongoose.model('Comment', commentSchema);