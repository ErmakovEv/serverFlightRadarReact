"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const constans_1 = require("../constans");
exports.default = (req, res, next) => {
    var _a;
    if (req.method === 'OPTIONS')
        next();
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            throw new Error('err');
        const decoded = jwt.verify(token, constans_1.default.SECRET_KEY);
        if (decoded.role !== 'ADMIN')
            return res.status(401).json('Нет доступа!');
        req.body.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json('Пользователь не авторизован!');
    }
};
//# sourceMappingURL=roleMiddleware.js.map