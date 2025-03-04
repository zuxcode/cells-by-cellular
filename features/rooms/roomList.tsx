"use client";

import { type RoomData, useRoomStore, useCreateRoomStore } from "./stores/";
import { RoomCard } from "./components/room-card";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

import { keyExtractor } from "@/utils/key-extractor";
import { RoomListPageLayout } from "./components/page-layout";
import { usePersistStore } from "@/hooks/use-persist-util";
import Image from "next/image";
interface RoomCardListProps {
  roomsFromServerComponent: RoomData[];
}

interface RoomCardListProps {
  roomsFromServerComponent: RoomData[];
}

function RoomCardList({ roomsFromServerComponent }: RoomCardListProps) {
  const isMobile = useIsMobile();
  const { sectionControl } = useCreateRoomStore();
  const { rooms, setSelectedRoom } = useRoomStore();

  // const { rooms, setSelectedRoom, setRooms, selectedRoom } = store?.rooms;
  // console.log("rooms: ", rooms);

  // Sync rooms from server component with the store
  // React.useEffect(() => {
  //   setRooms(roomsFromServerComponent);
  // }, [roomsFromServerComponent, setRooms]);

  // const handleKeyDown = (id: string) => (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter" || e.key === " ") {
  //     setSelectedRoom(id);
  //   }
  // };

  // Hide the list on mobile when showing add room section or a room is selected
  // console.log("isMobile: ", isMobile);

  // if (isMobile && (sectionControl === "create" || selectedRoom !== null))
  //   return null;

  // if (rooms.length === 0)
  //   return (
  //     <RoomListPageLayout>
  //       <div className="col-span-2 text-center py-8 text-gray-500">
  //         No rooms available
  //       </div>
  //     </RoomListPageLayout>
  //   );

  return (
    <RoomListPageLayout>
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
                <RoomCard.EditButton />
              </RoomCard.Header>
              <RoomCard.Details />
              <RoomCard.Description />
              <RoomCard.Footer>
                <div className="flex items-center justify-between w-full">
                  <RoomCard.Availability />
                  <RoomCard.Price />
                </div>
              </RoomCard.Footer>
            </div>
          </RoomCard.Content>
        </RoomCard>
      ))}
    </RoomListPageLayout>
  );
}

const MemoizedRoomCard = React.memo(RoomCardList);

export { MemoizedRoomCard };
