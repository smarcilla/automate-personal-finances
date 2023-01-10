import { Report } from '../business/Report';
import { ReportPrinter } from './ReportPrinter';

export class ConsoleReportPrinter implements ReportPrinter<Report> {    
  print(report: Report): void {
    console.log(report.title);
    console.log('-----------------------------------------');
    console.log('');
    console.log('');
    console.log(`Total Result: ${report.annualResult.toFixed(2)}`);
    console.log('');
    console.log(`Total incomes: ${report.annualIncomes.toFixed(2)}`);
    console.log('');
    console.log(`Total expenses: ${report.annualExpenses.toFixed(2)}`);
    console.log('');
    console.log('-----------------------------------------');
  }
}
