import mongoose from "mongoose";

export const educationSchema = new mongoose.Schema({
    school: {
        type: String,
        default: ''
    },
    degree: {
        type: String,
        default: ''
    },
    field: {
        type: String,
        default: ''
    }
});