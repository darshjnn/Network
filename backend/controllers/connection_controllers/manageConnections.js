import { Connection } from "../../models/connections.model.js";

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
        return res.status(201).json({ message: "Request Accepted..." });

    } else if (!connectionUser.status && action === "reject") {
        await Connection.deleteOne({ _id: requestId });
        return res.status(201).json({ message: "Request Rejected..." });

    } else if (action === "delete") {
        await Connection.deleteOne({ _id: requestId });
        if (connectionUser.status) {
            return res.status(201).json({ message: "Connection Removed..." });
        } else {
            return res.status(201).json({ message: "Connection Request Removed..." });
        }
    } else {
        return res.status(404).json({ message: "Invalid action type..." });
    }
};
