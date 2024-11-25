import { DataSource } from "typeorm";
import { User } from "../users/user.entity";
import { Transaction } from "../transactions/transaction.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "expenses_db",
  entities: [User, Transaction],
  synchronize: true, // For development only
  logging: false,
});