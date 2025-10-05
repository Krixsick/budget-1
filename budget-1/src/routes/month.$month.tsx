import { createFileRoute } from "@tanstack/react-router";
import { MonthProvider } from "../Components/home/dates";
import { useEffect, useState } from "react";
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
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { useForm } from "react-hook-form";
export const Route = createFileRoute("/month/$month")({
  component: RouteComponent,
});

interface Expense {
  name: string;
  amount: number;
}

function RouteComponent() {
  const { month } = Route.useParams();
  const [position, setPosition] = React.useState("bottom");
  //Store
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [seeForm, setSeeForm] = useState(false);

  //react hook form
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: Expense) => {
    const newExpense: Expense = {
      name: data.name,
      amount: parseFloat(data.amount) || 0,
    };
    setExpenseList([...expenseList, newExpense]);
    reset();
    setSeeForm(false);
  };
  const expenseTotal = expenseList.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const incomeTotal = 0;

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

  useEffect(() => {
    console.log(expenseList);
  }, [expenseList]);

  return (
    <>
      <MonthProvider></MonthProvider>
      <div className="w-full h-[100vh]">
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
              <TableCaption>A list of your recent expenses</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Expense Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* <TableRow>
                  <TableCell className="font-medium">Shopping</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow> */}
                {expenseList.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {expense?.name}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      ${expense?.amount}
                    </TableCell>
                  </TableRow>
                ))}
                {expenseList && (
                  <TableRow className="bg-[#F0F4F8]">
                    <TableCell className="font-medium">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      ${expenseTotal}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex justify-center pt-2">
              <div
                className="w-[35px] h-[35px] cursor-pointer flex justify-center items-center bg-[var(--ref-primary-50)] rounded-full"
                onClick={() => setSeeForm(!seeForm)}
              >
                <Plus color="white" />
              </div>
              {seeForm && (
                <div className="w-full flex px-2 justify-between">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col"
                  >
                    <div className="w-full flex justify-between p-2">
                      <Input
                        {...register("name")}
                        type="text"
                        placeholder="Expense Name"
                      />
                      <Input
                        {...register("amount")}
                        type="text"
                        placeholder="Amount"
                      />
                    </div>
                    <button type="submit">Submit</button>
                    <button onClick={() => setSeeForm(!seeForm)} type="button">
                      Close
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Income Modal */}
        <dialog id={`income-modal-${month}`} className="modal">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">Income Details</h3>
            <p className="py-4">Sources for {month}</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
}
