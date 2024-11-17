import { AppDataSource } from "./ormconfig";

export const connectToDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Connected to the database");
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    process.exit(1);
  }
};