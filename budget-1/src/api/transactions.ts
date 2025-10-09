import type {
  Transaction,
  TransactionResponse,
  ExpensesData,
  IncomeData,
  Summary,
} from "../types/transactions-type";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

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

export async function getExpenses(month?: string): Promise<ExpensesData> {
  const params = month ? { month } : {};
  const response = await api.get<ExpensesData>("/transactions/expenses", {
    params,
  });
  return response.data;
}

export async function getIncome(month?: string): Promise<IncomeData> {
  const params = month ? { month } : {};
  const response = await api.get<IncomeData>("/transactions/income", {
    params,
  });
  return response.data;
}

export async function getSummary(month?: string): Promise<Summary> {
  const params = month ? { month } : {};
  const response = await api.get<Summary>("/transactions/summary", { params });
  return response.data;
}

export async function getAllTransactions(month?: string) {
  const params = month ? { month } : {};
  const response = await api.get("/transactions/all", { params });
  return response.data;
}

export async function clearTransactions(month?: string) {
  const params = month ? { month } : {};
  const response = await api.delete("/transactions/clear", { params });
  return response.data;
}

export async function deleteTransaction(transactionId: string) {
  const response = await api.delete(`/transactions/${transactionId}`);
  return response.data;
}
