import { BaseReport, Report } from '.';
import { Amount } from '../business/Amount';
import { Transaction } from '../business/Transaction';

class IncomesReport extends BaseReport {
  filterTransactions(): Transaction[] {
    return this.transactions.filter(transaction => transaction.isIncome());
  }
}

class ExpensesReport extends BaseReport {
  filterTransactions(): Transaction[] {
    return this.transactions.filter(transaction => transaction.isExpense());
  }
}

export class AnnualIncomesReport extends IncomesReport implements Report {
  constructor(protected year: number, transactions: Transaction[]) {
    super(transactions);
  }
  calculate(): number {
    return this.filterTransactions().reduce(
      (currentIncome, currentTransaction) => {
        return currentIncome + currentTransaction.amount;
      },
      0
    );
  }

  filterTransactions(): Transaction[] {
    return super
      .filterTransactions()
      .filter(transaction => transaction.year === this.year);
  }
}

export class AnnualExpensesReport extends ExpensesReport implements Report {
  constructor(protected year: number, transactions: Transaction[]) {
    super(transactions);
  }

  calculate(): number {
    return this.filterTransactions().reduce(
      (currentIncome, currentTransaction) => {
        return currentIncome + currentTransaction.amount;
      },
      0
    );
  }

  filterTransactions(): Transaction[] {
    return super
      .filterTransactions()
      .filter(transaction => transaction.year === this.year);
  }
}
