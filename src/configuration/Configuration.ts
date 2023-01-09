// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import * as path from 'path';
import { IMPORT_STRATEGIES } from '../Constants';

export class Configuration {
  private static instance: Configuration;
  static getInstance() {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }

    return Configuration.instance;
  }

  public get directoryPath(): string {
    return (
      <string>process.env.INPUT_DIRECTORY_PATH || path.resolve('documents')
    );
  }

  public get fileExtension(): string {
    return <string>process.env.FILE_EXTENSION || '.xslx';
  }

  public get yearReport(): number {
    return parseInt(<string>process.env.YEAR_REPORT || '2022');
  }

  public get importType(): IMPORT_STRATEGIES {
    switch (this.fileExtension) {
      case '.xslx':
        return IMPORT_STRATEGIES.EXCEL_FILE;
    }

    return IMPORT_STRATEGIES.EXCEL_FILE;
  }
}
