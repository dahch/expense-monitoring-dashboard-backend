import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./auth/auth.routes";
import transactionRoutes from "./transactions/transaction.router";
import { connectToDatabase } from "./database/database";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(","),
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
app.get("/", (req, res) => {
  res.send("Hello, welcome to the Expense Monitoring Dashboard!");
});

// Database connection
connectToDatabase();

export default app;