import mongoose from "mongoose";

import { workSchema } from "./profileDetailsSchema/work.schema.js";
import { educationSchema } from "./profileDetailsSchema/education.schema.js";

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
        type: [workSchema],
        default: []
    },
    education: {
        type: [educationSchema],
        default: []
    }
});

export const Profile = mongoose.model('Profile', profileSchema);