import { Router } from "express";

import { wrapAsync } from "../utils/wrapAsync.js";

import * as searchController from "../controllers/search.controller.js";

const router = Router();

// Search all User Profiles by 'name'
router.route('/users')
    .get(wrapAsync(searchController.searchUsers));

export default router;