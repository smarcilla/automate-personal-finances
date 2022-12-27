import { DataSource } from 'typeorm';
import { Transaction } from './entity/Transaction';

console.log(process.env.PORT_DB);
console.log(process.env.DROP_DB);
console.log(process.env.HOST_DB);
console.log(process.env.PASSWORD_DB);
console.log(process.env.NAME_DB);

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
  dropSchema: Boolean(process.env.DROP_DB) //if true you can initialize database data.
});
