import express = require('express');
import jwt = require('jsonwebtoken');
import constans from '../constans';

interface TokenInterface {
  id: string;
  email: string;
  role: string;
}

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.method === 'OPTIONS') next();
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('err');
    const decoded = jwt.verify(token, constans.SECRET_KEY) as TokenInterface;
    if (decoded.role !== 'ADMIN') return res.status(401).json('Нет доступа!');
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).json('Пользователь не авторизован!');
  }
};
