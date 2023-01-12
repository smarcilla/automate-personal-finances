import { DataSourceStrategy } from './datasources';

export class TransactionsContext {
  private strategy!: DataSourceStrategy;

  setStrategy(strategy: DataSourceStrategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    return this.strategy.getData();
  }
}
