import { Sequelize } from 'sequelize';
import constans from './constans';
import 'dotenv/config';

export default new Sequelize(process.env.DB!);
