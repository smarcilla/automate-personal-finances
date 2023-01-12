export interface FinancesStrategy {
  execute(): void;
}

export class FinancesContext {
  private strategy!: FinancesStrategy;

  setStrategy(strategy: FinancesStrategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    this.strategy.execute();
  }
}
