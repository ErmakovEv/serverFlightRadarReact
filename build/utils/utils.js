"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.checkAuthMiddleware = exports.getTokens = exports.refreshTokenAge = exports.accessTokenAge = void 0;
const jwt = require("jsonwebtoken");
const signatureAccess = 'MySuP3R_z3kr3t_access';
const signatureRefresh = 'MySuP3R_z3kr3t_refresh';
exports.accessTokenAge = 20;
exports.refreshTokenAge = 60 * 60;
const getTokens = (user) => {
    return {
        accessToken: jwt.sign({ user }, signatureAccess, {
            expiresIn: `${exports.accessTokenAge}s`,
        }),
        refreshToken: jwt.sign({ user }, signatureRefresh, {
            expiresIn: `${exports.refreshTokenAge}s`,
        }),
    };
};
exports.getTokens = getTokens;
const checkAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization
        ? req.headers.authorization.split(' ')[1]
        : '';
    if (!token)
        return res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, signatureAccess);
        req.user = typeof decoded === 'object' ? decoded.user : decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(401);
    }
};
exports.checkAuthMiddleware = checkAuthMiddleware;
const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.sendStatus(401);
    try {
        const decoded = jwt.verify(refreshToken, signatureRefresh);
        req.user = typeof decoded === 'object' ? decoded.user : decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=utils.js.map