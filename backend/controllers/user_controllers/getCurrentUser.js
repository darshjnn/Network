import { User } from '../../models/user.model.js';

// Fetch Current User
export const getCurrentUser = async (req, res) => {
    const { token } = req.body;

    const user = await User.findOne({ token: token })
        .select('_id name email username profilePicture createdAt active blocked');

    return res.status(200).json(user);
};
