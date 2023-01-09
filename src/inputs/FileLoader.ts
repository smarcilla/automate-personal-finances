import * as fs from 'fs';

export class FileLoader {
  static build(inputDirectoryPath: string, fileExtension: string) {
    return new FileLoader(inputDirectoryPath, fileExtension);
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
