import { Report } from '.';
import { Transaction } from '../business/Transaction';
import { ReportBuilder } from './builders';
import { reportTypes } from './constants';

export interface AnnualReportFactory {
  createReport(year: number, transactions: Transaction[]): Report;
}

class AnnualReportFactorImpl implements AnnualReportFactory {
  constructor(protected type: reportTypes) {}
  createReport(year: number, transactions: Transaction[]): Report {
    return new ReportBuilder()
      .setType(this.type)
      .setYear(year)
      .setTransactions(transactions)
      .build();
  }
}

export class AbstractReportFactory implements ReportFactory {
  createReport(): Report {
    switch (type) {
      case reportTypes.ANNUAL_INCOMES:
        new AnnualReportFactorImpl(type);

      default:
        break;
    }
  }
}
