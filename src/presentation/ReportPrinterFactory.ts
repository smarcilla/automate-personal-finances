import { ReportPrinter } from './ReportPrinter';

export interface ReportPrinterFactory<T> {
  createPrinter(): ReportPrinter<T>;
}
