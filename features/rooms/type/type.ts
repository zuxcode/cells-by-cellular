import { z } from "zod";
import { Database } from "@/utils/supabase/db-type";

// type RoomStatus = Database["public"]["Enums"]["room_status_enum"];
// type BedType = Database["public"]["Enums"]["bed_type_enum"];
// type RoomType = Database["public"]["Enums"]["room_type_enum"];

const bedType = ["single", "double", "queen", "king"] as const;
const roomStatus = ["available", "occupied", "maintenance"] as const;
const roomType = ["single", "double", "suite", "family"] as const;

// Enums for room types, bed types, and room status
const bedTypesEnum = z.enum(bedType);
const roomStatusEnum = z.enum(roomStatus);
const roomTypesEnum = z.enum(roomType);

const roomBaseSchema = z.object({
  beds_name: bedTypesEnum,
  room_status: roomStatusEnum,
  room_type: roomTypesEnum,
});

export {
  bedType,
  roomType,
  roomStatus,
  bedTypesEnum,
  roomStatusEnum,
  roomTypesEnum,
  roomBaseSchema,
};

type RoomBaseSchema = z.infer<typeof roomBaseSchema>;

export type { RoomBaseSchema };
