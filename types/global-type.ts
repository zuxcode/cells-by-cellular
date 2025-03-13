import { Database } from "@/utils/supabase/db-type";
import { z } from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_FILE_COUNT = 10;

type UnionToTuple<T, U = T> = [T] extends [never]
  ? []
  : U extends any
  ? [U, ...UnionToTuple<Exclude<T, U>>]
  : [];

export interface FileWithId extends File {
  id: string;
}

export type Element<T extends React.ElementType = "div"> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
  };

// Define a more robust response type
export type ServerResponse<T = {}, D = {}> = {
  status: "success" | "error";
  message: string;
  data?: D;
  fieldErrors?: z.typeToFlattenedError<T>["fieldErrors"];
};

type RoomStatusLiteral = Database["public"]["Enums"]["room_status_enum"];
type RoomTypeLiteral = Database["public"]["Enums"]["room_type"];
type BedTypeLiteral = Database["public"]["Enums"]["bed_type"];

type RoomStatusUnion = UnionToTuple<RoomStatusLiteral>;
type RoomTypeUnion = UnionToTuple<RoomTypeLiteral>;
type BedTypeUnion = UnionToTuple<BedTypeLiteral>;

const bedType: BedTypeUnion = [
 'twin', 
  'full', 
  'queen', 
  'king', 
  'double_double', 
  'sofa_bed', 
  'bunk_bed', 
  'murphy_bed', 
  'crib', 
  'water_bed', 
  'daybed',
  'other'
] as const;
const roomStatus: RoomStatusUnion = ["commissioned", "not_commissioned"] as const;
const roomType:RoomTypeUnion = [
 'single', 
  'double', 
  'twin_shared', 
  'studio', 
  'suite', 
  'family', 
  'dormitory', 
  'ada_accessible', 
  'executive', 
  'connecting', 
  'loft', 
  'penthouse', 
  'cabana',
  'other'
] as const;

const BedTypeEnum = z.enum(bedType);
const RoomStatusEnum = z.enum(roomStatus);
const RoomTypeEnum = z.enum(roomType);

// Correctly extract main media types from accepted MIME types
const extTypes = ACCEPTED_FILE_TYPES.map(type => type.split('/')[1]);
const uniqueExts = [...new Set(extTypes)]; // Remove duplicates
const extString = uniqueExts.join(', '); // Create human-readable string

export const fileSchema = z
  .custom<Blob>()
  .refine((file) => file instanceof Blob, "Invalid file type")
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`
  )
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    `Only ${extString} files are allowed`
  );


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

