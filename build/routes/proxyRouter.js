"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const proxyController_1 = require("../controllers/proxyController");
router.get('/flights/:bounds', proxyController_1.default.getFlights);
router.get('/all-airports', proxyController_1.default.getAllAirports);
router.get('/airport/:id', proxyController_1.default.getAirport);
router.get('/flight-status/:id', proxyController_1.default.getFlightStatus);
router.get('/shedule/:id', proxyController_1.default.getShedule);
exports.default = router;
//# sourceMappingURL=proxyRouter.js.map