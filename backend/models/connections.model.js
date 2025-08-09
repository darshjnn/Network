import mongoose, { now } from "mongoose";

const connectionSchema = new mongoose.Schema({
    // Sent By
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // Sent To
    connectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // Status: Status: true => req accepted; Status: false: action await
    status: {
        type: Boolean,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Connection = mongoose.model('Connection', connectionSchema);