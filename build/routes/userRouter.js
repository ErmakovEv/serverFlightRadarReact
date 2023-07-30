"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const utils_1 = require("../utils/utils");
router.post('/reg', userController_1.default.registration);
router.post('/login', userController_1.default.login);
router.get('/refresh', utils_1.verifyRefreshToken, userController_1.default.refresh);
router.get('/logout', userController_1.default.logout);
router.get('/auth', authMiddleware_1.default, userController_1.default.check);
router.get('/', utils_1.verifyRefreshToken, userController_1.default.getAllUsers);
router.post('/', utils_1.verifyRefreshToken, userController_1.default.delUsers);
exports.default = router;
//# sourceMappingURL=userRouter.js.map