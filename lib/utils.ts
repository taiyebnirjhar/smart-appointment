import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasTimeOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  const startA = new Date(aStart).getTime();
  const endA = new Date(aEnd).getTime();
  const startB = new Date(bStart).getTime();
  const endB = new Date(bEnd).getTime();

  return startA < endB && startB < endA;
}
