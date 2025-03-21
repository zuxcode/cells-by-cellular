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
import { ReservationSchemaType } from "../../schema/reservation-schema";
import { useRoomActions } from "@/utils/store/room-store";

function RoomType({ children }: React.PropsWithChildren) {
  const method = useFormContext<ReservationSchemaType>();
  const { selectRoom } = useRoomActions();

  return (
    <FormField
      control={method.control}
      name="roomType"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xs text-neutral-600 font-semibold">
            Choose Room
          </FormLabel>
          <Select
            onValueChange={(e) => {
              field.onChange(e);
              method.trigger("roomType");
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger >
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
