import { createFileRoute } from "@tanstack/react-router";
import { LineChart } from "../Components/home/linechart";
import { ExpenseCard } from "../Components/home/expense";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-[100vh]">
      <LineChart></LineChart>
      <div className="flex justify-between w-full p-4">
        <ExpenseCard></ExpenseCard>
        <ExpenseCard></ExpenseCard>
      </div>
    </div>
  );
}
