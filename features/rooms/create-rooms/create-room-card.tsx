"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateRoomForm } from "./component/room-form";
import { useCreateRoomStore } from "../stores";

function CreateRoomCard() {
  const { sectionControl } = useCreateRoomStore();

  if (sectionControl === "selected") return null;

  return (
    <Card className="bg-neutral-050 w-full">
      <CardHeader className="px-0 p-2">
        <CardTitle className="text-lg px-6 font-extrabold text-green-forest">
          Add New
        </CardTitle>

        <svg width="100%" height="20" className="px-2">
          <title>Underline</title>
          <line
            x1="0"
            y1="5"
            x2="100%"
            y2="5"
            stroke="black"
            strokeWidth="0.2"
            strokeDasharray="50,20"
          />
        </svg>
      </CardHeader>

      <CardContent className="px-2 h-auto flex flex-col gap-5">
        <CreateRoomForm />
      </CardContent>
    </Card>
  );
}

export { CreateRoomCard };
