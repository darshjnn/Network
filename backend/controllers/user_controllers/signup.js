import { Profile } from "../../models/profile.model.js";
import { User } from "../../models/user.model.js";

import bcrypt from "bcrypt";
import validator from "validator";

// Signup
export const signup = async (req, res) => {
    const { name, email, password, username } = req.body;

    if (!name || !password || !password || !username) {
        return res.status(400).json({ message: "All fields are must..." });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Enter a valid Email..." });
    }

    if (!validator.matches(username, "^[a-zA-Z0-9_\.\-]*$")) {
        return res.status(400).json({ message: "Enter a valid Username..." });
    }

    const user = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });

    if (user) {
        if (user.username === username) {
            return res.status(400).json({ message: "Username already taken..." });
        } else {
            return res.status(400).json({ message: "Email already exists..." });
        }
    }

    let hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashPassword,
        username
    });
    await newUser.save();

    const userProfile = new Profile({
        userId: newUser._id
    });
    userProfile.save();

    return res.status(201).json({ message: "User created successfully..." });
};
