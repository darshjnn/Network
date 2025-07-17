import { User } from '../../models/user.model.js';

// Upload/Update Profile Picture
export const uploadProfilePic = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Incorrect Credentials" });
    }

    const user = await User.findOne({ token: token, active: true, blocked: false });

    if (!user) {
        return res.status(404).json({ message: "Fuck Off! No such User Exists..." });
    }

    if (!req.file) {
        return res.status(400).json({ message: "Invalid file type. Only JPEG, JPG, and PNG are allowed..." });
    }

    user.profilePicture = req.file.filename;
    await user.save();

    return res.status(201).json({ message: "Profile Picture Updated..." });
};
