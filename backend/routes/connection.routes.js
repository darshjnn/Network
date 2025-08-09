import { Router } from "express";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import { connectionsList } from "../controllers/connection_controllers/connectionsList.js";
import { manageConnections } from "../controllers/connection_controllers/manageConnections.js";
import { getConnectionReq } from "../controllers/connection_controllers/getConnectionReq.js";
import { sendConnectionReq } from "../controllers/connection_controllers/sendConnectionReq.js";
import { acceptedConnections } from "../controllers/connection_controllers/acceptedConnections.js";

const router = Router();

// Send Connection request
router.route('/send_request')
    .post(isLoggedIn, wrapAsync(sendConnectionReq));

// Fetch Connection requests sent by others
router.route('/get_requests')
    .post(isLoggedIn, wrapAsync(getConnectionReq));

// Respond to Connection request(Accept, Reject) and Manage Connections (Delete connections)
router.route('/manage_connection')
    .post(isLoggedIn, wrapAsync(manageConnections));

// Get Connections accepted by the current User
router.route('/accepted_connections')
    .post(isLoggedIn, wrapAsync(acceptedConnections));

// Fetch current user's full connection list
router.route('/connections_list')
    .post(isLoggedIn, wrapAsync(connectionsList));

export default router;