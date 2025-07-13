import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'default.png'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String,
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
});

// Propagate Delete request of use to Profile, Comments and Posts

export const User = mongoose.model('User', userSchema);