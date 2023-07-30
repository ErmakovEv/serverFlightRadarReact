"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const models_1 = require("../models/models");
const jwt = require("jsonwebtoken");
const constans_1 = require("../constans");
const cookie = require("cookie");
const utils_1 = require("../utils/utils");
function generateJwt(id, email, role) {
    return jwt.sign({ id, email, role }, constans_1.default.SECRET_KEY, {
        expiresIn: '1h',
    });
}
const gettingUsers = async (curUser) => {
    const allUsersArr = await models_1.User.findAll();
    const allUsersSettingsArr = await models_1.Setting.findAll();
    return allUsersArr
        .map((user) => {
        if (curUser.email === user.email) {
            return;
        }
        const { id, email, role } = user;
        const profile = allUsersSettingsArr.find((userProfile) => userProfile.userId === id);
        return { id, email, role, profile };
    })
        .filter((item) => item != null);
};
class UserController {
    async registration(req, res) {
        try {
            const { email, password, role } = req.body;
            console.log('!!!');
            if (!email || !password) {
                return res.status(400).json('Неверные данные');
            }
            console.log(email, password, role);
            const candidate = await models_1.User.findOne({ where: { email } });
            if (candidate) {
                return res
                    .status(400)
                    .json('Пользователь с таким именем уже существует');
            }
            const hashPass = await bcrypt.hash(password, 5);
            const user = await models_1.User.create({ email, role, password: hashPass });
            const setting = await models_1.Setting.create({ userId: user.id });
            const token = generateJwt(user.id, user.email, user.role);
            return res
                .status(200)
                .json({ 'Пользователь успешно зарегистрирован': token });
        }
        catch (error) {
            console.log(error);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await models_1.User.findOne({ where: { email } });
            if (!user) {
                return res
                    .status(401)
                    .json('Пользователь с таким именем не существует');
            }
            const comparePass = bcrypt.compareSync(password, user.password);
            if (!comparePass) {
                return res.status(401).json('Пароль неверный!');
            }
            const { accessToken, refreshToken } = (0, utils_1.getTokens)({
                email: user.email,
                role: user.role,
            });
            res.setHeader('Set-Cookie', cookie.serialize('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: utils_1.refreshTokenAge, //1000 * 60 * 60 -?
            }));
            res.send({ accessToken });
        }
        catch (error) {
            res.status(404).json('ХЗ ЧЕ ПОКА');
        }
    }
    async refresh(req, res) {
        let { accessToken, refreshToken } = typeof req.user === 'object'
            ? (0, utils_1.getTokens)(req.user)
            : { accessToken: null, refreshToken: null };
        res.setHeader('Set-Cookie', cookie.serialize('refreshToken', refreshToken || '', {
            httpOnly: true,
            maxAge: 1000 * 60 * 60, //??? refreshTokenAge
        }));
        res.send({ accessToken });
    }
    async logout(req, res) {
        res.setHeader('Set-Cookie', cookie.serialize('refreshToken', '', {
            httpOnly: true,
            maxAge: 0,
        }));
        res.sendStatus(200);
    }
    async check(req, res) {
        const { user } = req.body;
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }
    async getAllUsers(req, res) {
        if (req.user !== 'string') {
            const ans = await gettingUsers(req.user);
            return res.json(ans);
        }
    }
    async delUsers(req, res) {
        const { usersID } = req.body;
        console.log(usersID);
        if (usersID) {
            usersID.forEach(async (element) => {
                try {
                    // Найти элемент, который нужно удалить
                    const postToDelete = await models_1.User.findOne({ where: { id: element } });
                    if (postToDelete) {
                        // Выполнить удаление элемента
                        await postToDelete.destroy();
                        console.log('Элемент успешно удален из базы данных.');
                        res.sendStatus(200);
                    }
                    else {
                        console.log('Элемент не найден в базе данных.');
                        res.sendStatus(404);
                    }
                }
                catch (error) {
                    console.error('Ошибка при удалении элемента из базы данных:', error);
                    res.sendStatus(404);
                }
            });
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map