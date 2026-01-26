import { useEffect, useState } from "react";

interface IDebounced<T> {
  value: T;
  delay: number;
}

export const useDebounced = <T>({ value, delay }: IDebounced<T>) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
