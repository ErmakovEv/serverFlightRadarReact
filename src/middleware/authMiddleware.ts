import express = require('express');
import jwt = require('jsonwebtoken');
import constans from '../constans';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.method === 'OPTIONS') next();
  try {
    console.log(req.headers.authorization?.split(' ')[1]);
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('err');
    const decoded = jwt.verify(token, constans.SECRET_KEY);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).json('Пользователь не авторизован!!!');
  }
};
