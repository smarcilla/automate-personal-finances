import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  concept!: string;

  @Column()
  movement!: string;

  @Column({ type: 'numeric' })
  amount!: number;
}
