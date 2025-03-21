import { create } from "zustand";
import { createClient } from "../supabase/client";
import { Database } from "../supabase/db-type";

/** Represents a hotel room type from the database */
export type Room = Database["public"]["Tables"]["hotel_rooms"]["Row"];

/**
 * Interface defining the shape of the rooms store state and actions
 */
interface RoomsState {
  /** Dictionary of rooms keyed by their ID for efficient lookups */
  roomsById: Record<Room["id"], Room>;
  /** Array of room IDs preserving order from the database */
  roomIds: Room["id"][];
  /** Loading state for async operations */
  loading: boolean;
  /** Error message for failed operations */
  error: string | null;
  /** Currently selected room ID */
  selectedRoomId: Room["id"] | null;

  actions: {
    /**
     * Fetches all rooms from the database and updates the store
     * @throws {Error} If Supabase query fails
     */
    fetchRooms: () => Promise<void>;

    /**
     * Adds or updates rooms in the store
     * @param rooms Array of Room objects to add/update
     */
    addRooms: (rooms: Room[]) => void;

    /**
     * Removes a room from the store
     * @param roomId ID of the room to remove
     */
    removeRoom: (roomId: Room["id"]) => void;

    /**
     * Retrieves a room by ID, using selectedRoomId as fallback
     * @param roomId Optional room ID to lookup
     * @returns Room or undefined if not found
     */
    getRoomById: (roomId?: Room["id"]) => Room | undefined;

    /**
     * Selects a room by ID
     * @param roomId ID of the room to select
     */
    selectRoom: (roomId: Room["id"]) => void;

    /**
     * Updates an existing room in the store
     * @param roomId ID of the room to update
     * @param updates Partial room object with new values
     */
    updateRoom: (roomId: Room["id"], updates: Partial<Room>) => void;
  };
}

/**
 * Zustand store for managing hotel rooms state
 */
export const useRoomStore = create<RoomsState>((set, get) => {
  const supabase = createClient();

  return {
    roomsById: {},
    roomIds: [],
    selectedRoomId: null,
    loading: false,
    error: null,

    actions: {
      fetchRooms: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("hotel_rooms")
            .select("*")
            .order("created_at", { ascending: true });

          if (error) throw error;

          const roomsById = (data || []).reduce<Record<string, Room>>(
            (acc, room) => ({ ...acc, [room.id]: room }),
            {}
          );

          set({
            roomsById,
            roomIds: data?.map(room => room.id) || [],
            loading: false
          });
        } catch (err: unknown) {
          const errorMessage = err instanceof Error 
            ? err.message 
            : "Failed to fetch rooms";
          console.error("Fetch rooms error:", err);
          set({ error: errorMessage, loading: false });
        }
      },

      addRooms: (rooms) => {
        set((state) => {
          const newRoomsById = { ...state.roomsById };
          const newRoomIds = [...state.roomIds];

          rooms.forEach((room) => {
            newRoomsById[room.id] = room;
            if (!newRoomIds.includes(room.id)) {
              newRoomIds.push(room.id);
            }
          });

          return { roomsById: newRoomsById, roomIds: newRoomIds };
        });
      },

      removeRoom: (roomId) => {
        set((state) => {
          const newRooms = { ...state.roomsById };
          delete newRooms[roomId];
          
          return {
            roomsById: newRooms,
            roomIds: state.roomIds.filter(id => id !== roomId),
            selectedRoomId: state.selectedRoomId === roomId ? null : state.selectedRoomId
          };
        });
      },

      getRoomById: (roomId) => {
        const state = get();
        const targetId = roomId ?? state.selectedRoomId;
        return targetId ? state.roomsById[targetId] : undefined;
      },

      // Set selectRoom
      selectRoom: (roomId) => {
        set({ selectedRoomId: roomId });
      },

      updateRoom: (roomId, updates) => {
        set((state) => {
          const existing = state.roomsById[roomId];
          if (!existing) return state;

          return {
            roomsById: {
              ...state.roomsById,
              [roomId]: { ...existing, ...updates }
            }
          };
        });
      }
    },
  };
});

// Derived selectors
export const useRoomActions = () => useRoomStore((state) => state.actions);
export const useSelectedRoom = () => useRoomStore((state) => 
  state.selectedRoomId ? state.roomsById[state.selectedRoomId] : undefined
);

/**
 * Hook to get a room by ID with reactive updates
 * @param roomId ID of the room to retrieve
 * @returns Room object or undefined
 */
export const useRoom = (roomId?: Room["id"]) => 
  useRoomStore((state) => {
    const targetId = roomId ?? state.selectedRoomId;
    return targetId ? state.roomsById[targetId] : undefined;
  });
