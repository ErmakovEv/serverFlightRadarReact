import express = require('express');
const router = express.Router();

// import deviceRouter from './deviceRouter';
// import brandRouter from './brandRouter';
// import typeRouter from './typeRouter';
import userRouter from './userRouter';
import settingRouter from './settingRouter';
import proxyRouter from './proxyRouter';
import layerRouter from './layerRouter';

router.use('/user', userRouter);
router.use('/setting', settingRouter);
router.use('/proxy', proxyRouter);
router.use('/layer', layerRouter);
// router.use('/brand', brandRouter);
// router.use('/device', deviceRouter);

export default router;
