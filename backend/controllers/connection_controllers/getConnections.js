import { Connection } from "../../models/connections.model.js";
import { User } from "../../models/user.model.js";

// Get Connection lists

export const getConnections = async (req, res) => {
    const { token } = req.body;

    const user = await User.findOne({ token: token, active: true, blocked: false });

    const connections = await Connection.find({
        $or: [
            { userId: user._id, status: true },
            { connectionId: user._id, status: true }
        ]
    }).populate('connectionId', 'name username email profilePicture');

    if (!connections) {
        return res.status(200).json({ message: "Could not fetch Connections..." });
    }

    return res.status(200).json(connections);
};
