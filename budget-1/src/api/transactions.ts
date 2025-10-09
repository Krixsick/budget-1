import type {
  Transaction,
  TransactionResponse,
  ExpensesData,
  IncomeData,
  Summary,
} from "../types/transactions-type";
import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function addTransaction(transaction: Transaction) {
  const response = await api.post("/transactions/add", transaction);
  return response.data;
}

export async function getExpenses(): Promise<ExpensesData> {
  const response = await api.get<ExpensesData>("/transactions/expenses");
  return response.data;
}

export async function getIncome(): Promise<IncomeData> {
  const response = await api.get<IncomeData>("/transactions/income");
  return response.data;
}

export async function getSummary(): Promise<Summary> {
  const response = await api.get<Summary>("/transactions/summary");
  return response.data;
}

export async function getAllTransactions() {
  const response = await api.get("/transactions/all");
  return response.data;
}

export async function clearTransactions() {
  const response = await api.delete("/transactions/clear");
  return response.data;
}
