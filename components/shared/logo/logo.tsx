import { cn } from "@/lib/utils/utils";

interface ILogoProps {
  containerClassName?: string;
  textClassName?: string;
  showName?: boolean;
}

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
      {showName && (
        <h1 className={cn("font-bold", textClassName)}>Smart Appointment</h1>
      )}
    </div>
  );
}
