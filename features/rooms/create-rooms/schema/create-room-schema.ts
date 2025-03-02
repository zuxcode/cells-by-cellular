import { z } from "zod";
import { roomBaseSchema } from "../../type";

// Reusable schema for numeric strings
const numericStringSchema = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, `${fieldName} is required`)
    .regex(/^\d+$/, `${fieldName} must be a valid number`);

// Room schema
const roomSchema = roomBaseSchema.extend({
  name: z
    .string()
    .trim()
    .min(1, "Room name is required")
    .min(3, "Room name must be at least 3 characters")
    .max(50, "Room name cannot exceed 50 characters")
    .regex(/^[\w\s-]+$/, "Invalid characters in room name"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  
    features: z
    .string()
    .trim()
    .nonempty("Features are required")
    .min(10, "Features must be at least 10 characters")
    .max(500, "Features cannot exceed 500 characters"),

  number: z
    .string()
    .trim()
    .min(1, "Room number is required")
    .regex(/^[A-Z0-9-]+$/i, "Invalid room number format"),

  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format")
    .pipe(z.string().min(1, "Price must be at least $1")),

  beds_count: numericStringSchema("Bed count"),
  room_size: numericStringSchema("Room size"),
  max_occupancy: numericStringSchema("Maximum occupancy"),
});

// Export the schema and enums
export { roomSchema };
export type RoomSchemaType = z.infer<typeof roomSchema>;
