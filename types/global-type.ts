import { stringTransform } from "@/utils/string-transform";
import { Database } from "@/utils/supabase/db-type";
import { z } from "zod";

// Constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const maxSizeMB = MAX_FILE_SIZE / 1024 / 1024;

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;
export const MAX_FILE_COUNT = 10;

const magicNumbers: Record<string, [number, number[]]> = {
  "image/jpeg": [0, [0xff, 0xd8, 0xff]],
  "image/png": [0, [0x89, 0x50, 0x4e, 0x47]],
  "application/pdf": [0, [0x25, 0x50, 0x44, 0x46]],
};

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

//
export interface UploadFileProps {
  files: any[];
  tenantId: string;
  service?: string;
}

export const tenantIdentity = z.object({
  tenantId: z.string().nonempty("Tenant id is required"),
  roleId: z.string().nonempty("Role id is required"),
  staffId: z.string().nonempty("Staff id is required"),
  serviceId: z.string().nonempty("Service id is required"),
});

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
      message: `Please select a valid ${name}. Options: ${stringTransform(values.join(", "))}`,
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

// Pre-calculate values
const acceptedTypesString = Array.from(
  new Set(ACCEPTED_FILE_TYPES.map((t) => t.split("/")[1].toUpperCase()))
).join(", ");

const getFileExtension = (filename: string) =>
  filename.split(".").pop()?.toLowerCase();

const validateMagicNumbers = (buffer: Buffer, expectedType: string) => {
  const [offset, expected] = magicNumbers[expectedType];
  return expected.every((byte, index) => buffer[offset + index] === byte);
};

export const fileSchema =
  typeof window === "undefined"
    ? // Server-side validation (RSC safe)
      z
        .object({
          name: z.string().min(1),
          size: z.number().min(1).max(MAX_FILE_SIZE),
          type: z.enum([...ACCEPTED_FILE_TYPES] as [string, ...string[]]),
          data: z.instanceof(Buffer),
        })
        .superRefine((file, ctx) => {
          // Validate file extension
          const extension = getFileExtension(file.name);
          const expectedExtension = file.type.split("/")[1];

          if (extension !== expectedExtension) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "File extension mismatch",
            });
          }

          // Validate magic numbers
          if (!validateMagicNumbers(file.data, file.type)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Invalid file content",
            });
          }
        })
    : // Client-side validation
      z.instanceof(FileList).superRefine((files, ctx) => {
        // Validate file count
        if (files.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "At least one file is required",
          });
        }

        if (files.length > MAX_FILE_COUNT) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Maximum ${MAX_FILE_COUNT} files allowed`,
          });
        }

        // Validate individual files
        Array.from(files).forEach((file, index) => {
          // File size validation
          if (file.size > MAX_FILE_SIZE) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `File ${index + 1} exceeds ${maxSizeMB}MB limit`,
            });
          }

          // File type validation
          if (
            !ACCEPTED_FILE_TYPES.includes(
              file.type as (typeof ACCEPTED_FILE_TYPES)[number]
            )
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `File ${index + 1} must be ${acceptedTypesString}`,
            });
          }
        });
      });

// Type exports
export type BedType = z.infer<typeof BedTypeSchema>;
export type RoomStatus = z.infer<typeof RoomStatusSchema>;
export type RoomType = z.infer<typeof RoomTypeSchema>;
export type PaymentMethodType = z.infer<typeof PaymentMethodSchema>;
export type IDType = z.infer<typeof IDTypeSchema>;
export type GenderType = z.infer<typeof GenderSchema>;
export type RoleType = z.infer<typeof RoleSchema>;

export type TenantIdentity = z.infer<typeof tenantIdentity>;

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
