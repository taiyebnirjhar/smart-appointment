/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils/utils";

interface ILogoProps {
  containerClassName?: string;
  textClassName?: string;
  showName?: boolean;
}
const name = "Smart Appointment";

const initials = name
  .split(" ")
  .filter(Boolean)
  .slice(0, 2)
  .map((word: any) => word[0]?.toUpperCase())
  .join("");

export default function Logo({
  containerClassName,
  textClassName,
  showName = true,
}: ILogoProps) {
  return (
    <div
      className={cn(
        "flex justify-center items-center gap-2  mx-auto",
        containerClassName,
      )}
    >
      <Avatar className="h-8 w-8 rounded-lg border-2 border-border">
        <AvatarImage src={""} alt={name} />
        <AvatarFallback className="rounded-lg text-sm font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>

      {showName && <h1 className={cn("font-bold", textClassName)}>{name}</h1>}
    </div>
  );
}
