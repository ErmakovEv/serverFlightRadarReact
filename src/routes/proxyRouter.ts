import express = require('express');
const router = express.Router();
import proxyController from '../controllers/proxyController';

router.get('/flights/:bounds', proxyController.getFlights);
router.get('/all-airports', proxyController.getAllAirports);
router.get('/airport/:id', proxyController.getAirport);
router.get('/flight-status/:id', proxyController.getFlightStatus);
router.get('/shedule/:id', proxyController.getShedule);

export default router;
