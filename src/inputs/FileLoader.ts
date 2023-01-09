import * as fs from 'fs';
import { Configuration } from '../configuration/Configuration';

export class FileLoader {
  static build(configuration: Configuration) {
    return new FileLoader(
      configuration.directoryPath,
      configuration.fileExtension
    );
  }

  private inputDirectoryPath: string;
  private fileExtension: string;

  constructor(inputDirectoryPath: string, fileExtension: string) {
    this.inputDirectoryPath = inputDirectoryPath;
    this.fileExtension = fileExtension;
  }
  loadFiles() {
    const directoryFiles = fs.readdirSync(this.inputDirectoryPath);

    const extensionFiles = directoryFiles.filter(
      file => file.endsWith(this.fileExtension) && file.includes('transactions')
    );

    return extensionFiles;
  }
}
