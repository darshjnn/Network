import { Profile } from "../../models/profile.model.js";
import { User } from "../../models/user.model.js";

// Fetch User Profile
export const usernameUserProfile = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        res.status(400).json({ message: "Send valid data!!!" });
    }

    const user = await User.findOne({ username: username, active: true, blocked: false });

    if (!user) {
        res.status(404).json({ message: "No user found with the given username!!!" });
    }

    const userProfile = await Profile.findOne({ userId: user._id })
        .populate('userId', 'username name email profilePicture');

    return res.status(200).json({ userProfile });
}
