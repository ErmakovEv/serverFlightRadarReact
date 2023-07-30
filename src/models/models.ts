import sequelize from '../db';
import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';

export interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>;
  email: CreationOptional<string>;
  password: CreationOptional<string>;
  role: CreationOptional<string>;
}

interface SettingModel
  extends Model<
    InferAttributes<SettingModel>,
    InferCreationAttributes<SettingModel>
  > {
  id: CreationOptional<number>;
  mapType: CreationOptional<number>;
  geoPos: CreationOptional<string>;
  userId: CreationOptional<number>;
}

interface MapLayerModel
  extends Model<
    InferAttributes<MapLayerModel>,
    InferCreationAttributes<MapLayerModel>
  > {
  id: CreationOptional<number>;
  mapLayerCoord: CreationOptional<Array<string>>;
  name: CreationOptional<string>;
}

export const User = sequelize.define<UserModel>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

export const Setting = sequelize.define<SettingModel>('setting', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mapType: { type: DataTypes.INTEGER, defaultValue: 0 },
  geoPos: { type: DataTypes.STRING, defaultValue: 'ULLI' },
  userId: { type: DataTypes.INTEGER },
});

export const MapLayer = sequelize.define<MapLayerModel>('mapLayer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mapLayerCoord: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  name: { type: DataTypes.STRING, unique: true },
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

User.hasOne(Setting);
Setting.belongsTo(User);

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

const models = { User, Setting };
// const models = { User, Basket, BasketDivice, Device, Type, Brand, Rating, DeviceInfo, TypeBrand };
export default models;
