import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
export function MonthProvider() {
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
          return (
            <Link
              key={month}
              to="/month/$month"
              params={{ month: month.toLowerCase() }}
            >
              <Button variant="ghost">{month}</Button>
            </Link>
          );
        })}
      </div>
    </>
  );
}
