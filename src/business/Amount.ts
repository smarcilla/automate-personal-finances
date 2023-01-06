export class Amount {
  static build(amountDraft: string): Amount {
    const amount: number = parseFloat(amountDraft);
    return new Amount(amount);
  }

  private _amount: number;

  constructor(amountDraft: number) {
    this._amount = amountDraft;
  }

  get amount() {
    return this._amount;
  }

  isIncome() {
    return this._amount > 0;
  }

  isExpense() {
    return this._amount < 0;
  }
}
