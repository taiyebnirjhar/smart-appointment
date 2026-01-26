"use client";

import { DataTableSkeleton } from "@/components/shared/skeletons/data-table-skeleton";
import { dataTablePaginationDefaultState } from "@/constant/data-table";
import useAuth from "@/hooks/use-auth";
import { useGetQueuedItemsQuery } from "@/redux/api/waiting-list/waiting-list.api";
import { IWaitingQueueItem } from "@/types/api-response/api-response";
import { IQuery } from "@/types/common/common";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "../data-table/columns";
import { DataTable } from "../data-table/data-table";

export default function WaitingListContainer({
  searchParams,
}: {
  searchParams?: IQuery;
}) {
  const session = useAuth();
  const [pagination, setPagination] = useState(dataTablePaginationDefaultState);
  const [sorting, setSorting] = useState<SortingState>([]);

  const sort =
    sorting.length > 0
      ? sorting
          .map((sort) => {
            return `${sort.desc ? "-" : ""}${sort.id}`;
          })
          .join(",")
      : "-createdAt";

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filterObj: Record<string, string> = {};

  if (columnFilters.length > 0) {
    columnFilters.forEach((filter) => {
      filterObj[filter.id as string] = filter.value as string;
    });
  }

  const { data, isLoading, isFetching } = useGetQueuedItemsQuery(
    {
      params: {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sort,
        search: searchParams?.search || undefined,
        populate: "service",
        ...filterObj,
      },
    },
    {
      skip: session.status !== "authenticated",
    },
  );

  const queue = (data?.queue as IWaitingQueueItem[]) || [];

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-6 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-lg md:text-2xl font-medium tracking-tight">
            Waiting List
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Here&apos;s a list of queued items.
          </p>
        </div>
      </div>

      {isLoading || isFetching ? (
        <DataTableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={queue}
          pagination={pagination}
          setPagination={setPagination}
          totalDocumentCount={data?.meta?.total || 0}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
      )}
    </div>
  );
}
