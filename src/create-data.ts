import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Transaction } from './entity/Transaction';

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(async () => {
    // here you can start to work with your database
    const transactionRepository = AppDataSource.getRepository(Transaction);

    const newTransaction = new Transaction();
    newTransaction.date = new Date();
    newTransaction.concept = 'new concept';
    newTransaction.movement = 'new movement';
    newTransaction.amount = 13.5;

    await transactionRepository.save(newTransaction);
    console.log('transaction has been saved');

    const savedTransactions = await transactionRepository.find();

    console.log('All transactions from db are ', savedTransactions);

    console.log('database created');
  })
  .catch(error => console.log(error));
