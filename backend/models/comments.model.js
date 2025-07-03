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
            default: 0,
            min: 0
        },
        likedBy: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            default: []
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
        },
        active: {
            type: Boolean,
            default: true
        },
        blocked: {
            type: Boolean,
            default: false
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

// Propagating Delete request of Comment to its Replies
commentSchema.post('findOneAndDelete', async (comment) => {
    if (comment) {
        await Comment.deleteMany({ parentComment: comment._id });
    }
});

export const Comment = mongoose.model('Comment', commentSchema);