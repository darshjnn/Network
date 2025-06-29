import { User } from "../models/user.model.js";
import { Connection } from "../models/connections.model.js";

// Send Connection request
export const sendConnectionReq = async (req, res) => {
    const { token, connectionId } = req.body;

    const currentUser = await User.findOne({ token: token });
    const connectionUser = await User.findOne({ _id: connectionId });

    if (String(currentUser._id) === connectionId) {
        return res.status(400).json({ message: "Looped request is invalid..." })
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
            { userId: currentUser._id, status: true },
            { connectionId: currentUser._id, status: true }
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

    return res.status(200).json({ message: "Request Sent..." });
}

// Fetch Connection requests sent by others
export const getConnectionReq = async (req, res) => {
    const { token } = req.body;

    const currentUser = await User.findOne({ token: token });
    const requests = await Connection.find({ connectionId: currentUser._id });

    if (!requests) {
        return res.status(200).json({ message: "Could not fetch requests..." });
    }

    return res.status(200).json(requests);
}

// Respond to Connection request(Accept, Reject) and Manage Connections (Delete connections)
export const manageConnections = async (req, res) => {
    const { requestId, action } = req.body;

    const connectionUser = await Connection.findOne({ _id: requestId });

    if (!connectionUser) {
        return res.status(404).json({ message: "Invalid Connection!!!" });
    }

    if (connectionUser.status === null && action === "accept") {
        connectionUser.status = true;
        await connectionUser.save();
        return res.status(200).json({ message: "Request Accepted..." });
    } else if (!connectionUser.status && action === "reject") {
        await Connection.deleteOne({ _id: requestId });
        return res.status(200).json({ message: "Request Rejected..." });
    } else if (connectionUser.status && action === "delete") {
        await Connection.deleteOne({ _id: requestId });
        return res.status(200).json({ message: "Connection Removed..." });
    }
    else {
        return res.status(404).json({ message: "Invalid action type..." });
    }
}

// Get Connection lists
export const getConnections = async (req, res) => {
    const { token } = req.body;

    const user = await User.findOne({ token: token });

    const connections = await Connection.find({
        $and: [{
            userId: user._id,
            status: true
        }]
    }).populate('connectionId', 'name username email profilePicture');

    if (!connections) {
        return res.status(200).json({ message: "Could not fetch Connections..." });
    }

    return res.status(200).json(connections);
}