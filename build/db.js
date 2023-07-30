"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const constans_1 = require("./constans");
exports.default = new sequelize_1.Sequelize(constans_1.default.DB_NAME, constans_1.default.DB_USER, constans_1.default.DB_PASS, {
    dialect: 'postgres',
    host: constans_1.default.DB_HOST,
    port: constans_1.default.DB_PORT,
});
//# sourceMappingURL=db.js.map