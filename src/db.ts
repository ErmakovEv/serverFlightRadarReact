import { Sequelize } from 'sequelize';
import constans from './constans';

export default new Sequelize(constans.DB_NAME, constans.DB_USER, constans.DB_PASS, {
  dialect: 'postgres',
  host: constans.DB_HOST,
  port: constans.DB_PORT,
});
