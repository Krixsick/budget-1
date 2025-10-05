import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

interface CardProps {
  onClick: () => void;
  amount?: Number;
}

export function ExpenseCard({ onClick, amount = 0 }: CardProps) {
  //<ArrowLeftFromLine />
  return (
    <div
      onClick={onClick}
      className="min-w-[200px] w-[45%] min-h-[250px] h-[15vh] max-h-[350px] rounded-xl flex flex-col gap-[20%] p-4 bg-[#F0F4F8] cursor-pointer"
    >
      {/* Icon */}
      <div className="w-full h-[30%] flex items-center px-2">
        <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[var(--ref-primary-50)]">
          <ArrowRightFromLine color="white"></ArrowRightFromLine>
        </div>
      </div>
      {/*Text*/}
      <div className="w-full h-[50%] flex flex-col justify-around  px-2">
        <p className="inter-light text-sm">Expense</p>
        <p className="inter-bold text-xl">-${amount}</p>
      </div>
    </div>
  );
}

export function IncomeCard({ onClick, amount = 0 }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="min-w-[200px] w-[45%] min-h-[250px] h-[15vh] max-h-[350px] rounded-xl flex flex-col gap-[20%] p-4 bg-[#F0F4F8] cursor-pointer"
    >
      {/* Icon */}
      <div className="w-full h-[30%] flex items-center px-2">
        <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[var(--ref-secondary-50)]">
          <ArrowLeftFromLine color="white"></ArrowLeftFromLine>
        </div>
      </div>
      {/*Text*/}
      <div className="w-full h-[50%] flex flex-col justify-around  px-2">
        <p className="inter-light text-sm">Income</p>
        <p className="inter-bold text-xl">{amount}</p>
      </div>
    </div>
  );
}
