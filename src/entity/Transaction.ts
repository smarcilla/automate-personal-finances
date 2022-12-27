import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryColumn()
  date!: Date;

  @PrimaryColumn()
  concept!: string;

  @PrimaryColumn()
  movement!: string;

  @PrimaryColumn({ type: 'numeric' })
  amount!: number;
}
