import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RoomBaseSchema } from "../type";

type RoomStatus = RoomBaseSchema["roomStatus"];
type BedType = RoomBaseSchema["bedType"];
type RoomType = RoomBaseSchema["roomType"];

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
  rooms:  [],
  selectedRoom: null,
  setRooms: (rooms) =>
  set((state) => {
    const newRooms = new Set([...state.rooms, ...rooms]);
    return { rooms: Array.from(newRooms) };
  }),
  setSelectedRoom: (id) => {
    set((state) => ({
      selectedRoom: state.rooms.find((room) => room.id === id),
    }));
  },
}));

export { useRoomStore };

export type { RoomData, BedType, RoomType, RoomStatus, RoomStore };
