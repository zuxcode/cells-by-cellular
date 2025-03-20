"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useFormContext } from "react-hook-form";

function RoomType({ children }: React.PropsWithChildren) {
  const method = useFormContext();
  return (
    <FormField
      control={method.control}
      name="roomType"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs text-neutral-600 font-semibold">
            Choose Room
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { RoomType };
