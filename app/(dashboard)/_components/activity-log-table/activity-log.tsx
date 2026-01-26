"use client";

import { DataTableSkeleton } from "@/components/shared/skeletons/data-table-skeleton";
import { dataTablePaginationDefaultState } from "@/constant/data-table";
import { IActivityLog } from "@/types/api-response/api-response";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";

interface ActivityLogTableProps {
  activities: IActivityLog[];
  isLoading: boolean;
}

export function ActivityLog({ activities, isLoading }: ActivityLogTableProps) {
  const [pagination, setPagination] = useState(dataTablePaginationDefaultState);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filterObj: Record<string, string> = {};

  if (columnFilters.length > 0) {
    columnFilters.forEach((filter) => {
      filterObj[filter.id as string] = filter.value as string;
    });
  }

  return (
    <>
      {isLoading ? (
        <DataTableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={activities}
          pagination={pagination}
          setPagination={setPagination}
          totalDocumentCount={activities?.length || 0}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      )}
    </>
  );
}
