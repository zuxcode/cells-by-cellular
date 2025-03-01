"use client";

import { Bed, Diameter, EditIcon, UsersRound } from "lucide-react";

import { RoomImageCarousel } from "./room-carousel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ActionTrigger,
  ActionIndicator,
  ActionLabel,
} from "@/components/button";
import { useRoomStore } from "../stores";
import {
  HeaderActions,
  HeaderContainer,
  HeaderContent,
  HeaderTitle,
  HeaderRoot,
} from "@/components/header";
import {
  RoomPrice,
  RoomSpecifications,
  RoomSpecificationItem,
  RoomStatusBadge,
} from "./block/block";

function RoomDetailCard() {
  const { selectedRoom, shouldShowAddRoomSection } = useRoomStore();

  // Early return if no room is selected
  if (!selectedRoom) {
    return <p className="text-gray-500 text-center">No room selected.</p>;
  }

  // Early return if the add room section should be shown
  if (shouldShowAddRoomSection) return null;

  return (
    <Card>
      <CardHeader>
        <HeaderRoot>
          <HeaderContainer>
            <HeaderContent>
              <h3 className="text-lg font-bold">Room Details</h3>
              <div className="flex items-center gap-4">
                <CardTitle>{selectedRoom.title}</CardTitle>
                <RoomStatusBadge status={selectedRoom.status} />
              </div>
              <p className="text-xs">
                <strong className="text-muted-foreground">Occupied:</strong>{" "}
                {selectedRoom.roomsOccupied}/{selectedRoom.totalRooms} Rooms
              </p>
            </HeaderContent>
          </HeaderContainer>

          <HeaderActions>
            <ActionTrigger>
              <ActionIndicator symbol={EditIcon} />
              <ActionLabel className="text-sm">Edit</ActionLabel>
            </ActionTrigger>
          </HeaderActions>
        </HeaderRoot>
      </CardHeader>

      <CardContent>
        {/* Room image carousel */}
        <RoomImageCarousel />

        {/* Room details */}
        <div className="space-y-4 w-full">
          <RoomSpecifications>
            <RoomSpecificationItem
              icon={Diameter}
              label="Room size"
              value={`${selectedRoom.roomSize}m²`}
            />
            <RoomSpecificationItem
              icon={Bed}
              label="Bed type"
              value={selectedRoom.bedType}
            />
            <RoomSpecificationItem
              icon={UsersRound}
              label="Max guests"
              value={selectedRoom.maxGuests}
            />
          </RoomSpecifications>

          {/* Room description */}
          <p className="text-gray-700">{selectedRoom.description}</p>

          {/* Room availability and price */}
          <div className="flex justify-between items-center text-sm text-gray-700">
            <p>
              <strong>Availability:</strong> {selectedRoom.roomsOccupied}/
              {selectedRoom.totalRooms} Rooms
            </p>
            <RoomPrice value={selectedRoom.price} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { RoomDetailCard };
