import { Profile } from "../../models/profile.model.js";
import { User } from "../../models/user.model.js";

// Update User Profile

export const updateUserProfile = async (req, res) => {
    const { token, ...newProfileData } = req.body;

    const user = await User.findOne({ token: token, active: true, blocked: false });
    const profile = await Profile.findOne({ userId: user._id });

    Object.assign(profile, newProfileData);
    await profile.save();

    return res.status(201).json({ message: "User Profile Updated..." });
};
