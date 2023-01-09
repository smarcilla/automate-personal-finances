import { Report } from '../business/Report';
import { Importer } from '../inputs/Importer';
import { FileLoader } from '../inputs/FileLoader';
import { Configuration } from '../configuration/Configuration';

const main = async () => {
  const configuration = Configuration.getInstance();
  const yearReport = configuration.yearReport;

  const fileLoader = FileLoader.build(configuration);
  const importer = Importer.build(configuration);

  fileLoader.loadFiles().forEach((file: string) => {
    const transactions = importer.importData(file);

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
