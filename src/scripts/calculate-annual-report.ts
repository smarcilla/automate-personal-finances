// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { Report } from '../business/Report';
import { IMPORT_STRATEGIES } from '../Constants';
import { Importer } from '../inputs/Importer';
import { FileLoader } from '../inputs/FileLoader';

const main = async () => {
  const inputDirectoryPath = <string>process.env.INPUT_DIRECTORY_PATH;
  const fileExtension = <string>process.env.FILE_EXTENSION;
  const yearReport = 2022;

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
