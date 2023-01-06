import { Transaction } from '../business/Transaction';
import { IMPORT_STRATEGIES } from '../Constants';
import { ExcelFileImporter } from './ExcelFileImporter';
import { ImporterStrategy } from './ImporterStrategy';

export class Importer {
  static build(
    strategy: IMPORT_STRATEGIES,
    ...params: string[]
  ): ImporterStrategy<Transaction> {
    switch (strategy) {
      case IMPORT_STRATEGIES.EXCEL_FILE:
        return ExcelFileImporter.build(params[0], params[1]);
    }

    throw new Error('Importer strategy doesnt implemented');
  }
}
