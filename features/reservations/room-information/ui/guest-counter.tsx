"use client";

import { Button } from "@/components/ui/button";
import { useRoom } from "@/utils/store/room-store";
import { MinusCircle, PlusCircle, Users } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface GuestCounterContextType {
  value: number;
  updateValue: (data: number) => void;
}
const GuestCounterContext = React.createContext<
  GuestCounterContextType | undefined
>(undefined);

function useGuestCounter() {
  const context = React.useContext(GuestCounterContext);
  if (context === undefined) {
    throw new Error(
      "useGuestCounter must be used within a GuestCounterProvider"
    );
  }
  return context;
}

function GuestCounterProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = React.useState(1);

  const updateValue = (delta: number) => {
    setValue((prev) => Math.max(1, prev + delta));
  };

  return (
    <GuestCounterContext.Provider value={{ value, updateValue }}>
      <div className="flex flex-col space-y-1 ">{children}</div>
    </GuestCounterContext.Provider>
  );
}

// Counter Label Component
function GuestCounterLabel({
  children,
  icon: Icon = Users,
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      {Icon && <Icon className="h-4 w-4" />}
      <span className="text-xs font-medium text-neutral-600">{children}</span>
    </div>
  );
}

// Counter Controls Component
function GuestCounterControls({ name }: { name: string }) {
  const { value, updateValue } = useGuestCounter();
  const method = useFormContext();
  const targetRoomId = method.getValues("roomType");
  const room = useRoom(targetRoomId);

  return (
    <div className="flex gap-1 bg-background rounded-lg border items-center justify-between">
      <Button
        variant="ghost"
        type="button"
        onClick={updateValue.bind(null, -1)}
        disabled={value <= 1}
        className="rounded-lg p-2"
        aria-label="Decrease"
      >
        <MinusCircle className="h-5 w-5 text-neutral-600" />
      </Button>

      <input
        id={name}
        className="w-5 text-small pointer-events-none text-center font-medium"
        aria-label="Counter Input"
        value={value}
        readOnly
      />

      <Button
        variant="ghost"
        type="button"
        onClick={updateValue.bind(null, 1)}
        className="rounded-lg p-2"
        aria-label="Increase"
        disabled={room ? value >= room.guest_max : false}
      >
        <PlusCircle className="h-5 w-5 text-neutral-600" />
      </Button>
    </div>
  );
}

export {
  GuestCounterProvider,
  GuestCounterContext,
  GuestCounterLabel,
  GuestCounterControls,
  useGuestCounter,
};
