"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapLayer = exports.Setting = exports.User = void 0;
const db_1 = require("../db");
const sequelize_1 = require("sequelize");
exports.User = db_1.default.define('user', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: sequelize_1.DataTypes.STRING, unique: true },
    password: { type: sequelize_1.DataTypes.STRING },
    role: { type: sequelize_1.DataTypes.STRING, defaultValue: 'USER' },
});
exports.Setting = db_1.default.define('setting', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mapType: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    geoPos: { type: sequelize_1.DataTypes.STRING, defaultValue: 'ULLI' },
    userId: { type: sequelize_1.DataTypes.INTEGER },
});
exports.MapLayer = db_1.default.define('mapLayer', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mapLayerCoord: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
    },
    name: { type: sequelize_1.DataTypes.STRING, unique: true },
});
// export const BasketDivice = sequelize.define('basket_device', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });
// export const Device = sequelize.define('device', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, unique: true, allowNull: false },
//   price: { type: DataTypes.INTEGER, allowNull: false },
//   rating: { type: DataTypes.INTEGER, defaultValue: 0 },
//   img: { type: DataTypes.STRING, allowNull: false },
// });
// export const Type = sequelize.define('type', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, unique: true, allowNull: false },
// });
// export const Brand = sequelize.define('brand', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, unique: true, allowNull: false },
// });
// export const Rating = sequelize.define('rating', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   rate: { type: DataTypes.INTEGER, allowNull: false },
// });
// export const DeviceInfo = sequelize.define('device_info', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   title: { type: DataTypes.STRING, allowNull: false },
//   description: { type: DataTypes.STRING, allowNull: false },
// });
// export const TypeBrand = sequelize.define('type_brand', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });
exports.User.hasOne(exports.Setting);
exports.Setting.belongsTo(exports.User);
// User.hasOne(Basket);
// Basket.belongsTo(User);
// User.hasMany(Rating);
// Rating.belongsTo(User);
// Basket.hasMany(BasketDivice);
// BasketDivice.belongsTo(Basket);
// Type.hasMany(Device);
// Device.belongsTo(Type);
// Brand.hasMany(Device);
// Device.belongsTo(Brand);
// Device.hasMany(Rating);
// Rating.belongsTo(Device);
// Device.hasMany(BasketDivice);
// BasketDivice.belongsTo(Device);
// Device.hasMany(DeviceInfo);
// DeviceInfo.belongsTo(Device);
// Type.belongsToMany(Brand, { through: TypeBrand });
// Brand.belongsToMany(Type, { through: TypeBrand });
const models = { User: exports.User, Setting: exports.Setting };
// const models = { User, Basket, BasketDivice, Device, Type, Brand, Rating, DeviceInfo, TypeBrand };
exports.default = models;
//# sourceMappingURL=models.js.map