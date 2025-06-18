import mongoose from "mongoose";

import { workSchema } from "./work.model";
import { educationSchema } from "./education.model";

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bio: {
        type: String,
        default: ''
    },
    currentPost: {
        type: String,
        default: ''
    },
    experience: {
        type: workSchema,
        default: []
    },
    education: {
        type: [educationSchema],
        default: []
    }
});

export const Profile = mongoose.Schema('Profile', profileSchema);