import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";

// Search Users with their names
export const searchUsers = async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim ()=== "") {
        return res.status(400).json({ message: "Send Valid Data..." });
    }

    const users = await User.find({
            name: { $regex: name, $options: 'i' },
            active: true,
            blocked: false
    });
    
    if (!users || users.length == 0) {
        return res.status(200).json({message: "No Profiles found..."})
    }

    const userIds = users.map(user => user._id);

    const profiles = await Profile.find({ userId: { $in: userIds } })
        .populate('userId', 'username name email profilePicture');

    return res.status(200).json(profiles);
}