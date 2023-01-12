import { Transaction } from './models';

export interface DataSourceStrategy {
  getData(): Transaction[];
}
