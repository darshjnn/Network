import { User } from "../../models/user.model.js";

// Checks if the User is Logged in
export const isLoggedIn = async (req, res, next) => {
    const { token } = req.body;
    
    if (!token) {
        return res.status(400).json({ message: "Incorrect Credentials" });
    }

    const user = await User.findOne({ token: token });

    if (!user) {
        return res.status(404).json({ message: "Fuck Off! No such User Exists..." });
    }

    next();
}