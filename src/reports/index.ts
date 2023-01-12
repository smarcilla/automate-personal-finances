import { Transaction } from '../business/Transaction';

export interface Report {
  calculate(): number;
}

export abstract class BaseReport {
  constructor(protected transactions: Transaction[]) {}

  abstract filterTransactions(): Transaction[];
}
