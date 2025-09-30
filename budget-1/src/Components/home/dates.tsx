import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
export function MonthProvider() {
  const params = useParams({ strict: false });
  const currentMonth = params.month?.toLowerCase();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className="w-full h-[5rem] bg-blue-100">
        {months.map((month) => {
          const isActive = currentMonth === month.toLowerCase();
          return (
            <Link
              key={month}
              to="/month/$month"
              params={{ month: month.toLowerCase() }}
            >
              <Button variant={isActive ? "default" : "ghost"}>{month}</Button>
            </Link>
          );
        })}
      </div>
    </>
  );
}
