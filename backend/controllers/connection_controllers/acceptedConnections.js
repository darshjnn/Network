import { Connection } from "../../models/connections.model.js";
import { User } from "../../models/user.model.js";

// Get Connections accepted by the current User

export const acceptedConnections = async (req, res) => {
    const { token } = req.body;

    const user = await User.findOne({ token: token, active: true, blocked: false });

    const connections = await Connection.find({
        $or: [
            { userId: user._id },
            { connectionId: user._id }
        ],
        status: true
    }).populate('connectionId userId', 'name username email profilePicture')
        .sort({ 'createdAt': -1 });

    if (!connections) {
        return res.status(200).json({ message: "Could not fetch Connections..." });
    }

    return res.status(200).json(connections);
};
