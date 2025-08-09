import { Profile } from "../../models/profile.model.js";

import PDFDocument from "pdfkit";
import fs from "fs";

// Create PDF for User profile
const userDataToPdf = async (profile) => {
    const doc = new PDFDocument();

    const fileName = `${profile.userId._id}.pdf`;
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

// Download User Profile
export const downloadProfile = async (req, res) => {
    const { userId } = req.body;

    const userProfile = await Profile.findOne({ userId: userId })
        .populate('userId', 'name email profilePicture');

    let profilePdf = await userDataToPdf(userProfile);

    return res.json({ "message": profilePdf });
};
