"use client";

import {
  ActionIndicator,
  ActionLabel,
  ActionTrigger,
} from "@/components/button";
import { useCreateRoomStore } from "@/features/rooms/stores";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const RoomHeaderAction = () => {
  const { sectionControl, setSectionControl } = useCreateRoomStore();

  return (
    <ActionTrigger
      className={cn(
        "h-9",
        sectionControl === "create" && "bg-destructive hover:bg-destructive/80"
      )}
      onClick={setSectionControl}
      asChild
    >
      <div className="flex items-center gap-2 justify-center">
        <ActionIndicator symbol={sectionControl === "create" ? X : undefined} />
        <ActionLabel>
          {sectionControl === "create" ? "Cancel" : "Create Room"}
        </ActionLabel>
      </div>
    </ActionTrigger>
  );
};

export { RoomHeaderAction };
