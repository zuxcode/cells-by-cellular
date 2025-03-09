import { bedType, roomStatus, roomType } from "@/types/global-type";
import { z } from "zod";


// Enums for room types, bed types, and room status
const bedTypesEnum = z.enum(bedType);
const roomStatusEnum = z.enum(roomStatus);
const roomTypesEnum = z.enum(roomType);

const roomBaseSchema = z.object({
  bedType: bedTypesEnum,
  roomStatus: roomStatusEnum,
  roomType: roomTypesEnum,
});

export {
  bedTypesEnum,
  roomStatusEnum,
  roomTypesEnum,
  roomBaseSchema,
};

type RoomBaseSchema = z.infer<typeof roomBaseSchema>;

export type { RoomBaseSchema };
