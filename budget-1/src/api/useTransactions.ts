import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addTransaction,
  getExpenses,
  getIncome,
  getSummary,
  getAllTransactions,
} from "../api/transactions";

// Query keys for cache management
export const transactionKeys = {
  all: ["transactions"] as const,
  expenses: () => [...transactionKeys.all, "expenses"] as const,
  income: () => [...transactionKeys.all, "income"] as const,
  summary: () => [...transactionKeys.all, "summary"] as const,
  list: () => [...transactionKeys.all, "list"] as const,
};

// Hook to fetch expenses
export function useExpenses() {
  return useQuery({
    queryKey: transactionKeys.expenses(),
    queryFn: getExpenses,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook to fetch income
export function useIncome() {
  return useQuery({
    queryKey: transactionKeys.income(),
    queryFn: getIncome,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch summary
export function useSummary() {
  return useQuery({
    queryKey: transactionKeys.summary(),
    queryFn: getSummary,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch all transactions
export function useAllTransactions() {
  return useQuery({
    queryKey: transactionKeys.list(),
    queryFn: getAllTransactions,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to add a transaction (mutation)
export function useAddTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTransaction,
    onSuccess: (data, variables) => {
      // Invalidate and refetch based on transaction type
      if (variables.type === "expense") {
        queryClient.invalidateQueries({ queryKey: transactionKeys.expenses() });
      } else if (variables.type === "income") {
        queryClient.invalidateQueries({ queryKey: transactionKeys.income() });
      }

      // Always invalidate summary and list
      queryClient.invalidateQueries({ queryKey: transactionKeys.summary() });
      queryClient.invalidateQueries({ queryKey: transactionKeys.list() });
    },
    onError: (error) => {
      console.error("Error adding transaction:", error);
    },
  });
}
