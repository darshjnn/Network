import mongoose, { connection } from "mongoose";

const connectReqSchema = new mongoose.Schema({
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
    status_accepted: {
        type: Boolean,
        default: null
    }
});

export const ConnectionRequest = mongoose.model('Connection', connectReqSchema);