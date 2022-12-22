import { DataSource } from 'typeorm';
import { Transaction } from './entity/Transaction';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [Transaction],
  subscribers: [],
  migrations: []
});
