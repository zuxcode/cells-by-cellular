"use client";

import { type RoomData, useRoomStore } from "./stores/";
import { RoomCard } from "./components/room-card";
import React, { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { keyExtractor } from "@/utils/key-extractor";

interface RoomCardListProps {
  roomsFromServerComponent: RoomData[];
}

function RoomCardList({ roomsFromServerComponent }: RoomCardListProps) {
  const isMobile = useIsMobile();
  const {
    rooms,
    setSelectedRoom,
    setRooms,
    shouldShowAddRoomSection,
    selectedRoom,
  } = useRoomStore();

  // Sync rooms from server component with the store
  useEffect(() => {
    setRooms(roomsFromServerComponent);
  }, [roomsFromServerComponent, setRooms]);

  // Hide the list on mobile when showing add room section or a room is selected
  if ((shouldShowAddRoomSection || selectedRoom) && isMobile) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-1 gap-2 h-full">
      {rooms.map((room) => (
        <RoomCard
          key={keyExtractor(room.id, room.roomSize)}
          room={room}
          onSelect={() => setSelectedRoom(room.id)}
        >
          <RoomCard.Content>
            <RoomCard.Image />
            <div className="flex flex-col gap-2 w-full">
              <RoomCard.Header>
                <RoomCard.Title />
                <RoomCard.Status />
              </RoomCard.Header>
              <RoomCard.Details />
              <RoomCard.Description />
              <RoomCard.Footer>
                <div className="flex items-center justify-between w-full">
                  <RoomCard.Price />
                  <RoomCard.Availability />
                </div>
              </RoomCard.Footer>
            </div>
          </RoomCard.Content>
        </RoomCard>
      ))}
    </div>
  );
}

export { RoomCardList };
