import { DataSource } from 'typeorm';
import { Transaction } from './entity/Transaction';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST_DB || 'localhost',
  port: parseInt(process.env.PORT_DB || '5432'),
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DB,
  synchronize: true,
  logging: true,
  entities: [Transaction],
  subscribers: [],
  migrations: [],
  dropSchema: false //if true you can initialize database data.
});
