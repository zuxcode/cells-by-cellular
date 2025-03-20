"use client";

import { CardContent } from "@/components/ui/card";
import { getStatusColor } from "@/features/rooms/utils/get-status-color";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/format-utils";
import { useRoom } from "@/utils/store/room-store";
import { stringTransform } from "@/utils/string-transform";
import { Users } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

function RoomInfoDescription() {
  const method = useFormContext();
  const targetRoomId = method.getValues("roomType");
  const room = useRoom(targetRoomId);
  const roomPrice = room?.price || 0;

  return (
    <div className="space-y-1">
      <p className="text-xs text-neutral-600 font-semibold">Room Description</p>
      <CardContent className="p-4 bg-canvas-cool shadow-md space-y-2">
        <div className="flex items-center gap-3">
          <Image
            alt="Price"
            src="/svg/price-tag.svg"
            className="h-4 w-4"
            width={20}
            height={20}
          />
          <span className="text-xs text-neutral-600 font-semibold">Price:</span>
          <span className="text-green-forest text-xs font-extrabold">
            {formatCurrency(roomPrice)}/Night
          </span>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <Users className="h-4 w-4 text-neutral-600" />
            <span className="text-xs text-neutral-600 font-semibold">
              Max Guest:
            </span>
            <span className="text-white text-xs bg-neutral-600 rounded-full h-4 aspect-square flex items-center justify-center">
              {room?.guest_max}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Image
              alt="tag"
              src="/svg/bed.svg"
              className="h-4 w-4"
              width={20}
              height={20}
            />
            <span className="text-xs text-neutral-600 font-semibold">Bed:</span>
            <span className="text-white text-xs bg-neutral-600 rounded-full h-4 aspect-square flex items-center justify-center">
              {room?.bed_max}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Image
            alt="tag"
            src="/svg/bed.svg"
            className="h-4 w-4"
            width={20}
            height={20}
          />
          <span className="text-xs text-neutral-600 font-semibold">
            Bed Name
          </span>
          <span className="text-xs text-neutral-600 font-semibold">
            {stringTransform(room?.bed_type)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Image
            alt="Price"
            src="/svg/status-info.svg"
            className="h-4 w-4"
            width={20}
            height={20}
          />
          <span className="text-xs text-neutral-600 font-semibold">
            Condition:
          </span>
          <span
            className={cn(
              "text-green-forest text-xs font-extrabold",
              getStatusColor(room ? room.status : "commissioned")
            )}
          >
            {stringTransform(room?.status || "")}
          </span>
        </div>

        <div className="flex items-start gap-3">
          <Image
            alt="Price"
            src="/svg/note.svg"
            className="h-4 w-4"
            width={20}
            height={20}
          />

          <div className="flex flex-col">
            <span className="text-xs text-neutral-600 font-semibold">
              Facility Notes:
            </span>
            <span className="text-neutral-600 text-xs font-medium ">
              Ac not working properly, Wash hand Basin not rushing, AC only
              comes up by 1AM
            </span>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

export { RoomInfoDescription };
