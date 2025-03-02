import { create } from "zustand";
import { dummyRooms } from "./dummy-data";
import { RoomBaseSchema } from "../type";

// RoomStatus as string literals
type RoomStatus = RoomBaseSchema["room_status"];

// BedType as string literals
type BedType = RoomBaseSchema["beds_name"];

// RoomType as string literals
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
  shouldShowAddRoomSection: boolean;
  setShouldShowAddRoomSection: () => void;
  rooms: RoomData[];
  files: File[];
  setFiles: (files: File[]) => void;
  removeFile: (fileName: string) => void;

  setRooms: (rooms: RoomData[]) => void;
  selectedRoom: RoomData | null;
  addRoom: (room: RoomData) => void;
  updateRoom: (index: number, updatedRoom: Partial<RoomData>) => void;
  deleteRoom: (index: number) => void;
  getAvailableRooms: () => RoomData[];
  setSelectedRoom: (id: string) => void;
  getSelectedRoom: () => RoomData | null;
}

const useRoomStore = create<RoomStore>((set, get) => ({
  files: [],
  setFiles: (files) =>
    set((state) => ({
      files: files.length === 0 ? [...state.files] : [...files],
    })),

  removeFile: (fileName) =>
    set((state) => ({
      files: state.files.filter((file) => file.name !== fileName),
    })),

  shouldShowAddRoomSection: false,
  setShouldShowAddRoomSection: () =>
    set((state) => ({
      shouldShowAddRoomSection: !state.shouldShowAddRoomSection,
      
    })),
  selectedRoom: null,
  rooms: dummyRooms, //[],

  addRoom: (room) =>
    set((state) => ({
      rooms: [...state.rooms, room],
    })),
  setRooms: (rooms) => {
    set((state) => {
      return {
        rooms: rooms.length === 0 ? [...state.rooms] : [...rooms],
      };
    });
  },

  updateRoom: (index, updatedRoom) =>
    set((state) => ({
      rooms: state.rooms.map((room, i) =>
        i === index ? { ...room, ...updatedRoom } : room
      ),
    })),

  deleteRoom: (index) =>
    set((state) => ({
      rooms: state.rooms.filter((_, i) => i !== index),
    })),

  getAvailableRooms: () => {
    const availableRooms = get().rooms.filter(
      (room) => room.status === "available"
    );
    return availableRooms;
  },

  setSelectedRoom: (id: string) => {
    const selectedRoom = get().rooms.filter((room) => room.id === id)[0];
    set(() => ({
      selectedRoom: selectedRoom,
      shouldShowAddRoomSection: false,
    }));
  },
  getSelectedRoom: () => get().selectedRoom,
}));

export { useRoomStore };

export type { RoomData, BedType, RoomType, RoomStatus, RoomStore };
