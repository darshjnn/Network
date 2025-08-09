import { Connection } from "../../models/connections.model.js";
import { User } from "../../models/user.model.js";

// Fetch Connection requests sent by others

export const getConnectionReq = async (req, res) => {
    const { token } = req.body;

    const currentUser = await User.findOne({ token: token, active: true, blocked: false });

    const requests = await Connection.find({ connectionId: currentUser._id, status: false })
        .populate('userId', 'name username email profilePicture').sort({ createdAt: -1 });

    if (!requests) {
        return res.status(200).json({ message: "Could not fetch requests..." });
    }

    return res.status(200).json(requests);
};
