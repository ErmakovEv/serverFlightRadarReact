import express = require('express');
import { Setting, User } from '../models/models';
import { IGetUserAuthInfoRequest } from '../utils/utils';
import { error } from 'console';

class SettingController {
  async set(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const { mapType, pos } = req.body;

      const user = await User.findOne({ where: { email: id } });
      console.log('user!!!!!!!!!!!!!!!!!!!!!', user);
      if (!user) throw 'err';
      const setting = await Setting.update(
        {
          mapType: mapType,
          geoPos: pos,
        },
        {
          where: { userId: user?.id },
        }
      );
      console.log('setting[0]!!!!!!!!!!!!!!!!!!!!!', setting[0]);
      if (setting[0] !== 1) {
        console.log('errr');
        throw error;
      }
      res.json(setting);
    } catch (error) {
      return res.sendStatus(404);
    }
  }

  async getAll(req: express.Request, res: express.Response) {
    const settings = await Setting.findAll();
    console.log('settings!!!', settings);
    return res.json(settings);
  }

  async getOne(req: IGetUserAuthInfoRequest, res: express.Response) {
    if (typeof req.user === 'object') {
      const user = await User.findOne({ where: { email: req.user.email } });
      const setting = await Setting.findOne({
        where: { userId: user?.dataValues.id },
      });
      return res.json({
        email: req.user.email,
        role: req.user.role,
        mapType: setting?.mapType,
        geoPos: setting?.geoPos,
      });
    } else {
      res.send(null);
    }
  }
}

export default new SettingController();
