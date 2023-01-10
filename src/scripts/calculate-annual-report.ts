import { Report } from '../business/Report';
import { Importer } from '../inputs/Importer';
import { FileLoader } from '../inputs/FileLoader';
import { Configuration } from '../configuration/Configuration';
import { ConsoleReportPrinterFactory } from '../presentation/ConsoleReportPrinterFactory';
import { ReportPrinterFactory } from '../presentation/ReportPrinterFactory';

const main = async () => {
  const configuration = Configuration.getInstance();
  const yearReport = configuration.yearReport;

  const fileLoader = FileLoader.build(configuration);
  const importer = Importer.build(configuration);

  const printerFactory: ReportPrinterFactory<Report> =
    new ConsoleReportPrinterFactory();

  const reportPrinter = printerFactory.createPrinter();

  fileLoader.loadFiles().forEach((file: string) => {
    const transactions = importer.importData(file);

    const annualReport = Report.build(transactions, yearReport);

    reportPrinter.print(annualReport);
  });
};

main();
