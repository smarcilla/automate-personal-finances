import { TransactionDate } from './TransactionDate';
import { Concept } from './Concept';
import { Movement } from './Movement';
import { Amount } from './Amount';
import {
  DATE_INDEX,
  CONCEPT_INDEX,
  MOVEMENT_INDEX,
  AMOUNT_INDEX
} from '../Constants';

export class Transaction {
  static build(row: string[]): Transaction {
    const date: TransactionDate = TransactionDate.build(row[DATE_INDEX]);
    const concept: Concept = Concept.build(row[CONCEPT_INDEX]);
    const movement: Movement = Movement.build(row[MOVEMENT_INDEX]);
    const amount: Amount = Amount.build(row[AMOUNT_INDEX]);

    return new Transaction(date, concept, movement, amount);
  }

  private date: TransactionDate;
  private concept: Concept;
  private movement: Movement;
  private _amount: Amount;

  constructor(
    date: TransactionDate,
    concept: Concept,
    movement: Movement,
    amount: Amount
  ) {
    this.date = date;
    this.concept = concept;
    this.movement = movement;
    this._amount = amount;
  }

  get year() {
    return this.date.year;
  }

  get amount() {
    return this._amount.amount;
  }

  isIncome() {
    return this._amount.isIncome();
  }

  isExpense() {
    return this._amount.isExpense();
  }
}
