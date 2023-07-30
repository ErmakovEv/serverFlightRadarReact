"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
// import deviceRouter from './deviceRouter';
// import brandRouter from './brandRouter';
// import typeRouter from './typeRouter';
const userRouter_1 = require("./userRouter");
const settingRouter_1 = require("./settingRouter");
const proxyRouter_1 = require("./proxyRouter");
const layerRouter_1 = require("./layerRouter");
router.use('/user', userRouter_1.default);
router.use('/setting', settingRouter_1.default);
router.use('/proxy', proxyRouter_1.default);
router.use('/layer', layerRouter_1.default);
// router.use('/brand', brandRouter);
// router.use('/device', deviceRouter);
exports.default = router;
//# sourceMappingURL=router.js.map