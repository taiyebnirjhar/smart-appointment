"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTableSkeleton() {
  // Number of skeleton rows to show
  const rows = 5;

  return (
    <div className="space-y-4">
      {/* Toolbar Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-9 w-9" /> {/* Print button */}
          <Skeleton className="h-9 w-9" /> {/* Copy button */}
          <Skeleton className="h-9 w-24" /> {/* Items per page */}
          <Skeleton className="h-9 w-32" /> {/* Status filter */}
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[200px] sm:w-[300px]" /> {/* Search */}
          <Skeleton className="h-9 w-24" /> {/* View options */}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Skeleton className="h-4 w-4" />
              </TableHead>
              <TableHead className="w-[250px]">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="w-[200px]">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="w-[100px]">
                <Skeleton className="h-4 w-14" />
              </TableHead>
              <TableHead className="w-[100px] hidden sm:table-cell">
                <Skeleton className="h-4 w-12" />
              </TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[140px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[180px]" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-4 w-[300px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-12" />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-8 w-40" /> {/* Selected rows count */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" /> {/* Rows per page */}
            <Skeleton className="h-8 w-20" /> {/* Page number */}
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-8" /> {/* First page */}
            <Skeleton className="h-8 w-8" /> {/* Previous page */}
            <Skeleton className="h-8 w-8" /> {/* Next page */}
            <Skeleton className="h-8 w-8" /> {/* Last page */}
          </div>
        </div>
      </div>
    </div>
  );
}
