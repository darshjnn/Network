import mongoose from "mongoose";

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
    // Status: null => action await, Status: true => req accepted, Status: false: req rejected
    status: {
        type: Boolean,
        default: null
    }
});

export const Connection = mongoose.model('Connection', connectionSchema);