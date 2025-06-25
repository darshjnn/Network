import { Router } from "express";

import { wrapAsync } from "../utils/wrapAsync.js";

import * as searchController from "../controllers/search.controllers.js";

const router = Router();

// Search all User Profiles by 'name'
router.route('/users')
    .get(wrapAsync(searchController.searchUsers));

export default router;