import { createFileRoute } from "@tanstack/react-router";
import { MonthProvider } from "../Components/home/dates";
import { useState } from "react";
import { CircleChart } from "../Components/months/circlechart";
import { ExpenseCard, IncomeCard } from "../Components/months/money-cards";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  useExpenses,
  useIncome,
  useAddTransaction,
  useClearTransactions,
  useDeleteTransaction,
} from "../api/useTransactions";
import { useForm } from "react-hook-form";
import { Button } from "../Components/ui/button";

export const Route = createFileRoute("/month/$month")({
  component: RouteComponent,
});

interface ExpenseFormData {
  category: string;
  amount: string;
}

interface IncomeFormData {
  category: string;
  amount: string;
}

function RouteComponent() {
  const { month } = Route.useParams();

  // Pass month parameter to hooks
  const {
    data: expensesData,
    isLoading: expensesLoading,
    error: expensesError,
  } = useExpenses(month);

  const {
    data: incomeData,
    isLoading: incomeLoading,
    error: incomeError,
  } = useIncome(month);

  const addTransactionMutation = useAddTransaction();
  const clearTransactionsMutation = useClearTransactions();
  const deleteTransactionMutation = useDeleteTransaction();

  const [seeExpenseForm, setSeeExpenseForm] = useState(false);
  const [seeIncomeForm, setSeeIncomeForm] = useState(false);

  // React hook form for expenses
  const {
    register: registerExpense,
    handleSubmit: handleSubmitExpense,
    reset: resetExpense,
  } = useForm<ExpenseFormData>();

  // React hook form for income
  const {
    register: registerIncome,
    handleSubmit: handleSubmitIncome,
    reset: resetIncome,
  } = useForm<IncomeFormData>();

  const onSubmitExpense = async (data: ExpenseFormData) => {
    try {
      await addTransactionMutation.mutateAsync({
        category: data.category,
        amount: parseFloat(data.amount) || 0,
        type: "expense",
        month: month, // Add month here
      });

      resetExpense();
      setSeeExpenseForm(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const onSubmitIncome = async (data: IncomeFormData) => {
    try {
      await addTransactionMutation.mutateAsync({
        category: data.category,
        amount: parseFloat(data.amount) || 0,
        type: "income",
        month: month, // Add month here
      });

      resetIncome();
      setSeeIncomeForm(false);
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const handleClearMonth = async () => {
    if (confirm(`Delete all transactions for ${month}?`)) {
      try {
        await clearTransactionsMutation.mutateAsync(month);
      } catch (error) {
        console.error("Error clearing transactions:", error);
      }
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await deleteTransactionMutation.mutateAsync(transactionId);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  //Modal Operations
  const openExpenseModal = () => {
    const modal = document.getElementById(
      `expense-modal-${month}`
    ) as HTMLDialogElement;
    modal?.showModal();
  };
  const openIncomeModal = () => {
    const modal = document.getElementById(
      `income-modal-${month}`
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  if (expensesLoading || incomeLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading {month}'s budget...</span>
      </div>
    );
  }

  const expenseList = expensesData?.expenses || [];
  const expenseTotal = expensesData?.total || 0;
  const incomeList = incomeData?.income || [];
  const incomeTotal = incomeData?.total || 0;

  return (
    <>
      <MonthProvider></MonthProvider>
      <div className="w-full h-[100vh]">
        {/* Add Clear Button */}
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold capitalize">{month}</h1>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearMonth}
            disabled={clearTransactionsMutation.isPending}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear {month}
          </Button>
        </div>

        <div className="p-4">
          <CircleChart
            chartId={`chart-${month}`}
            month={month}
            expenseTotal={expenseTotal}
            incomeTotal={incomeTotal}
          ></CircleChart>
        </div>
        <div className="flex justify-between w-full p-4">
          <IncomeCard
            onClick={openIncomeModal}
            amount={incomeTotal}
          ></IncomeCard>
          <ExpenseCard
            onClick={openExpenseModal}
            amount={expenseTotal}
          ></ExpenseCard>
        </div>

        {/* Expense Modal */}
        <dialog id={`expense-modal-${month}`} className="modal">
          <div className="modal-box bg-white">
            <Table>
              <TableCaption>Expenses for {month}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseList.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">
                      {expense?.category}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      ${expense?.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTransaction(expense.id)}
                        disabled={deleteTransactionMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {expenseList.length > 0 && (
                  <TableRow className="bg-[#F0F4F8]">
                    <TableCell className="font-medium">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      ${expenseTotal.toFixed(2)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex justify-center pt-2">
              <div
                className="w-[35px] h-[35px] cursor-pointer flex justify-center items-center bg-[var(--ref-primary-50)] rounded-full"
                onClick={() => setSeeExpenseForm(!seeExpenseForm)}
              >
                <Plus color="white" />
              </div>
              {seeExpenseForm && (
                <div className="w-full flex px-2 justify-between">
                  <form
                    onSubmit={handleSubmitExpense(onSubmitExpense)}
                    className="w-full flex flex-col gap-2"
                  >
                    <div className="w-full flex gap-2 p-2">
                      <Input
                        {...registerExpense("category")}
                        type="text"
                        placeholder="Category (e.g., groceries)"
                        required
                        disabled={addTransactionMutation.isPending}
                      />
                      <Input
                        {...registerExpense("amount")}
                        type="number"
                        step="0.01"
                        placeholder="Amount"
                        required
                        disabled={addTransactionMutation.isPending}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        type="submit"
                        disabled={addTransactionMutation.isPending}
                      >
                        {addTransactionMutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          "Add Expense"
                        )}
                      </Button>
                      <Button
                        onClick={() => setSeeExpenseForm(false)}
                        type="button"
                        variant="outline"
                        disabled={addTransactionMutation.isPending}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Income Modal - same pattern */}
        <dialog id={`income-modal-${month}`} className="modal">
          <div className="modal-box bg-white">
            <Table>
              <TableCaption>Income for {month}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeList.map((income) => (
                  <TableRow key={income.id}>
                    <TableCell className="font-medium">
                      {income.category}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      ${income.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTransaction(income.id)}
                        disabled={deleteTransactionMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {incomeList.length > 0 && (
                  <TableRow className="bg-[#F0F4F8]">
                    <TableCell className="font-medium">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      ${incomeTotal.toFixed(2)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex justify-center pt-2">
              <div
                className="w-[35px] h-[35px] cursor-pointer flex justify-center items-center bg-[var(--ref-primary-50)] rounded-full"
                onClick={() => setSeeIncomeForm(!seeIncomeForm)}
              >
                <Plus color="white" />
              </div>
              {seeIncomeForm && (
                <div className="w-full flex px-2 justify-between">
                  <form
                    onSubmit={handleSubmitIncome(onSubmitIncome)}
                    className="w-full flex flex-col gap-2"
                  >
                    <div className="w-full flex gap-2 p-2">
                      <Input
                        {...registerIncome("category")}
                        type="text"
                        placeholder="Category (e.g., salary)"
                        required
                        disabled={addTransactionMutation.isPending}
                      />
                      <Input
                        {...registerIncome("amount")}
                        type="number"
                        step="0.01"
                        placeholder="Amount"
                        required
                        disabled={addTransactionMutation.isPending}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        type="submit"
                        disabled={addTransactionMutation.isPending}
                      >
                        {addTransactionMutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Adding...
                          </>
                        ) : (
                          "Add Income"
                        )}
                      </Button>
                      <Button
                        onClick={() => setSeeIncomeForm(false)}
                        type="button"
                        variant="outline"
                        disabled={addTransactionMutation.isPending}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
}
