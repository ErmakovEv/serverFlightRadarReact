import express = require('express');
import bcrypt = require('bcrypt');
import { User, UserModel, Setting } from '../models/models';
import jwt = require('jsonwebtoken');
import constans from '../constans';
import cookie = require('cookie');
import { getTokens, refreshTokenAge } from '../utils/utils';
import { IGetUserAuthInfoRequest } from '../utils/utils';

function generateJwt(id: number, email: string, role: string) {
  return jwt.sign({ id, email, role }, constans.SECRET_KEY, {
    expiresIn: '1h',
  });
}

const gettingUsers = async (curUser: UserModel) => {
  const allUsersArr = await User.findAll();
  const allUsersSettingsArr = await Setting.findAll();
  return allUsersArr
    .map((user) => {
      if (curUser.email === user.email) {
        return;
      }
      const { id, email, role } = user;
      const profile = allUsersSettingsArr.find(
        (userProfile) => userProfile.userId === id
      );
      return { id, email, role, profile };
    })
    .filter((item) => item != null);
};

class UserController {
  async registration(req: express.Request, res: express.Response) {
    try {
      const { email, password, role } = req.body;
      console.log('!!!');
      if (!email || !password) {
        return res.status(400).json('Неверные данные');
      }
      console.log(email, password, role);
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return res
          .status(400)
          .json('Пользователь с таким именем уже существует');
      }
      const hashPass = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPass });
      const setting = await Setting.create({ userId: user.id });
      const token = generateJwt(user.id, user.email, user.role);
      return res
        .status(200)
        .json({ 'Пользователь успешно зарегистрирован': token });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res
          .status(401)
          .json('Пользователь с таким именем не существует');
      }
      const comparePass = bcrypt.compareSync(password, user.password);
      if (!comparePass) {
        return res.status(401).json('Пароль неверный!');
      }

      const { accessToken, refreshToken } = getTokens({
        email: user.email,
        role: user.role,
      });
      const { secure } = req;
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('refreshToken', refreshToken, {
          secure,
          httpOnly: true,
          maxAge: refreshTokenAge, //1000 * 60 * 60 -?
          sameSite: secure ? 'none' : 'lax',
        })
      );
      res.send({ accessToken });
    } catch (error) {
      res.status(404).json('ХЗ ЧЕ ПОКА');
    }
  }

  async refresh(req: IGetUserAuthInfoRequest, res: express.Response) {
    let { accessToken, refreshToken } =
      typeof req.user === 'object'
        ? getTokens(req.user)
        : { accessToken: null, refreshToken: null };
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('refreshToken', refreshToken || '', {
        httpOnly: true,
        maxAge: 1000 * 60 * 60, //??? refreshTokenAge
      })
    );
    res.send({ accessToken });
  }

  async logout(req: express.Request, res: express.Response) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('refreshToken', '', {
        httpOnly: true,
        maxAge: 0,
      })
    );
    res.sendStatus(200);
  }

  async check(req: express.Request, res: express.Response) {
    const { user } = req.body;
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async getAllUsers(req: IGetUserAuthInfoRequest, res: express.Response) {
    if (req.user !== 'string') {
      const ans = await gettingUsers(req.user as UserModel);
      return res.json(ans);
    }
  }

  async delUsers(req: IGetUserAuthInfoRequest, res: express.Response) {
    const { usersID } = req.body;
    console.log(usersID);
    if (usersID) {
      usersID.forEach(async (element: number) => {
        try {
          // Найти элемент, который нужно удалить
          const postToDelete = await User.findOne({ where: { id: element } });

          if (postToDelete) {
            // Выполнить удаление элемента
            await postToDelete.destroy();
            console.log('Элемент успешно удален из базы данных.');
            res.sendStatus(200);
          } else {
            console.log('Элемент не найден в базе данных.');
            res.sendStatus(404);
          }
        } catch (error) {
          console.error('Ошибка при удалении элемента из базы данных:', error);
          res.sendStatus(404);
        }
      });
    }
  }
}

export default new UserController();
