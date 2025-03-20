import { createClient } from "@/utils/supabase/server";
import { Database } from "@/utils/supabase/db-type";
import { RoomData } from "../stores";

/**
 * This module provides functionality to fetch and transform room data from the Supabase database.
 */


const TOTAL_ROOMS = 10; // Total number of rooms available
const ROOM_OCCUPIED = 3; // Number of rooms currently occupied

/**
 * Fetches room data from the "hotel_rooms" table in the Supabase database.
 * 
 * @returns {Promise<Room[]>} A promise that resolves to an array of room data rows.
 * @throws {Error} If there is an error fetching data from the database.
 */
const getRoomsWithSupabase = async (): Promise<Room[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("hotel_rooms").select("*");

  if (error) {
    console.error("Error fetching rooms:", error.message);
    throw new Error(error.message);
  }

  return data || [];
};

/**
 * Transforms raw room data from the database into a structured format suitable for the application.
 * 
 * @param {Room[]} data - The raw room data from the database.
 * @returns {RoomData[]} An array of transformed room data.
 */
const transformRoomData = (
  data: Room[]
): RoomData[] => {
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

/**
 * Fetches and transforms room data for use in the application.
 * 
 * @returns {Promise<RoomData[]>} A promise that resolves to an array of transformed room data.
 * If an error occurs, it logs the error and returns an empty array.
 */
export const getRoomsRsc = async (): Promise<RoomData[]> => {
  try {
    const data = await getRoomsWithSupabase();
    return transformRoomData(data);
  } catch (error) {
    console.error("Error in getRoomsRsc:", error);
    return [];
  }
};