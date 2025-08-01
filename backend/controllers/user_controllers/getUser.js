import { User } from "../../models/user.model.js";

// Fetch User from username
export const getUser = async (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).json({ message: "Send valid username!!!" });
    }

    const user = await User.findOne({ username: username, active: true, blocked: false });

    if (!user) {
        return res.status(404).json({ message: "No User found!!!" });
    }

    return res.status(200).json(user);
}