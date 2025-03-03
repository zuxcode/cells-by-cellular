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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormProps } from "../types/type";
import { roomType } from "@/types/global-type";

function RoomType(form: FormProps) {
  return (
    <FormField
      control={form.control}
      name="roomType"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-small text-neutral-600 font-semibold">
            Choose Room
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {roomType.flatMap((value) => (
                <SelectItem key={value} value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { RoomType };
