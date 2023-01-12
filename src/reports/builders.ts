import { Report } from '.';
import { Transaction } from '../business/Transaction';
import { reportTypes } from './constants';
import { AnnualExpensesReport, AnnualIncomesReport } from './entities';

export class ReportBuilder {
  private _type!: reportTypes;
  private _year!: number;
  private _transactions!: Transaction[];

  setType(type: reportTypes): ReportBuilder {
    this._type = type;
    return this;
  }

  setYear(year: number): ReportBuilder {
    this._year = year;
    return this;
  }

  setTransactions(transactions: Transaction[]): ReportBuilder {
    this._transactions = transactions;
    return this;
  }

  build(): Report {
    switch (this._type) {
      case reportTypes.ANNUAL_INCOMES:
        return new AnnualIncomesReport(this._year, this._transactions);

      case reportTypes.ANNUAL_EXPENSES:
        return new AnnualExpensesReport(this._year, this._transactions);
    }
  }
}
