"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const layerController_1 = require("../controllers/layerController");
router.post('/', layerController_1.default.set);
router.get('/', layerController_1.default.getAll);
router.post('/del', layerController_1.default.delLayers);
exports.default = router;
//# sourceMappingURL=layerRouter.js.map