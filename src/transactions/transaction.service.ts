import { AppDataSource } from "../database/ormconfig";
import { Transaction } from "./transaction.entity";
import { User } from "../users/user.entity";

interface TransactionFilters {
  id?: number;
  startDate?: Date;
  endDate?: Date;
  type?: string;
  category?: string;
}

export class TransactionService {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private userRepository = AppDataSource.getRepository(User);

  // Create a new transaction
  async createTransaction(userId: number, type: 'income' | 'expense', category: string, amount: number, date: string, note?: string): Promise<Transaction> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    const transaction = this.transactionRepository.create({
      type,
      category,
      amount,
      date: new Date(date),
      note,
      user,
    });

    return this.transactionRepository.save(transaction);
  }

  // Get all, one, or filtered transactions of a user
  async getTransactions(userId: number, filters?: TransactionFilters): Promise<Transaction[]> {
  try {
    let query = this.transactionRepository
      .createQueryBuilder('transaction')
      .where('transaction.user_id = :userId', { userId });

    // If ID is provided, search for that record only
    if (filters?.id) {
      return await query
        .andWhere('transaction.id = :id', { id: filters.id })
        .getMany();
    }

    // Apply filters if available
    if (filters) {
      if (filters.startDate) {
        query = query.andWhere('transaction.date >= :startDate', { 
          startDate: filters.startDate 
        });
      }

      if (filters.endDate) {
        query = query.andWhere('transaction.date <= :endDate', { 
          endDate: filters.endDate 
        });
      }

      if (filters.type) {
        query = query.andWhere('transaction.type = :type', { 
          type: filters.type 
        });
      }

      if (filters.category) {
        query = query.andWhere('transaction.category = :category', { 
          category: filters.category 
        });
      }
    }

    // Sort by descending date
    query = query.orderBy('transaction.date', 'DESC');

    return await query.getMany();
  } catch (error: any) {
    throw new Error(`Error in obtaining transactions: ${error.message}`);
  }
}

  // Update a transaction
  async updateTransaction(id: number, type: 'income' | 'expense', category: string, amount: number, date: Date, note?: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction) throw new Error("Transaction not found");

    transaction.type = type;
    transaction.category = category;
    transaction.amount = amount;
    transaction.date = date;
    transaction.note = note;

    return this.transactionRepository.save(transaction);
  }

  // Delete a transaction
  async deleteTransaction(id: number): Promise<void> {
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction) throw new Error("Transaction not found");

    await this.transactionRepository.remove(transaction);
  }

  // Calculate balance
  async getBalance(userId: number) {
    const income = await this.transactionRepository
      .createQueryBuilder("transaction")
      .select("SUM(transaction.amount)", "total")
      .where("transaction.user_id = :userId", { userId })
      .andWhere("transaction.type = :type", { type: "income" })
      .getRawOne();

    const expense = await this.transactionRepository
      .createQueryBuilder("transaction")
      .select("SUM(transaction.amount)", "total")
      .where("transaction.user_id = :userId", { userId })
      .andWhere("transaction.type = :type", { type: "expense" })
      .getRawOne();

    const totalIncome = parseFloat(income?.total || "0");
    const totalExpense = parseFloat(expense?.total || "0");

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }

  // Obtain unique categories of transactions per user
  async getCategories(userId: number): Promise<string[]> {
    const categories = await this.transactionRepository
      .createQueryBuilder("transaction")
      .select("DISTINCT transaction.category", "category")
      .where("transaction.user_id = :userId", { userId })
      .getRawMany();

    return categories.map(c => c.category);
  }
}