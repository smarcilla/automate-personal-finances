import { FinancesContext } from './finances';

class Client {
  static main() {
    const financeContext = FinancesContext.create();
    financeContext.executeStrategy();
  }
}

Client.main();
