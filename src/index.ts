import { FinancesContext } from './finances';

class Main {
  static main() {
    const financeContext = FinancesContext.create();
    financeContext.executeStrategy();
  }
}

Main.main();
