import * as xlsx from 'xlsx';
import { Transaction } from '../business/Transaction';
import { Configuration } from '../configuration/Configuration';
import { ImporterStrategy } from './ImporterStrategy';

export class ExcelFileImporter implements ImporterStrategy<Transaction> {
  static build(configuration: Configuration): ExcelFileImporter {
    return new ExcelFileImporter(configuration.directoryPath);
  }

  private dirPath: string;
  constructor(dirPath: string) {
    this.dirPath = dirPath;
  }
  importData(file: string): Transaction[] {
    const filePath = `${this.dirPath}/${file}`;
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const [, , , , , ...data] = xlsx.utils.sheet_to_json(sheet, {
      raw: false,
      header: 1
    });

    return data.map(row => Transaction.build(<string[]>row));
  }
}
