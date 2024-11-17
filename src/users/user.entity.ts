import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Transaction } from "../transactions/transaction.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions!: Transaction[];  // One-to-many relationship with transactions
}