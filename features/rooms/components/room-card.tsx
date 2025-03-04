"use client";

import { Bed, Diameter, UsersRound } from "lucide-react";
import React, { createContext, useContext, useCallback } from "react";

import { RoomData, useCreateRoomStore } from "../stores";
import { MediaContainer } from "@/components/media";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Define context value type
interface RoomCardContextValue {
  room: RoomData;
  onSelect: (id: string) => void;
}

// Define RoomCard props
interface RoomCardProps {
  room: RoomData;
  onSelect: (id: string) => void;
  children?: React.ReactNode;
}

// Create context
const RoomCardContext = createContext<RoomCardContextValue | null>(null);

// Custom hook to use RoomCardContext
function useRoomCardContext() {
  const context = useContext(RoomCardContext);
  if (!context) {
    throw new Error("RoomCard components must be used within a RoomCard");
  }
  return context;
}

// Main RoomCard component
function RoomCard({ room, onSelect, children }: RoomCardProps) {
  const { setSectionControl, sectionControl } = useCreateRoomStore();

  // Memoize the handleSelectedRoom function to avoid unnecessary re-renders
  const handleSelectedRoom = useCallback(
    (id: string) => {
      if (sectionControl === "create") setSectionControl();
      onSelect(id);
    },
    [sectionControl, setSectionControl, onSelect]
  );

  return (
    <RoomCardContext.Provider value={{ room, onSelect: handleSelectedRoom }}>
      <Card
        className="hover:shadow-md transition md:h-[215px] cursor-pointer"
        onClick={() => handleSelectedRoom(room.id)}
      >
        {children}
      </Card>
    </RoomCardContext.Provider>
  );
}

// RoomCardContent component
function RoomCardContent({ children }: { children: React.ReactNode }) {
  return (
    <CardContent className="relative p-2 gap-4 flex flex-col md:flex-row overflow-hidden">
      {children}
    </CardContent>
  );
}

// RoomCardImage component
function RoomCardImage() {
  const { room } = useRoomCardContext();

  if (room.imageUrl.length === 0) {
    return null;
  }

  return (
    <MediaContainer>
      <MediaContainer.Media src={room.imageUrl[0]} alt={room.title} />
    </MediaContainer>
  );
}

// RoomCardHeader component
function RoomCardHeader({ children }: { children: React.ReactNode }) {
  return (
    <CardHeader className="md:grid md:grid-cols-[3fr_1.5fr_0.5fr] h-fit items-center justify-between p-0 space-y-0 w-full gap-4">
      {children}
    </CardHeader>
  );
}

// RoomCardTitle component
function RoomCardTitle() {
  const { room } = useRoomCardContext();
  return (
    <CardTitle className="md:text-base font-bold text-neutral-600 ">
      {room.title}
    </CardTitle>
  );
}

// RoomCardStatus component
function RoomCardStatus() {
  const { room } = useRoomCardContext();
  return (
    <div
      className={cn(
        "absolute md:relative md:top-0 md:left-0 top-4 left-4 px-2 py-1 text-sm font-medium rounded-md",
        room.status === "Not-commissioned"
          ? "bg-red-100 text-red-600"
          : "bg-[#F1FFF6] text-[#03432F]"
      )}
    >
      {room.status}
    </div>
  );
}

// RoomEditButton component
function RoomEditButton() {
  return (
    <Button
      variant="ghost"
      className={cn(
        "absolute md:relative md:top-0 md:left-0 top-3 right-3 px-2 py-1 text-sm font-medium rounded-md"
      )}
    >
      <Image
        alt="tag"
        src="/svg/edit.svg"
        className="h-5 w-5"
        width={20}
        height={20}
      />
    </Button>
  );
}

// RoomCardDetails component
function RoomCardDetails() {
  const { room } = useRoomCardContext();
  return (
    <div className="flex flex-wrap gap-8">
      <span className="flex items-center gap-1">
        <Diameter className="w-4 h-4" />
        {room.roomSize}m²
      </span>
      <span className="flex items-center gap-1">
        <Image
        alt="tag"
        src="/svg/bed-head.svg"
        className="h-4 w-4"
        width={16}
        height={16}
      />
        {room.bedType}
      </span>
      <span className="flex items-center gap-1">
        <UsersRound className="w-4 h-4" />
        {room.maxGuests} Guests
      </span>
    </div>
  );
}

// RoomCardDescription component
function RoomCardDescription() {
  const { room } = useRoomCardContext();
  return (
    <div className="overflow-hidden h-9">
      <p className="text-sm text-gray-600 line-clamp-2">{room.description}</p>
    </div>
  );
}

// RoomCardFooter component
function RoomCardFooter({ children }: { children?: React.ReactNode }) {
  return (
    <CardFooter className="text-lg flex md:justify-between items-center md:gap-4 p-2 h-[30%]">
      {children }
    </CardFooter>
  );
}

// RoomCardAvailability component
function RoomCardAvailability() {
  const { room } = useRoomCardContext();
  return (
    <p className="text-gray-500 text-sm hidden md:block">
      <strong>Availability:</strong> {room.roomsOccupied}/{room.totalRooms}{" "}
      Rooms
    </p>
  );
}

// RoomCardPrice component
function RoomCardPrice() {
  const { room } = useRoomCardContext();
  return (
    <div className="flex items-center gap-1">
      <p className="font-bold text-gray-800">{room.price}</p>
      <p className="text-gray-500 text-sm md:hidden">/night</p>
    </div>
  );
}

// Assign compound components
RoomCard.Content = RoomCardContent;
RoomCard.Image = RoomCardImage;
RoomCard.Header = RoomCardHeader;
RoomCard.Title = RoomCardTitle;
RoomCard.Status = RoomCardStatus;
RoomCard.Details = RoomCardDetails;
RoomCard.Description = RoomCardDescription;
RoomCard.Footer = RoomCardFooter;
RoomCard.Availability = RoomCardAvailability;
RoomCard.Price = RoomCardPrice;
RoomCard.EditButton = RoomEditButton;

export { RoomCard };
