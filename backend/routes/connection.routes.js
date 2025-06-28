import { Router } from "express";

import { wrapAsync } from "../utils/wrapAsync.js";

import { isLoggedIn } from "../middlewares/authentication/isLoggedIn.js";

import * as connectionController from "../controllers/connection.controllers.js";

const router = Router();

// Send Connection request
router.route('/send_request')
    .post(isLoggedIn, wrapAsync(connectionController.sendConnectionReq));

// Respond to Connection request(Accept, Reject) and Manage Connections (Delete connections)
router.route('/manage_connections')
    .post(isLoggedIn, wrapAsync(connectionController.manageConnections));

// Get Connection lists
router.route('/my_connections')
    .get(isLoggedIn, wrapAsync(connectionController.getConnections));

export default router;