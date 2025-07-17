import { Profile } from "../../models/profile.model.js";
import { User } from "../../models/user.model.js";

// Fetch User Profile
export const getUserProfile = async (req, res) => {
    const { token } = req.body;

    const user = await User.findOne({ token: token, active: true, blocked: false });

    const userProfile = await Profile.findOne({ userId: user._id })
        .populate('userId', 'username name email profilePicture');

    return res.status(200).json({ userProfile });
};
