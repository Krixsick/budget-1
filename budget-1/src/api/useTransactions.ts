import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addTransaction,
  getExpenses,
  getIncome,
  getSummary,
  getAllTransactions,
  clearTransactions,
  deleteTransaction,
} from "../api/transactions";

// Query keys for cache management (now includes month)
export const transactionKeys = {
  all: ["transactions"] as const,
  expenses: (month?: string) =>
    [...transactionKeys.all, "expenses", month] as const,
  income: (month?: string) =>
    [...transactionKeys.all, "income", month] as const,
  summary: (month?: string) =>
    [...transactionKeys.all, "summary", month] as const,
  list: (month?: string) => [...transactionKeys.all, "list", month] as const,
};

// Hook to fetch expenses for a specific month
export function useExpenses(month?: string) {
  return useQuery({
    queryKey: transactionKeys.expenses(month),
    queryFn: () => getExpenses(month),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch income for a specific month
export function useIncome(month?: string) {
  return useQuery({
    queryKey: transactionKeys.income(month),
    queryFn: () => getIncome(month),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch summary for a specific month
export function useSummary(month?: string) {
  return useQuery({
    queryKey: transactionKeys.summary(month),
    queryFn: () => getSummary(month),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch all transactions for a specific month
export function useAllTransactions(month?: string) {
  return useQuery({
    queryKey: transactionKeys.list(month),
    queryFn: () => getAllTransactions(month),
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to add a transaction
export function useAddTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTransaction,
    onSuccess: (data, variables) => {
      const month = variables.month;

      // Invalidate queries for the specific month
      if (variables.type === "expense") {
        queryClient.invalidateQueries({
          queryKey: transactionKeys.expenses(month),
        });
      } else if (variables.type === "income") {
        queryClient.invalidateQueries({
          queryKey: transactionKeys.income(month),
        });
      }

      queryClient.invalidateQueries({
        queryKey: transactionKeys.summary(month),
      });
      queryClient.invalidateQueries({ queryKey: transactionKeys.list(month) });
    },
    onError: (error) => {
      console.error("Error adding transaction:", error);
    },
  });
}

// Hook to clear transactions (optionally for a specific month)
export function useClearTransactions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearTransactions,
    onSuccess: (data, month) => {
      // Invalidate all queries for this month (or all if no month specified)
      if (month) {
        queryClient.invalidateQueries({
          queryKey: transactionKeys.expenses(month),
        });
        queryClient.invalidateQueries({
          queryKey: transactionKeys.income(month),
        });
        queryClient.invalidateQueries({
          queryKey: transactionKeys.summary(month),
        });
        queryClient.invalidateQueries({
          queryKey: transactionKeys.list(month),
        });
      } else {
        // Clear all caches if no month specified
        queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      }
    },
  });
}

// Hook to delete a single transaction
export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      // Invalidate all transaction queries
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}
