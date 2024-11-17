import { Request, Response } from "express";
import { TransactionService } from "./transaction.service";

const transactionService = new TransactionService();

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { userId, type, category, amount, date, note } = req.body;
    const transaction = await transactionService.createTransaction(userId, type, category, amount, date, note);
    res.status(201).json({ message: "Transaction created", transaction });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;  // We use the userId passed in the body of the request by the middleware
    const { id, startDate, endDate, type, category } = req.query;
    const transactions = await transactionService.getTransactions(userId, {
      id: id ? parseInt(id as string) : undefined,
      startDate: startDate ? new Date(startDate as string): undefined,
      endDate: endDate? new Date(endDate as string) : undefined,
      type: type ? type as string : undefined,
      category: category ? category as string : undefined
    });
    res.status(200).json({ transactions });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, category, amount, date, note } = req.body;
    const transaction = await transactionService.updateTransaction(parseInt(id), type, category, amount, date, note);
    res.status(200).json({ message: "Transaction updated", transaction });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await transactionService.deleteTransaction(parseInt(id));
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getBalance = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const balance = await transactionService.getBalance(userId);

    res.json(balance);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const categories = await transactionService.getCategories(userId);
    res.status(200).json({ categories });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};