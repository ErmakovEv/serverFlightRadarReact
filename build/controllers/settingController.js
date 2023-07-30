"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models/models");
const console_1 = require("console");
class SettingController {
    async set(req, res) {
        try {
            const { id } = req.params;
            const { mapType, pos } = req.body;
            const user = await models_1.User.findOne({ where: { email: id } });
            console.log('user!!!!!!!!!!!!!!!!!!!!!', user);
            if (!user)
                throw 'err';
            const setting = await models_1.Setting.update({
                mapType: mapType,
                geoPos: pos,
            }, {
                where: { userId: user === null || user === void 0 ? void 0 : user.id },
            });
            console.log('setting[0]!!!!!!!!!!!!!!!!!!!!!', setting[0]);
            if (setting[0] !== 1) {
                console.log('errr');
                throw console_1.error;
            }
            res.json(setting);
        }
        catch (error) {
            return res.sendStatus(404);
        }
    }
    async getAll(req, res) {
        const settings = await models_1.Setting.findAll();
        console.log('settings!!!', settings);
        return res.json(settings);
    }
    async getOne(req, res) {
        if (typeof req.user === 'object') {
            const user = await models_1.User.findOne({ where: { email: req.user.email } });
            const setting = await models_1.Setting.findOne({
                where: { userId: user === null || user === void 0 ? void 0 : user.dataValues.id },
            });
            return res.json({
                email: req.user.email,
                role: req.user.role,
                mapType: setting === null || setting === void 0 ? void 0 : setting.mapType,
                geoPos: setting === null || setting === void 0 ? void 0 : setting.geoPos,
            });
        }
        else {
            res.send(null);
        }
    }
}
exports.default = new SettingController();
//# sourceMappingURL=settingController.js.map