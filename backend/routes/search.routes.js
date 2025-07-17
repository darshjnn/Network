import { Router } from "express";

import { wrapAsync } from "../utils/wrapAsync.js";

import { searchUsers } from "../controllers/search_controllers/searchUsers.js";

const router = Router();

// Search all User Profiles by 'name'
router.route('/users')
    .get(wrapAsync(searchUsers));

export default router;