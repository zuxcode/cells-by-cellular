"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import { RoomSchemaType } from "../schema/create-room-schema";
import { UseFormReturn } from "react-hook-form";

interface RoomCounterProps {
  name: keyof RoomSchemaType;
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  icon: React.ElementType;
  min?: number;
  max?: number;
  form: UseFormReturn<RoomSchemaType>;
}

function RoomCounter({
  label,
  value,
  onIncrement,
  onDecrement,
  icon: Icon,
  name,
  min = 1,
  max = Infinity,
  form,
}: RoomCounterProps) {
  return (
    <div className="flex flex-col space-y-1 w-fit relative">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-5 w-5" />
        <span className="text-small font-medium text-neutral-600">{label}</span>
      </div>
      <div className="flex gap-4 bg-background rounded-lg border items-center justify-between">
        <Button
          variant="ghost"
          type="button"
          onClick={onDecrement}
          disabled={value === min}
          className="rounded-lg p-2"
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <MinusCircle className="h-6 w-6 text-primary" />
        </Button>
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  id={name}
                  className="w-[10px] text-small text-center font-medium"
                  aria-label={label}
                  readOnly
                  {...field}
                  value={value}
                />
              </FormControl>
              <FormMessage className="absolute bottom-0 left-0"/>
            </FormItem>
          )}
        />
        <Button
          variant="ghost"
          type="button"
          onClick={onIncrement}
          disabled={value === max}
          className="rounded-lg p-2"
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <PlusCircle className="h-6 w-6 text-primary" />
        </Button>
      </div>
    </div>
  );
}

export { RoomCounter };
