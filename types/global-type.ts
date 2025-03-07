import { Database } from "@/utils/supabase/db-type";
import { z } from "zod";

export type Element<T extends React.ElementType = "div"> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
  };

// Define a more robust response type
export type SeverResponse<T = {}> = {
  status: "success" | "error";
  message: string;
  fieldErrors?: z.typeToFlattenedError<T>["fieldErrors"];
};


// type roomStatus = Database["public"]["Enums"]["room_status_enum"];
// type bedType = Database["public"]["Enums"]["bed_type_enum"];
// type roomType = Database["public"]["Enums"]["room_type_enum"];

const bedType = ["single", "double", "queen", "king"] as const;
const roomStatus = ["Commissioned", "Not-commissioned"] as const;
const roomType = ["single", "double", "suite", "family"] as const;

const BedTypeEnum = z.enum(bedType);
const RoomStatusEnum = z.enum(roomStatus);
const RoomTypeEnum = z.enum(roomType);

type BedType = z.infer<typeof BedTypeEnum>;
type RoomStatus = z.infer<typeof RoomStatusEnum>;
type RoomType = z.infer<typeof RoomTypeEnum>;

export {
  bedType,
  roomStatus,
  roomType,
  BedTypeEnum,
  RoomStatusEnum,
  RoomTypeEnum,
};

export type { BedType, RoomStatus, RoomType };
