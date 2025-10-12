import { createFileRoute } from "@tanstack/react-router";
import { LineChart } from "../Components/home/linechart";
import { ExpenseCard, IncomeCard } from "../Components/home/home-cards";
import { MonthProvider } from "../Components/home/dates";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <MonthProvider></MonthProvider>
      <div className="w-full h-[100vh]">
        <div className="p-4">
          <LineChart></LineChart>
        </div>
        <div className="flex justify-between w-full p-4">
          <IncomeCard></IncomeCard>
          <ExpenseCard></ExpenseCard>
        </div>
      </div>
    </>
  );
}
