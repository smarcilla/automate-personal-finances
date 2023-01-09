import * as moment from 'moment';

export class TransactionDate {
  static build(dateDraft: string): TransactionDate {
    const date = moment.utc(dateDraft, 'DD/MM/YYYY').local().toDate();
    return new TransactionDate(date);
  }

  private date: Date;

  constructor(dateDraft: Date) {
    this.date = dateDraft;
  }

  get year() {
    return this.date.getFullYear();
  }
}
