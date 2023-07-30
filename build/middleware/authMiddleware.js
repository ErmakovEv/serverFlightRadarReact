"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const constans_1 = require("../constans");
exports.default = (req, res, next) => {
    var _a, _b;
    if (req.method === 'OPTIONS')
        next();
    try {
        console.log((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token)
            throw new Error('err');
        const decoded = jwt.verify(token, constans_1.default.SECRET_KEY);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json('Пользователь не авторизован!!!');
    }
};
//# sourceMappingURL=authMiddleware.js.map