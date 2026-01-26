"use client";

import { DataTableSkeleton } from "@/components/shared/skeletons/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { dataTablePaginationDefaultState } from "@/constant/data-table";
import useAuth from "@/hooks/use-auth";
import { useGetAppointmentsQuery } from "@/redux/api/appointment/appointment.api";
import { IAppointment } from "@/types/api-response/api-response";
import { IQuery } from "@/types/common/common";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { columns } from "../data-table/columns";
import { DataTable } from "../data-table/data-table";

export default function AppointmentContainer({
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

  const { data, isLoading, isFetching } = useGetAppointmentsQuery(
    {
      params: {
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        sort,
        search: searchParams?.search || undefined,
        from: searchParams?.from || undefined,
        to: searchParams?.to || undefined,
        status: searchParams?.status || undefined,
        populate: "service,staff",
        ...filterObj,
      },
    },
    {
      skip: session.status !== "authenticated",
    },
  );

  const appointment = (data?.appointments as IAppointment[]) || [];

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-6 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-lg md:text-2xl font-medium tracking-tight">
            Appointment List
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Here&apos;s a list of appointment that has been booked in your
            business.
          </p>
        </div>
        <Link
          href="/appointment/create"
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Button className="cursor-pointer">
            <Plus className="h-4 w-4" /> Create New Appointment
          </Button>
        </Link>
      </div>

      {isLoading || isFetching ? (
        <DataTableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={appointment}
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
