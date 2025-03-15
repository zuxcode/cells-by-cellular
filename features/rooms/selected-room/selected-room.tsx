"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateRoomStore, useRoomStore } from "../stores";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getStatusColor } from "../utils/get-status-color";
import React from "react";
import { RoomImageCarousel } from "./room-carousel";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import { keyExtractor } from "@/utils/key-extractor";

const features = ["Wi-Fi", "TV", "Heating", "Air Conditioning"];

function SelectedRoom() {
  const { selectedRoom } = useRoomStore();
  const { sectionControl, setSectionControl } = useCreateRoomStore();

  if (sectionControl !== "selected") return null;

  if (!selectedRoom) {
    return <div>Select a room to view details</div>;
  }

  const { title, status, price, bedType, roomSize, maxGuests, description } =
    selectedRoom;

  return (
    <Card className="bg-canvas-cool">
      <CardHeader className="p-2 flex-row justify-between items-center">
        <CardTitle className="text-green-forest font-extrabold md:text-base w-4/5">
          {title}
        </CardTitle>

        <Button 
         onClick={ setSectionControl }  
         className="bg-neutral-600 px-4 w-1/5">
           Edit
      </Button>
      </CardHeader>
      <Separator />

      <CardContent className="p-2 grid gap-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row w-[60%] items-center">
            <Image
              alt="tag"
              src="/svg/price-tag.svg"
              className="h-5 w-5"
              width={20}
              height={20}
            />
            <p className="text-black text-sm">Price: {price}/Night</p>
          </div>

          <div className="w-[40%]">
            <p
              className={cn(
                "text-sm px-2 py-1 font-medium rounded-md",
                getStatusColor(status)
              )}
            >
              {status}
            </p>
          </div>
        </div>

        <RoomImageCarousel />
      </CardContent>

      <CardDescription className="p-2 space-y-2">
        <div className="flex item-center gap-4">
          <p className="flex items-center gap-2">
            <Image
              alt="bed name"
              src="/svg/bed.svg"
              className="h-5 w-5"
              width={20}
              height={20}
            />
            {bedType}
          </p>

          <p className="flex items-center gap-2">
            <Image
              alt="room size"
              src="/svg/size.svg"
              className="h-5 w-5 text-neutral-600"
              width={20}
              height={20}
            />
            {roomSize}&nbsp;m²
          </p>

          <p className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {maxGuests}&nbsp;Guest
          </p>
        </div>
        <div>
          <p>{description}</p>
        </div>

        <section className="space-y-2">
          <h5 className="text-[.75rem] text-black font-semibold">Features</h5>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={keyExtractor(feature, index)}
                className="flex items-center gap-2 text-sm text-black"
              >
                <Image
                  alt="tag"
                  src="/svg/good-check.svg"
                  className="h-5 w-5"
                  width={20}
                  height={20}
                />
                {feature}
              </div>
            ))}
          </div>
        </section>
      </CardDescription>
    </Card>
  );
}

export { SelectedRoom };
