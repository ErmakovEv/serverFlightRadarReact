import express = require('express');
const router = express.Router();
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import { checkAuthMiddleware, verifyRefreshToken } from '../utils/utils';

router.post('/reg', userController.registration);
router.post('/login', userController.login);
router.get('/refresh', verifyRefreshToken, userController.refresh);
router.get('/logout', userController.logout);
router.get('/auth', authMiddleware, userController.check);
router.get('/', verifyRefreshToken, userController.getAllUsers);
router.post('/', verifyRefreshToken, userController.delUsers);

export default router;
