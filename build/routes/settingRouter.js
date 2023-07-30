"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const settingController_1 = require("../controllers/settingController");
// import authMiddleware from '../middleware/authMiddleware';
const utils_1 = require("../utils/utils");
router.post('/:id', settingController_1.default.set);
router.get('/', settingController_1.default.getAll);
router.get('/get-config', utils_1.checkAuthMiddleware, settingController_1.default.getOne);
exports.default = router;
//# sourceMappingURL=settingRouter.js.map