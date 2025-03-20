import { Database } from "@/utils/supabase/db-type";
import { z } from "zod";

// Constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;
export const MAX_FILE_COUNT = 10;

// Types
export interface FileWithId extends File {
  id: string;
}

export type Element<T extends React.ElementType = "div"> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
  };

// Server response type with safer defaults
export type ServerResponse<T = unknown, D = unknown> = {
  status: "success" | "error";
  message: string;
  data?: D;
  fieldErrors?: z.typeToFlattenedError<T>["fieldErrors"];
};

export interface UploadFileProps {
  files: any[];
  tenantId: string;
  service?: string;
}


// Directly use database enums to avoid duplication
type BedTypeLiteral = Database["public"]["Enums"]["bed_type"];
type RoomStatusLiteral = Database["public"]["Enums"]["room_status_enum"];
type RoomTypeLiteral = Database["public"]["Enums"]["room_type"];
type PaymentMethodLiteral = Database["public"]["Enums"]["payment_method_enum"];
type IDTypeLiteral = Database["public"]["Enums"]["id_type_enum"];
type GenderLiteral = Database["public"]["Enums"]["gender_enum"];
type RoleLiteral = Database["public"]["Enums"]["base_role_enum"];

// Zod schemas with dynamic error messages
const createEnumSchema = <T extends readonly [string, ...string[]]>(
  values: T,
  name: string
) =>
  z.enum(values, {
    errorMap: () => ({
      message: `Please select a valid ${name}. Options: ${values.join(", ")}`,
    }),
  });

// Use database enum values directly (assuming they match your DB)
const bedType = [
  "twin",
  "full",
  "queen",
  "king",
  "double_double",
  "sofa_bed",
  "bunk_bed",
  "murphy_bed",
  "crib",
  "water_bed",
  "daybed",
  "other",
] as const satisfies BedTypeLiteral[];

const roomStatus = [
  "commissioned",
  "not_commissioned",
] as const satisfies RoomStatusLiteral[];
const roomType = [
  "single",
  "double",
  "twin_shared",
  "studio",
  "suite",
  "family",
  "dormitory",
  "ada_accessible",
  "executive",
  "connecting",
  "loft",
  "penthouse",
  "cabana",
  "other",
] as const satisfies RoomTypeLiteral[];
const paymentMethod = [
  "cash",
  "pos",
  "bank_transfer",
] as const satisfies PaymentMethodLiteral[];
const idType = [
  "national_identification",
  "passport",
  "driver_license",
  "other",
] as const satisfies IDTypeLiteral[];

const gender = [
  "female",
  "male",
  "prefer_not_to_say",
  "other",
] as const satisfies GenderLiteral[];

const role = [
  "Super Admin",
  "IT Admin",
  "General Manager",
  "General Manager",
  "Finance Manager",
  "Staff",
] as const satisfies RoleLiteral[];

// Create schemas using factory function
const BedTypeSchema = createEnumSchema(bedType, "bed type");
const RoomStatusSchema = createEnumSchema(roomStatus, "room status");
const RoomTypeSchema = createEnumSchema(roomType, "room type");
const PaymentMethodSchema = createEnumSchema(paymentMethod, "payment method");
const IDTypeSchema = createEnumSchema(idType, "ID type");
const GenderSchema = createEnumSchema(gender, "gender");
const RoleSchema = createEnumSchema(role, "role");

// File validation improvements
const acceptedTypesString = Array.from(
  new Set(ACCEPTED_FILE_TYPES.map((t) => t.split("/")[1]))
).join(", ");

export const fileSchema = z.custom<Blob>().superRefine((val, ctx) => {
  if (val.size === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "File is required",
    });
  }
  if (val.size > MAX_FILE_SIZE) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    });
  }
  if (
    !ACCEPTED_FILE_TYPES.includes(
      val.type as (typeof ACCEPTED_FILE_TYPES)[number]
    )
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Only ${acceptedTypesString} files are accepted`,
    });
  }
});

export const filesSchema = z
  .array(fileSchema)
  .max(MAX_FILE_COUNT, `Maximum ${MAX_FILE_COUNT} files allowed`);

// Type exports
export type BedType = z.infer<typeof BedTypeSchema>;
export type RoomStatus = z.infer<typeof RoomStatusSchema>;
export type RoomType = z.infer<typeof RoomTypeSchema>;
export type PaymentMethodType = z.infer<typeof PaymentMethodSchema>;
export type IDType = z.infer<typeof IDTypeSchema>;
export type GenderType = z.infer<typeof GenderSchema>;
export type RoleType = z.infer<typeof RoleSchema>;

// Schema exports
export {
  BedTypeSchema,
  RoomStatusSchema,
  RoomTypeSchema,
  PaymentMethodSchema,
  IDTypeSchema,
  GenderSchema,
  RoleSchema,
  bedType,
  roomStatus,
  roomType,
  paymentMethod,
  idType,
  gender,
  role,
};
