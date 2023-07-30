import express = require('express');
const router = express.Router();
import layerController from '../controllers/layerController';

router.post('/', layerController.set);
router.get('/', layerController.getAll);
router.post('/del', layerController.delLayers);

export default router;
