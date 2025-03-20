"use client" 

import { SelectItem } from "@/components/ui/select";
import { useRoomStore, useRoomActions } from "@/utils/store/room-store";
import { stringTransform } from "@/utils/string-transform";

const RoomTypeList: React.FC = () => {
  const { roomIds } = useRoomStore();
  const { getRoomById } = useRoomActions();

  const data = roomIds
    .map((roomId) => getRoomById(roomId))
    .filter((room) => room !== undefined);

  if (data.length === 0) {
    return (
      <SelectItem disabled value="none">
        No room types available
      </SelectItem>
    );
  }

  return (
    <>
      {data.map(({ room_type, id }) => (
        <SelectItem key={id} value={id}>
          {stringTransform(room_type)}
        </SelectItem>
      ))}
    </>
  );
};

export { RoomTypeList };
