// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import * as moment from 'moment';
import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { Transaction } from '../entity/Transaction';
import { DataSource } from 'typeorm';

class FileImporter {
  inputDirectoryPath: string;
  fileExtension: string;
  dataSource: DataSource;

  constructor(
    inputDirectoryPath: string,
    fileExtension: string,
    dataSource: DataSource
  ) {
    this.inputDirectoryPath = inputDirectoryPath;
    this.fileExtension = fileExtension;
    this.dataSource = dataSource;
  }

  private sanitizeIndex(index: number) {
    return this.fileExtension === '.numbers' ? index + 1 : index;
  }

  private sanitizeDate(date: string) {
    return this.fileExtension === '.numbers'
      ? new Date(date)
      : moment.utc(date, 'DD/MM/YYYY').local().toDate();
  }

  loadFiles() {
    const directoryFiles = fs.readdirSync(this.inputDirectoryPath);

    const extensionFiles = directoryFiles.filter(
      file => file.endsWith(this.fileExtension) && file.includes('movimientos')
    );

    return extensionFiles;
  }
  convertToTransaction(row: string[]): Transaction {
    const transactionDraft = new Transaction();

    transactionDraft.date = this.sanitizeDate(row[this.sanitizeIndex(0)]);
    transactionDraft.concept = row[this.sanitizeIndex(2)];
    transactionDraft.movement = row[this.sanitizeIndex(3)];
    transactionDraft.amount = parseFloat(row[this.sanitizeIndex(4)]);

    return transactionDraft;
  }

  processFile(fileName: string) {
    const filePath = `${this.inputDirectoryPath}/${fileName}`;
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const [, , , , , ...data] = xlsx.utils.sheet_to_json(sheet, {
      raw: false,
      header: 1
    });

    return data.map(row => this.convertToTransaction(<string[]>row));
  }
  async saveInDatabase(transactions: Transaction[]) {
    const transactionRepository = this.dataSource.getRepository(Transaction);

    const currentTransactions = await transactionRepository.find();

    // to ensure that a transaction is not duplicated by being present in two or more processed files.
    const transactionsSet = [...currentTransactions, ...transactions]
      .reduce((acc, a) => {
        const id = `${a.date.getTime()}-${a.concept}-${a.movement}-${a.amount}`;
        if (acc.has(id)) {
          console.log(`Duplicated ${a.date}  ${a.concept}  id ${id}`);
          return acc;
        }

        acc.set(id, a);

        return acc;
      }, new Map<string, Transaction>())
      .values();

    // to delete transactions that were previously saved in the database
    const transactionsDraft = [...transactionsSet].filter(
      tran =>
        !currentTransactions.find(
          ct =>
            ct.date.getTime() === tran.date.getTime() &&
            ct.concept === tran.concept &&
            ct.movement === tran.movement &&
            ct.amount === tran.amount
        )
    );

    return transactionRepository.upsert(transactionsDraft, {
      conflictPaths: ['date', 'concept', 'movement', 'amount'],
      skipUpdateIfNoValuesChanged: true
    });
  }
}

const main = async () => {
  console.log('Start import data process');
  const downloadsPath = process.env.INPUT_DIRECTORY_PATH
    ? process.env.INPUT_DIRECTORY_PATH
    : '/Users/<user>/Downloads';

  const fileExtension = process.env.FILE_EXTENSION
    ? process.env.FILE_EXTENSION
    : '.xlsx';

  const financeDataSource = await AppDataSource.initialize();

  const fileImporter = new FileImporter(
    downloadsPath,
    fileExtension,
    financeDataSource
  );

  const fileNames = fileImporter.loadFiles();

  console.log(
    `Total number of transactions are ${
      (await financeDataSource.getRepository(Transaction).find()).length
    }`
  );

  for (const fileName of fileNames) {
    const transactionsDraft = fileImporter.processFile(fileName);

    const { identifiers } = await fileImporter.saveInDatabase(
      transactionsDraft
    );

    console.log(`Number of transactions processed ${identifiers.length}`);

    const savedTransactions = await financeDataSource
      .getRepository(Transaction)
      .find();

    console.log(`Total number of transactions are ${savedTransactions.length}`);
  }

  console.log('Finish import data process');
};

main();
