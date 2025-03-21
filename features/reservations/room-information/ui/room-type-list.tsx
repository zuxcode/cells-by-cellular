// "use client";

// import { SelectItem } from "@/components/ui/select";
// import { useRoomStore, useRoomActions } from "@/utils/store/room-store";
// import { stringTransform } from "@/utils/string-transform";
// import { useMemo } from "react";

// const RoomTypeList: React.FC = () => {
//   const { roomIds } = useRoomStore();
//   const { getRoomById, selectRoom } = useRoomActions();

//   // const uniqueRooms = useMemo(() => {
//   //   const seen = new Set<string>();
//   //   return roomIds
//   //     .map(id => getRoomById(id))
//   //     .filter((room): room is NonNullable<typeof room> => {
//   //       if (!room) return false;
//   //       const isDuplicate = seen.has(room.room_type);
//   //       seen.add(room.room_type);
//   //       return !isDuplicate;
//   //     });
//   // }, [roomIds, getRoomById]);

//   if (roomIds.length === 0) {
//     return (
//       <SelectItem disabled value="no-rooms">
//         No room types available
//       </SelectItem>
//     );
//   }

//   return (
//     <>
//       {uniqueRooms.map((room) => (
//         <SelectItem 
//           key={room.id}
//           value={room.id}
//           className="capitalize"
//         >
//           {stringTransform(room.room_type)}
//         </SelectItem>
//       ))}
//     </>
//   );
// };

// export { RoomTypeList };


"use client";

import { SelectItem } from "@/components/ui/select";
import { useRoomStore, useRoomActions, Room } from "@/utils/store/room-store";
import { stringTransform } from "@/utils/string-transform";
import { useMemo } from "react";

const RoomTypeList: React.FC = () => {
  const { roomIds } = useRoomStore();
  const { getRoomById } = useRoomActions();

  // Memoize valid rooms to prevent unnecessary re-renders
  const validRooms = useMemo(() => {
    return roomIds
      .map(id => getRoomById(id))
      .filter(Boolean) as Room[]; // Type assertion after filter
  }, [roomIds, getRoomById]);

  if (validRooms.length === 0) {
    return (
      <SelectItem disabled value="no-rooms">
        No room types available
      </SelectItem>
    );
  }

  return (
    <>
      {validRooms.map((room) => (
        <SelectItem 
          key={room.id} 
          value={room.id}
          className="capitalize" // Assuming stringTransform needs capitalization
        >
          {stringTransform(room.room_type)}
        </SelectItem>
      ))}
    </>
  );
};

export { RoomTypeList };