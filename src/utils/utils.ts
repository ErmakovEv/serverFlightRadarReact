import jwt = require('jsonwebtoken');
import express = require('express');

const signatureAccess = 'MySuP3R_z3kr3t_access';
const signatureRefresh = 'MySuP3R_z3kr3t_refresh';

type User = {
  email: string;
  role: string;
  iat?: number;
  exp?: number;
};

export interface IGetUserAuthInfoRequest extends express.Request {
  user?: string | jwt.JwtPayload | User; // or any other type
}

export const accessTokenAge = 20;
export const refreshTokenAge = 60 * 60;

export const getTokens = (user: User | jwt.JwtPayload) => {
  return {
    accessToken: jwt.sign({ user }, signatureAccess, {
      expiresIn: `${accessTokenAge}s`,
    }),
    refreshToken: jwt.sign({ user }, signatureRefresh, {
      expiresIn: `${refreshTokenAge}s`,
    }),
  };
};

export const checkAuthMiddleware = (
  req: IGetUserAuthInfoRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, signatureAccess);
    req.user = typeof decoded === 'object' ? decoded.user : decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};

export const verifyRefreshToken = (
  req: IGetUserAuthInfoRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(refreshToken, signatureRefresh);
    req.user = typeof decoded === 'object' ? decoded.user : decoded;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};
