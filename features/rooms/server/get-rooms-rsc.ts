import { createClient } from "@/utils/supabase/server";
import { Database } from "@/utils/supabase/db-type";
import { RoomData } from "../stores";

const getRoomsWithSupabase = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("hotel_rooms").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const transformRoomData = (
  data: Database["public"]["Tables"]["hotel_rooms"]["Row"][]
) => {
  const TOTAL_ROOMS = 10;
  const ROOM_OCCUPIED = 3;
  return data.map((room) => ({
    id: room.id,
    imageUrl: room.image_urls,
    title: room.name,
    status: room.status,
    description: room.description,
    price: String(room.price),
    maxGuests: Number(room.guest_max),
    bedType: room.bed_type,
    roomSize: Number(room.size),
    totalRooms: TOTAL_ROOMS,
    roomsOccupied: ROOM_OCCUPIED,
  }));
};

export const getRoomsRsc = async (): Promise<RoomData[]> => {
  try {
    const data = await getRoomsWithSupabase();
    console.log(">>> ", data)
    const transformedRoom = transformRoomData(data);
    console.log("***", transformedRoom);
    return transformedRoom;
  } catch (error) {
    return [];
  }
};
