import { FinancesStrategy } from './interfaces';

export class FinancesContext {
  private strategy!: FinancesStrategy;

  setStrategy(strategy: FinancesStrategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    this.strategy.execute();
  }
}
