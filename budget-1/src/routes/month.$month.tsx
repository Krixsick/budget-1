import { createFileRoute } from "@tanstack/react-router";
import { MonthProvider } from "../Components/home/dates";
import { useEffect } from "react";
import { CircleChart } from "../Components/months/circlechart";
import { ExpenseCard, IncomeCard } from "../Components/months/money-cards";
import { PlusButton } from "../Components/months/action-button";
export const Route = createFileRoute("/month/$month")({
  component: RouteComponent,
});

function RouteComponent() {
  const { month } = Route.useParams();
  useEffect(() => {
    console.log(month);
  }, []);
  return (
    <>
      <MonthProvider></MonthProvider>
      <div className="w-full h-[100vh]">
        <div className="p-4">
          <CircleChart chartId={`chart-${month}`} month={month}></CircleChart>
        </div>
        <div className="flex justify-between w-full p-4">
          <ExpenseCard></ExpenseCard>
          <IncomeCard></IncomeCard>
        </div>
      </div>
    </>
  );
}
