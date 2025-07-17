import bcrypt from "bcrypt";
import crypto from "crypto";

import { User } from "../../models/user.model.js";

// Login
export const login = async (req, res) => {
    const { email, password, username } = req.body;

    if ((!email && !username) || !password) {
        return res.status(400).json({ message: "All fields are must..." });
    }

    const user = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ],
    });

    if (!user) {
        return res.status(404).json({ message: "Fuck Off! No such User exists..." });
    }

    if (user.blocked) {
        return res.status(200).json({ message: "Access Denied!!!" });
    }

    if (!user.active) {
        return res.status(200).json({ message: "First reactivate Account..." });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Incorrect Credentials" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    await User.updateOne({ _id: user._id }, { token });

    return res.status(201).json({ token });
};
