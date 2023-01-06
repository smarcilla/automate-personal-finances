import * as xlsx from 'xlsx';
import { Transaction } from '../business/Transaction';
import { ImporterStrategy } from './ImporterStrategy';

export class ExcelFileImporter implements ImporterStrategy<Transaction> {
  static build(pathDraft: string, fileDraft: string): ExcelFileImporter {
    return new ExcelFileImporter(pathDraft, fileDraft);
  }

  private filePath: string;
  constructor(pathDraft: string, fileDraft: string) {
    this.filePath = `${pathDraft}/${fileDraft}`;
  }
  importData(): Transaction[] {
    const workbook = xlsx.readFile(this.filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const [, , , , , ...data] = xlsx.utils.sheet_to_json(sheet, {
      raw: false,
      header: 1
    });

    return data.map(row => Transaction.build(<string[]>row));
  }
}
