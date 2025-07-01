import PDFDocument from "pdfkit";
import fs from "fs";

import { User } from "../models/user.model.js";
import { Profile } from '../models/profile.model.js';

// Create PFD fro User profile
const userDataToPdf = async (profile) => {
    const doc = new PDFDocument();

    const fileName = `${profile._id}.pdf`;
    const stream = fs.createWriteStream("uploads/resume/" + fileName);

    doc.pipe(stream);

    doc.image(
        `uploads/profile_pictures/${profile.userId.profilePicture}`,
        { align: "center", width: 100 });

    doc.fontSize(16).text(`Name: ${profile.userId.name}`, { align: 'center' });
    doc.fontSize(14).text(`Email: ${profile.userId.email}`, { align: 'center' });
    doc.fontSize(14).text(`Bio: ${profile.bio}`);
    doc.fontSize(14).text(`Current Post: ${profile.currentPost}`);

    doc.fontSize(14).text(`Experience: `);
    profile.experience.forEach(
        (work, index) => {
            doc.fontSize(14).text(`  ${index + 1}. Company: ${work.company}`);
            doc.fontSize(12).text(`       Position: ${work.position}`);
            doc.fontSize(12).text(`       Duration: ${work.duration}`);
        }
    );

    doc.end();

    return fileName;
}

// Fetch User Profile
export const getUserProfile = async (req, res) => {
    const { token } = req.body;

    const user = await User.findOne({ token: token });

    const userProfile = await Profile.findOne({ userId: user._id })
        .populate('userId', 'username name email profilePicture');

    return res.status(200).json({ userProfile });
}

// Update User Profile
export const updateUserProfile = async (req, res) => {
    const { token, ...newProfileData } = req.body;

    const user = await User.findOne({ token: token });
    const profile = await Profile.findOne({ userId: user._id });

    Object.assign(profile, newProfileData);
    await profile.save();

    return res.status(201).json({ message: "User Profile Updated..." });
}

// Download User Profile
export const downloadProfile = async (req, res) => {
    const user_id = req.query.id;

    const userProfile = await Profile.findOne({ userId: user_id })
        .populate('userId', 'name email profilePicture');

    let profilePdf = await userDataToPdf(userProfile);

    return res.json({ "message": profilePdf });
}