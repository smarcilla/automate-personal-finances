import { Transaction } from '../business/Transaction';
import { Configuration } from '../configuration/Configuration';
import { IMPORT_STRATEGIES } from '../Constants';
import { ExcelFileImporter } from './ExcelFileImporter';
import { ImporterStrategy } from './ImporterStrategy';

export class Importer {
  static build(configuration: Configuration): ImporterStrategy<Transaction> {
    switch (configuration.importType) {
      case IMPORT_STRATEGIES.EXCEL_FILE:
        return ExcelFileImporter.build(configuration);
    }
  }
}
