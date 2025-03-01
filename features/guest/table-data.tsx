"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GuestDataTableDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function GuestDataTable<TData, TValue>({
  columns,
  data,
}: GuestDataTableDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5, // Default page size
      },
    },
  });

  return (
    <div className="rounded-md bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSorted = header.column.getIsSorted();
                const canSort = header.column.getCanSort();
                return (
                  <TableHead
                    key={header.id}
                    className="relative cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                    aria-sort={
                      isSorted === "asc"
                        ? "ascending"
                        : isSorted === "desc"
                          ? "descending"
                          : "none"
                    }
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2",
                        !canSort ? "cursor-default" : ""
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {canSort &&
                        (isSorted === "asc" ? (
                          <ArrowUp size={16} />
                        ) : isSorted === "desc" ? (
                          <ArrowDown size={16} />
                        ) : (
                          <ArrowUpDown size={16} />
                        ))}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => {
              return (
                <TableRow
                  key={row.id}
                  className={cn(
                    rowIndex % 2 === 0 ? "bg-gray-50" : "",
                    "hover:bg-gray-100 transition duration-200"
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id} className="py-2 px-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-gray-500"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4 py-2 border-t bg-gray-100">
        <div className="flex items-center gap-2">
          <Button
            className="px-3 py-1 text-sm text-gray-700 bg-white border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            className="px-3 py-1 text-small text-gray-700 bg-white border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-small">
            Page&nbsp;
            <strong>
              {table.getState().pagination.pageIndex + 1} of&nbsp;
              {table.getPageCount()}
            </strong>
          </span>
          <select
            className="px-2 py-1 text-sm border rounded"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export { GuestDataTable };
