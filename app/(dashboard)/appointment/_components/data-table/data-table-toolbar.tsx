/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DatePickerWithRange } from "@/components/shared/date-range-picker/date-range-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounced } from "@/hooks/use-debounced";
import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParams = Object.fromEntries(searchParams.entries());
  const { search, from, to, ...rest } = queryParams;

  const [searchKey, setSearchKey] = useState<string>(search || "");
  const [date, setDate] = useState<DateRange | undefined>(() => {
    if (from || to) {
      return {
        from: from ? new Date(from) : undefined,
        to: to ? new Date(to) : undefined,
      };
    }
    return undefined;
  });
  const debouncedTerm = useDebounced({ value: searchKey, delay: 700 });
  const debouncedDate = useDebounced({ value: date, delay: 1000 });

  useEffect(() => {
    const newQuery = { ...rest };

    if (debouncedTerm) {
      newQuery.search = debouncedTerm;
    } else {
      delete newQuery.search;
    }

    if (debouncedDate?.from) {
      newQuery.from = debouncedDate.from.toISOString();
      if (debouncedDate.to) {
        const toDate = new Date(debouncedDate.to);
        toDate.setHours(23, 59, 59, 999);
        newQuery.to = toDate.toISOString();
      } else {
        const toDate = new Date(debouncedDate.from);
        toDate.setHours(23, 59, 59, 999);
        newQuery.to = toDate.toISOString();
      }
    } else {
      delete newQuery.from;
      delete newQuery.to;
    }

    router.replace(`?${new URLSearchParams(newQuery as any).toString()}`);
  }, [debouncedTerm, debouncedDate]);

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Left Section */}
      <div className="flex flex-1 items-center space-x-2">
        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <DatePickerWithRange date={date} setDate={setDate} />
          {date && (
            <Button
              variant="ghost"
              onClick={() => setDate(undefined)}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        {/* Search */}
        <Input
          placeholder="Search by customer name, service name or staff name"
          defaultValue={search}
          onChange={(e) => setSearchKey(e.target.value)}
          className="h-8 w-full text-sm flex-1"
        />
      </div>

      {/* View Options (Columns visibility) */}
      <DataTableViewOptions table={table} />
    </div>
  );
}
