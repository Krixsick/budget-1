export interface Transaction {
  category: string;
  amount: number;
  type: "expense" | "income";
  month: "string";
}

export interface TransactionResponse extends Transaction {
  id: string;
}

export interface ExpensesData {
  count: number;
  total: number;
  expenses: TransactionResponse[];
}

export interface IncomeData {
  count: number;
  total: number;
  income: TransactionResponse[];
}

export interface Summary {
  total_income: number;
  total_expenses: number;
  balance: number;
  transactions: {
    income_count: number;
    expense_count: number;
  };
}
