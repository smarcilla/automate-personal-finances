//TODO: adds database connection
//TODO: create functions to calculate incomes and outcomes

import { Liquid } from 'liquidjs';
import * as fs from 'fs';

const templateDir = 'src/templates';
const outputsDir = 'src/outputs';

class ReportManager {
  async renderReport(reportName: string, context: object) {
    const liquid = new Liquid();

    const report = liquid.renderFile(reportName, context);

    return report;
  }

  sendToFile(fileName: string, report: string) {
    fs.writeFileSync(fileName, report);
  }
}

const main = async () => {
  const reportManager = new ReportManager();

  const renderedReport = await reportManager.renderReport(
    `${templateDir}/annual-report.liquid`,
    {}
  );

  reportManager.sendToFile(`${outputsDir}/annual-report.html`, renderedReport);
};

main();
