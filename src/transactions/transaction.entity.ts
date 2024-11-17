import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "../users/user.entity";  // Relación con el usuario

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({
    type: "enum",
    enum: ['income', 'expense'],
    default: 'expense'
  })
  type!: 'income' | 'expense';  // We define the possible types of transactions

  @Column({ length: 50 })
  category!: string;  // Transaction category

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;  // Transaction amount

  @Column("timestamp")
  date!: Date;  // Date of transaction

  @Column("text", { nullable: true })
  note?: string;  // Optional note

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;  // Creation date, using CreateDateColumn for default timestamp
}