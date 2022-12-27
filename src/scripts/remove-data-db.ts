// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { AppDataSource } from '../data-source';
import { Transaction } from '../entity/Transaction';

const main = async () => {
  console.log('Start remove data process');

  try {
    const financeDataSource = await AppDataSource.initialize();

    const transactions = await financeDataSource
      .getRepository(Transaction)
      .find();

    console.log(
      `We are going to remove ${transactions.length} transactions from db`
    );

    const removedTransactions = await financeDataSource
      .getRepository(Transaction)
      .remove(transactions);

    console.log(
      `Have been removed ${removedTransactions.length} transactions from db`
    );

    console.log('Finish remove data process');
  } catch (e) {
    console.error(e);
  }
};

main();
