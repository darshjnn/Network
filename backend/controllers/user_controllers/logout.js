import { User } from '../../models/user.model.js';

// Log out
export const logout = async (req, res) => {
    const { token } = req.body;

    await User.findOneAndUpdate({ token: token }, { $set: { token: null } }, { new: true });

    return res.status(200).json({ message: "Log out successful..." });
};
