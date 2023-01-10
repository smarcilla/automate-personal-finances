import { Report } from '../business/Report';
import { ConsoleReportPrinter } from './ConsoleReportPrinter';
import { ReportPrinter } from './ReportPrinter';
import { ReportPrinterFactory } from './ReportPrinterFactory';

export class ConsoleReportPrinterFactory
  implements ReportPrinterFactory<Report>
{
  createPrinter(): ReportPrinter<Report> {
    return new ConsoleReportPrinter();
  }
}
