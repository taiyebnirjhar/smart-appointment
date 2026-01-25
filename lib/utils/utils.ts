/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function getErrorMessage(err: unknown): string {
  if (Array.isArray(err)) {
    // If the error is array of strings, join and return
    return err.join("\n");
  }
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null) {
    const message = (err as any).message;
    if (Array.isArray(message)) {
      return message.join("\n");
    }
    if (typeof message === "string") {
      return message;
    }
    if ("error" in err && typeof (err as any).error?.message === "string") {
      return (err as any).error.message;
    }
  }
  return "Something went wrong.";
}
