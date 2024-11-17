import { Router } from "express";
import { createTransaction, getTransactions, updateTransaction, deleteTransaction, getBalance, getCategories } from "./transaction.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { validateDto } from "../middlewares/validation.middleware";
import { CreateTransactionDto } from "./transaction.dto";

const router = Router();

router.post("/", authenticateJWT, validateDto(CreateTransactionDto), createTransaction);  // Create transaction
router.get("/", authenticateJWT, getTransactions);  // Obtain transactions from a user
router.get("/filtered", authenticateJWT, getTransactions); // Obtain transactions from a user with filters
router.get("/balance", authenticateJWT, getBalance); // Obtain balance from a user
router.put("/:id", authenticateJWT, updateTransaction);  // Update transaction
router.delete("/:id", authenticateJWT, deleteTransaction);  // Delete transaction
router.get("/categories", authenticateJWT, getCategories); // Obtain unique categories of transactions per user

export default router;