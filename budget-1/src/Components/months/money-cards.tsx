import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ExpenseCard() {
  return (
    <div className="min-w-[200px] w-[45%] min-h-[250px] h-[50%] max-h-[350px] bg-red-100 rounded-xl flex flex-col p-4 px-8">
      {/* Icon */}
      <div className="flex-1 flex items-center justify-start">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 flex flex-col justify-center items-start gap-4">
        <p>Expenses</p>
        <p>$6000.00</p>
      </div>
    </div>
  );
}
export function IncomeCard() {
  return (
    <div className="min-w-[200px] w-[45%] min-h-[250px] h-[50%] max-h-[350px] bg-red-100 rounded-xl flex flex-col p-4 px-8">
      {/* Icon */}
      <div className="flex-1 flex items-center justify-start">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 flex flex-col justify-center items-start gap-4">
        <p>Income</p>
        <p>$6000.00</p>
      </div>
    </div>
  );
}
