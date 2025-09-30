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
      <div>
        <CircleChart chartId={`chart-${month}`} month={month}></CircleChart>
        <div className="flex p-2 gap-4">
          <ExpenseCard></ExpenseCard>
          <IncomeCard></IncomeCard>
        </div>
        <PlusButton></PlusButton>
        <h1 className="text-2xl font-bold capitalize">
          {month} Finance Report
        </h1>
        <p>Showing data for {month}</p>
        {/* Add your month-specific finance components here */}
      </div>
    </>
  );
}
