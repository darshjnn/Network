import { Connection } from "../../models/connections.model.js";
import { User } from "../../models/user.model.js";

// Send Connection request

export const sendConnectionReq = async (req, res) => {
    const { token, connectionId } = req.body;

    const currentUser = await User.findOne({ token: token, active: true, blocked: false });
    const connectionUser = await User.findOne(
        { _id: connectionId, active: true, blocked: false });

    if (String(currentUser._id) === connectionId) {
        return res.status(400).json({ message: "Looped request is invalid..." });
    }

    if (!connectionUser) {
        return res.status(400).json({ message: "Not a Valid User to send request..." });
    }

    // Check if the User already sent the request OR If the User is already connected
    const existingReq = await Connection.findOne({
        $or: [
            // Current user already sent the request
            { userId: currentUser._id, connectionId: connectionUser._id, },
            // Already connected in either direction
            { userId: currentUser._id, connectionId: connectionUser._id, status: true },
            { userId: connectionUser._id, connectionId: currentUser._id, status: true }
        ]
    });

    if (existingReq) {
        if (existingReq.status === null) {
            return res.status(200).json({ message: "Request already sent..." });
        } else if (existingReq.status === true) {
            return res.status(200).json({ message: "User already in connection..." });
        }
    }

    // Check if the current user already received connection request from the other User
    const receivedRequest = await Connection.findOne({
        userId: connectionUser._id,
        connectionId: currentUser._id,
        status: null
    });

    if (receivedRequest) {
        return res.status(200).json({ message: "User already waiting for response..." });
    }

    // Creating a new Connection request
    const newRequest = new Connection({
        userId: currentUser._id,
        connectionId: connectionUser._id
    });

    await newRequest.save();

    return res.status(201).json({ message: "Request Sent..." });
};
