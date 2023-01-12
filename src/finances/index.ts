import { FinancesStrategy } from './interfaces';
import { PersonalFinancesStrategy } from './strategies';

export class FinancesContext {
  static create(): FinancesContext {
    const context: FinancesContext = new FinancesContext();

    context.setStrategy(new PersonalFinancesStrategy());

    return context;
  }
  private strategy!: FinancesStrategy;

  setStrategy(strategy: FinancesStrategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    this.strategy.execute();
  }
}
