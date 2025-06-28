import bcrypt from "bcrypt";
import crypto from "crypto";

import { User } from '../models/user.model.js';
import { Profile } from '../models/profile.model.js';

// Signup
export const signup = async (req, res) => {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
        return res.status(400).json({ message: "All fields are must..." });
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
}

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
        ]
    });

    if (!user) {
        return res.status(404).json({ message: "Fuck Off! No such User exists..." });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Incorrect Credentials" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    await User.updateOne({ _id: user._id }, { token });

    return res.status(202).json({ token });
}

// Upload/Update Profile Picture
export const uploadProfilePic = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Incorrect Credentials" });
    }

    const user = await User.findOne({ token: token });

    if (!user) {
        return res.status(404).json({ message: "Fuck Off! No such User Exists..." });
    }

    if (!req.file) {
        return res.status(400).json({ message: "Invalid file type. Only JPEG, JPG, and PNG are allowed..." });
    }

    user.profilePicture = req.file.fileName;
    await user.save();

    return res.status(202).json({ message: "Profile Picture Updated..." });
}

// Update User Details(name, username, email)
export const updateUser = async (req, res) => {
    const { token, ...newUserData } = req.body;

    const user = await User.findOne({ token: token });

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

    return res.status(202).json({ message: "User Information Updated..." });
}