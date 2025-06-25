import { User } from "../models/user.model.js";
import { Profile } from '../models/profile.model.js';

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

    return res.status(204).json({ message: "User Profile Updated..." });
}