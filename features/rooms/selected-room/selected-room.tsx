"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRoomStore } from "../stores";
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

  const status = selectedRoom ? selectedRoom.status : "Commissioned";
  return (
    <Card className="bg-canvas-cool">
      <CardHeader className="p-2 flex-row justify-between items-center">
        <CardTitle className="text-green-forest font-extrabold md:text-base w-4/5">
          {selectedRoom?.title}
        </CardTitle>

        <Button className="bg-neutral-600 px-4 w-1/5">Edit</Button>
      </CardHeader>
      <Separator />

      <CardContent className="p-2 grid gap-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row w-[70%] items-center">
            <Image
              alt="tag"
              src="/svg/price-tag.svg"
              className="h-5 w-5"
              width={20}
              height={20}
            />
            <p className="text-black text-sm">
              Price: {selectedRoom?.price}/Night
            </p>
          </div>

          <div className="w-[30%]">
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
            {selectedRoom?.bedType}
          </p>

          <p className="flex items-center gap-2">
            <Image
              alt="room size"
              src="/svg/size.svg"
              className="h-5 w-5 text-neutral-600"
              width={20}
              height={20}
            />
            {selectedRoom?.roomSize}&nbsp;m²
          </p>

          <p className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {selectedRoom?.maxGuests}&nbsp;Guest
          </p>
        </div>
        <div>
          <p>{selectedRoom?.description}</p>
        </div>

        <section className="space-y-2">
          <h5 className="text-[.75rem] text-black font-semibold">Features</h5>

          <div className="grid grid-cols-2 gap-4">
            {
              features.map((feature, index) => (
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
              ))
            }
          </div>
        </section>
      </CardDescription>
    </Card>
  );
}

export { SelectedRoom };
