"use client";

import {
  ActionIndicator,
  ActionLabel,
  ActionTrigger,
} from "@/components/button";
import { useRoomStore } from "../stores";
import { X } from "lucide-react";

const RoomHeaderAction = () => {
  const { shouldShowAddRoomSection, setShouldShowAddRoomSection } =
    useRoomStore();

  return (
    <ActionTrigger className="transition-all" onClick={setShouldShowAddRoomSection} asChild>
      <div className="flex items-center gap-2 justify-center">
        <ActionIndicator symbol={shouldShowAddRoomSection ? X : undefined} />
        <ActionLabel>
          {shouldShowAddRoomSection ? "Cancel" : "Create Room"}
        </ActionLabel>
      </div>
    </ActionTrigger>
  );
};

export { RoomHeaderAction };
