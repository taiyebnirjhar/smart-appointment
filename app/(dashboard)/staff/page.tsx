"use client";

import { dataTablePaginationDefaultState } from "@/constant/data-table";
import useAuth from "@/hooks/use-auth";
import { IStaff } from "@/types/api-response/api-response";
import { IQuery } from "@/types/common/common";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useState } from "react";
export default function StaffPage({ searchParams }: { searchParams: IQuery }) {
  const session = useAuth();
  const [pagination, setPagination] = useState(dataTablePaginationDefaultState);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [users, setUsers] = useState<IStaff[]>([] as IStaff[]);

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

  // const { data, isLoading, isFetching } = useGetUsersQuery(
  //   {
  //     params: {
  //       page: pagination.pageIndex + 1,
  //       limit: pagination.pageSize,
  //       sort,
  //       search: searchParams.search || undefined,
  //       ...filterObj,
  //       populate: "roleDoc",
  //     },
  //   },
  //   {
  //     skip: session.status !== "authenticated",
  //   },
  // );

  return <div>page</div>;
}
