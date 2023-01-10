export interface ReportPrinter<T> {
  print(report: T): void;
}
