"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, SquarePen } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";

export const columnsSchema = z.object({
  guest: z.object({
    name: z.string(),
    id: z.string(),
  }),
  room: z.string(),
  request: z.string(),
  duration: z.string(),
  roomType: z.string(),
  check: z.object({
    out: z.string(),
    in: z.string(),
  }),
  status: z.enum(["pending", "processing", "confirmed", "rejected"]),
  actions: z.string(),
});

export type ColumnsSchemaType = z.infer<typeof columnsSchema>;

// Status classes for better readability and reusability
const STATUS_CLASSES = {
  pending: "bg-yellow-100 text-yellow-600",
  processing: "bg-blue-100 text-blue-600",
  confirmed: "bg-green-100 text-green-600",
  rejected: "bg-red-100 text-red-600",
};

export const tableColumns: ColumnDef<ColumnsSchemaType>[] = [
  {
    accessorKey: "guest",
    header: "Guest",
    cell: ({ cell }) => {
      const { name, id } = cell.row.original.guest;
      return (
        <div>
          <p className="text-muted-foreground text-xs">{name}</p>
          <p className="text-muted-foreground text-xs">{id}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "room",
    header: "Room",
    cell: ({ row }) => (
      <div className="relative group">
        <p>{row.original.room}</p>
        <div className="absolute hidden group-hover:flex bg-black text-white text-xs rounded py-1 px-2 z-10">
          {`Type: ${row.original.roomType}`}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "request",
    header: "Request",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "checkInOut",
    header: "Check-in/out",
    cell: ({ row }) => {
      const { check } = row.original;
      const checkInDate = format(new Date(check.in), "d");
      const checkOutDate = format(new Date(check.out), "dd MMM, yyyy");
      return `${checkInDate} - ${checkOutDate}`;
    },
    sortingFn: (rowA, rowB) => {
      const checkInA = new Date(rowA.original.check.in).getTime();
      const checkInB = new Date(rowB.original.check.in).getTime();
      return checkInA - checkInB;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={cn(
            "px-2 py-1 rounded text-sm font-medium",
            STATUS_CLASSES[status]
          )}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    enableSorting: false, // Disable sorting for the Actions column
    cell: ({ row }) => {
      const reservation = row.original;
      return (
        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded"
            aria-label={`View details for ${reservation.guest.name}`}
            onClick={() =>
              toast.success(`Viewing reservation for ${reservation.guest.name}`)
            }
          >
            <Eye className="text-muted-foreground text-xs" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded"
            aria-label={`Edit reservation for ${reservation.guest.name}`}
            onClick={() =>
              toast.success(`Editing reservation for ${reservation.guest.name}`)
            }
          >
            <SquarePen className="text-muted-foreground text-xs" />
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              toast.success(
                `Canceling reservation for ${reservation.guest.name}`
              )
            }
          >
            Cancel
          </Button>
        </div>
      );
    },
  },
];
