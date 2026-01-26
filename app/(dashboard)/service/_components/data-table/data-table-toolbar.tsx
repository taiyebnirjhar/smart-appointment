/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Input } from "@/components/ui/input";
import { useDebounced } from "@/hooks/use-debounced";
import type { Table } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  const { search, ...rest } = queryParams;

  const [searchKey, setSearchKey] = useState<string>(search || "");
  const debouncedTerm = useDebounced({ string: searchKey, delay: 700 });

  useEffect(() => {
    const newQuery = { ...rest };

    if (debouncedTerm) {
      newQuery.search = debouncedTerm;
    } else {
      delete newQuery.search;
    }

    router.replace(`?${new URLSearchParams(newQuery as any).toString()}`);
  }, [debouncedTerm]);

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Left Section */}
      <div className="flex flex-1 items-center space-x-2">
        {/* Search */}
        <Input
          placeholder="Search by service name and needed stuff..."
          defaultValue={search}
          onChange={(e) => setSearchKey(e.target.value)}
          className="h-8 w-full text-sm"
        />
      </div>

      {/* View Options (Columns visibility) */}
      <DataTableViewOptions table={table} />
    </div>
  );
}
