'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const express = require('express');
const path = require('path');
const constans_1 = require('./constans');
const db_1 = require('./db');
const cors = require('cors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const models = require('./models/models'); //???
const router_1 = require('./routes/router');
const PORT = constans_1.default.PORT;
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://flightradarclone.onrender.com/',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'cookie'],
  })
);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileupload());
app.use('/api', router_1.default);
const start = async () => {
  try {
    await db_1.default.authenticate();
    await db_1.default.sync();
    app.listen(PORT, () => console.log(`Server run on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
/*
!!! НЕ сделан ErrorHandler 32:36

STOP - 41: 20 DeviceController

"build": "rimraf ./build && npx tsc",

*/
//# sourceMappingURL=main.js.map
