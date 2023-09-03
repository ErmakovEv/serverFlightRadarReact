import { Sequelize } from 'sequelize';
import constans from './constans';
import * as dotenv from 'dotenv';

let db: Sequelize;
if (process.env.NODE_ENV === 'production') {
  // console.log('prod!!!');
  // db = new Sequelize(
  //   'postgres://admin:4OTwdMv1TY6c0b9Ib8bKAtSmXrhhlfYC@dpg-cjcdiu45kgrc73amtgng-a.oregon-postgres.render.com/db_fr?ssl=true'
  // );
  db = new Sequelize(constans.DB_NAME, constans.DB_USER, constans.DB_PASS, {
    dialect: 'postgres',
    host: constans.DB_HOST,
    port: constans.DB_PORT,
  });
} else {
  console.log('dev!!!');
  db = new Sequelize(constans.DB_NAME, constans.DB_USER, constans.DB_PASS, {
    dialect: 'postgres',
    host: constans.DB_HOST,
    port: constans.DB_PORT,
  });
}

export default db;
