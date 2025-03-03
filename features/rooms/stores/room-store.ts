import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RoomBaseSchema } from "../type";

import { dummyRooms } from "./dummy-data";

type RoomStatus = RoomBaseSchema["room_status"];
type BedType = RoomBaseSchema["beds_name"];
type RoomType = RoomBaseSchema["room_type"];

interface RoomData {
  id: string;
  imageUrl: string[];
  title: string;
  status: RoomStatus;
  description: string;
  price: string;
  maxGuests: number;
  bedType: BedType;
  roomSize: number;
  totalRooms: number;
  roomsOccupied: number;
}

interface RoomStore {
  rooms: RoomData[];
  selectedRoom: RoomData | null;
  setRooms: (rooms: RoomData[]) => void;
  setSelectedRoom: (id: string) => void;
}

// const useRoomStore = create<RoomStore>()(
//   persist(
//     (set) => ({
//       rooms: dummyRooms, // [],
//       selectedRoom: null,

//       setRooms: (rooms) => set({ rooms: [...rooms] }),

//       setSelectedRoom: (id) => {
//         set((state) => ({
//           selectedRoom: state.rooms.find((room) => room.id === id),
//         }));
//       },
//     }),
//     {
//       name: "room-storage",
//     }
//   )
// );

const useRoomStore = create<RoomStore>((set) => ({
  rooms: dummyRooms, // [],
  selectedRoom: null,

  setRooms: (rooms) => set({ rooms: [...rooms] }),

  setSelectedRoom: (id) => {
    set((state) => ({
      selectedRoom: state.rooms.find((room) => room.id === id),
    }));
  },
}));

export { useRoomStore };

export type { RoomData, BedType, RoomType, RoomStatus, RoomStore };
