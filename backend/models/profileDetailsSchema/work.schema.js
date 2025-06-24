import mongoose from "mongoose";

export const workSchema = new mongoose.Schema({
    company: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: ''
    },
    duration: {
        type: String,
        default: ''
    }
});