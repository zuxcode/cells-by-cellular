"use client";

import { AvatarEnhanced } from "@/components/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { getAccessStyle } from "../utils/accessStyles";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const columnSchema = z.object({
  name: z.object({
    first: z.string(),
    last: z.string(),
    email: z.string().email(),
    profilePicURL: z.string().url(),
  }),
  department: z.string(),
  access: z.array(z.string()),
  lastActive: z.date(),
  dateAdded: z.date(),
});

export type ColumnSchema = z.infer<typeof columnSchema>;

const dialogContent = [
  { name: "View Profile", iconPath: "/svg/profile.svg" },
  { name: "Edit Details", iconPath: "/svg/edit.svg" },
  { name: "Change Permission", iconPath: "/svg/permissions.svg" },
  { name: "Export Details", iconPath: "/svg/export.svg" },
  { name: "Delete User", iconPath: "/svg/delete.svg" },
];

const tableColumns: ColumnDef<ColumnSchema>[] = [
  {
    accessorKey: "name",
    header: ({ table }) => (
      <div className="flex gap-2 items-center">
        <Checkbox
          className="w-4 h-4"
          
          // checked={table.getIsAllRowsSelected()}
          // indeterminate={table.getIsSomeRowsSelected()}
          // onChange={table.getToggleAllRowsSelectedHandler()}
        />
        <span className="text-xs text-black font-normal">Name</span>
      </div>
    ),
    cell: ({ row }) => {
      const { email, first, last, profilePicURL } = row.original.name;
      return (
        <div className="flex gap-2 items-center">
          <Checkbox
            className="w-4 h-4"
            // checked={row.getIsSelected()}
            // onChange={row.getToggleSelectedHandler()}
          />
          <AvatarEnhanced src={profilePicURL} />
          <div className="flex flex-col">
            <span>{`${first} ${last}`}</span>
            <span className="text-muted-foreground text-xs">{email}</span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "department",
    header: () => (
      <span className="text-xs text-black font-normal">Department</span>
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.original.department}</span>
    ),
  },
  {
    accessorKey: "access",
    header: () => (
      <span className="text-xs text-black font-normal">Access</span>
    ),
    cell: ({ row }) => {
      const access = row.original.access;
      return access.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {access.map((item, index) => {
            const { bg, text } = getAccessStyle(item);
            return (
              <span
                key={index}
                className={`px-2 py-1 rounded-md text-sm ${bg} ${text}`}
              >
                {item}
              </span>
            );
          })}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: "lastActive",
    header: () => (
      <span className="text-xs text-black font-normal">Last Active</span>
    ),
    cell: ({ row }) => {
      const date = row.original.lastActive;
      return (
        <span className="text-sm text-neutral-600">
          {format(date, "MMM dd, yyyy")}
        </span>
      );
    },
  },
  {
    accessorKey: "dateAdded",
    header: () => (
      <span className="text-xs text-black font-normal">Date Added</span>
    ),
    cell: ({ row }) => {
      const date = row.original.dateAdded;
      return (
        <div className="flex gap-2 items-center">
          <span className="text-sm text-neutral-600">
            {format(date, "MMM dd, yyyy")}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {dialogContent.map((item) => (
                <DropdownMenuItem key={item.name}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.iconPath}
                      alt={item.name}
                      className="h-4 w-4"
                      width={16}
                      height={16}
                    />
                    <span>{item.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export { tableColumns };
