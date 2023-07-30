import express = require('express');
const router = express.Router();
import settingController from '../controllers/settingController';
// import authMiddleware from '../middleware/authMiddleware';
import { checkAuthMiddleware } from '../utils/utils';

router.post('/:id', settingController.set);
router.get('/', settingController.getAll);
router.get('/get-config', checkAuthMiddleware, settingController.getOne);

export default router;
