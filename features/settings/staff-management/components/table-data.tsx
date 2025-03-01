"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ColumnSchema } from "./column";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "./table-pagination";
import React from "react";

interface DataTableProps {
  columns: ColumnDef<ColumnSchema>[];
  data: ColumnSchema[];
  pageSize?: number;
}

function DataTable({ columns, data, pageSize = 10 }: DataTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    state: {
      rowSelection,
    },
    columns,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.name.email, // Using email as unique ID
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {Object.keys(rowSelection).length > 0 && (
        <div className="text-sm text-muted-foreground">
          {Object.keys(rowSelection).length} row(s) selected
        </div>
      )}

      <TablePagination table={table} />
    </div>
  );
}

export { DataTable };
