import { Report } from '../business/Report';
import { IMPORT_STRATEGIES } from '../Constants';
import { Importer } from '../inputs/Importer';
import { FileLoader } from '../inputs/FileLoader';
import { Configuration } from '../configuration/Configuration';

const main = async () => {
  const configuration = Configuration.getInstance();
  const inputDirectoryPath = configuration.directoryPath;
  const fileExtension = configuration.fileExtension;
  const yearReport = configuration.yearReport;

  const fileLoader = FileLoader.build(inputDirectoryPath, fileExtension);

  fileLoader.loadFiles().forEach((file: string) => {
    const importer = Importer.build(
      IMPORT_STRATEGIES.EXCEL_FILE,
      inputDirectoryPath,
      file
    );

    const transactions = importer.importData();

    const annualReport = Report.build(transactions, yearReport);

    console.log(
      `Annual report ${yearReport} for ${file} is --> total result ${annualReport.annualResult.toFixed(
        2
      )}`
    );
    console.log(
      `Total incomes ${annualReport.annualIncomes.toFixed(
        2
      )} ---  Total expenses ${annualReport.annualExpenses.toFixed(2)}`
    );
  });
};

main();
