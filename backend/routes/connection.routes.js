import { Router } from "express";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import { getConnections } from "../controllers/connection_controllers/getConnections.js";
import { manageConnections } from "../controllers/connection_controllers/manageConnections.js";
import { getConnectionReq } from "../controllers/connection_controllers/getConnectionReq.js";
import { sendConnectionReq } from "../controllers/connection_controllers/sendConnectionReq.js";

const router = Router();

// Send Connection request
router.route('/send_request')
    .post(isLoggedIn, wrapAsync(sendConnectionReq));

// Fetch Connection requests sent by others
router.route('/get_requests')
    .get(isLoggedIn, wrapAsync(getConnectionReq));

// Respond to Connection request(Accept, Reject) and Manage Connections (Delete connections)
router.route('/manage_connections')
    .post(isLoggedIn, wrapAsync(manageConnections));

// Get Connection lists
router.route('/my_connections')
    .get(isLoggedIn, wrapAsync(getConnections));

export default router;