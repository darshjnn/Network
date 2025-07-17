import { User } from '../../models/user.model.js';

// Update User Details(name, username, email)
export const updateUser = async (req, res) => {
    const { token, ...newUserData } = req.body;

    const user = await User.findOne({ token: token, active: true, blocked: false });

    const { username, email } = newUserData;

    if (!username || !email) {
        return res.status(400).json({ message: "Send Valid Data..." });
    }

    // Find user with the same username or email, but with a different _id than the current user
    const isExistingUser = await User.findOne({
        $and: [
            { $or: [{ username }, { email }] },
            { _id: { $ne: user._id } }
        ]
    });

    // If any User already exists with new credentials, then, return
    if (isExistingUser) {
        if (isExistingUser.username === username) {
            return res.status(400).json({ message: "Username already taken..." });
        } else {
            return res.status(400).json({ message: "Email already exists..." });
        }
    }

    Object.assign(user, newUserData);
    await user.save();

    return res.status(201).json({ message: "User Information Updated..." });
};
